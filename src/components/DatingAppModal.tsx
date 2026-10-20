import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Gender, RelationshipContact } from '../types/game';
import { PAKISTAN_CITIES, generateRandomName, getRandomElement } from '../utils/names';
import { CharacterAvatar } from './CharacterAvatar';
import { X, Heart, Sparkles, RefreshCw, Coffee, Utensils, Compass, Palette, ShieldAlert } from 'lucide-react';

interface DatingAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SuitorProfile extends RelationshipContact {
  city: string;
  bio: string;
  compatibility: number;
  education: string;
}

const MALE_BIOS = [
  'Software Architect at Careem. 80% chai, 20% code. Looking for someone who never puts elaichi in biryani.',
  'Corporate litigation advocate. Will defend your honor in court and win every family dawat debate.',
  'National cricket academy pace bowler. Disciplined on the pitch, gentle off it. Big fan of Nusrat Fateh Ali Khan.',
  'Textile exporter & industrialist. Splitting time between Faisalabad and Lahore. Loves weekend road trips to Murree.',
  'Civil Service (PAS) officer. Deep thinker, loves Faiz poetry, vintage fountain pens, and Margalla Hills hiking.',
  'Fintech founder & amateur squash player. Big ambition, family values, and a weakness for Peshawari chapli kebabs.'
];

const FEMALE_BIOS = [
  'Resident Doctor at Shifa International. Passionate about pediatric care, classical ghazals, and Sunday baking.',
  'Textile & Haute Couture Designer from NCA Lahore. Aesthetic soul, loves vintage truck art and specialty coffee.',
  'Chartered Accountant & Financial Analyst. Sharp with numbers, warm with family, loves long walks on Clifton beach.',
  'Broadcast journalist & documentary filmmaker. Curious mind, world traveler, and loves spirited political chai discussions.',
  'Biotech researcher & nature photographer. Loves exploring northern valleys, starry nights, and quiet reading corners.',
  'Architectural conservationist. Restoring Old Lahore havelis with modern flair. Seeking someone with genuine humor.'
];

const EDUCATION_OPTIONS = [
  'LUMS · B.S. Economics & Finance',
  'NUST · B.S. Computer Engineering',
  'King Edward Medical University · MBBS',
  'National College of Arts (NCA) · B.Des',
  'IBA Karachi · MBA Business',
  'Aga Khan University · M.D. Medicine',
  'Quaid-i-Azam University · M.Phil International Relations',
  'GIKI · B.S. Mechanical & Robotics'
];

function generateSuitors(playerGender: Gender, playerAge: number, count = 5): SuitorProfile[] {
  const targetGender: Gender = playerGender === 'Male' ? 'Female' : 'Male';
  const bios = targetGender === 'Female' ? FEMALE_BIOS : MALE_BIOS;

  const results: SuitorProfile[] = [];
  for (let i = 0; i < count; i++) {
    // Age matched: within -2 to +4 of player's age, min 15
    const candidateAge = Math.max(15, Math.min(65, Math.round(playerAge + Math.random() * 6 - 2)));
    const fullName = generateRandomName(targetGender);
    const city = getRandomElement(PAKISTAN_CITIES);
    const bio = getRandomElement(bios);
    const education = getRandomElement(EDUCATION_OPTIONS);
    const compatibility = Math.floor(Math.random() * 25 + 75); // 75% - 99%

    results.push({
      id: 'suitor_' + Date.now() + '_' + i + '_' + Math.random().toString(36).substring(2, 6),
      name: fullName,
      type: 'Dating',
      age: candidateAge,
      gender: targetGender,
      occupation: getRandomElement([
        'Software Engineer', 'Pediatrician', 'Textile Designer', 'Corporate Lawyer',
        'Chartered Accountant', 'Civil Service Officer', 'Architect', 'Media Producer',
        'Cricket Athlete', 'Biochemist', 'Investment Banker'
      ]),
      netWorth: Math.floor(Math.random() * 1500000 + 40000),
      affection: Math.floor(Math.random() * 20 + 55),
      respect: Math.floor(Math.random() * 20 + 60),
      trust: Math.floor(Math.random() * 20 + 50),
      personality: getRandomElement(['Loyal', 'Ambitious', 'Sophisticated', 'Playful']),
      avatarSeed: Math.floor(Math.random() * 10000),
      city,
      bio,
      compatibility,
      education
    });
  }
  return results;
}

export const DatingAppModal: React.FC<DatingAppModalProps> = ({ isOpen, onClose }) => {
  const { character, addDatingContact } = useGame();
  const [suitors, setSuitors] = useState<SuitorProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && character.age >= 15) {
      setSuitors(generateSuitors(character.gender, character.age, 6));
      setCurrentIndex(0);
      setFeedback(null);
    }
  }, [isOpen, character.gender, character.age]);

  if (!isOpen) return null;

  const isUnderage = character.age < 15;
  const currentSuitor = suitors[currentIndex];

  const handleNext = () => {
    setFeedback(null);
    if (currentIndex < suitors.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Regenerate fresh suitors
      setSuitors(generateSuitors(character.gender, character.age, 6));
      setCurrentIndex(0);
    }
  };

  const handleSwipeRight = () => {
    if (!currentSuitor) return;
    const res = addDatingContact(
      currentSuitor,
      `Matched on DilMil Dating App with ${currentSuitor.name} (${currentSuitor.occupation}) from ${currentSuitor.city}!`,
      0
    );
    setFeedback(res.message);
    setTimeout(() => {
      handleNext();
    }, 1200);
  };

  const handleTakeOnDate = (dateType: 'chai' | 'monal' | 'beach' | 'gallery') => {
    if (!currentSuitor) return;
    let cost = 0;
    let story = '';
    let bonusAffection = 10;

    if (dateType === 'chai') {
      cost = 60;
      bonusAffection = 15;
      story = `Took ${currentSuitor.name} on a first date for karak chai and steaming parathas at Chaaye Khana. Shared endless laughter!`;
    } else if (dateType === 'monal') {
      cost = 300;
      bonusAffection = 25;
      story = `Took ${currentSuitor.name} on a lavish candlelit dinner overlooking the glittering lights of Islamabad from Monal Margalla Hills. Unforgettable chemistry!`;
    } else if (dateType === 'beach') {
      cost = 30;
      bonusAffection = 12;
      story = `Walked along the Arabian Sea shoreline at Clifton Beach with ${currentSuitor.name}, enjoying camel rides and roasted corn.`;
    } else if (dateType === 'gallery') {
      cost = 180;
      bonusAffection = 20;
      story = `Took ${currentSuitor.name} to a contemporary art gallery and high tea in Gulberg, Lahore. Deep intellectual spark!`;
    }

    const updated = {
      ...currentSuitor,
      affection: Math.min(100, currentSuitor.affection + bonusAffection)
    };

    const res = addDatingContact(updated, story, cost);
    setFeedback(res.message);
    setTimeout(() => {
      handleNext();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="card-v4 bg-[#F4F2EE] max-w-lg w-full p-6 shadow-2xl border border-black/20 text-[#1C1C1C] my-6 max-h-[92vh] overflow-y-auto flex flex-col">
        {/* App Title Bar */}
        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-400 flex items-center justify-center shadow-sm text-white font-bold text-lg">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-grotesk text-xl font-bold tracking-tight text-[#1C1C1C]">
                  DilMil · Kinship Match
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-pink-100 text-pink-700 border border-pink-200">
                  Pakistani Rishta &amp; Dating
                </span>
              </div>
              <p className="text-[11px] text-[#1C1C1C] opacity-70">
                Opposite-gender matrimonial &amp; courtship platform
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
                You are currently <strong>Age {character.age}</strong>. Kinship family laws and DilMil guidelines require users to be at least <strong>15 years old</strong> to begin dating.
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
                      <span className="opacity-80">{currentSuitor.city}, Pakistan</span>
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

                {/* First Date Invitations Grid */}
                <div>
                  <label className="meta-label text-[#B8860B] block mb-2">
                    Invite on an Authentic Pakistani First Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTakeOnDate('chai')}
                      disabled={character.cash < 60}
                      className="p-2.5 rounded-lg border border-black/10 bg-[#FAF8F5] hover:bg-amber-50 hover:border-amber-300 text-left transition-all cursor-pointer disabled:opacity-40"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1C1C]">
                        <Coffee className="w-3.5 h-3.5 text-amber-700" />
                        <span>Chai &amp; Paratha ($60)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Chaaye Khana meetup</span>
                    </button>

                    <button
                      onClick={() => handleTakeOnDate('monal')}
                      disabled={character.cash < 300}
                      className="p-2.5 rounded-lg border border-black/10 bg-[#FAF8F5] hover:bg-rose-50 hover:border-rose-300 text-left transition-all cursor-pointer disabled:opacity-40"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1C1C]">
                        <Utensils className="w-3.5 h-3.5 text-rose-600" />
                        <span>Monal Dinner ($300)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Margalla Hills view</span>
                    </button>

                    <button
                      onClick={() => handleTakeOnDate('beach')}
                      disabled={character.cash < 30}
                      className="p-2.5 rounded-lg border border-black/10 bg-[#FAF8F5] hover:bg-cyan-50 hover:border-cyan-300 text-left transition-all cursor-pointer disabled:opacity-40"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1C1C]">
                        <Compass className="w-3.5 h-3.5 text-cyan-600" />
                        <span>Clifton Beach ($30)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Sunset sea stroll</span>
                    </button>

                    <button
                      onClick={() => handleTakeOnDate('gallery')}
                      disabled={character.cash < 180}
                      className="p-2.5 rounded-lg border border-black/10 bg-[#FAF8F5] hover:bg-purple-50 hover:border-purple-300 text-left transition-all cursor-pointer disabled:opacity-40"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1C1C]">
                        <Palette className="w-3.5 h-3.5 text-purple-600" />
                        <span>Art &amp; High Tea ($180)</span>
                      </div>
                      <span className="text-[10px] opacity-70 block mt-0.5">Gulberg gallery tour</span>
                    </button>
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
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-grotesk text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
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
                    setSuitors(generateSuitors(character.gender, character.age, 6));
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
              <span>Candidate {currentIndex + 1} of {suitors.length}</span>
              <button
                onClick={() => {
                  setSuitors(generateSuitors(character.gender, character.age, 6));
                  setCurrentIndex(0);
                  setFeedback('Loaded new batch of verified suitors!');
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
