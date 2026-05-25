import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function hasStagedChanges(cwd: string): Promise<boolean> {
  try {
    const { stdout } = await execAsync('git diff --cached --name-only', { cwd });
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const commitMsg = message || 'update resume';

    const cwd = process.cwd();

    // Stage resume files only
    await execAsync('git add content/resume.md public/content/resume.md', { cwd });

    // Only commit if there are staged changes
    if (await hasStagedChanges(cwd)) {
      await execAsync(`git commit -m "${commitMsg}"`, { cwd });
    }

    // Push
    await execAsync('git push origin main', { cwd });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Git push error:', errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
