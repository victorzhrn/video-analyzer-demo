'use client';
import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();
  const [videoUrl, setVideoUrl] = useState('');

  async function upload(file: File) {
    setLoading(true);
    const { url, token } = await fetch('/api/upload', { method: 'POST' }).then(r => r.json());
    await fetch(url, { method: 'PUT', headers: { 'x-vercel-blob-token': token }, body: file });
    const res = await fetch('/api/process', { method: 'POST', body: JSON.stringify({ blobUrl: url }) }).then(r => r.json());
    setVideoUrl(url);
    setResult(res);
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-[650px] bg-white shadow rounded-2xl p-8 space-y-6">
        <h1 className="text-2xl font-semibold">AI Shot Coach</h1>
        {!result && (
          <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl bg-slate-50 cursor-pointer">
            <input type="file" accept="video/*" hidden onChange={e => e.target.files && upload(e.target.files[0])} />
            <p className="text-slate-500">Drag video or click to upload</p>
          </label>
        )}
        {loading && <div className="h-1 w-full bg-slate-200 rounded"><div className="h-full w-2/3 bg-sky-500 animate-pulse" /></div>}
        {result && (
          <div className="grid grid-cols-2 gap-4">
            <video className="rounded-xl" src={videoUrl} controls poster={videoUrl + '#t=0.1'} />
            <pre className="border rounded-xl p-4 text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
