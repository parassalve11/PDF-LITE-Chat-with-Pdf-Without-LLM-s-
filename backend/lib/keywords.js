import winkNLP from "wink-nlp";
import model from "wink-eng-lite-web-model";

const nlp = winkNLP(model);
const its = nlp.its;

/**
 * Extract meaningful keywords from a question using wink-nlp.
 * - Tokenization
 * - Stopword removal (professional)
 * - Normalization
 * - Length filtering
 */
export function extractKeyword(question = "") {
  if (!question || typeof question !== "string") return [];

  return nlp
    .readDoc(question)
    .tokens()
    .filter(
      (t) =>
        !t.out(its.stopWordFlag) && // remove stopwords
        t.out(its.type) === "word" && // only words
        t.out(its.normal).length > 2
    )
    .out(its.normal); // normalized (lowercase, clean)
}

/**
 * Find the best matching sentence in content for the provided keywords.
 * Returns { bestMatch, maxScore }
 */
export function findBestMatch({ keywords = [], content = "" }) {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    return { bestMatch: "", maxScore: 0 };
  }

  const sentences = String(content)
    .split(/[.?!]\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  let maxScore = 0;
  let bestMatch = "";

  sentences.forEach((sentence) => {
    const sentenceDoc = nlp.readDoc(sentence);
    const sentenceWords = sentenceDoc
      .tokens()
      .filter((t) => t.out(its.type) === "word")
      .out(its.normal);

    const matchCount = keywords.reduce(
      (acc, kw) => acc + (sentenceWords.includes(kw) ? 1 : 0),
      0
    );

    const score = matchCount / keywords.length;

    if (score > maxScore) {
      maxScore = score;
      bestMatch = sentence;
    }
  });

  return { bestMatch, maxScore };
}
