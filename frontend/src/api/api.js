import axiosInstance from "@/lib/axios";

export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // { documentId: "...", message: "..." }
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to upload PDF. Is the backend running?"
    );
  }
};
  

export const askQuestions = async (documentId, question) => {
  try {
    const response = await axiosInstance.post("/ask", {
      documentId,
      question,
    });
    return response.data;
  } catch (error) {
    console.error("Ask error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to get answer"
    );
  }
};