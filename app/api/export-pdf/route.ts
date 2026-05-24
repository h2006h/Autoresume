import { NextResponse } from 'next/server';
import { generatePdf } from '@/lib/pdf';

export async function POST(request: Request) {
  try {
    const { markdown } = await request.json();

    if (!markdown || typeof markdown !== 'string') {
      return NextResponse.json(
        { error: 'Missing markdown content' },
        { status: 400 },
      );
    }

    const pdfBuffer = await generatePdf(markdown);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (error) {
    console.error('PDF export error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 },
    );
  }
}
