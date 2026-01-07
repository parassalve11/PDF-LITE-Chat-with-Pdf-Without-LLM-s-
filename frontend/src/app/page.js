"use client";

import ChatInterface from "@/components/ChatInterface";
import UploadForm from "@/components/UploadForm";
import { useState } from "react";

export default function Home() {
  const [documentId, setDocumentId] = useState("");

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="text-2xl font-bold mb-4">PDF Chat Lite</div>

      <UploadForm onUploadSuccess={setDocumentId} />

      {documentId && <ChatInterface documentId={documentId} />}
    </main>
  );
}
