export type CriterionCategory = 
  | "CORE_SKILLS" 
  | "EXPERIENCE" 
  | "SYSTEMS_DESIGN" 
  | "DEVOPS_TOOLS" 
  | "EDUCATION_CERT";

export interface ScorecardCriterion {
  id: string;
  category: CriterionCategory;
  name: string;
  weight: number; // e.g. 25 (%)
  isMustHave: boolean;
  minYears?: number;
}

export interface JobPosting {
  id: string;
  title: string;
  clientName: string;
  department: string;
  location: string;
  salaryRange: string;
  rawDescription: string;
  criteria: ScorecardCriterion[];
  createdAt: string;
}

export interface CriterionScoreResult {
  criterionId: string;
  criterionName: string;
  score: number; // 0 - 100
  evidenceQuote: string;
  confidence: "HIGH" | "MEDIUM" | "LOW" | "NOT_FOUND";
  reasoning: string;
}

export type PipelineStage = 
  | "INBOX" 
  | "SCREENED" 
  | "SHORTLISTED" 
  | "INTERVIEWING" 
  | "OFFERED" 
  | "REJECTED";

export interface Candidate {
  id: string;
  jobId: string;
  // Raw PII
  name: string;
  email: string;
  phone: string;
  location: string;
  githubUrl?: string;
  linkedinUrl?: string;
  
  // Masked identity for client portal
  maskedId: string; // e.g. CAND-842
  maskedLocation: string; // e.g. "India (Remote)"
  
  // Structured Extracted Data
  headline: string;
  yearsExperience: number;
  skills: string[];
  education: string;
  experienceBullets: string[];
  rawResumeText: string;

  // AI Fit Score
  overallScore: number; // 0 - 100
  criterionScores: CriterionScoreResult[];
  summaryFeedback: string;
  uncertaintyFlags: string[];

  // Hiring Pipeline
  stage: PipelineStage;
  submittedAt: string;
}

export interface ClientFeedback {
  id: string;
  candidateId: string;
  decision: "APPROVED" | "REQUEST_INFO" | "PASS";
  comments: string;
  submittedAt: string;
  reviewerName: string;
}

export interface PortalShare {
  token: string;
  jobId: string;
  clientCompany: string;
  expiresAt: string;
}
