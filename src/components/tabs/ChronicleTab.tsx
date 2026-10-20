import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { SOCIAL_TIERS } from '../../data/societyData';

export const ChronicleTab: React.FC = () => {
  const { character } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLogs = character.lifeLog.filter((log) => {
    if (selectedCategory === 'all') return true;
    return log.category === selectedCategory;
  });

  const realEstateVal = character.realEstate.reduce((sum, r) => sum + r.currentValue, 0);
  const bizVal = character.businesses.reduce((sum, b) => sum + (b.valuation * (b.sharesOwnedPct / 100)), 0);
  const toysVal = character.luxuryToys.reduce((sum, t) => sum + t.value, 0);
  const totalNetWorth = character.cash + realEstateVal + bizVal + toysVal;

  const achievements = [
    {
      title: 'Higher Education Degree',
      desc: 'Graduated university with recognized degree.',
      completed: character.education.degree !== 'High School Diploma' && character.education.degree !== 'None' && character.education.degree !== 'Infancy' && character.education.degree !== 'Primary School' && character.education.degree !== 'Matric / High School'
    },
    {
      title: 'Executive Leadership',
      desc: 'Reached Rank 4 or 5 in Corporate Ladder.',
      completed: !!character.corporateJob && character.corporateJob.rank >= 4
    },
    {
      title: 'Athletic Gold Champion',
      desc: 'Secured championship title in sports.',
      completed: !!character.sportsCareer && character.sportsCareer.championships > 0
    },
    {
      title: 'Cultural Masterpiece',
      desc: 'Produced masterpiece score >= 88.',
      completed: !!character.artisticCareer && character.artisticCareer.works.some((w) => w.isMasterpiece)
    },
    {
      title: 'Commercial Founder',
      desc: 'Incorporated and scaled enterprise business entity.',
      completed: character.businesses.length > 0
    },
    {
      title: 'Multi-Millionaire Assets',
      desc: 'Exceeded $10,000,000 total net worth.',
      completed: totalNetWorth >= 10000000
    },
    {
      title: 'High Society Strata',
      desc: 'Elevated into High Society or Elite Luminary.',
      completed: character.socialStatus.tier === 'High Society' || character.socialStatus.tier === 'Elite Luminary' || character.socialStatus.tier === 'Global Icon'
    },
    {
      title: 'Global Icon Eminence',
      desc: 'Ascended to Global Icon supreme status.',
      completed: character.socialStatus.tier === 'Global Icon'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Societal Strata Ladder */}
      <div className="card-v4 p-6">
        <span className="meta-label text-[#B8860B] mb-1">Social Hierarchy Strata</span>
        <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C] mb-1">
          National &amp; Global Standing Ladder
        </h3>
        <p className="text-xs text-[#1C1C1C] opacity-75 mb-5">
          Tier progression requires satisfying both cumulative reputation and net worth requirements.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SOCIAL_TIERS.map((tierReq, idx) => {
            const isCurrent = character.socialStatus.tier === tierReq.tier;
            const isPassed = character.socialStatus.reputationScore >= tierReq.minReputation && totalNetWorth >= tierReq.minNetWorth;

            return (
              <div
                key={tierReq.tier}
                className={`p-3.5 rounded-lg border text-left flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-[#1C1C1C] text-white border-black shadow-md ring-2 ring-[#B8860B]'
                    : isPassed
                    ? 'bg-white text-[#1C1C1C] border-black/20'
                    : 'bg-[#DFDBD3]/50 text-[#1C1C1C] opacity-50 border-black/10'
                }`}
              >
                <div>
                  <div className="flex justify-between text-[9px] font-mono mb-1 opacity-70">
                    <span>TIER 0{idx + 1}</span>
                    <span>{isCurrent ? 'ACTIVE' : isPassed ? 'PASSED' : 'LOCKED'}</span>
                  </div>
                  <h5 className="font-grotesk font-bold text-sm leading-tight mb-2">
                    {tierReq.tier}
                  </h5>
                </div>
                <div className="text-[10px] border-t border-current/15 pt-2 space-y-0.5 opacity-80">
                  <p>Min Rep: {tierReq.minReputation}</p>
                  <p>Min Net: ${tierReq.minNetWorth.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lifetime Achievements */}
      <div className="card-v4 p-6">
        <span className="meta-label text-[#B8860B] mb-1">Hall of Accolades</span>
        <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C] mb-4">
          Lifetime Milestones
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.title}
              className={`p-4 rounded-lg border text-left transition-all ${
                ach.completed
                  ? 'bg-white border-[#B8860B]/40 shadow-xs'
                  : 'bg-[#DFDBD3]/40 border-black/10 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-grotesk font-bold text-xs text-[#1C1C1C]">
                  {ach.title}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  ach.completed ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-black/5 text-[#1C1C1C]'
                }`}>
                  {ach.completed ? 'Unlocked' : 'Pending'}
                </span>
              </div>
              <p className="text-[11px] text-[#1C1C1C] opacity-75">
                {ach.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Life Chronicle Log */}
      <div className="card-v4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="meta-label text-[#B8860B]">Archival Records</span>
            <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C]">
              The Life Log ({filteredLogs.length} Events)
            </h3>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'general', 'career', 'relationship', 'achievement', 'finance', 'society'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded cursor-pointer capitalize transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1C1C1C] text-white'
                    : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {filteredLogs.map((entry) => (
            <div
              key={entry.id}
              className="p-3.5 rounded-lg bg-white border border-black/10 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1C1C1C]">Age {entry.age}</span>
                  <span className="text-[10px] opacity-60">Year {entry.year}</span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/5 text-slate-600">
                    {entry.category}
                  </span>
                </div>
                <p className="text-[#1C1C1C] opacity-90 leading-relaxed">
                  {entry.text}
                </p>
              </div>

              {entry.impact === 'positive' && (
                <span className="text-[#2E7D32] text-sm shrink-0 font-bold">▲</span>
              )}
              {entry.impact === 'negative' && (
                <span className="text-rose-600 text-sm shrink-0 font-bold">▼</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
