import { describe, it, expect } from "vitest";
import { evaluateCandidate } from "../src/lib/scoring";
import { ScorecardCriterion } from "../src/types";

describe("Candidate Scoring & Evidence Invariant Suite", () => {
  const criteria: ScorecardCriterion[] = [
    {
      id: "crit-1",
      category: "CORE_SKILLS",
      name: "TypeScript and Node.js microservices",
      weight: 50,
      isMustHave: true,
    },
    {
      id: "crit-2",
      category: "SYSTEMS_DESIGN",
      name: "Rust load balancing and RPC multiplexing",
      weight: 50,
      isMustHave: false,
    },
  ];

  it("assigns high score (>85) and high confidence when direct matching sentences exist", () => {
    const resume = "Built high-throughput TypeScript and Node.js microservices handling 20k req/sec. Architected Rust load balancing and RPC multiplexing gateways.";
    const result = evaluateCandidate(resume, criteria);

    expect(result.overallScore).toBeGreaterThanOrEqual(90);
    expect(result.criterionScores).toHaveLength(2);
    expect(result.criterionScores[0].confidence).toBe("HIGH");
    expect(result.criterionScores[0].evidenceQuote).toContain("TypeScript and Node.js microservices");
    expect(result.criterionScores[1].confidence).toBe("HIGH");
    expect(result.criterionScores[1].evidenceQuote).toContain("Rust load balancing");
  });

  it("strictly enforces invariant: score is 0 and NOT_FOUND when candidate has no evidence", () => {
    const resume = "Experienced in WordPress, PHP, and basic CSS design. Managed content marketing campaigns.";
    const result = evaluateCandidate(resume, criteria);

    expect(result.overallScore).toBe(0);
    expect(result.criterionScores[0].score).toBe(0);
    expect(result.criterionScores[0].confidence).toBe("NOT_FOUND");
    expect(result.criterionScores[0].evidenceQuote).toContain("No direct evidence");
    expect(result.uncertaintyFlags).toContain("Critical Must-Have Missing: TypeScript and Node.js microservices");
  });

  it("strictly caps score at 50 if evidence quote is missing or invalid", () => {
    const resume = "Partial overlap with some general software systems concepts.";
    const result = evaluateCandidate(resume, criteria);

    for (const score of result.criterionScores) {
      if (score.confidence === "NOT_FOUND") {
        expect(score.score).toBeLessThanOrEqual(50);
      }
    }
  });
});
