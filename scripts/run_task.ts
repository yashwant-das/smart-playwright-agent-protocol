import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import fm from 'front-matter';

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
const taskFile = files.find(f => f.startsWith(taskId));
if (!taskFile) { console.error(`[${taskId}] Task not found.`); process.exit(1); }

const filePath = path.join(TASKS_DIR, taskFile);
const content = fs.readFileSync(filePath, 'utf8');
const parsed = fm(content);
// @ts-ignore
const attributes: any = parsed.attributes;

console.log(`\n[${taskId}] ACTIVATING TASK: ${attributes.title}`);

try {
    if (attributes.status === 'TODO') {
        console.log(`[${taskId}] Status is TODO. Moving to IN_PROGRESS...`);
        updateStatus(filePath, content, 'IN_PROGRESS');
        console.log(`\n👉 NEXT STEP: Copy/Paste this to your AI Assistant:\n`);
        console.log(`  "Task ${taskId} is now IN_PROGRESS. Read AGENTS.md for protocol rules, then implement the plan."\n`);
    }
    else if (attributes.status === 'IN_PROGRESS' || attributes.status === 'BLOCKED') {
        console.log(`[${taskId}] Status is ${attributes.status}. Running Verification...`);
        execSync('npm run lint', { stdio: 'inherit' });

        // Extract Test File
        const testFileMatch = content.match(/- \*\*Test File:\*\* `(.*)`/);
        if (!testFileMatch) {
            console.error(`[${taskId}] ❌ No Test File defined in ${taskFile}. Cannot verify.`);
            throw new Error("No Test File found");
        }
        const testFile = testFileMatch[1];
        console.log(`[${taskId}] Running specific test: ${testFile}`);

        execSync(`npm test ${testFile}`, { stdio: 'inherit' });
        console.log(`[${taskId}] Verified. Moving to DONE.`);
        updateStatus(filePath, content, 'DONE');
    }
    else if (attributes.status === 'DONE') {
        console.log(`[${taskId}] Status is DONE. Running Re-Verification...`);
        execSync('npm run lint', { stdio: 'inherit' });

        // Extract Test File
        const testFileMatch = content.match(/- \*\*Test File:\*\* `(.*)`/);
        if (testFileMatch) {
            const testFile = testFileMatch[1];
            console.log(`[${taskId}] Re-running specific test: ${testFile}`);
            execSync(`npm test ${testFile}`, { stdio: 'inherit' });
        } else {
            console.log(`[${taskId}] ⚠️ No Test File found. Running all tests.`);
            execSync('npm test', { stdio: 'inherit' });
        }
        console.log(`[${taskId}] Re-Verified. Task remains DONE.`);
        console.log(`\n👉 NEXT STEP: This task is complete. To pick up the next task, run:`);
        console.log(`   npm run task next\n`);
    }
    else {
        console.log(`[${taskId}] Unknown status: ${attributes.status}`);
    }
} catch (e) {
    console.error(`[${taskId}] Verification Failed. Setting/Keeping status as BLOCKED.`);
    updateStatus(filePath, content, 'BLOCKED');
    console.log(`\n👉 NEXT STEP: Fix the failures listed above (Lint/Test) and run the task again.`);
    console.log(`   Tip: Check the logs above for specific errors in code or markdown.`);
}

function updateStatus(path: string, fullContent: string, newStatus: string) {
    let newContent = fullContent.replace(/status: ".*"/, `status: "${newStatus}"`);

    // Auto-check items if DONE
    if (newStatus === 'DONE') {
        newContent = newContent.replace(/- \[ \]/g, '- [x]');
    }

    fs.writeFileSync(path, newContent);
}
