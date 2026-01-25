import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import fm from 'front-matter';

const TASKS_DIR = path.join(__dirname, '../tasks');
let taskId = process.argv[2];

// Logic: Handle 'next' command
if (taskId === 'next') {
    const allFiles = fs.readdirSync(TASKS_DIR).filter(f => f.endsWith('.md') && f !== 'template.md');
    for (const f of allFiles) {
        const c = fs.readFileSync(path.join(TASKS_DIR, f), 'utf8');
        // @ts-ignore
        if (fm(c).attributes.status === 'TODO') {
            taskId = f.split('_')[0];
            break;
        }
    }
    if (taskId === 'next') { console.log("🎉 No TODO tasks found!"); process.exit(0); }
}

const files = fs.readdirSync(TASKS_DIR);
const taskFile = files.find(f => f.startsWith(taskId));
if (!taskFile) { console.error(`❌ Task ${taskId} not found.`); process.exit(1); }

const filePath = path.join(TASKS_DIR, taskFile);
const content = fs.readFileSync(filePath, 'utf8');
const parsed = fm(content);
// @ts-ignore
const attributes: any = parsed.attributes;

console.log(`\n🚀 ACTIVATING TASK: ${attributes.title}`);

try {
    if (attributes.status === 'TODO') {
        console.log("🔹 Moving to IN_PROGRESS...");
        updateStatus(filePath, content, 'IN_PROGRESS');
    }
    else if (attributes.status === 'IN_PROGRESS') {
        console.log("🔹 Running Verification...");
        execSync('npm run lint', { stdio: 'inherit' });
        execSync('npm test', { stdio: 'inherit' });
        console.log("✅ Verified. Moving to DONE.");
        updateStatus(filePath, content, 'DONE');
    }
} catch (e) {
    console.error("❌ Verification Failed. Moving to BLOCKED.");
    updateStatus(filePath, content, 'BLOCKED');
}

function updateStatus(path: string, fullContent: string, newStatus: string) {
    const newContent = fullContent.replace(/status: ".*"/, `status: "${newStatus}"`);
    fs.writeFileSync(path, newContent);
}
