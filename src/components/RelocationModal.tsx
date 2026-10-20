import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { PAKISTAN_CITIES } from '../utils/names';
import { X, Plane, GraduationCap, Briefcase, MapPin, CheckCircle2, AlertCircle, Home } from 'lucide-react';

interface RelocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VisaOption {
  destination: string;
  country: string;
  type: 'study_visa' | 'work_visa';
  cost: number;
  minAge: number;
  maxAge?: number;
  minSmarts: number;
  requiresDegree?: boolean;
  perks: string;
  description: string;
}

const STUDY_VISAS: VisaOption[] = [
  {
    destination: 'London, United Kingdom',
    country: 'United Kingdom',
    type: 'study_visa',
    cost: 28000,
    minAge: 18,
    maxAge: 35,
    minSmarts: 65,
    perks: '+15 Smarts, British Graduate Degree, International Prestige',
    description: 'Postgraduate pathway at London School of Economics & Imperial College.'
  },
  {
    destination: 'Toronto, Canada',
    country: 'Canada',
    type: 'study_visa',
    cost: 22000,
    minAge: 18,
    maxAge: 35,
    minSmarts: 60,
    perks: '+12 Smarts, Post-Graduation Work Permit, Canadian PR Track',
    description: 'Direct admission to University of Toronto with guaranteed settlement rights.'
  },
  {
    destination: 'Boston, United States',
    country: 'United States',
    type: 'study_visa',
    cost: 38000,
    minAge: 18,
    maxAge: 35,
    minSmarts: 75,
    perks: '+20 Smarts, Ivy League Alumni Network, Global Wall Street Access',
    description: 'Elite Ivy League research university with unmatched prestige.'
  },
  {
    destination: 'Berlin, Germany',
    country: 'Germany',
    type: 'study_visa',
    cost: 14000,
    minAge: 18,
    maxAge: 35,
    minSmarts: 62,
    perks: '+14 Smarts, Low EU Tuition, Schengen Zone Freedom',
    description: 'Public technical university in Berlin with strong engineering ties.'
  },
  {
    destination: 'Melbourne, Australia',
    country: 'Australia',
    type: 'study_visa',
    cost: 24000,
    minAge: 18,
    maxAge: 35,
    minSmarts: 60,
    perks: '+12 Smarts, Australian Graduate Visa, High Quality of Life',
    description: 'Top research institution in Australia with coastal urban living.'
  }
];

const WORK_VISAS: VisaOption[] = [
  {
    destination: 'Dubai, United Arab Emirates',
    country: 'United Arab Emirates',
    type: 'work_visa',
    cost: 4500,
    minAge: 21,
    minSmarts: 50,
    perks: 'Tax-Free Earnings (1.6x Multiplier), Marina Apartment Living, +30 Rep',
    description: 'Executive sponsorship in Dubai\'s international business and real estate hub.'
  },
  {
    destination: 'Riyadh, Saudi Arabia',
    country: 'Saudi Arabia',
    type: 'work_visa',
    cost: 4000,
    minAge: 21,
    minSmarts: 50,
    perks: 'Generous Expat Housing, High Savings Rate, +25 Rep',
    description: 'Mega-infrastructure & technical consulting on Vision 2030 initiatives.'
  },
  {
    destination: 'London, United Kingdom',
    country: 'United Kingdom',
    type: 'work_visa',
    cost: 8500,
    minAge: 22,
    minSmarts: 70,
    requiresDegree: true,
    perks: 'Global Financial & Tech Hub, 1.8x Salary Potential, +40 Rep',
    description: 'Skilled worker tier-2 sponsorship in the financial City of London.'
  },
  {
    destination: 'Silicon Valley, United States',
    country: 'United States',
    type: 'work_visa',
    cost: 12000,
    minAge: 23,
    minSmarts: 78,
    requiresDegree: true,
    perks: 'H-1B Specialist Tech Track, 2.2x High Compensation, +55 Rep',
    description: 'Specialist sponsorship at leading California artificial intelligence labs.'
  },
  {
    destination: 'Doha, Qatar',
    country: 'Qatar',
    type: 'work_visa',
    cost: 4200,
    minAge: 21,
    minSmarts: 52,
    perks: 'Expatriate Airline & Energy Contract, Tax-Free Package, +25 Rep',
    description: 'Commercial corporate contract with national aviation & energy groups.'
  }
];

export const RelocationModal: React.FC<RelocationModalProps> = ({ isOpen, onClose }) => {
  const { character, relocateCharacter } = useGame();
  const [activeTab, setActiveTab] = useState<'study' | 'work' | 'cities'>('study');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const isCurrentlyAbroad = !PAKISTAN_CITIES.includes(character.city as any);

  const handleApplyVisa = (visa: VisaOption) => {
    const res = relocateCharacter(visa.destination, visa.type, visa.cost);
    setFeedback(res.message);
    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 1800);
    }
  };

  const handleMoveCity = (targetCity: string) => {
    const res = relocateCharacter(targetCity, 'city', 1500);
    setFeedback(res.message);
    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const handleReturnHome = (homeCity: string) => {
    const res = relocateCharacter(homeCity, 'return_home', 1000);
    setFeedback(res.message);
    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  const hasDegree = character.education.degree !== 'None' &&
    character.education.degree !== 'Infancy' &&
    character.education.degree !== 'Primary School';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="card-v4 bg-[#F4F2EE] max-w-2xl w-full p-6 shadow-2xl border border-black/20 text-[#1C1C1C] my-6 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-sm">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-grotesk text-xl font-bold tracking-tight text-[#1C1C1C]">
                  Global Visa &amp; Relocation
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Current: {character.city}
                </span>
              </div>
              <p className="text-xs text-[#1C1C1C] opacity-70">
                Study permits, international work visas, and intercity relocation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-black/10 transition-colors cursor-pointer text-[#1C1C1C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Return Home Option if Abroad */}
        {isCurrentlyAbroad && (
          <div className="mb-4 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Home className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <strong className="text-xs block">Currently Living Overseas ({character.city})</strong>
                <span className="text-[11px] opacity-85">Return to Pakistan with foreign savings &amp; international prestige ($1,000 flight).</span>
              </div>
            </div>
            <button
              onClick={() => handleReturnHome('Islamabad')}
              className="btn-v4 text-xs py-1.5 px-3 bg-amber-900 text-white hover:bg-amber-950 cursor-pointer"
            >
              Return Home to Pakistan
            </button>
          </div>
        )}

        {/* Feedback Message */}
        {feedback && (
          <div className="mb-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-black/10 pb-3 mb-4">
          <button
            onClick={() => setActiveTab('study')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'study' ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Study Visas (International Degrees)</span>
          </button>

          <button
            onClick={() => setActiveTab('work')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'work' ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Work Visas (Gulf &amp; Western Jobs)</span>
          </button>

          <button
            onClick={() => setActiveTab('cities')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'cities' ? 'bg-[#1C1C1C] text-white' : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Pakistani Cities (Domestic Move)</span>
          </button>
        </div>

        {/* Tab 1: Study Visas */}
        {activeTab === 'study' && (
          <div className="space-y-3">
            <p className="text-xs text-[#1C1C1C] opacity-75">
              Study abroad in prestigious global university cities. Requires high Smarts, valid age window (18–35), and proof of tuition funds.
            </p>

            <div className="grid gap-3">
              {STUDY_VISAS.map((visa) => {
                const meetsAge = character.age >= visa.minAge && (visa.maxAge ? character.age <= visa.maxAge : true);
                const meetsSmarts = character.stats.smarts >= visa.minSmarts;
                const meetsCash = character.cash >= visa.cost;
                const isCurrent = character.city === visa.destination;
                const canApply = meetsAge && meetsSmarts && meetsCash && !isCurrent;

                return (
                  <div
                    key={visa.destination}
                    className={`card-v4 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isCurrent ? 'border-emerald-500 bg-emerald-50/30' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-grotesk font-bold text-base text-[#1C1C1C]">
                          {visa.destination}
                        </h4>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200">
                          Study Permit
                        </span>
                      </div>
                      <p className="text-xs text-[#1C1C1C] opacity-75">{visa.description}</p>
                      <div className="text-[11px] text-emerald-800 font-semibold">{visa.perks}</div>

                      {/* Criteria checks */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                        <span className={meetsAge ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                          Age 18–35 {meetsAge ? '✓' : `(You: ${character.age})`}
                        </span>
                        <span>·</span>
                        <span className={meetsSmarts ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                          Smarts {visa.minSmarts}+ {meetsSmarts ? '✓' : `(You: ${character.stats.smarts})`}
                        </span>
                        <span>·</span>
                        <span className={meetsCash ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                          Funds: ${visa.cost.toLocaleString()} {meetsCash ? '✓' : `(Short by $${(visa.cost - character.cash).toLocaleString()})`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyVisa(visa)}
                      disabled={!canApply}
                      className="btn-v4 text-xs py-2 px-3.5 whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    >
                      {isCurrent ? 'Current City' : canApply ? `Fly to ${visa.country} ($${visa.cost.toLocaleString()})` : 'Criteria Not Met'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Work Visas */}
        {activeTab === 'work' && (
          <div className="space-y-3">
            <p className="text-xs text-[#1C1C1C] opacity-75">
              Secure expatriate employment in top international corporate and financial capitals. Requires age 21+, verified competence, and visa processing fees.
            </p>

            <div className="grid gap-3">
              {WORK_VISAS.map((visa) => {
                const meetsAge = character.age >= visa.minAge;
                const meetsSmarts = character.stats.smarts >= visa.minSmarts;
                const meetsCash = character.cash >= visa.cost;
                const meetsDegree = !visa.requiresDegree || hasDegree || (character.corporateJob && character.corporateJob.rank >= 2);
                const isCurrent = character.city === visa.destination;
                const canApply = meetsAge && meetsSmarts && meetsCash && meetsDegree && !isCurrent;

                return (
                  <div
                    key={visa.destination}
                    className={`card-v4 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isCurrent ? 'border-emerald-500 bg-emerald-50/30' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-grotesk font-bold text-base text-[#1C1C1C]">
                          {visa.destination}
                        </h4>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          Expat Work Visa
                        </span>
                      </div>
                      <p className="text-xs text-[#1C1C1C] opacity-75">{visa.description}</p>
                      <div className="text-[11px] text-blue-800 font-semibold">{visa.perks}</div>

                      {/* Criteria checks */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono">
                        <span className={meetsAge ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                          Age {visa.minAge}+ {meetsAge ? '✓' : `(You: ${character.age})`}
                        </span>
                        <span>·</span>
                        <span className={meetsSmarts ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                          Smarts {visa.minSmarts}+ {meetsSmarts ? '✓' : `(You: ${character.stats.smarts})`}
                        </span>
                        <span>·</span>
                        <span className={meetsCash ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                          Fee: ${visa.cost.toLocaleString()} {meetsCash ? '✓' : `(Short $${(visa.cost - character.cash).toLocaleString()})`}
                        </span>
                        {visa.requiresDegree && (
                          <>
                            <span>·</span>
                            <span className={meetsDegree ? 'text-emerald-700 font-bold' : 'text-rose-600'}>
                              Degree or Rank 2+ {meetsDegree ? '✓' : '✗'}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyVisa(visa)}
                      disabled={!canApply}
                      className="btn-v4 text-xs py-2 px-3.5 whitespace-nowrap disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    >
                      {isCurrent ? 'Current City' : canApply ? `Work in ${visa.country} ($${visa.cost.toLocaleString()})` : 'Criteria Not Met'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Domestic Pakistani Cities */}
        {activeTab === 'cities' && (
          <div className="space-y-3">
            <p className="text-xs text-[#1C1C1C] opacity-75">
              Relocate your home residence to another Pakistani metropolis ($1,500 moving expense, Age 18+ required).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAKISTAN_CITIES.map((city) => {
                const isCurrent = character.city === city;
                const canMove = character.age >= 18 && character.cash >= 1500 && !isCurrent;

                return (
                  <div
                    key={city}
                    className={`card-v4 p-3.5 flex items-center justify-between gap-3 ${
                      isCurrent ? 'border-emerald-500 bg-emerald-50/40' : ''
                    }`}
                  >
                    <div>
                      <h5 className="font-grotesk font-bold text-sm text-[#1C1C1C]">{city}</h5>
                      <span className="text-[10px] text-[#1C1C1C] opacity-70">
                        {city === 'Islamabad' ? 'Diplomatic & Capital City' : city === 'Karachi' ? 'Financial Megacity' : city === 'Lahore' ? 'Cultural & Arts Capital' : 'Commerce & Regional Hub'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleMoveCity(city)}
                      disabled={!canMove}
                      className="btn-v4 text-xs py-1.5 px-3 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isCurrent ? 'Current' : 'Move ($1.5k)'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
