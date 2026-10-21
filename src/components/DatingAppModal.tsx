import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CharacterAvatar } from './CharacterAvatar';
import {
  getDatingConfigForCity,
  generateSuitorListForRegion,
  SuitorProfile
} from '../data/datingData';
import { PAKISTAN_CITIES } from '../utils/names';
import {
  X,
  Heart,
  Sparkles,
  RefreshCw,
  Coffee,
  ShieldAlert,
  MapPin,
  AlertTriangle,
  Lock
} from 'lucide-react';

interface DatingAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferredAppId?: string; // Optional if opened specifically for DilMil or international
}

export const DatingAppModal: React.FC<DatingAppModalProps> = ({ isOpen, onClose }) => {
  const { character, addDatingContact } = useGame();
  const [suitors, setSuitors] = useState<SuitorProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const inPakistan = PAKISTAN_CITIES.some((pk) => character.city.includes(pk)) || character.city.toLowerCase().includes('pakistan');
  const regionConfig = getDatingConfigForCity(character.city);

  const spouses = character.relationships.filter((r) => r.type === 'Spouse');
  const isMarried = spouses.length > 0;

  useEffect(() => {
    if (isOpen && character.age >= 15) {
      setSuitors(generateSuitorListForRegion(regionConfig, character.gender, character.age, 6));
      setCurrentIndex(0);
      setFeedback(null);
    }
  }, [isOpen, character.gender, character.age, character.city]);

  if (!isOpen) return null;

  const isUnderage = character.age < 15;
  const currentSuitor = suitors[currentIndex];

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex < suitors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Regenerate fresh suitors for region
      setSuitors(generateSuitorListForRegion(regionConfig, character.gender, character.age, 6));
      setCurrentIndex(0);
    }
  };

  const handleSwipeRight = () => {
    if (!currentSuitor) return;
    const res = addDatingContact(
      currentSuitor,
      `Matched on ${regionConfig.appName} with ${currentSuitor.name} (${currentSuitor.occupation}) from ${currentSuitor.city}!`,
      0
    );
    setFeedback(res.message);
    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleTakeOnDate = (spot: { id: string; label: string; cost: number; bonusAffection: number; description: string }) => {
    if (!currentSuitor) return;

    const updated: SuitorProfile = {
      ...currentSuitor,
      affection: Math.min(100, currentSuitor.affection + spot.bonusAffection)
    };

    const story = `Took ${currentSuitor.name} on a date in ${currentSuitor.city}: ${spot.label}. ${spot.description}`;
    const res = addDatingContact(updated, story, spot.cost);
    setFeedback(res.message);
    setTimeout(() => {
      handleNext();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="card-v4 bg-[#F4F2EE] max-w-lg w-full p-6 shadow-2xl border border-black/20 text-[#1C1C1C] my-6 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* App Title Bar */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${regionConfig.brandColor} flex items-center justify-center shadow-sm text-white font-bold text-lg`}>
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-grotesk text-xl font-bold tracking-tight text-[#1C1C1C]">
                  {regionConfig.tagline}
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-pink-100 text-pink-700 border border-pink-200">
                  {regionConfig.badge}
                </span>
              </div>
              <p className="text-[11px] text-[#1C1C1C] opacity-70">
                {regionConfig.subTitle} · Current Location: <strong>{character.city}</strong>
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

        {/* Region Lock Notice if living abroad: DilMil paused */}
        {!inPakistan && (
          <div className="mb-4 p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-1.5 font-bold">
                <span>International Dating Unlocked ({regionConfig.appName})</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-rose-100 text-rose-800 rounded border border-rose-200">
                  DilMil Paused (Region-Locked)
                </span>
              </div>
              <p className="text-[11px] opacity-80 mt-0.5">
                Since you relocated abroad to <strong>{character.city}</strong>, Pakistan-only DilMil services have stopped. You are browsing verified local international suitors in {regionConfig.region}.
              </p>
            </div>
          </div>
        )}

        {/* Marital Warning Banner if Married */}
        {isMarried && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-900">Marital Infidelity Warning:</strong>
              <p className="text-[11px] opacity-90 mt-0.5">
                You are currently married to <strong>{spouses.map(s => s.name).join(', ')}</strong>. Courting or matching on dating apps will spark severe domestic outrage, heartbreak, and affection collapse if discovered!
              </p>
            </div>
          </div>
        )}

        {/* Underage Lock Condition (<15) */}
        {isUnderage ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C]">
                Underage Security Lock
              </h4>
              <p className="text-xs text-[#1C1C1C] opacity-75 mt-1.5 max-w-sm mx-auto leading-relaxed">
                You are currently <strong>Age {character.age}</strong>. Family laws and {regionConfig.appName} safety guidelines strictly require users to be at least <strong>15 years old</strong> to begin dating.
              </p>
              <div className="mt-4 p-3 rounded-md bg-[#EAE6DF] text-[11px] text-[#1C1C1C] font-medium inline-block">
                Focus on school, street cricket, family bonding, and childhood development!
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn-v4 px-6 py-2.5 text-xs font-semibold"
            >
              Close Dating App
            </button>
          </div>
        ) : (
          /* Dating App Interface (Age >= 15) */
          <div className="space-y-4 flex-1 flex flex-col justify-between">
            {feedback && (
              <div className="p-3 rounded-lg bg-pink-50 border border-pink-300 text-xs text-pink-900 font-semibold flex items-center gap-2 animate-fade-in">
                <Sparkles className="w-4 h-4 text-pink-600 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            {currentSuitor ? (
              <div className="bg-white rounded-2xl border border-black/10 p-5 shadow-sm space-y-4">
                {/* Profile Avatar & Header */}
                <div className="flex items-start gap-4">
                  <CharacterAvatar
                    name={currentSuitor.name}
                    age={currentSuitor.age}
                    gender={currentSuitor.gender}
                    size="lg"
                    animated={true}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C] truncate">
                        {currentSuitor.name}
                      </h4>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {currentSuitor.compatibility}% Match
                      </span>
                    </div>

                    <div className="text-xs text-[#1C1C1C] font-semibold mt-0.5 flex flex-wrap gap-x-2">
                      <span className="text-[#B8860B]">Age {currentSuitor.age}</span>
                      <span>·</span>
                      <span>{currentSuitor.gender}</span>
                      <span>·</span>
                      <span className="opacity-80">{currentSuitor.city}, {currentSuitor.country}</span>
                    </div>

                    <p className="text-xs text-[#1C1C1C] opacity-75 mt-1 font-medium">
                      💼 {currentSuitor.occupation}
                    </p>
                    <p className="text-[11px] text-[#1C1C1C] opacity-65">
                      🎓 {currentSuitor.education}
                    </p>
                  </div>
                </div>

                {/* Bio Tagline Box */}
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs italic text-[#1C1C1C] leading-relaxed">
                  "{currentSuitor.bio}"
                </div>

                {/* Compatibility Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#F4F2EE] border border-black/5">
                    <span className="meta-label text-[10px] block">Personality</span>
                    <span className="font-bold text-[#1C1C1C]">{currentSuitor.personality}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F4F2EE] border border-black/5">
                    <span className="meta-label text-[10px] block">Est. Net Worth</span>
                    <span className="font-bold text-[#1C1C1C]">${currentSuitor.netWorth.toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F4F2EE] border border-black/5">
                    <span className="meta-label text-[10px] block">Affection Base</span>
                    <span className="font-bold text-[#1C1C1C]">{currentSuitor.affection}%</span>
                  </div>
                </div>

                {/* First Date Invitations Grid based on Region */}
                <div>
                  <label className="meta-label text-[#B8860B] block mb-2">
                    Invite on a {regionConfig.region} First Date
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {regionConfig.dateSpots.map((spot) => (
                      <button
                        key={spot.id}
                        onClick={() => handleTakeOnDate(spot)}
                        disabled={character.cash < spot.cost}
                        className="p-2.5 rounded-lg border border-black/10 bg-[#FAF8F5] hover:bg-amber-50 hover:border-amber-300 text-left transition-all cursor-pointer disabled:opacity-40"
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-[#1C1C1C]">
                          <span className="truncate pr-1">{spot.label}</span>
                          <span className="font-mono text-[#B8860B] shrink-0">${spot.cost}</span>
                        </div>
                        <span className="text-[10px] opacity-70 block mt-0.5 line-clamp-1">{spot.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Core Swipe Controls */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleNext}
                    className="w-full py-3 px-4 rounded-xl border border-black/20 hover:bg-black/5 font-grotesk text-xs font-bold text-[#1C1C1C] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Pass / Next Suitor</span>
                  </button>

                  <button
                    onClick={handleSwipeRight}
                    className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${regionConfig.brandColor} text-white font-grotesk text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:opacity-95`}
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Swipe Right · Start Dating</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-2xl border border-black/10">
                <p className="text-xs text-[#1C1C1C] opacity-75">No more suitors in this stack.</p>
                <button
                  onClick={() => {
                    setSuitors(generateSuitorListForRegion(regionConfig, character.gender, character.age, 6));
                    setCurrentIndex(0);
                  }}
                  className="btn-v4-accent text-xs mt-3 px-4 py-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  Load Fresh Matches
                </button>
              </div>
            )}

            {/* Bottom Footer Info */}
            <div className="flex items-center justify-between text-[11px] text-[#1C1C1C] opacity-70 pt-2 border-t border-black/10">
              <span>Candidate {currentIndex + 1} of {suitors.length} ({regionConfig.appName})</span>
              <button
                onClick={() => {
                  setSuitors(generateSuitorListForRegion(regionConfig, character.gender, character.age, 6));
                  setCurrentIndex(0);
                  setFeedback(`Loaded new batch of verified suitors in ${regionConfig.region}!`);
                }}
                className="hover:text-[#B8860B] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh Suitors</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
