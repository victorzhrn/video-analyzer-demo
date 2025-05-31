import { createUploadUrl } from '@vercel/blob/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST() {
  const { url, token } = await createUploadUrl();
  return NextResponse.json({ url, token });
}
