'use client';

import { useState, useRef } from 'react';

interface ToolbarProps {
  markdown: string;
  onMarkdownChange: (md: string) => void;
}

export default function Toolbar({ markdown, onMarkdownChange }: ToolbarProps) {
  const [exporting, setExporting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pushing, setPushing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportPdf = async () => {
    setExporting(true);
    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      });

      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('导出失败，请确保服务器正在运行');
    } finally {
      setExporting(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch('/api/upload-photo', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const ts = Date.now();
      const newMd = markdown.replace(
        /<div class="resume-photo-placeholder">[^<]*<\/div>/,
        `<img src="/photo.jpg?v=${ts}" alt="照片">`,
      );
      onMarkdownChange(newMd);
    } catch (err) {
      console.error('Photo upload failed:', err);
      alert('照片上传失败');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      });

      if (!res.ok) throw new Error('Save failed');
    } catch (err) {
      console.error('Save failed:', err);
      alert('保存失败');
    } finally {
      setSaving(false);
    }
  };

  const handleGitPush = async () => {
    setPushing(true);
    try {
      // Save first
      await fetch('/api/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      });

      // Then commit + push
      const res = await fetch('/api/git-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'update resume' }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Push failed');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : '提交失败';
      console.error('Git push failed:', err);
      alert(msg);
    } finally {
      setPushing(false);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-700">
      <h1 className="text-sm font-semibold text-zinc-100">
        Markdown Resume Builder
      </h1>
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-1.5 text-sm bg-zinc-700 text-zinc-200 rounded hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? '上传中...' : '上传照片'}
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-3 py-1.5 text-sm bg-emerald-700 text-emerald-100 rounded hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? '保存中...' : '暂存'}
        </button>
        <button
          onClick={handleGitPush}
          disabled={pushing}
          className="px-3 py-1.5 text-sm bg-violet-700 text-violet-100 rounded hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {pushing ? '提交中...' : '提交'}
        </button>
        <button
          onClick={handleExportPdf}
          disabled={exporting}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {exporting ? '导出中...' : '导出 PDF'}
        </button>
      </div>
    </header>
  );
}
