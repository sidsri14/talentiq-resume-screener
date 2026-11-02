import "./globals.css";
import React from "react";
import Link from "next/link";
import { Briefcase, Users, ShieldCheck, FileText, LayoutDashboard, Share2 } from "lucide-react";

export const metadata = {
  title: "TalentIQ AI — Staffing Resume Screening & Shortlist Portal",
  description: "Evidence-based AI resume screening, JD scorecard extraction, and masked client portal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100">
                TQ
              </div>
              <div>
                <Link href="/" className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-2">
                  TalentIQ <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">Staffing OS</span>
                </Link>
                <p className="text-xs text-slate-500">Evidence-Cited Screening & Client Shortlists</p>
              </div>
            </div>

            <nav className="flex items-center gap-1 text-sm font-medium">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/jobs"
                className="px-3 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition flex items-center gap-1.5"
              >
                <Briefcase className="w-4 h-4" />
                Jobs & Scorecards
              </Link>
              <Link
                href="/portal/share_fintech_2026"
                className="px-3 py-2 rounded-lg text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition flex items-center gap-1.5 font-semibold"
              >
                <Share2 className="w-4 h-4 text-indigo-600" />
                Live Client Portal Demo
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <p>© 2026 TalentIQ AI — Built for Isocode Labs Software Engineering Assessment by Siddharth Srivastava.</p>
        </footer>
      </body>
    </html>
  );
}
