import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { RelationshipContact } from '../types/game';
import { X, Baby, Briefcase, Heart, Shield, Award } from 'lucide-react';
import { CharacterAvatar, getLifeStageLabel } from './CharacterAvatar';

interface PersonModalProps {
  contact: RelationshipContact;
  onClose: () => void;
}

const CAREER_OPTIONS = [
  'Doctor & Specialized Surgeon',
  'Senior Software Architect',
  'Chartered Accountant & Fund Manager',
  'Textile Mill Industrialist',
  'CSP Civil Service Officer',
  'Professional Cricket Athlete',
  'Boutique Fashion Designer',
  'Real Estate Syndicate Partner',
  'Corporate Litigation Advocate'
];

export const PersonModal: React.FC<PersonModalProps> = ({ contact, onClose }) => {
  const { character, interactContact, haveBaby, guideContactCareer } = useGame();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<string>(contact.guidedCareer || CAREER_OPTIONS[0]);
  const [babyInputName, setBabyInputName] = useState<string>('');

  const current = character.relationships.find((c) => c.id === contact.id) || contact;

  const handleAction = (action: 'chat' | 'gift' | 'vacation' | 'favor' | 'propose' | 'marry' | 'divorce' | 'breakup') => {
    const res = interactContact(current.id, action);
    setFeedback(res.message);
  };

  const handleBaby = () => {
    const res = haveBaby(babyInputName);
    setFeedback(res.message);
    setBabyInputName('');
  };

  const handleCareerSteering = () => {
    const res = guideContactCareer(current.id, selectedCareer);
    setFeedback(res.message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="card-v4 max-w-lg w-full p-6 sm:p-8 bg-[#F4F2EE] shadow-xl border border-black/15 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-black/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 text-[#1C1C1C]" />
        </button>

        {/* Profile Card Header with Cartoon Avatar */}
        <div className="flex items-start gap-4 mb-6">
          <CharacterAvatar
            name={current.name}
            age={current.age}
            gender={current.gender}
            size="lg"
            animated={true}
          />
          <div className="flex-1 min-w-0">
            <div className="meta-label text-[#B8860B] mb-0.5">
              {current.type === 'Ex-Spouse'
                ? '💔 Ex-Spouse (Divorced)'
                : current.type === 'Ex-Partner'
                ? '💔 Ex-Partner (Broken Up)'
                : current.type} · {getLifeStageLabel(current.age)} (Age {current.age})
            </div>
            <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C] flex items-center gap-1.5 truncate">
              <span>{current.name}</span>
              {current.type === 'Spouse' && <span>💍</span>}
              {current.type === 'Child' && <span>👶</span>}
              {(current.type === 'Ex-Spouse' || current.type === 'Ex-Partner') && <span>💔</span>}
            </h3>
            <div className="text-xs text-[#1C1C1C] opacity-75 mt-1 space-y-0.5">
              <p><strong>Vocation:</strong> {current.occupation}</p>
              <p><strong>Net Worth:</strong> ${current.netWorth.toLocaleString()}</p>
              <p><strong>Personality:</strong> {current.personality}</p>
            </div>
          </div>
        </div>

        {/* Estranged Ex-Partner / Ex-Spouse Notice */}
        {(current.type === 'Ex-Spouse' || current.type === 'Ex-Partner') && (
          <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-950 flex items-start gap-2">
            <span className="text-sm mt-0.5">💔</span>
            <div>
              <strong>{current.type === 'Ex-Spouse' ? 'Former Spouse (Divorced)' : 'Former Dating Partner (Broken Up)'}:</strong>
              <p className="text-[11px] opacity-85 mt-0.5">
                You two parted ways and are strictly no longer friends or romantic partners. Luxury vacations and high-society favors are refused.
              </p>
            </div>
          </div>
        )}

        {/* Vitals Progress Bars */}
        <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-lg bg-[#EAE6DF] border border-black/10">
          <div>
            <div className="flex justify-between text-[11px] font-medium mb-1">
              <span className="meta-label">Affection</span>
              <span className="font-bold">{current.affection}%</span>
            </div>
            <div className="progress-v4">
              <div className="h-full bg-[#B8860B]" style={{ width: `${current.affection}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium mb-1">
              <span className="meta-label">Trust</span>
              <span className="font-bold">{current.trust}%</span>
            </div>
            <div className="progress-v4">
              <div className="h-full bg-[#1C1C1C]" style={{ width: `${current.trust}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium mb-1">
              <span className="meta-label">Respect</span>
              <span className="font-bold">{current.respect}%</span>
            </div>
            <div className="progress-v4">
              <div className="h-full bg-[#555]" style={{ width: `${current.respect}%` }} />
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div className="mb-4 p-3 rounded bg-[#B8860B]/15 border border-[#B8860B]/30 text-xs text-[#1C1C1C] font-medium">
            {feedback}
          </div>
        )}

        {/* Baby Born / Childbirth (Strictly For Married Spouses) */}
        {current.type === 'Spouse' && (
          <div className="mb-5 p-4 rounded-lg bg-[#EAE6DF] border border-black/10">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Baby className="w-4 h-4 text-[#B8860B]" />
                <span className="meta-label font-bold text-[#1C1C1C]">Start a Family · Have a Baby</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                ✨ 5% Twins Chance
              </span>
            </div>
            <p className="text-xs text-[#1C1C1C] opacity-70 mb-3">
              Conceive a newborn with your spouse {current.name}. (2-year cooldown between births, up to age 50).
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={babyInputName}
                onChange={(e) => setBabyInputName(e.target.value)}
                placeholder="Baby Name (optional)"
                className="flex-1 px-3 py-1.5 rounded border border-black/20 bg-white text-xs focus:outline-none focus:border-[#B8860B]"
              />
              <button
                onClick={handleBaby}
                className="btn-v4-accent text-xs py-2 px-3 whitespace-nowrap cursor-pointer"
              >
                👶 Have Baby (Age 0)
              </button>
            </div>
          </div>
        )}

        {/* Relationship Career Selection & Guidance */}
        {current.age >= 14 && (
          <div className="mb-5 p-4 rounded-lg bg-[#EAE6DF] border border-black/10">
            <div className="flex items-center gap-2 mb-1.5">
              <Briefcase className="w-4 h-4 text-[#B8860B]" />
              <span className="meta-label font-bold text-[#1C1C1C]">Guide Career Selection</span>
            </div>
            <p className="text-xs text-[#1C1C1C] opacity-70 mb-3">
              Steer {current.name}'s professional vocation and mentor their future trajectory.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded border border-black/20 bg-white text-xs focus:outline-none focus:border-[#B8860B]"
              >
                {CAREER_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={handleCareerSteering}
                className="btn-v4 text-xs py-2 px-3 whitespace-nowrap"
              >
                Steer Vocation
              </button>
            </div>
          </div>
        )}

        {/* Core Interactions Grid */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleAction('chat')}
              className="btn-v4-outline text-xs py-2.5 px-3 text-center"
            >
              Deep Conversation
            </button>

            <button
              onClick={() => handleAction('gift')}
              className="btn-v4-outline text-xs py-2.5 px-3 text-center"
            >
              Curated Gift ($2.5k)
            </button>

            <button
              onClick={() => handleAction('vacation')}
              disabled={current.type === 'Ex-Spouse' || current.type === 'Ex-Partner'}
              className="btn-v4-outline text-xs py-2.5 px-3 text-center disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Holiday Retreat ($12k)
            </button>

            <button
              onClick={() => handleAction('favor')}
              disabled={current.type === 'Ex-Spouse' || current.type === 'Ex-Partner'}
              className="btn-v4-outline text-xs py-2.5 px-3 text-center disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Call in Favor
            </button>
          </div>

          {current.type === 'Dating' && (
            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleAction('propose')}
                className="btn-v4-accent w-full py-3 text-xs tracking-wider font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>💍 Propose Marriage (Nikah)</span>
                <span className="text-[10px] font-normal opacity-90">· Age 18+ Required</span>
              </button>

              <button
                onClick={() => handleAction('breakup')}
                className="w-full py-2.5 text-xs text-rose-700 hover:text-rose-900 border border-rose-300 rounded hover:bg-rose-50 transition-colors font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>💔 Break Up with Partner</span>
              </button>
            </div>
          )}

          {current.type === 'Spouse' && (
            <button
              onClick={() => handleAction('divorce')}
              className="w-full py-2.5 text-xs text-rose-700 hover:text-rose-900 border border-rose-300 rounded hover:bg-rose-50 transition-colors"
            >
              File for Legal Divorce (35% Asset Split)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
