import React, { useState } from 'react';
import { useGame, VALID_DEGREES_FOR_FIELD } from '../../context/GameContext';
import { CorporateField, SportType, ArtisticMedium } from '../../types/game';
import { CORPORATE_LADDER } from '../../data/careerData';
import { SPORTS_REGISTRY } from '../../data/sportsData';
import { ARTS_CONFIG } from '../../data/artsData';
import { AlertCircle, Award, Trophy, GraduationCap } from 'lucide-react';

const CORPORATE_FIELDS: { id: CorporateField; label: string }[] = [
  { id: 'Tech', label: 'Tech & AI' },
  { id: 'Finance', label: 'Finance & Banking' },
  { id: 'Medicine', label: 'Medicine & Surgery' },
  { id: 'Law', label: 'Law & Judiciary' },
  { id: 'Civil_Service', label: 'Civil Service (CSP)' },
  { id: 'Armed_Forces', label: '⚔️ Armed Forces (PMA & Military)' },
  { id: 'Underworld_Crime', label: '💀 Underworld & Syndicate (Crime)' },
  { id: 'Media_Arts', label: 'Media & Drama' },
  { id: 'Aviation_Defense', label: 'Aviation Flight' },
  { id: 'Corporate_Industry', label: 'Industrial Export' }
];

export const CareerTab: React.FC = () => {
  const {
    character,
    applyCorporateJob,
    workOvertime,
    askForRaise,
    resignCorporateJob,
    startSportCareer,
    trainAthletics,
    playSeasonMatch,
    retireSport,
    produceArtPiece
  } = useGame();

  const [activeBranch, setActiveBranch] = useState<'corporate' | 'sports' | 'arts'>(
    character.age < 18 ? 'sports' : 'corporate'
  );
  const [selectedCorpField, setSelectedCorpField] = useState<CorporateField>('Tech');
  const [customArtTitle, setCustomArtTitle] = useState('');
  const [selectedArtMedium, setSelectedArtMedium] = useState<ArtisticMedium>('Music');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const showMsg = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 5000);
  };

  // Must be at least 15 for any athletic or creative vocation
  if (character.age < 15) {
    return (
      <div className="card-v4 p-8 text-center space-y-3 animate-fade-in">
        <span className="meta-label text-[#B8860B]">Early Childhood &amp; Schooling</span>
        <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C]">
          Too Young for Professional Careers
        </h3>
        <p className="text-xs text-[#1C1C1C] opacity-75 max-w-md mx-auto">
          You are currently Age {character.age} in {character.city}, Pakistan. In Kinship, athletes can start professional sports after <strong>Age 15</strong>, and corporate jobs unlock at <strong>Age 18</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Branch Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveBranch('corporate')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${
              activeBranch === 'corporate' ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            Corporate &amp; Civil Ladders {character.age < 18 ? '(Age 18+)' : ''}
          </button>

          <button
            onClick={() => setActiveBranch('sports')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeBranch === 'sports' ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Athletics &amp; Sports (Ages 15–40)</span>
          </button>

          <button
            onClick={() => setActiveBranch('arts')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${
              activeBranch === 'arts' ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            Artistic Pursuits
          </button>
        </div>

        <span className="meta-label">
          Stamina: <strong className="text-[#1C1C1C]">{character.stats.energy}%</strong>
        </span>
      </div>

      {actionMessage && (
        <div className="p-3 rounded bg-white border border-black/10 text-xs text-[#1C1C1C] font-medium shadow-xs">
          {actionMessage}
        </div>
      )}

      {/* Corporate Ladders */}
      {activeBranch === 'corporate' && (
        <div className="space-y-6">
          {character.age < 18 ? (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Corporate Career Age Requirement:</strong>
                <p className="mt-0.5 opacity-90">
                  You are currently Age {character.age}. Corporate, medical, judicial, and civil service careers unlock at Age 18 after high school graduation. You can currently compete in professional athletics (Ages 15–40) under the Athletics tab!
                </p>
              </div>
            </div>
          ) : character.education.inProgress ? (
            <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2.5">
              <GraduationCap className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Active University Student:</strong>
                <p className="mt-0.5 opacity-90">
                  You are currently enrolled full-time studying <strong>{character.education.inProgress.degree}</strong> ({character.education.inProgress.yearsRemaining} years remaining). Full-time corporate vocations unlock upon completing your degree and graduating!
                </p>
              </div>
            </div>
          ) : null}

          {character.corporateJob ? (
            <div className="card-v4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="meta-label text-[#B8860B] mb-1">Active Appointment</span>
                  <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
                    {character.corporateJob.title}
                  </h3>
                  <div className="text-xs text-[#1C1C1C] opacity-75 mt-1 flex flex-wrap gap-2">
                    <span>Field: {character.corporateJob.field}</span>
                    <span>·</span>
                    <span>Tenure: {character.corporateJob.yearsInRole} Years</span>
                    <span>·</span>
                    <span className="font-bold text-[#1C1C1C]">
                      Salary: ${character.corporateJob.salary.toLocaleString()}/yr
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const res = workOvertime();
                      showMsg(res.message);
                    }}
                    className="btn-v4 text-xs py-2 px-3"
                  >
                    Work Overtime
                  </button>
                  <button
                    onClick={() => {
                      const res = askForRaise();
                      showMsg(res.message);
                    }}
                    className="btn-v4-accent text-xs py-2 px-3 font-bold"
                  >
                    Ask for Promotion
                  </button>
                  <button
                    onClick={resignCorporateJob}
                    className="btn-v4-outline text-xs py-2 px-3 text-rose-700 hover:text-rose-900"
                  >
                    Resign
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="meta-label">Performance Rating</span>
                  <span className="font-bold">{character.corporateJob.performance}%</span>
                </div>
                <div className="progress-v4">
                  <div className="h-full bg-[#B8860B]" style={{ width: `${character.corporateJob.performance}%` }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="card-v4 p-6 text-center text-xs opacity-75">
              No active corporate employment. Choose a career ladder below and submit an application.
            </div>
          )}

          {/* 8 Distinct Career Tracks */}
          <div className="flex items-center gap-1.5 border-b border-black/10 pb-2 overflow-x-auto scrollbar-none">
            {CORPORATE_FIELDS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedCorpField(f.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                  selectedCorpField === f.id ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORPORATE_LADDER[selectedCorpField]?.map((job) => {
              const isCurrent = character.corporateJob?.title === job.title;
              const isAdult = character.age >= 18;
              const isEnrolledStudent = character.education.inProgress !== null;
              const allowedDegrees = VALID_DEGREES_FOR_FIELD[job.field] || [];
              const degreeMatchesField = allowedDegrees.length === 0 || allowedDegrees.includes(character.education.degree);
              const hasExactDegree = !job.requiredDegree || character.education.degree === job.requiredDegree;
              const hasDegree = degreeMatchesField && hasExactDegree;
              const hasSmarts = character.stats.smarts >= job.minSmarts;
              const canApply = !isCurrent && isAdult && !isEnrolledStudent && hasDegree && hasSmarts;

              const buttonLabel = isCurrent
                ? 'Current Role'
                : !isAdult
                ? 'Under 18'
                : isEnrolledStudent
                ? 'Enrolled Student (Finish Degree)'
                : !degreeMatchesField
                ? `Discipline Mismatch (Requires ${job.field} Degree)`
                : !hasExactDegree
                ? `Requires ${job.requiredDegree}`
                : !hasSmarts
                ? `Requires ${job.minSmarts} Smarts`
                : 'Apply Position';

              return (
                <div key={job.title} className="card-v4 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="meta-label">Rank 0{job.rank}</span>
                      <span className="font-bold text-sm text-[#1C1C1C]">${job.salary.toLocaleString()}/yr</span>
                    </div>

                    <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C] mb-2">{job.title}</h4>

                    <div className="text-xs text-[#1C1C1C] opacity-75 space-y-1 mb-4">
                      <p>Field Discipline: <strong className="text-[#1C1C1C]">{job.field}</strong></p>
                      <p>Required Degree: {job.requiredDegree || (allowedDegrees.length > 0 ? allowedDegrees.slice(0, 2).join(' / ') : 'High School Diploma')}</p>
                      <p>Smarts: {job.minSmarts}+</p>
                      <p>Prestige: +{job.prestigePoints} Rep</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const res = applyCorporateJob(job.field, job.rank);
                      showMsg(res.message);
                    }}
                    disabled={!canApply}
                    className="btn-v4 w-full text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {buttonLabel}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sports Athletics (Ages 15 to 40) */}
      {activeBranch === 'sports' && (
        <div className="space-y-6">
          {/* Athlete Policy Notice */}
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Athletic Career Policy:</strong> Athletes can start after <strong>Age 15</strong> and automatically retire after <strong>Age 40</strong> (Eligible ages: 15–40).
              </span>
            </div>
            <span className="font-mono font-bold text-[11px] bg-emerald-200/80 px-2 py-0.5 rounded text-emerald-900 shrink-0">
              Age {character.age}
            </span>
          </div>

          {character.sportsCareer ? (
            <div className="card-v4 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="meta-label text-[#B8860B] mb-1">Athletic Contract</span>
                  <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-[#1C1C1C]">
                    {character.sportsCareer.sport} · {character.sportsCareer.division}
                  </h3>
                  <div className="text-xs text-[#1C1C1C] opacity-75 mt-1 flex flex-wrap gap-2">
                    <span>Skill: {character.sportsCareer.skill}%</span>
                    <span>·</span>
                    <span>Trophies: {character.sportsCareer.championships} 🏆</span>
                    <span>·</span>
                    <span className="font-bold">
                      Comp: ${(character.sportsCareer.salary + character.sportsCareer.endorsementsPerYear).toLocaleString()}/yr
                    </span>
                    <span>·</span>
                    <span className="text-emerald-800 font-semibold">
                      Seasons: {character.sportsCareer.seasonsPlayed} (Retires at 41)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const res = trainAthletics();
                      showMsg(res.message);
                    }}
                    className="btn-v4 text-xs py-2 px-3"
                  >
                    Training Camp
                  </button>
                  <button
                    onClick={() => {
                      const res = playSeasonMatch();
                      showMsg(res.message);
                    }}
                    className="btn-v4-accent text-xs py-2 px-3 font-bold"
                  >
                    Play Match / Championship
                  </button>
                  <button
                    onClick={retireSport}
                    className="btn-v4-outline text-xs py-2 px-3 text-rose-700 hover:text-rose-900"
                  >
                    Voluntary Retirement
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="meta-label">Health</span>
                    <span className="font-bold">{character.stats.health}%</span>
                  </div>
                  <div className="progress-v4">
                    <div className="h-full bg-[#B8860B]" style={{ width: `${character.stats.health}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="meta-label">Skill</span>
                    <span className="font-bold">{character.sportsCareer.skill}%</span>
                  </div>
                  <div className="progress-v4">
                    <div className="h-full bg-[#1C1C1C]" style={{ width: `${character.sportsCareer.skill}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-v4 p-6 text-center text-xs opacity-75">
              {character.age > 40
                ? `You are Age ${character.age}. Professional athletes automatically retire after age 40 and can no longer sign new contracts.`
                : 'No active sports contract. Requires minimum 60% Health to clear trial screening (Starting ages: 15–40).'}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(SPORTS_REGISTRY) as SportType[]).map((sportKey) => {
              const info = SPORTS_REGISTRY[sportKey];
              const isCurrent = character.sportsCareer?.sport === sportKey;
              const isAgeEligible = character.age >= 15 && character.age <= 40;

              return (
                <div key={sportKey} className="card-v4 p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C] mb-1">{sportKey}</h4>
                    <p className="text-xs text-[#1C1C1C] opacity-75 mb-3">{info.description}</p>
                    <div className="text-xs text-[#1C1C1C] opacity-70 mb-4">
                      Top Comp: ${info.baseSalaryByDivision['World Elite'].toLocaleString()}/yr
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const res = startSportCareer(sportKey);
                      showMsg(res.message);
                    }}
                    disabled={isCurrent || character.stats.health < 60 || !isAgeEligible}
                    className="btn-v4 w-full text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {isCurrent
                      ? 'Current Sport'
                      : !isAgeEligible
                      ? character.age > 40 ? 'Retired (Max Age 40)' : 'Too Young (Min Age 15)'
                      : character.stats.health < 60
                      ? 'Needs 60% Health'
                      : `Sign ${sportKey} Contract`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Artistic Pursuits */}
      {activeBranch === 'arts' && (
        <div className="space-y-6">
          <div className="card-v4 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="meta-label text-[#B8860B] mb-1">Artistic Portfolio</span>
              <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C]">
                {character.artisticCareer ? `Mastery: ${character.artisticCareer.medium}` : 'Aspiring Creative'}
              </h3>
              <p className="text-xs text-[#1C1C1C] opacity-75 mt-1">
                Royalties: ${(character.artisticCareer?.works.reduce((s, w) => s + w.annualRoyalties, 0) || 0).toLocaleString()} / year
              </p>
            </div>
          </div>

          <div className="card-v4 p-6">
            <span className="meta-label mb-2">Create &amp; Publish Work</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {(['Music', 'Literature', 'Fine Arts', 'Cinema'] as ArtisticMedium[]).map((med) => (
                <button
                  key={med}
                  onClick={() => setSelectedArtMedium(med)}
                  className={`py-2 px-3 text-xs font-semibold rounded cursor-pointer ${
                    selectedArtMedium === med ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C]'
                  }`}
                >
                  {med}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customArtTitle}
                onChange={(e) => setCustomArtTitle(e.target.value)}
                placeholder={`Name of ${selectedArtMedium} work (optional)`}
                className="flex-1 px-3 py-2 rounded border border-black/20 bg-white text-xs focus:outline-none focus:border-[#B8860B]"
              />
              <button
                onClick={() => {
                  const res = produceArtPiece(selectedArtMedium, customArtTitle);
                  showMsg(res.message);
                  setCustomArtTitle('');
                }}
                disabled={character.stats.energy < ARTS_CONFIG[selectedArtMedium].creationEnergyCost}
                className="btn-v4-accent text-xs py-2 px-4 whitespace-nowrap font-bold"
              >
                Release Work (-{ARTS_CONFIG[selectedArtMedium].creationEnergyCost} Stamina)
              </button>
            </div>
          </div>

          {/* Catalog of Released Works */}
          {character.artisticCareer?.works && character.artisticCareer.works.length > 0 && (
            <div className="space-y-3">
              <span className="meta-label text-[#B8860B]">Published Discography &amp; Masterpieces</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {character.artisticCareer.works.map((work) => (
                  <div key={work.id} className="card-v4 p-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h5 className="font-grotesk font-bold text-sm text-[#1C1C1C]">{work.title}</h5>
                        {work.isMasterpiece && (
                          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded font-bold">
                            Masterpiece 👑
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#1C1C1C] opacity-70 mt-0.5">
                        {work.medium} · Score: {work.acclaimScore}/100 · Year {work.yearCreated}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#1C1C1C] shrink-0">
                      +${work.annualRoyalties.toLocaleString()}/yr
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
