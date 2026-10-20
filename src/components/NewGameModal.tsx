import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { BackgroundOrigin, Gender, PersonalityTrait } from '../types/game';
import { PAKISTAN_CITIES, PakistanCity, generateRandomName } from '../utils/names';
import { X, Sparkles, Trash2, Baby } from 'lucide-react';
import { CharacterAvatar, getLifeStageLabel } from './CharacterAvatar';

interface NewGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ORIGINS: { origin: BackgroundOrigin; label: string; desc: string }[] = [
  { origin: 'Humble Beginnings', label: 'Humble Roots', desc: 'Starting with modest family savings. Hungry to rise.' },
  { origin: 'Working Class', label: 'Working Class', desc: 'Starting with honest industrial labor and stable values.' },
  { origin: 'Middle Class', label: 'Middle Class', desc: 'Stable home with strong emphasis on education and professional careers.' },
  { origin: 'Academic Family', label: 'Academic Family', desc: 'Scholarly lineage with early childhood smarts advantages (+18 Smarts).' },
  { origin: 'Old Money Elite', label: 'Old Money Dynasty', desc: 'Prestigious family dynasty with generational landholdings and high reputation.' }
];

const TRAITS: { trait: PersonalityTrait; label: string; perk: string }[] = [
  { trait: 'Genius Mind', label: 'Genius Mind', perk: '+20 Smarts. Excels in Computer Science, Medicine & Law.' },
  { trait: 'Natural Athlete', label: 'Natural Athlete', perk: '+15 Health. Innate cricket & athletic talent.' },
  { trait: 'Creative Prodigy', label: 'Creative Prodigy', perk: 'Elevated masterpiece rate in literature and music.' },
  { trait: 'Silver Tongue', label: 'Silver Tongue', perk: '+15 Looks & Charisma. Persuasive in business and courting.' },
  { trait: 'Workaholic', label: 'Workaholic', perk: 'Boundless ambition and work stamina.' },
  { trait: 'Resilient', label: 'Resilient Spirit', perk: '+10 Health/Happiness resilience against hardship.' }
];

export const NewGameModal: React.FC<NewGameModalProps> = ({ isOpen, onClose }) => {
  const { startNewLife, deletePlayedHistory } = useGame();

  const [name, setName] = useState('Hamza Malik');
  const [gender, setGender] = useState<Gender>('Male');
  const [city, setCity] = useState<PakistanCity>(PAKISTAN_CITIES[0]); // Karachi
  const [origin, setOrigin] = useState<BackgroundOrigin>('Middle Class');
  const [trait, setTrait] = useState<PersonalityTrait>('Natural Athlete');
  const [startAge, setStartAge] = useState<number>(0); // 0 or 18

  if (!isOpen) return null;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    startNewLife({
      name: name.trim(),
      gender,
      city,
      origin,
      trait,
      startAge
    });
    onClose();
  };

  const handleDeleteHistory = () => {
    deletePlayedHistory();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="card-v4 max-w-xl w-full p-6 sm:p-8 bg-[#F4F2EE] shadow-xl my-8 relative border border-black/15">
        <div className="flex items-center justify-between pb-4 border-b border-black/10 mb-6">
          <div>
            <span className="meta-label text-[#B8860B]">New Life Setup</span>
            <h2 className="font-grotesk text-3xl font-bold text-[#1C1C1C]">
              Begin Life Journey
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-black/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-[#1C1C1C]" />
          </button>
        </div>

        {/* Live Animated Persona Preview */}
        <div className="flex items-center gap-4 p-3.5 rounded-lg bg-[#EAE6DF] border border-black/10 mb-5">
          <CharacterAvatar
            name={name || 'Player'}
            age={startAge}
            gender={gender}
            size="lg"
            animated={true}
          />
          <div className="min-w-0">
            <div className="meta-label text-[#B8860B] mb-0.5">
              Live Animated Persona Preview
            </div>
            <div className="font-grotesk font-bold text-base text-[#1C1C1C] truncate">
              {name || 'Player'} · {getLifeStageLabel(startAge)}
            </div>
            <p className="text-[11px] text-[#1C1C1C] opacity-75 mt-0.5">
              Cartoonish animated procedural character that breathes, blinks, and visually grows throughout life.
            </p>
          </div>
        </div>

        <form onSubmit={handleStart} className="space-y-5">
          {/* Life Starting Age Selection */}
          <div>
            <label className="meta-label mb-1.5 text-[#1C1C1C]">Starting Age Point</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStartAge(0)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  startAge === 0
                    ? 'bg-[#1C1C1C] text-white border-black'
                    : 'bg-[#EAE6DF] text-[#1C1C1C] border-black/10 hover:border-black/30'
                }`}
              >
                <span className="font-grotesk font-bold text-sm block">Age 0 · Newborn Infancy</span>
                <span className="text-[11px] opacity-75 block mt-0.5">Experience childhood, schooling, and growing up from birth</span>
              </button>

              <button
                type="button"
                onClick={() => setStartAge(18)}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  startAge === 18
                    ? 'bg-[#1C1C1C] text-white border-black'
                    : 'bg-[#EAE6DF] text-[#1C1C1C] border-black/10 hover:border-black/30'
                }`}
              >
                <span className="font-grotesk font-bold text-sm block">Age 18 · Adulthood</span>
                <span className="text-[11px] opacity-75 block mt-0.5">Jump straight into university, corporate careers, and business</span>
              </button>
            </div>
          </div>

          {/* Name & Gender */}
          {/* Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="meta-label text-[#1C1C1C]">Full Character Name</label>
                <button
                  type="button"
                  onClick={() => setName(generateRandomName(gender))}
                  className="text-[11px] font-semibold text-[#B8860B] hover:text-[#9A7009] flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Randomize Name</span>
                </button>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded border border-black/20 bg-white text-sm text-[#1C1C1C] focus:outline-none focus:border-[#B8860B]"
                placeholder="e.g. Hamza Malik"
              />
            </div>

            <div>
              <label className="meta-label mb-1 text-[#1C1C1C]">Gender &amp; Style</label>
              <div className="grid grid-cols-3 gap-1.5 bg-[#EAE6DF] p-1 rounded">
                {(['Male', 'Female', 'Non-Binary'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGender(g);
                      if (name === 'Hamza Malik' && g === 'Female') {
                        setName('Ayesha Malik');
                      } else if (name === 'Ayesha Malik' && g === 'Male') {
                        setName('Hamza Malik');
                      }
                    }}
                    className={`py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                      gender === g
                        ? g === 'Female'
                          ? 'bg-pink-700 text-white'
                          : 'bg-[#1C1C1C] text-white'
                        : 'text-[#1C1C1C] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span>{g === 'Female' ? '♀' : g === 'Male' ? '♂' : '⚧'}</span>
                    <span>{g === 'Non-Binary' ? 'NB' : g}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 10 Pakistan Cities ONLY */}
          <div>
            <label className="meta-label mb-1 text-[#1C1C1C]">Birth City (Pakistan Only)</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value as typeof PAKISTAN_CITIES[number])}
              className="w-full px-3.5 py-2.5 rounded border border-black/20 bg-white text-sm text-[#1C1C1C] focus:outline-none focus:border-[#B8860B] font-medium"
            >
              {PAKISTAN_CITIES.map((c) => (
                <option key={c} value={c}>{c}, Pakistan</option>
              ))}
            </select>
          </div>

          {/* Family Heritage */}
          <div>
            <label className="meta-label mb-1.5 text-[#1C1C1C]">Family Heritage & Social Background</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ORIGINS.map((item) => (
                <button
                  key={item.origin}
                  type="button"
                  onClick={() => setOrigin(item.origin)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    origin === item.origin
                      ? 'bg-[#EAE6DF] border-[#B8860B] ring-1 ring-[#B8860B]'
                      : 'bg-white border-black/10 hover:border-black/30'
                  }`}
                >
                  <span className="font-grotesk font-bold text-xs text-[#1C1C1C] block">{item.label}</span>
                  <span className="text-[11px] text-[#1C1C1C] opacity-70 block mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Character Gift / Trait */}
          <div>
            <label className="meta-label mb-1.5 text-[#1C1C1C]">Innate Character Gift</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TRAITS.map((item) => (
                <button
                  key={item.trait}
                  type="button"
                  onClick={() => setTrait(item.trait)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    trait === item.trait
                      ? 'bg-[#EAE6DF] border-[#B8860B] ring-1 ring-[#B8860B]'
                      : 'bg-white border-black/10 hover:border-black/30'
                  }`}
                >
                  <span className="font-grotesk font-bold text-xs text-[#1C1C1C] flex items-center gap-1.5 block">
                    <Sparkles className="w-3 h-3 text-[#B8860B]" />
                    {item.label}
                  </span>
                  <span className="text-[11px] text-[#1C1C1C] opacity-70 block mt-0.5">{item.perk}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="btn-v4-accent w-full py-3.5 text-sm font-bold tracking-wider uppercase cursor-pointer"
            >
              Start Life at Age {startAge} in {city}
            </button>

            <button
              type="button"
              onClick={handleDeleteHistory}
              className="w-full py-2.5 px-4 text-xs font-semibold text-rose-700 hover:text-rose-900 border border-rose-300 rounded hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Played History &amp; Reset to Newborn (Age 0)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
