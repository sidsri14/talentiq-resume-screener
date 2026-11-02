"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_JOBS, INITIAL_CANDIDATES, INITIAL_SHARES } from "../../../lib/mockData";
import { ShieldCheck, CheckCircle2, XCircle, HelpCircle, Eye, EyeOff, UserCheck, Share2, Sparkles } from "lucide-react";

export default function ClientPortalPage({ params }: { params: { token: string } }) {
  const share = INITIAL_SHARES.find((s) => s.token === params.token) || INITIAL_SHARES[0];
  const job = INITIAL_JOBS.find((j) => j.id === share.jobId) || INITIAL_JOBS[0];
  const candidates = INITIAL_CANDIDATES.filter((c) => c.jobId === job.id);

  const [decisions, setDecisions] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<string>(candidates[0].id);

  const handleDecision = (candidateId: string, decision: "APPROVED" | "REQUEST_INFO" | "PASS") => {
    setDecisions((prev) => ({ ...prev, [candidateId]: decision }));
  };

  const selectedCandidate = candidates.find((c) => c.id === activeTab) || candidates[0];

  return (
    <div className="space-y-6">
      {/* Client Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Confidential Client Shortlist
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">PII Contact Redaction Active</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">{job.title}</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Prepared exclusively for <strong className="text-slate-800">{share.clientCompany}</strong> by Staffing Agency Partner
          </p>
        </div>

        <div className="text-right bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
          <p className="text-2xs font-bold uppercase text-slate-400">Shortlisted Candidates</p>
          <p className="text-xl font-extrabold text-indigo-600">{candidates.length} Profiles Ready</p>
        </div>
      </div>

      {/* Main Grid: Shortlist Cards on Left, Detailed Masked Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Candidate Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Candidate Shortlist</h2>
          {candidates.map((cand) => {
            const decision = decisions[cand.id];
            const isSelected = cand.id === activeTab;

            return (
              <div
                key={cand.id}
                onClick={() => setActiveTab(cand.id)}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? "bg-white border-indigo-600 shadow-md ring-2 ring-indigo-600/10"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      {cand.maskedId}
                    </h3>
                    <p className="text-3xs text-slate-500">{cand.maskedLocation}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-lg font-extrabold ${
                    cand.overallScore >= 85 ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {cand.overallScore}% Fit
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">{cand.headline}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs">
                  <span className="text-slate-400">{cand.yearsExperience} yrs experience</span>
                  {decision ? (
                    <span className={`font-bold px-2 py-0.5 rounded text-3xs ${
                      decision === "APPROVED" ? "bg-emerald-100 text-emerald-800" :
                      decision === "REQUEST_INFO" ? "bg-amber-100 text-amber-800" :
                      "bg-rose-100 text-rose-800"
                    }`}>
                      {decision}
                    </span>
                  ) : (
                    <span className="text-indigo-600 font-semibold">Review Pending</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Masked Dossier & Decision Controls (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{selectedCandidate.maskedId}</h2>
                <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium">
                  {selectedCandidate.maskedLocation}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{selectedCandidate.headline}</p>
            </div>

            {/* Client Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleDecision(selectedCandidate.id, "APPROVED")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  decisions[selectedCandidate.id] === "APPROVED"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve Interview
              </button>
              <button
                onClick={() => handleDecision(selectedCandidate.id, "REQUEST_INFO")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  decisions[selectedCandidate.id] === "REQUEST_INFO"
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Request Info
              </button>
              <button
                onClick={() => handleDecision(selectedCandidate.id, "PASS")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  decisions[selectedCandidate.id] === "PASS"
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                Pass
              </button>
            </div>
          </div>

          {/* Privacy Notice Banner */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <EyeOff className="w-4 h-4 text-slate-400" />
              Contact details (email, phone, exact address) are withheld until an interview is confirmed.
            </span>
            <span className="text-3xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
              Token: {share.token}
            </span>
          </div>

          {/* Scorecard Evidence Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Scorecard Evaluation & Evidence Lines
            </h3>
            <div className="space-y-3">
              {selectedCandidate.criterionScores.map((score, index) => (
                <div key={score.criterionId} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{score.criterionName}</span>
                    <span className="text-indigo-600 font-extrabold">{score.score}%</span>
                  </div>
                  <p className="text-2xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200 font-mono">
                    "{score.evidenceQuote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
