# TalentIQ AI — Evidence-Based Resume Screening & Client Shortlist Portal

[![Tests](https://img.shields.io/badge/tests-4%20passed-emerald)](https://github.com/sidsri14/talentiq-resume-screener)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict%20100%25-blue)](https://github.com/sidsri14/talentiq-resume-screener)
[![Next.js](https://img.shields.io/badge/Next.js-14.2%20App%20Router-black)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Submission for Isocode Labs — Software Engineering Intern Assessment**  
> **Candidate**: Siddharth Srivastava ([@sidsri14](https://github.com/sidsri14))  
> **Client Brief #2**: Staffing firm's AI resume screening tool and client shortlist portal  
> **Submission Deadline**: November 9, 2026, 11:59 PM IST  

---

## 1. Key Highlights & Architectural Invariants

1. **Deterministic Evidence Citation Invariant**:  
   No candidate can be assigned a fit score $>50\%$ on any scorecard criterion without citing an exact, verifiable evidence quote from their CV text.
2. **Client-Facing PII Redaction & Anti-Bias Shield**:  
   Client firms view anonymized candidate dossiers where names, contact emails, phone numbers, and street addresses are cryptographically hashed or redacted into `CAND-XXXX` handles.
3. **Pluggable Evaluation Pipeline**:  
   Features a dual-engine architecture: an offline algorithmic keyword/tenure vector analyzer (100% deterministic, zero external API keys needed) and an optional LLM gateway.
4. **Zero-Setup Reviewer Experience**:  
   Pre-seeded with 3 realistic Job Descriptions and 12 candidate resumes across FinTech, Cloud Infrastructure, and AI Engineering roles.

---

## 2. Quick Start

```bash
# Clone repository
git clone https://github.com/sidsri14/talentiq-resume-screener.git
cd talentiq-resume-screener

# Install dependencies
npm install

# Run automated test suites (4/4 passing in <100ms)
npm test

# Run strict TypeScript typecheck (0 compiler errors)
npm run typecheck

# Start local web server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the recruiter dashboard and [http://localhost:3000/portal/share_fintech_2026](http://localhost:3000/portal/share_fintech_2026) for the masked client portal.

---

## 3. Documentation

- [Technical Design Document (TDD)](./TECHNICAL_DESIGN_DOCUMENT.md): Comprehensive system architecture, ER diagrams, tradeoffs, and roadmap.
- [Deployment Guide](./deployment.md): Step-by-step local execution and Vercel cloud deployment.
