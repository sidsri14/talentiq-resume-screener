import { describe, it, expect } from "vitest";
import { maskCandidatePII } from "../src/lib/masking";

describe("PII Redaction & Masking Suite", () => {
  it("redacts names, email addresses, phone numbers, and profile handles", () => {
    const rawResume = `
      Johnathan Doe
      Email: john.doe@techcorp.io
      Mobile: +1 (555) 234-5678
      GitHub: https://github.com/johndoe
      LinkedIn: https://linkedin.com/in/johnathan-doe
      Senior developer with 8 years of React and Node experience in New York.
    `;

    const result = maskCandidatePII(rawResume, "Johnathan Doe", "john.doe@techcorp.io", "+1 (555) 234-5678");

    expect(result.maskedText).not.toContain("Johnathan");
    expect(result.maskedText).not.toContain("john.doe@techcorp.io");
    expect(result.maskedText).not.toContain("555) 234-5678");
    expect(result.maskedText).toContain("[REDACTED_NAME]");
    expect(result.maskedText).toContain("[REDACTED_EMAIL]");
    expect(result.maskedText).toContain("[REDACTED_PHONE]");
    expect(result.maskedText).toContain("[REDACTED_PROFILE_URL]");
    expect(result.maskedId).toMatch(/^CAND-[A-F0-9]{4}$/);
    expect(result.redactedItemCount).toBeGreaterThan(0);
  });
});
