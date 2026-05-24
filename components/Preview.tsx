interface PreviewProps {
  html: string;
}

export default function Preview({ html }: PreviewProps) {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="mx-auto max-w-[210mm] bg-white p-8 shadow-lg min-h-[297mm]">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
