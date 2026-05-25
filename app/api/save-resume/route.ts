import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { markdown } = await request.json();

    if (!markdown || typeof markdown !== 'string') {
      return NextResponse.json({ error: 'Missing markdown' }, { status: 400 });
    }

    const root = process.cwd();

    // Ensure directories exist
    await mkdir(path.join(root, 'content'), { recursive: true });
    await mkdir(path.join(root, 'public', 'content'), { recursive: true });

    // Write to both locations
    await writeFile(path.join(root, 'content', 'resume.md'), markdown, 'utf-8');
    await writeFile(path.join(root, 'public', 'content', 'resume.md'), markdown, 'utf-8');

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Save error:', error);
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
