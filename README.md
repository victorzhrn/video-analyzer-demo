# Video Analyzer Demo

This is a minimal Next.js 14 demo that uploads a short basketball video to
Vercel Blob storage and sends the clip to Gemini 2.5 Flash for analysis.
The JSON result is displayed next to the uploaded video.

## Getting Started

1. Install dependencies and run the development server:
   ```bash
   npm install
   npm run dev
   ```

2. Create a `.env.local` file with the following variables:
   ```bash
   VERCEL_BLOB_READ_WRITE_TOKEN=YOUR_TOKEN
   GEMINI_API_KEY=YOUR_API_KEY
   ```

## Project Structure

- `src/app/page.tsx` – front‑end page that handles upload and displays results.
- `src/app/api/upload/route.ts` – edge function to create a Vercel Blob upload URL.
- `src/app/api/process/route.ts` – edge function that calls Gemini.

This demo omits error handling and authentication for brevity.
