import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import fm from 'front-matter';

const LOG_DIR = path.join(process.cwd(), 'logs');
if (!fs.existsSync(LOG_DIR)) { fs.mkdirSync(LOG_DIR); }
const LOG_FILE = path.join(LOG_DIR, 'last_run.log');

const MESSAGES = {
    ACTIVATING: (id: string, title: string) => `\n🤖 [${id}] ACTIVATING TASK: ${title}`,
    TODO_MOVING: (id: string) => `📝 [${id}] Status is TODO. Moving to IN_PROGRESS...`,
    NEXT_STEP_PROMPT: `\n👉 NEXT STEP: Copy/Paste this to your AI Assistant:\n`,
    AI_PROMPT_IMPLEMENT: (id: string) => `  "Task ${id} is now IN_PROGRESS. Read AGENTS.md for protocol rules, then implement the plan."\n`,
    STATUS_VERIFYING: (id: string, status: string) => `🕵️  [${id}] Status is ${status}. Running Verification...`,
    TEST_RUNNING: (id: string, file: string) => `🧪 [${id}] Running specific test: ${file}`,
    VERIFICATION_PASSED: (id: string) => `✅ [${id}] Verification Passed. Moving to DONE.`,
    DONE_REVERIFYING: (id: string) => `🔁 [${id}] Status is DONE. Re-verifying...`,
    DONE_REVERIFIED: (id: string) => `✅ [${id}] Re-Verification Passed. Task remains DONE.`,
    NO_TEST_FILE: (id: string) => `⚠️  [${id}] No Test File found. Running all tests.`,
    UNKNOWN_STATUS: (id: string, status: string) => `❓ [${id}] Unknown status: ${status}`,
    VERIFICATION_FAILED: (id: string) => `❌ [${id}] Verification Failed. Setting/Keeping status as BLOCKED.`,
    AI_PROMPT_FIX: (id: string) => `  "Task ${id} is BLOCKED. Review the logs at logs/last_run.log and fix the issues."\n`,
    NEXT_STEP_COMPLETE: `\n👉 NEXT STEP: This task is complete. To pick up the next task, run:`,
    NEXT_STEP_COMMAND: `   npm run task next\n`
};

function mkLog(msg: string) {
    fs.appendFileSync(LOG_FILE, msg + '\n');
    console.log(msg);
}

function runCmd(command: string) {
    fs.appendFileSync(LOG_FILE, `\n> ${command}\n`);
    try {
        require('child_process').execSync(`set -o pipefail && ${command} | tee -a logs/last_run.log`, {
            stdio: 'inherit',
            shell: '/bin/bash'
        });
    } catch (e) {
        throw new Error(`Command failed: ${command}`);
    }
}

const TASKS_DIR = path.join(__dirname, '../tasks');
let taskId = process.argv[2];

// Logic: Handle 'next' command
if (taskId === 'next') {
    const allFiles = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md') && f !== 'template.md');
    let targetTask = null;

    // Priority 1: IN_PROGRESS
    targetTask = allFiles.find(f => {
        const c = fs.readFileSync(path.join(TASKS_DIR, f), 'utf8');
        // @ts-ignore
        return fm(c).attributes.status === 'IN_PROGRESS';
    });

    // Priority 2: BLOCKED
    if (!targetTask) {
        targetTask = allFiles.find(f => {
            const c = fs.readFileSync(path.join(TASKS_DIR, f), 'utf8');
            // @ts-ignore
            return fm(c).attributes.status === 'BLOCKED';
        });
    }

    // Priority 3: TODO
    if (!targetTask) {
        targetTask = allFiles.find(f => {
            const c = fs.readFileSync(path.join(TASKS_DIR, f), 'utf8');
            // @ts-ignore
            return fm(c).attributes.status === 'TODO';
        });
    }

    if (targetTask) {
        taskId = targetTask.split('_')[0];
    } else {
        console.log("No Pending (TODO/IN_PROGRESS/BLOCKED) tasks found!");
        process.exit(0);
    }
}

const files = fs.readdirSync(TASKS_DIR);
const taskFile = files.find(f => {
    return f === taskId ||
        f === `${taskId}.md` ||
        f.startsWith(`${taskId}_`) ||
        f.startsWith(`${taskId}.`);
});
if (!taskFile) { console.error(`[${taskId}] Task not found.`); process.exit(1); }

const filePath = path.join(TASKS_DIR, taskFile);
const content = fs.readFileSync(filePath, 'utf8');
const parsed = fm(content);
// @ts-ignore
const attributes: any = parsed.attributes;

// Reset Log File
fs.writeFileSync(LOG_FILE, '');
mkLog(MESSAGES.ACTIVATING(taskId, attributes.title));

try {
    if (attributes.status === 'TODO') {
        mkLog(MESSAGES.TODO_MOVING(taskId));
        updateStatus(filePath, content, 'IN_PROGRESS');
        mkLog(MESSAGES.NEXT_STEP_PROMPT);
        mkLog(MESSAGES.AI_PROMPT_IMPLEMENT(taskId));
    }
    else if (attributes.status === 'IN_PROGRESS' || attributes.status === 'BLOCKED') {
        mkLog(MESSAGES.STATUS_VERIFYING(taskId, attributes.status));
        runCmd('npm run lint');

        // Extract Test File
        const testFileMatch = content.match(/- \*\*Test File:\*\* `(.*)`/);
        if (!testFileMatch) {
            console.error(`[${taskId}] ❌ No Test File defined in ${taskFile}. Cannot verify.`);
            throw new Error("No Test File found");
        }
        const testFile = testFileMatch[1];
        mkLog(MESSAGES.TEST_RUNNING(taskId, testFile));

        runCmd(`npm test ${testFile}`);
        mkLog(MESSAGES.VERIFICATION_PASSED(taskId));
        updateStatus(filePath, content, 'DONE');
    }
    else if (attributes.status === 'DONE') {
        mkLog(MESSAGES.DONE_REVERIFYING(taskId));
        runCmd('npm run lint');

        // Extract Test File
        const testFileMatch = content.match(/- \*\*Test File:\*\* `(.*)`/);
        if (testFileMatch) {
            const testFile = testFileMatch[1];
            mkLog(MESSAGES.TEST_RUNNING(taskId, testFile));
            runCmd(`npm test ${testFile}`);
        } else {
            mkLog(MESSAGES.NO_TEST_FILE(taskId));
            runCmd('npm test');
        }
        mkLog(MESSAGES.DONE_REVERIFIED(taskId));
        mkLog(MESSAGES.NEXT_STEP_COMPLETE);
        mkLog(MESSAGES.NEXT_STEP_COMMAND);
    }
    else {
        mkLog(MESSAGES.UNKNOWN_STATUS(taskId, attributes.status));
    }
} catch (e) {
    console.error(MESSAGES.VERIFICATION_FAILED(taskId));
    updateStatus(filePath, content, 'BLOCKED');
    mkLog(MESSAGES.NEXT_STEP_PROMPT);
    mkLog(MESSAGES.AI_PROMPT_FIX(taskId));
}

function updateStatus(path: string, fullContent: string, newStatus: string) {
    let newContent = fullContent.replace(/status: ".*"/, `status: "${newStatus}"`);

    // Auto-check items if DONE
    if (newStatus === 'DONE') {
        newContent = newContent.replace(/- \[ \]/g, '- [x]');
    }

    fs.writeFileSync(path, newContent);
}
