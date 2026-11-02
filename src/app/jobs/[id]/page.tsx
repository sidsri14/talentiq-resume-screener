import Link from "next/link";
import { INITIAL_JOBS, INITIAL_CANDIDATES } from "../../../lib/mockData";
import { ArrowLeft, Users, CheckCircle2, AlertTriangle, FileText, ArrowRight, Share2, Award, Upload } from "lucide-react";
import { notFound } from "next/navigation";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = INITIAL_JOBS.find((j) => j.id === params.id) || INITIAL_JOBS[0];
  const candidates = INITIAL_CANDIDATES.filter((c) => c.jobId === job.id);

  return (
    <div className="space-y-6">
      {/* Back button & Title */}
      <div>
        <Link href="/jobs" className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Jobs
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full border border-indigo-200">
                {job.clientName}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">{job.department} • {job.location} • {job.salaryRange}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/portal/share_fintech_2026"
              className="px-3.5 py-2 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs transition flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-indigo-600" />
              Open Client Shortlist
            </Link>
          </div>
        </div>
      </div>

      {/* Candidate Pipeline Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Screened Candidates ({candidates.length})</h2>
            <p className="text-xs text-slate-500">Ranked deterministically by AI scorecard evidence match.</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-medium px-2.5 py-1 rounded-lg border border-emerald-200">
            Evidence Citations Verified
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 text-xs uppercase font-semibold border-b border-slate-200">
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Fit Score</th>
                <th className="py-3 px-4">Experience & Degree</th>
                <th className="py-3 px-4">Pipeline Stage</th>
                <th className="py-3 px-4">Status / Flags</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {cand.name}
                        <span className="text-3xs bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded">
                          {cand.maskedId}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{cand.headline}</p>
                      <p className="text-3xs text-slate-400 mt-0.5">{cand.email} • {cand.phone}</p>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                          cand.overallScore >= 85
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : cand.overallScore >= 65
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                        }`}
                      >
                        {cand.overallScore}%
                      </div>
                      <div className="text-3xs text-slate-500">
                        {cand.overallScore >= 85 ? "Strong Fit" : "Moderate Fit"}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-xs text-slate-600">
                    <p className="font-semibold text-slate-800">{cand.yearsExperience} Years Exp</p>
                    <p className="text-3xs text-slate-500 truncate max-w-xs">{cand.education}</p>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {cand.stage}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    {cand.uncertaintyFlags.length === 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Clean Citation
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-amber-700 font-medium" title={cand.uncertaintyFlags.join(", ")}>
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> {cand.uncertaintyFlags.length} Flag
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/jobs/${job.id}/candidates/${cand.id}`}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition inline-flex items-center gap-1 shadow-2xs"
                    >
                      Inspect Evidence Dossier <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
