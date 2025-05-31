import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const runtime = 'edge';

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { blobUrl } = await req.json();

  const model = genai.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const schema = {
    name: 'shotResult',
    parameters: {
      type: 'object',
      properties: {
        made: { type: 'boolean' },
        advice: { type: 'string' },
      },
      required: ['made', 'advice'],
    },
  };

  const resp = await model.generateContent({
    contents: [
      { modality: 'VIDEO', uri: blobUrl },
      { modality: 'TEXT', text: 'Analyse this basketball shot. Return JSON.' },
    ],
    tools: [schema],
    systemInstruction: 'Return succinct coaching.',
  });

  return NextResponse.json(resp.toolResponses[0]);
}
