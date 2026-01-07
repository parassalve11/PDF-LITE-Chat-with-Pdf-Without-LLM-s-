import { extractKeyword, findBestMatch } from "../lib/keywords.js";
import {
  getDocumentById,
  processAndStorePdf,
} from "../services/pdf.service.js";



export const uploadDocuments = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF file uploaded" });
    }

    const documentId = await processAndStorePdf(req.file);

    res.json({
      documentId,
      message: "PDF uploaded and processed successfully", // Fixed spelling: "processed"
    });
  } catch (error) {
    console.error("Error in uploadDocuments controller:", error);

    // Better error response — helps debugging!
    res.status(500).json({
      message: error.message || "Server Error: Failed to process PDF",
    });
  }
};

export const askQuestions = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId || !question) {
      return res
        .status(400)
        .json({ message: "documentId and question are required" });
    }

    // support async or sync getDocumentById
    const doc = await getDocumentById(documentId);

    if (!doc || !doc.content) {
      return res.status(404).json({ message: "Document not found" });
    }

    const keywords = extractKeyword(question);

    if (keywords.length === 0) {
      return res
        .status(200)
        .json({ answer: "No valid keywords found in your question", matchScore: 0 });
    }

    const { bestMatch, maxScore } = findBestMatch({
      keywords,
      content: doc.content,
    });

    if (maxScore === 0) {
      return res
        .status(200)
        .json({ answer: "No relevant match found in the document", matchScore: 0 });
    }

    return res.json({
      answer: bestMatch,
      matchScore: maxScore,
    });
  } catch (error) {
    console.error("Error in askQuestions controller", error);
    return res.status(500).json({ message: "Server Error" });
  }
};