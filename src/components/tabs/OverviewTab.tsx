import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { AVAILABLE_DEGREES } from '../../data/careerData';
import { CharacterAvatar, getLifeStageLabel } from '../CharacterAvatar';
import { RelocationModal } from '../RelocationModal';
import { Plane, Compass } from 'lucide-react';

export const OverviewTab: React.FC = () => {
  const { character, quickRoutine, enrollDegree } = useGame();
  const [routineFeedback, setRoutineFeedback] = useState<string | null>(null);
  const [eduFeedback, setEduFeedback] = useState<string | null>(null);
  const [isRelocateOpen, setIsRelocateOpen] = useState<boolean>(false);

  const handleRoutine = (type: 'gym' | 'meditate' | 'nightclub' | 'study' | 'spa') => {
    const res = quickRoutine(type);
    setRoutineFeedback(res.message);
    setTimeout(() => setRoutineFeedback(null), 4500);
  };

  const handleEnroll = (degName: string) => {
    const res = enrollDegree(degName);
    setEduFeedback(res.message);
    setTimeout(() => setEduFeedback(null), 4500);
  };

  const vocationLabel = character.corporateJob
    ? `${character.corporateJob.title} ($${character.corporateJob.salary.toLocaleString()}/yr)`
    : character.sportsCareer
    ? `${character.sportsCareer.sport} [${character.sportsCareer.division}]`
    : character.artisticCareer
    ? `Artist [${character.artisticCareer.medium}]`
    : character.age < 6
    ? 'Infant & Toddler'
    : character.age < 18
    ? 'School Student'
    : 'Independent / Unemployed';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Split: Character Portrait + Status Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* Animated Cartoon Portrait Card */}
        <div className="card-v4 p-5 flex flex-col items-center justify-center shrink-0 text-center">
          <CharacterAvatar
            name={character.name}
            age={character.age}
            gender={character.gender}
            size="hero"
            animated={true}
            happiness={character.stats.happiness}
          />
          <div className="mt-3 w-full">
            <h2 className="font-grotesk font-bold text-lg text-[#1C1C1C] truncate">
              {character.name}
            </h2>
            <div className="meta-label text-[#B8860B] mt-0.5">
              {getLifeStageLabel(character.age)} · Age {character.age}
            </div>
            <p className="text-[11px] text-[#1C1C1C] opacity-70 mt-1">
              {character.gender} · {character.city}, Pakistan
            </p>
          </div>
        </div>

        {/* Status Summary Card */}
        <div className="card-v4 p-6 flex flex-col justify-between">
          <div>
            <span className="meta-label text-[#B8860B] mb-1">Status Summary</span>
            <h3 className="font-grotesk text-3xl font-bold text-[#1C1C1C] mb-2">
              {character.socialStatus.tier}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
              <p className="opacity-80"><strong>Current Year:</strong> <span className="font-mono font-bold text-[#B8860B]">{character.currentYear}</span></p>
              <p className="opacity-80"><strong>Trait:</strong> {character.trait}</p>
              <p className="opacity-80"><strong>Education:</strong> {character.education.degree}</p>
              <p className="opacity-80"><strong>Heritage:</strong> {character.origin}</p>
              <p className="opacity-80"><strong>Location:</strong> {character.city}</p>
            </div>
            <button
              onClick={() => setIsRelocateOpen(true)}
              className="mb-3 text-xs py-1.5 px-3 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              <Plane className="w-3.5 h-3.5 text-emerald-700" />
              <span>Study / Work Visas &amp; Relocation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/10 pt-4">
            <div>
              <span className="meta-label mb-0.5">Active Vocation</span>
              <p className="font-semibold text-sm sm:text-base text-[#1C1C1C] truncate">
                {vocationLabel}
              </p>
            </div>
            <div>
              <span className="meta-label mb-0.5">Societal Standing</span>
              <p className="font-semibold text-sm sm:text-base text-[#1C1C1C]">
                {character.socialStatus.reputationScore} / 1000 Reputation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Childhood Stage Card (if under age 18) */}
      {character.age < 18 && (
        <div className="card-v4 p-5 bg-[#DFDBD3]/60 border border-[#B8860B]/25">
          <span className="meta-label text-[#B8860B] mb-1">
            Childhood Development Stage · Age {character.age}
          </span>
          <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C] mb-1">
            {character.age < 6 ? 'Early Infancy & Toddler Years' : character.age < 13 ? 'Primary & Middle School' : 'High School Matriculation'}
          </h4>
          <p className="text-xs text-[#1C1C1C] opacity-75">
            {character.age < 6
              ? 'You are cared for by your parents in ' + character.city + '. Click "Age +1 Year" to grow and reach school age!'
              : character.age < 13
              ? 'You are attending school in ' + character.city + '. Developing intellect, street cricket skills, and childhood bonds.'
              : 'You are studying for board matriculation exams. Once you reach Age 18, university admissions, careers, sports leagues, and businesses unlock!'}
          </p>
        </div>
      )}

      {/* Actions Matrix */}
      <div className="card-v4 p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="meta-label">Action Matrix (Energy Cost: 20)</span>
          <span className="meta-label text-[#2E7D32] font-bold">
            Energy: {character.stats.energy}%
          </span>
        </div>

        {routineFeedback && (
          <div className="mb-4 p-2.5 rounded bg-white border border-black/10 text-xs text-[#1C1C1C] font-medium">
            {routineFeedback}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <button
            onClick={() => handleRoutine('gym')}
            className="p-3 bg-white hover:bg-[#DFDBD3] rounded border border-black/10 text-left transition-colors cursor-pointer"
          >
            <div className="font-grotesk font-bold text-xs">Conditioning</div>
            <div className="text-[10px] opacity-60 mt-0.5">+Health &amp; Looks</div>
          </button>

          <button
            onClick={() => handleRoutine('meditate')}
            className="p-3 bg-white hover:bg-[#DFDBD3] rounded border border-black/10 text-left transition-colors cursor-pointer"
          >
            <div className="font-grotesk font-bold text-xs">Meditation</div>
            <div className="text-[10px] opacity-60 mt-0.5">+Happiness</div>
          </button>

          <button
            onClick={() => handleRoutine('study')}
            className="p-3 bg-white hover:bg-[#DFDBD3] rounded border border-black/10 text-left transition-colors cursor-pointer"
          >
            <div className="font-grotesk font-bold text-xs">Research</div>
            <div className="text-[10px] opacity-60 mt-0.5">+Smarts</div>
          </button>

          <button
            onClick={() => handleRoutine('nightclub')}
            className="p-3 bg-white hover:bg-[#DFDBD3] rounded border border-black/10 text-left transition-colors cursor-pointer"
          >
            <div className="font-grotesk font-bold text-xs">Soirée</div>
            <div className="text-[10px] opacity-60 mt-0.5">-$500 / +Fun</div>
          </button>

          <button
            onClick={() => handleRoutine('spa')}
            className="p-3 bg-white hover:bg-[#DFDBD3] rounded border border-black/10 text-left transition-colors cursor-pointer col-span-2 sm:col-span-1"
          >
            <div className="font-grotesk font-bold text-xs">Mineral Spa</div>
            <div className="text-[10px] opacity-60 mt-0.5">-$1.5k / Bliss</div>
          </button>
        </div>
      </div>

      {/* University Programs Catalog (Variation 4 style: 3 column cards) */}
      {character.age >= 17 && !character.education.inProgress && (
        <section>
          <div className="meta-label mb-2">Higher Education Curriculum</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AVAILABLE_DEGREES.filter((d) => d.degree !== character.education.degree).map((deg) => (
              <div key={deg.degree} className="card-v4 p-5 flex flex-col justify-between">
                <div>
                  <div className="meta-label">{deg.degree}</div>
                  <p className="text-xs opacity-70 mt-1 font-medium">{deg.durationYears} Years Tuition</p>
                  <p className="text-[11px] opacity-60 mt-0.5">${deg.costPerYear.toLocaleString()} / year</p>
                </div>
                <button
                  onClick={() => handleEnroll(deg.degree)}
                  disabled={character.stats.smarts < deg.minSmarts || character.cash < deg.costPerYear}
                  className="btn-v4 w-full mt-4 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Chronicle Section matching Variation 4 Design HTML */}
      <section className="card-v4 p-6">
        <div className="meta-label mb-3">Chronicle</div>
        <div className="font-mono text-xs sm:text-sm space-y-1.5 opacity-90 max-h-[220px] overflow-y-auto">
          {character.lifeLog.slice(0, 8).map((log) => (
            <p key={log.id} className={log.impact === 'positive' ? 'text-[#1C1C1C]' : 'opacity-70'}>
              {log.year}: {log.text}
            </p>
          ))}
        </div>
      </section>

      {/* Relocation & Visa Modal */}
      <RelocationModal
        isOpen={isRelocateOpen}
        onClose={() => setIsRelocateOpen(false)}
      />
    </div>
  );
};
