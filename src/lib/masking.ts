/**
 * PII Masking & Redaction Engine
 * Strictly redacts candidate identity (emails, URLs, phone numbers, exact names)
 * to prevent bias and ensure staffing agency client exclusivity.
 */

export interface MaskedViewData {
  maskedId: string;
  maskedText: string;
  redactedItemCount: number;
}

export function maskCandidatePII(
  rawText: string,
  candidateName: string,
  email: string,
  phone: string
): MaskedViewData {
  let masked = rawText;
  let count = 0;

  // 1. Redact Emails FIRST so name substrings inside emails don't break email detection
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  const emailMatches = masked.match(emailRegex);
  if (emailMatches) {
    count += emailMatches.length;
    masked = masked.replace(emailRegex, "[REDACTED_EMAIL]");
  }

  // 2. Redact Phone numbers (common international and national formats)
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\+?\d{10,13}/g;
  const phoneMatches = masked.match(phoneRegex);
  if (phoneMatches) {
    count += phoneMatches.length;
    masked = masked.replace(phoneRegex, "[REDACTED_PHONE]");
  }

  // 3. Redact LinkedIn / GitHub handles
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?(?:github\.com|linkedin\.com\/in)\/([a-zA-Z0-9_.-]+)/gi;
  masked = masked.replace(urlRegex, (match) => {
    count++;
    return "[REDACTED_PROFILE_URL]";
  });

  // 4. Redact Candidate Exact Full Name and parts
  if (candidateName) {
    const nameParts = candidateName.trim().split(/\s+/);
    for (const part of nameParts) {
      if (part.length > 2) {
        const regex = new RegExp(`\\b${escapeRegExp(part)}\\b`, "gi");
        const matches = masked.match(regex);
        if (matches) {
          count += matches.length;
          masked = masked.replace(regex, "[REDACTED_NAME]");
        }
      }
    }
  }

  return {
    maskedId: `CAND-${generateHash(candidateName + email).slice(0, 4)}`,
    maskedText: masked,
    redactedItemCount: count,
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).toUpperCase();
}
