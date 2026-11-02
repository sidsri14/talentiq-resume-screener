# Deployment and Local Run Guide

## Project: TalentIQ AI — Resume Screening & Client Shortlist Portal
**Candidate**: Siddharth Srivastava  
**Target Role**: Software Engineering Intern — Isocode Labs  
**Repository**: `https://github.com/sidsri14/talentiq-resume-screener`

---

## 1. Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18.x, v20.x, or v22.x+ (Tested on Node v24.19.0)
- **npm**: v9.x+ or **pnpm** / **yarn**

### Step-by-Step Run Instructions
```bash
# 1. Clone repository
git clone https://github.com/sidsri14/talentiq-resume-screener.git
cd talentiq-resume-screener

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment variables
cp .env.example .env.local

# 4. Run automated test suites
npm test

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Reviewer Demo Credentials & Pre-Seeded Workspaces

The application automatically seeds realistic staffing agency data on initial boot so reviewers do not need to upload files or configure external API keys:

- **Recruiter Admin View**: [http://localhost:3000/jobs](http://localhost:3000/jobs)
  - Pre-seeded with 3 industry Job Descriptions:
    1. *Senior Full-Stack TypeScript Engineer* (FinTech client)
    2. *Distributed Systems Infrastructure Engineer* (Cloud infra client)
    3. *AI Product Specialist* (Enterprise SaaS client)
  - 12 pre-screened candidate resumes with parsed skills, evidence citations, and scorecards.

- **Client Shortlist View (Masked PII)**: [http://localhost:3000/portal/share_fintech_2026](http://localhost:3000/portal/share_fintech_2026)
  - Pre-generated shareable client portal with candidate names, emails, and phone numbers redacted.
  - Reviewer can test one-click candidate approvals, interview requests, and feedback logging.

---

## 3. Production Deployment Guide (Vercel / Node.js)

### Deploying to Vercel
1. Push the repository to GitHub.
2. Import the project in Vercel:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
3. Add environment variables (listed below).
4. Click **Deploy**.

---

## 4. Environment Variables Reference

Create a `.env.local` file with the following keys (all external keys are optional; the app functions 100% offline using deterministic heuristics if API keys are omitted):

```env
# Server Port & Base URL
PORT=3000
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional External LLM Integration (for real-time LLM parsing)
# If omitted, built-in deterministic heuristic evaluation engine is active
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GEMINI_API_KEY=""

# Optional Analytics / Storage
DATABASE_URL="file:./dev.db"
SESSION_SECRET="talentiq-dev-secret-key-32chars"
```
