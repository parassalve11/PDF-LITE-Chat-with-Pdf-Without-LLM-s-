"use client";

import { uploadPDF } from "@/api/api";
import { useState } from "react";

export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("File not found");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const { documentId } = await uploadPDF(file); // ✅ await
      onUploadSuccess(documentId);
      setFile(null);
    } catch (err) {
      setError(err.message); // ✅ correct property
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-2"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {error && (
        <p className="text-red-500 font-semibold mt-2">{error}</p>
      )}
    </div>
  );
}
