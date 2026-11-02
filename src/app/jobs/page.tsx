import Link from "next/link";
import { INITIAL_JOBS } from "../../lib/mockData";
import { Briefcase, Plus, ArrowRight, ShieldCheck, Layers } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Job Descriptions & Evaluation Rubrics</h1>
          <p className="text-sm text-slate-500">Configure weighted scorecard criteria and extract candidate requirements.</p>
        </div>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl text-sm transition shadow-sm flex items-center gap-2 self-start sm:self-auto cursor-not-allowed opacity-90"
          title="Demo Mode: Pre-configured rubrics active"
        >
          <Plus className="w-4 h-4" />
          Create New Job Scorecard
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {INITIAL_JOBS.map((job) => (
          <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {job.clientName}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{job.location}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{job.title}</h2>
                <p className="text-xs text-slate-500">Department: {job.department} • Compensation: {job.salaryRange}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition flex items-center gap-1.5"
                >
                  Inspect Scorecard & Candidates <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600" />
                Weighted Scorecard Rubric
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {job.criteria.map((crit) => (
                  <div key={crit.id} className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-900 font-semibold truncate" title={crit.name}>{crit.name}</span>
                      <span className="text-indigo-600 font-bold shrink-0">{crit.weight}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-3xs text-slate-500">
                      <span className={`px-1.5 py-0.5 rounded ${crit.isMustHave ? "bg-rose-50 text-rose-700 font-semibold" : "bg-slate-100 text-slate-600"}`}>
                        {crit.isMustHave ? "Must-Have" : "Preferred"}
                      </span>
                      <span>Category: {crit.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
