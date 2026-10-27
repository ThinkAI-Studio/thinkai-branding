"use client";

import React from "react";
import { GraduationCap, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { copy } from "@/data/portfolio";
import { LanguageTransition } from "@/components/tai-ui/LanguageTransition";

/**
 * Archived Experience & Education sections from the ThinkAI Studio personal portfolio.
 * Preserved for the future standalone personal portfolio repository.
 */
export function ExperienceEducationLegacy() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="work" className="relative z-20 bg-[#16161a] py-28 sm:py-36 border-t border-white/[0.08] shadow-2xl">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 space-y-24">
        {/* Subsection 1: Real Security Experience at Ung Buou Hospital */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-200">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <LanguageTransition langKey={language} as="span">
                {t.experience.sectionLabel}
              </LanguageTransition>
            </div>
          </div>

          <div className="lg:col-span-10 space-y-12">
            <div className="border-t border-white/[0.08] pt-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <LanguageTransition langKey={language}>
                  <span className="tai-label text-neutral-400 font-mono font-bold text-xs">
                    {t.experience.eyebrow}
                  </span>
                  <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-2">
                    {t.experience.title}
                  </h3>
                </LanguageTransition>
                <LanguageTransition langKey={language} as="div" className="text-xs sm:text-sm font-mono text-neutral-400 shrink-0">
                  {t.experience.period}
                </LanguageTransition>
              </div>

              {/* 3-Pillar Clean Hairline Columns with Scaled Font */}
              <LanguageTransition langKey={language} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs border-y border-white/[0.08] py-8">
                <div>
                  <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                    {t.experience.columns.problemLabel}
                  </span>
                  <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                    {t.experience.columns.problemDesc}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                    {t.experience.columns.approachLabel}
                  </span>
                  <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                    {t.experience.columns.approachDesc}
                  </p>
                </div>
                <div>
                  <span className="text-neutral-400 font-mono text-xs font-bold uppercase tracking-wider block">
                    {t.experience.columns.outcomeLabel}
                  </span>
                  <p className="text-sm sm:text-base text-neutral-200 mt-2.5 leading-relaxed font-light">
                    {t.experience.columns.outcomeDesc}
                  </p>
                </div>
              </LanguageTransition>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {t.experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tai-tag-pill px-3 py-1.5 rounded-[10px] text-xs sm:text-[13px] font-mono cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subsection 2: Education & Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pt-20 border-t border-white/[0.08]">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-200">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <LanguageTransition langKey={language} as="span">
                {t.education.sectionLabel}
              </LanguageTransition>
            </div>
          </div>

          <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education Block */}
            <LanguageTransition langKey={language} className="border-t border-white/[0.08] pt-8 space-y-5">
              <span className="tai-label text-neutral-400 font-mono font-bold text-xs flex items-center gap-2 tracking-widest">
                <GraduationCap className="w-4 h-4 text-neutral-400" /> {t.education.eyebrow}
              </span>
              <div>
                <h4 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-white tracking-tight">
                  {t.education.degree}
                </h4>
                <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1.5">
                  {t.education.school}
                </div>
                <div className="text-sm sm:text-base font-semibold text-white font-mono mt-2.5">
                  {t.education.gpaText}
                </div>
              </div>
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                {t.education.coursework}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {t.education.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tai-tag-pill px-3 py-1 rounded-[10px] text-xs sm:text-[13px] font-mono cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </LanguageTransition>

            {/* Awards & Recognition Block */}
            <LanguageTransition langKey={language} className="border-t border-white/[0.08] pt-8 space-y-5">
              <span className="tai-label text-neutral-400 font-mono font-bold text-xs flex items-center gap-2 tracking-widest">
                <Award className="w-4 h-4 text-neutral-400" /> {t.education.recognitionEyebrow}
              </span>
              <div className="space-y-6">
                {t.education.recognitions.map((rec) => (
                  <div key={rec.title}>
                    <h4 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-white tracking-tight">
                      {rec.title}
                    </h4>
                    <div className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                      {rec.subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {t.education.recognitions.flatMap((r) => r.tags).map((tag) => (
                  <span
                    key={tag}
                    className="tai-tag-pill px-3 py-1 rounded-[10px] text-xs sm:text-[13px] font-mono cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </LanguageTransition>
          </div>
        </div>
      </div>
    </section>
  );
}
