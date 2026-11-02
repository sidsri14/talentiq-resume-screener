import { Candidate, JobPosting, PortalShare } from "../types";

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: "job-fintech-01",
    title: "Senior Full-Stack TypeScript Engineer",
    clientName: "Apex FinTech Capital",
    department: "Core Trading Platforms",
    location: "Remote (India / APAC)",
    salaryRange: "₹28,00,000 - ₹38,00,000 INR",
    rawDescription: "Apex FinTech is hiring a Senior Full-Stack Engineer to lead development of our institutional trading gateway. Required: TypeScript, React, Node.js, PostgreSQL, Distributed Systems, WebSockets, high test rigor.",
    criteria: [
      { id: "c1", category: "CORE_SKILLS", name: "TypeScript & Node.js backend development", weight: 30, isMustHave: true, minYears: 3 },
      { id: "c2", category: "CORE_SKILLS", name: "React and modern frontend state architectures", weight: 20, isMustHave: true, minYears: 2 },
      { id: "c3", category: "SYSTEMS_DESIGN", name: "Distributed systems, RPC multiplexing & circuit breaking", weight: 25, isMustHave: false },
      { id: "c4", category: "DEVOPS_TOOLS", name: "PostgreSQL database design & query optimization", weight: 15, isMustHave: true },
      { id: "c5", category: "EDUCATION_CERT", name: "Automated test suites (Vitest/Jest) & CI/CD workflows", weight: 10, isMustHave: false },
    ],
    createdAt: "2026-10-25T10:00:00Z",
  },
  {
    id: "job-infra-02",
    title: "Distributed Systems & RPC Infrastructure Engineer",
    clientName: "Nexus Cloud Systems",
    department: "Platform Engineering",
    location: "Remote (Global)",
    salaryRange: "$90,000 - $130,000 USD",
    rawDescription: "Nexus Cloud is seeking a Systems Engineer to scale our multi-region reverse-proxy infrastructure. Must have deep Rust or Go experience, Prometheus observability, low-latency network socket tuning.",
    criteria: [
      { id: "c21", category: "CORE_SKILLS", name: "Rust or Go high-concurrency systems programming", weight: 35, isMustHave: true },
      { id: "c22", category: "SYSTEMS_DESIGN", name: "Health-checking reverse proxies and load balancers", weight: 30, isMustHave: true },
      { id: "c23", category: "DEVOPS_TOOLS", name: "Prometheus metrics & OpenTelemetry exporters", weight: 20, isMustHave: false },
      { id: "c24", category: "EDUCATION_CERT", name: "Docker and container networking", weight: 15, isMustHave: false },
    ],
    createdAt: "2026-10-28T14:30:00Z",
  },
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand-siddharth",
    jobId: "job-fintech-01",
    name: "Siddharth Srivastava",
    email: "sidsri1502@gmail.com",
    phone: "+919219022881",
    location: "Jaipur, Rajasthan, India",
    githubUrl: "https://github.com/sidsri14",
    linkedinUrl: "https://linkedin.com/in/sidsri14",
    maskedId: "CAND-9142",
    maskedLocation: "India (Remote)",
    headline: "High-Performance Systems & Full-Stack Developer | 20 Merged Upstream PRs",
    yearsExperience: 3,
    skills: ["TypeScript", "Node.js", "React", "Rust", "PostgreSQL", "Vitest", "WebSockets", "Docker"],
    education: "Bachelor of Computer Applications (BCA) - Manipal University Jaipur (2024-2027)",
    experienceBullets: [
      "Architected PortalShield RPC: Rust load-balancer and circuit breaker with Prometheus metrics (32/32 tests passing).",
      "Built ForgeMesh: Self-healing DAG execution planner in TypeScript with deterministic rollback (11/11 tests).",
      "Shipped NebiusGuard: Real-time LLM token factory streaming security gateway with 29/29 passing tests.",
      "Authored 20 merged upstream pull requests across Rust, TypeScript, and Python open-source repos.",
    ],
    rawResumeText: `Siddharth Srivastava - sidsri1502@gmail.com - +919219022881 - Jaipur, India.
Bachelor of Computer Applications (BCA) at Manipal University Jaipur (2024-2027).
Open Source Systems Developer with 20 merged upstream PRs.
TypeScript & Node.js backend development: Built ForgeMesh, a self-healing DAG execution engine with topological cycle detection and deterministic rollback in strict TypeScript with 11/11 automated tests.
React and modern frontend state architectures: Developed responsive operational dashboards and reactive analytics interfaces using React and modern component libraries.
Distributed systems, RPC multiplexing & circuit breaking: Architected PortalShield RPC in Rust featuring multi-upstream load balancing, health-check failovers, and Prometheus metrics telemetry with 32/32 tests passing.
PostgreSQL database design & query optimization: Implemented relational schemas, atomic migrations, and indexed foreign-key query optimizers across microservices.
Automated test suites (Vitest/Jest) & CI/CD workflows: Wrote 115+ automated integration and unit tests across active production systems with automated GitHub Actions CI pipelines.`,
    overallScore: 94,
    criterionScores: [
      {
        criterionId: "c1",
        criterionName: "TypeScript & Node.js backend development",
        score: 95,
        evidenceQuote: "Built ForgeMesh, a self-healing DAG execution engine with topological cycle detection and deterministic rollback in strict TypeScript with 11/11 automated tests.",
        confidence: "HIGH",
        reasoning: "Extensive production TypeScript evidence with 11 passing tests and DAG architecture.",
      },
      {
        criterionId: "c2",
        criterionName: "React and modern frontend state architectures",
        score: 88,
        evidenceQuote: "Developed responsive operational dashboards and reactive analytics interfaces using React and modern component libraries.",
        confidence: "HIGH",
        reasoning: "Direct React production experience demonstrated.",
      },
      {
        criterionId: "c3",
        criterionName: "Distributed systems, RPC multiplexing & circuit breaking",
        score: 98,
        evidenceQuote: "Architected PortalShield RPC in Rust featuring multi-upstream load balancing, health-check failovers, and Prometheus metrics telemetry with 32/32 tests passing.",
        confidence: "HIGH",
        reasoning: "Exceptional distributed systems match with 32/32 passing tests.",
      },
      {
        criterionId: "c4",
        criterionName: "PostgreSQL database design & query optimization",
        score: 90,
        evidenceQuote: "Implemented relational schemas, atomic migrations, and indexed foreign-key query optimizers across microservices.",
        confidence: "HIGH",
        reasoning: "Solid relational database and migration design verified.",
      },
      {
        criterionId: "c5",
        criterionName: "Automated test suites (Vitest/Jest) & CI/CD workflows",
        score: 96,
        evidenceQuote: "Wrote 115+ automated integration and unit tests across active production systems with automated GitHub Actions CI pipelines.",
        confidence: "HIGH",
        reasoning: "Quantitative evidence: 115+ tests and automated CI workflows.",
      },
    ],
    summaryFeedback: "Outstanding technical match. Strongest candidate in RPC load balancing, strict TypeScript, and test automation.",
    uncertaintyFlags: [],
    stage: "SHORTLISTED",
    submittedAt: "2026-10-31T14:00:00Z",
  },
  {
    id: "cand-aravind",
    jobId: "job-fintech-01",
    name: "Aravind Patel",
    email: "aravind.patel88@gmail.com",
    phone: "+919820112233",
    location: "Bengaluru, Karnataka, India",
    maskedId: "CAND-3112",
    maskedLocation: "India (Remote)",
    headline: "Frontend-Leaning Full Stack Developer | 4 Years React & Redux",
    yearsExperience: 4,
    skills: ["React", "JavaScript", "HTML/CSS", "Redux", "Basic Node.js"],
    education: "B.Tech Computer Science, PES University (2020-2024)",
    experienceBullets: [
      "Built enterprise dashboards using React 18, Next.js, and Redux Toolkit.",
      "Consolidated REST API endpoints with Express.js.",
    ],
    rawResumeText: `Aravind Patel - aravind.patel88@gmail.com - Bengaluru, India.
4 years of frontend engineering experience. React and modern frontend state architectures: Built high-traffic web apps using Next.js and Redux.
Basic Node.js API development.`,
    overallScore: 68,
    criterionScores: [
      {
        criterionId: "c1",
        criterionName: "TypeScript & Node.js backend development",
        score: 65,
        evidenceQuote: "Basic Node.js API development.",
        confidence: "LOW",
        reasoning: "Limited backend evidence; primarily uses plain JavaScript.",
      },
      {
        criterionId: "c2",
        criterionName: "React and modern frontend state architectures",
        score: 92,
        evidenceQuote: "Built high-traffic web apps using Next.js and Redux.",
        confidence: "HIGH",
        reasoning: "Strong React frontend background.",
      },
      {
        criterionId: "c3",
        criterionName: "Distributed systems, RPC multiplexing & circuit breaking",
        score: 20,
        evidenceQuote: "No direct evidence or relevant experience cited in resume text.",
        confidence: "NOT_FOUND",
        reasoning: "No distributed systems or RPC experience.",
      },
      {
        criterionId: "c4",
        criterionName: "PostgreSQL database design & query optimization",
        score: 55,
        evidenceQuote: "Basic relational queries in PostgreSQL.",
        confidence: "LOW",
        reasoning: "Basic queries only.",
      },
      {
        criterionId: "c5",
        criterionName: "Automated test suites (Vitest/Jest) & CI/CD workflows",
        score: 60,
        evidenceQuote: "Wrote unit tests with Jest.",
        confidence: "MEDIUM",
        reasoning: "Some Jest testing experience.",
      },
    ],
    summaryFeedback: "Strong React frontend specialist, but light on distributed systems and high-throughput backend architecture.",
    uncertaintyFlags: ["Missing Core Competency: Distributed Systems & RPC"],
    stage: "SCREENED",
    submittedAt: "2026-10-30T11:20:00Z",
  },
];

export const INITIAL_SHARES: PortalShare[] = [
  {
    token: "share_fintech_2026",
    jobId: "job-fintech-01",
    clientCompany: "Apex FinTech Capital",
    expiresAt: "2026-11-30T23:59:59Z",
  },
];
