import Link from "next/link";
import { INITIAL_JOBS, INITIAL_CANDIDATES } from "../lib/mockData";
import { Briefcase, Users, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, FileCheck } from "lucide-react";

export default function DashboardPage() {
  const totalJobs = INITIAL_JOBS.length;
  const totalCandidates = INITIAL_CANDIDATES.length;
  const avgFitScore = Math.round(
    INITIAL_CANDIDATES.reduce((acc, c) => acc + c.overallScore, 0) / totalCandidates
  );
  const shortlisted = INITIAL_CANDIDATES.filter((c) => c.stage === "SHORTLISTED").length;

  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Zero-Hallucination & Anti-Bias Staffing Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            AI Resume Screening with Grounded Evidence Citations
          </h1>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Deconstruct unformatted Job Descriptions into weighted rubrics, batch screen candidate CVs with cited line proofs, and generate anonymized masked portals for external clients.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              Manage Job Scorecards
            </Link>
            <Link
              href="/portal/share_fintech_2026"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-emerald-300" />
              View Masked Client Shortlist
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Roles</span>
            <Briefcase className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalJobs}</p>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% rubrics configured
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Screened Candidates</span>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalCandidates}</p>
          <p className="text-xs text-slate-500 mt-1">Across active client pipelines</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Average Fit Score</span>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">{avgFitScore}%</p>
          <p className="text-xs text-slate-500 mt-1">Grounded against JD scorecard</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Client Shortlisted</span>
            <FileCheck className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900 mt-2">{shortlisted}</p>
          <p className="text-xs text-indigo-600 font-medium mt-1">Ready for client review</p>
        </div>
      </div>

      {/* Active Pipeline Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Client Roles & Pipelines</h2>
            <p className="text-xs text-slate-500">Select a job posting to inspect candidates, edit rubrics, or share shortlists.</p>
          </div>
          <Link href="/jobs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {INITIAL_JOBS.map((job) => (
            <div key={job.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 text-base">{job.title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                    {job.clientName}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {job.department} • {job.location} • {job.salaryRange}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.criteria.map((c) => (
                    <span
                      key={c.id}
                      className={`text-xs px-2 py-0.5 rounded border ${
                        c.isMustHave
                          ? "bg-rose-50 text-rose-700 border-rose-200 font-medium"
                          : "bg-slate-50 text-slate-600 border-slate-200"
                      }`}
                    >
                      {c.name} ({c.weight}%)
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
                >
                  Scorecard & Candidates
                </Link>
                <Link
                  href="/portal/share_fintech_2026"
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 text-xs font-semibold transition"
                >
                  Client Portal
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
