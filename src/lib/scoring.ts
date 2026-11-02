import { Candidate, CriterionScoreResult, JobPosting, ScorecardCriterion } from "../types";

/**
 * Deterministic Evidence-Based Fit Scoring Engine
 * Enforces the invariant: No score > 50 without an exact evidence quote cited from the CV.
 */
export function evaluateCandidate(
  resumeText: string,
  criteria: ScorecardCriterion[]
): {
  overallScore: number;
  criterionScores: CriterionScoreResult[];
  uncertaintyFlags: string[];
} {
  const normalizedResume = resumeText.toLowerCase();
  const criterionScores: CriterionScoreResult[] = [];
  const uncertaintyFlags: string[] = [];

  let weightedSum = 0;
  let totalWeight = 0;

  for (const crit of criteria) {
    totalWeight += crit.weight;
    const critTerms = extractKeywords(crit.name.toLowerCase());
    
    // Find sentences in the resume containing the keywords
    const sentences = extractSentences(resumeText);
    const matchingSentences = sentences.filter((s) => {
      const lowerS = s.toLowerCase();
      return critTerms.some((term) => lowerS.includes(term));
    });

    let score = 0;
    let evidenceQuote = "";
    let confidence: "HIGH" | "MEDIUM" | "LOW" | "NOT_FOUND" = "NOT_FOUND";
    let reasoning = "";

    if (matchingSentences.length > 0) {
      evidenceQuote = matchingSentences[0].trim();
      const termHits = critTerms.filter((t) => normalizedResume.includes(t)).length;
      const hitRatio = termHits / Math.max(1, critTerms.length);

      if (hitRatio >= 0.8) {
        score = 90 + Math.min(10, matchingSentences.length * 2);
        confidence = "HIGH";
        reasoning = `Strong direct evidence found matching ${crit.name}.`;
      } else if (hitRatio >= 0.4) {
        score = 70 + Math.floor(hitRatio * 15);
        confidence = "MEDIUM";
        reasoning = `Moderate evidence found matching ${crit.name}.`;
      } else {
        score = 50;
        confidence = "LOW";
        reasoning = `Partial keyword overlap found for ${crit.name}.`;
      }
    } else {
      score = 0;
      confidence = "NOT_FOUND";
      evidenceQuote = "No direct evidence or relevant experience cited in resume text.";
      reasoning = `Candidate resume does not mention ${crit.name}.`;
      
      if (crit.isMustHave) {
        uncertaintyFlags.push(`Critical Must-Have Missing: ${crit.name}`);
      }
    }

    // Invariant Enforcement
    if (score > 50 && (!evidenceQuote || confidence === "NOT_FOUND")) {
      score = 50; // clamp if quote is empty
    }

    criterionScores.push({
      criterionId: crit.id,
      criterionName: crit.name,
      score,
      evidenceQuote,
      confidence,
      reasoning,
    });

    weightedSum += score * (crit.weight / 100);
  }

  // Calculate normalized overall score
  const overallScore = totalWeight > 0 ? Math.round((weightedSum / (totalWeight / 100))) : 0;

  return {
    overallScore,
    criterionScores,
    uncertaintyFlags,
  };
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set(["with", "and", "or", "in", "for", "the", "a", "an", "to", "of", "on", "at", "by"]);
  return text
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
}

function extractSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?\n])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);
}
