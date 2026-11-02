import Link from "next/link";
import { INITIAL_JOBS, INITIAL_CANDIDATES } from "../../../../../lib/mockData";
import { ArrowLeft, CheckCircle2, AlertCircle, Quote, ShieldCheck, Award, FileText, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

export default function CandidateDetailPage({
  params,
}: {
  params: { id: string; cid: string };
}) {
  const job = INITIAL_JOBS.find((j) => j.id === params.id) || INITIAL_JOBS[0];
  const candidate = INITIAL_CANDIDATES.find((c) => c.id === params.cid) || INITIAL_CANDIDATES[0];

  return (
    <div className="space-y-6">
      {/* Header & Navigation */}
      <div>
        <Link
          href={`/jobs/${job.id}`}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Candidate Pipeline
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{candidate.name}</h1>
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                {candidate.maskedId}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {candidate.stage}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{candidate.headline}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {candidate.email} • {candidate.phone} • {candidate.location}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Fit Score</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-indigo-600">{candidate.overallScore}%</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-slate-700">Role: {job.title}</p>
              <p className="text-slate-500">Client: {job.clientName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Split-Screen: Source CV on Left, Evidence Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Raw Resume & Parsed Details (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Parsed Resume Artifact
            </h2>
            <span className="text-xs text-slate-400">{candidate.yearsExperience} Years Experience</span>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400">Education</h3>
            <p className="text-sm font-medium text-slate-800 mt-1">{candidate.education}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400">Extracted Skills</h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {candidate.skills.map((skill) => (
                <span key={skill} className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400">Key Project & Production Evidence</h3>
            <ul className="mt-2 space-y-2 text-xs text-slate-600">
              {candidate.experienceBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Raw Text Transcript</h3>
            <pre className="text-3xs text-slate-500 bg-slate-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono border border-slate-100 max-h-64">
              {candidate.rawResumeText}
            </pre>
          </div>
        </div>

        {/* Right Column: AI Scorecard & Evidence Lines (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Evidence-Cited Evaluation Rubric
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Every score &gt; 50% is tied to an explicit quote in the resume.</p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold border border-indigo-200">
              Deterministic Invariants
            </span>
          </div>

          <div className="space-y-4">
            {candidate.criterionScores.map((score, index) => (
              <div
                key={score.criterionId}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 hover:border-indigo-200 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-3xs font-semibold text-slate-400 uppercase tracking-wider">Criterion {index + 1}</span>
                    <h3 className="font-bold text-slate-900 text-sm">{score.criterionName}</h3>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                      score.confidence === "HIGH" ? "bg-emerald-100 text-emerald-800" :
                      score.confidence === "MEDIUM" ? "bg-amber-100 text-amber-800" :
                      "bg-rose-100 text-rose-800"
                    }`}>
                      {score.confidence}
                    </span>
                    <span className="text-base font-extrabold text-indigo-600">{score.score}%</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-3xs font-bold uppercase text-indigo-600">
                    <Quote className="w-3 h-3" /> Cited Evidence Quote
                  </div>
                  <p className="text-slate-800 italic font-mono text-2xs leading-relaxed">
                    "{score.evidenceQuote}"
                  </p>
                </div>

                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Reasoning:</span> {score.reasoning}
                </p>
              </div>
            ))}
          </div>

          {candidate.uncertaintyFlags.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs space-y-1">
              <h4 className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Uncertainty & Risk Flags Detected
              </h4>
              <ul className="list-disc list-inside space-y-0.5 text-amber-700">
                {candidate.uncertaintyFlags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
