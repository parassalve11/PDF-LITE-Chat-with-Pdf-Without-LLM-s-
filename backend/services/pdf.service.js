// src/services/pdfService.js

import pdfParse from '@cedrugs/pdf-parse'; // ← This works now!

const documents = new Map();

export async function processAndStorePdf(file) {
  if (!file || !file.buffer) {
    throw new Error("No valid PDF file provided");
  }

  const filename = file.originalname;

  try {
    // This is the classic, simple usage — works with the fork!
    const data = await pdfParse(file.buffer);

    const extractedText = data.text.trim();

    if (!extractedText) {
      throw new Error("No text found in PDF. It might be scanned (image-only) or empty.");
    }

    const documentId = `doc_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    documents.set(documentId, {
      filename,
      content: extractedText,
      uploadDate: new Date().toISOString(),
    });

    return documentId;
  } catch (parseError) {
    console.error("PDF parsing error:", parseError);
    throw new Error(
      "Failed to extract text from PDF. Possible reasons: scanned/image-based, password-protected, corrupted, or very complex layout."
    );
  }
}

export function getDocumentById(documentId) {
  if (!documentId) throw new Error("documentId is required");
  return documents.get(documentId);
}