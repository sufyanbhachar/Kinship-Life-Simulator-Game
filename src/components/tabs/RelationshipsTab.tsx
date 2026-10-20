import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Gender, RelationshipContact } from '../../types/game';
import { Baby, Briefcase, Heart, Sparkles, UserPlus, Users, AlertCircle } from 'lucide-react';
import { CharacterAvatar } from '../CharacterAvatar';
import { DatingAppModal } from '../DatingAppModal';

const CAREER_CHOICES = [
  'Doctor & Specialized Surgeon',
  'Senior Software Architect',
  'Chartered Accountant & Fund Manager',
  'Textile Mill Industrialist',
  'CSP Civil Service Officer',
  'Professional Cricket Athlete',
  'Boutique Fashion Designer',
  'Real Estate Syndicate Partner',
  'Corporate Litigation Advocate',
  'Television Drama Director',
  'Commercial Flight Captain'
];

export const RelationshipsTab: React.FC = () => {
  const { character, setActiveContact, meetDatingCandidate, haveBaby, guideContactCareer } = useGame();
  const [filterType, setFilterType] = useState<string>('all');
  const [candidateMsg, setCandidateMsg] = useState<string | null>(null);

  // Quick Baby Modal / Card state
  const [showBabyBox, setShowBabyBox] = useState<boolean>(false);
  const [babyNameInput, setBabyNameInput] = useState<string>('');
  const [babyGenderChoice, setBabyGenderChoice] = useState<Gender>('Male');

  // Dating App Modal
  const [isDatingAppOpen, setIsDatingAppOpen] = useState<boolean>(false);

  const spouses = character.relationships.filter((c) => c.type === 'Spouse');
  const datingPartners = character.relationships.filter((c) => c.type === 'Dating');
  const children = character.relationships.filter((c) => c.type === 'Child');

  const youngestChild = children.reduce(
    (min, c) => (min === null || c.age < min.age ? c : min),
    null as RelationshipContact | null
  );

  const isBabyCooldown = youngestChild !== null && youngestChild.age < 2;
  const isFemaleMotherOver50 = character.gender === 'Female' ? character.age >= 50 : (spouses[0]?.age >= 50);
  const areBothOver50 = spouses.length > 0 && character.age >= 50 && spouses[0]?.age >= 50;
  const canConceive = spouses.length > 0 && !isBabyCooldown && !isFemaleMotherOver50 && !areBothOver50;

  const handleMeet = () => {
    const res = meetDatingCandidate();
    setCandidateMsg(res.message);
    setTimeout(() => setCandidateMsg(null), 4500);
  };

  const handleQuickBaby = (e: React.FormEvent) => {
    e.preventDefault();
    const res = haveBaby(babyNameInput, babyGenderChoice);
    setCandidateMsg(res.message);
    setBabyNameInput('');
    if (res.success) {
      setShowBabyBox(false);
    }
    setTimeout(() => setCandidateMsg(null), 5500);
  };

  const filteredContacts = character.relationships.filter((c) => {
    if (filterType === 'all') return true;
    if (filterType === 'family') return c.type === 'Parent' || c.type === 'Sibling';
    if (filterType === 'children') return c.type === 'Child';
    if (filterType === 'romance') return c.type === 'Spouse' || c.type === 'Dating';
    if (filterType === 'friends') return c.type === 'Friend';
    if (filterType === 'society') return c.type === 'High Society Patron' || c.type === 'Work Rival';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Network Header Banner */}
      <div className="card-v4 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="meta-label text-[#B8860B]">Human Capital &amp; Kinship</span>
            {character.gender === 'Male' ? (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                Wives: {spouses.length} / 4 Max
              </span>
            ) : (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-900 border border-pink-200">
                {spouses.length > 0 ? 'Status: Married (1 Spouse)' : 'Status: Single'}
              </span>
            )}
          </div>
          <h3 className="font-grotesk text-3xl font-bold text-[#1C1C1C]">
            {character.relationships.length} Kinship Connections
          </h3>
          <p className="text-xs text-[#1C1C1C] opacity-75 mt-1 max-w-xl">
            Nurture family ties, raise children born at home, court opposite-gender suitors via the DilMil Dating App, and build your Pakistani dynasty.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Open DilMil Dating App Button */}
          <button
            onClick={() => setIsDatingAppOpen(true)}
            className="text-xs py-2 px-3.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>DilMil Dating App {character.age < 15 ? '(Unlocks Age 15)' : ''}</span>
          </button>

          {/* Have Baby Button */}
          <button
            onClick={() => setShowBabyBox(!showBabyBox)}
            className="btn-v4-accent text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer"
          >
            <Baby className="w-4 h-4" />
            <span>{showBabyBox ? 'Close Baby Panel' : 'Have a Baby'}</span>
          </button>

          {/* Quick Mingle button */}
          <button
            onClick={handleMeet}
            disabled={character.stats.energy < 20 || character.age < 15}
            className="btn-v4 text-xs py-2 px-3.5 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Mingle &amp; Court (-20 Energy)</span>
          </button>
        </div>
      </div>

      {candidateMsg && (
        <div className="p-3.5 rounded-lg bg-white border border-[#B8860B]/30 shadow-xs text-xs text-[#1C1C1C] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B8860B] shrink-0" />
          <span>{candidateMsg}</span>
        </div>
      )}

      {/* Baby Born / Family Expansion Drawer */}
      {showBabyBox && (
        <div className="card-v4 p-6 bg-[#EAE6DF] border border-[#B8860B]/40 animate-fade-in">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="meta-label text-[#B8860B]">Family Expansion · Childbirth</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ✨ 5% Chance of Twins!
                </span>
              </div>
              <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C]">
                {spouses.length > 0
                  ? `Welcome a Newborn Baby with ${spouses[0].name}`
                  : 'Marriage Required Before Childbirth'}
              </h4>
              <p className="text-xs text-[#1C1C1C] opacity-75 mt-0.5 max-w-xl">
                In Kinship, a couple cannot have a baby before marriage. Babies are born at Age 0 and can only arrive once every 2 years until age 50!
              </p>
            </div>
          </div>

          {/* Status checks on baby rules */}
          {spouses.length === 0 ? (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>A couple cannot have a baby before marriage!</strong>
                <p className="mt-0.5 opacity-90">
                  You are not currently married. Open the DilMil Dating App, court a suitor, reach 75%+ affection, and propose marriage (Age 18+) to start a family.
                </p>
              </div>
            </div>
          ) : isBabyCooldown ? (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>2-Year Cooldown Active:</strong>
                <p className="mt-0.5 opacity-90">
                  A couple can only have a baby once every 2 years. Your youngest child ({youngestChild?.name}) is currently Age {youngestChild?.age}. Age up to resume childbirth.
                </p>
              </div>
            </div>
          ) : isFemaleMotherOver50 || areBothOver50 ? (
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <strong>Natural Childbirth Concluded (Age 50+ Limit):</strong>
                <p className="mt-0.5 opacity-90">
                  Biological childbirth has concluded as the mother has reached 50 years of age.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleQuickBaby} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="meta-label mb-1 text-[#1C1C1C]">Baby Name (optional, or auto-generated)</label>
                <input
                  type="text"
                  value={babyNameInput}
                  onChange={(e) => setBabyNameInput(e.target.value)}
                  placeholder="e.g. Ahad, Zara, Rayyan..."
                  className="w-full px-3 py-2 rounded border border-black/20 bg-white text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <div>
                <label className="meta-label mb-1 text-[#1C1C1C]">Gender</label>
                <div className="grid grid-cols-2 gap-1.5 bg-white p-1 rounded border border-black/20">
                  <button
                    type="button"
                    onClick={() => setBabyGenderChoice('Male')}
                    className={`py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                      babyGenderChoice === 'Male' ? 'bg-[#1C1C1C] text-white' : 'text-[#1C1C1C] opacity-70'
                    }`}
                  >
                    Boy (♂)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBabyGenderChoice('Female')}
                    className={`py-1 text-xs font-semibold rounded cursor-pointer transition-colors ${
                      babyGenderChoice === 'Female' ? 'bg-pink-700 text-white' : 'text-[#1C1C1C] opacity-70'
                    }`}
                  >
                    Girl (♀)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn-v4-accent w-full py-2 px-3 text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Baby className="w-3.5 h-3.5" />
                <span>Deliver Baby (Age 0)</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-black/10 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'all', label: `All (${character.relationships.length})` },
          { id: 'family', label: 'Parents & Siblings' },
          { id: 'children', label: `Children (${children.length})` },
          { id: 'romance', label: `Spouses & Dating (${spouses.length + datingPartners.length})` },
          { id: 'friends', label: 'Friends' },
          { id: 'society', label: 'Patrons & Rivals' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              filterType === f.id
                ? 'bg-[#1C1C1C] text-white'
                : 'text-[#1C1C1C] opacity-70 hover:opacity-100 hover:bg-black/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setActiveContact(contact)}
            className="card-v4 p-4 hover:border-[#B8860B] transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Header with Cartoon Avatar */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <CharacterAvatar
                    name={contact.name}
                    age={contact.age}
                    gender={contact.gender}
                    size="sm"
                    animated={true}
                  />
                  <div className="min-w-0">
                    <h4 className="font-grotesk text-base font-bold text-[#1C1C1C] group-hover:text-[#B8860B] transition-colors flex items-center gap-1.5 truncate">
                      <span className="truncate">{contact.name}</span>
                      {contact.type === 'Spouse' && <span title="Spouse">💍</span>}
                      {contact.type === 'Child' && <span title="Child">👶</span>}
                      {contact.type === 'Dating' && <span title="Dating Partner">💖</span>}
                    </h4>
                    <span className="meta-label text-[#B8860B] truncate">
                      {contact.type} · Age {contact.age} ({contact.gender === 'Female' ? '♀' : '♂'})
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/5 text-[#1C1C1C] border border-black/10 shrink-0">
                  {contact.personality}
                </span>
              </div>

              {/* Vocation / Guided Career Badge */}
              <div className="mb-3">
                <span className="text-[11px] font-semibold text-[#1C1C1C] opacity-80 block truncate">
                  Vocation: {contact.occupation}
                </span>
                {contact.guidedCareer && (
                  <span className="inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider text-[#B8860B] bg-[#B8860B]/10 px-1.5 py-0.5 rounded">
                    Guided Career: {contact.guidedCareer}
                  </span>
                )}
              </div>

              {/* Vitals */}
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <div className="flex justify-between text-[#1C1C1C] opacity-70 mb-0.5">
                    <span>Affection</span>
                    <span className="font-semibold tabular-nums">{contact.affection}%</span>
                  </div>
                  <div className="progress-v4 h-1.5">
                    <div
                      className="h-full bg-[#B8860B]"
                      style={{ width: `${contact.affection}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#1C1C1C] opacity-70 mb-0.5">
                    <span>Trust</span>
                    <span className="font-semibold tabular-nums">{contact.trust}%</span>
                  </div>
                  <div className="progress-v4 h-1.5">
                    <div
                      className="h-full bg-[#1C1C1C]"
                      style={{ width: `${contact.trust}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] text-[#1C1C1C] opacity-70">
              <span>Net Worth: ${contact.netWorth.toLocaleString()}</span>
              <span className="group-hover:text-[#B8860B] font-semibold flex items-center gap-1">
                Interact &amp; Guide →
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="p-8 text-center text-xs text-[#1C1C1C] opacity-60 card-v4">
          No kinship contacts found under this filter category.
        </div>
      )}

      {/* DilMil Dating App Modal */}
      <DatingAppModal
        isOpen={isDatingAppOpen}
        onClose={() => setIsDatingAppOpen(false)}
      />
    </div>
  );
};
