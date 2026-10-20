import React from 'react';
import { useGame } from '../context/GameContext';
import { Users, Trash2, Sparkles, Baby, ArrowRight } from 'lucide-react';
import { CharacterAvatar, getLifeStageLabel } from './CharacterAvatar';

interface GameOverModalProps {
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ onRestart }) => {
  const { character, continueAsChild, deletePlayedHistory } = useGame();

  if (character.isAlive) return null;

  const children = character.relationships.filter((c) => c.type === 'Child');

  const realEstateVal = character.realEstate.reduce((sum, r) => sum + r.currentValue, 0);
  const bizVal = character.businesses.reduce((sum, b) => sum + (b.valuation * (b.sharesOwnedPct / 100)), 0);
  const toysVal = character.luxuryToys.reduce((sum, t) => sum + t.value, 0);
  const finalNetWorth = character.cash + realEstateVal + bizVal + toysVal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="card-v4 bg-[#F4F2EE] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-black/20 text-[#1C1C1C] my-8 max-h-[90vh] overflow-y-auto">
        {/* Memorial Header with Avatar */}
        <div className="flex items-center gap-4 mb-4">
          <CharacterAvatar
            name={character.name}
            age={character.age}
            gender={character.gender}
            size="lg"
            animated={false}
          />
          <div className="flex-1 min-w-0">
            <div className="meta-label text-[#B8860B] mb-0.5">
              Life Chronicle Concluded · {getLifeStageLabel(character.age)}
            </div>
            <h2 className="font-grotesk text-2xl sm:text-3xl font-bold text-[#1C1C1C] truncate">
              {character.name}
            </h2>
            <p className="text-xs text-[#1C1C1C] opacity-70">
              Age {character.age} · {character.city}, Pakistan
            </p>
          </div>
        </div>

        <p className="text-xs text-[#1C1C1C] opacity-75 mb-6 p-3.5 rounded-lg bg-[#EAE6DF] border border-black/10 leading-relaxed">
          Passed away at Age {character.age} in {character.city}, Pakistan. Cause: {character.causeOfDeath || 'natural biological cessation in peaceful old age'}.
        </p>

        {/* Financial & Status Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-4 rounded-lg bg-[#EAE6DF] border border-black/10 text-xs">
          <div>
            <span className="meta-label">Final Tier</span>
            <span className="font-bold text-xs sm:text-sm text-[#1C1C1C] block truncate">{character.socialStatus.tier}</span>
          </div>
          <div>
            <span className="meta-label">Net Worth</span>
            <span className="font-bold text-xs sm:text-sm text-[#1C1C1C] tabular-nums block">${finalNetWorth.toLocaleString()}</span>
          </div>
          <div>
            <span className="meta-label">Reputation</span>
            <span className="font-bold text-xs sm:text-sm text-[#1C1C1C] tabular-nums block">{character.socialStatus.reputationScore} / 1000</span>
          </div>
          <div>
            <span className="meta-label">Total Events</span>
            <span className="font-bold text-xs sm:text-sm text-[#1C1C1C] tabular-nums block">{character.lifeLog.length} Records</span>
          </div>
        </div>

        {/* 1. Continue as Next Generation (If has children) */}
        {children.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-white border border-[#B8860B]/40 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <span className="meta-label font-bold text-[#1C1C1C]">
                Next Generation · Continue Dynasty as Heir ({children.length} {children.length === 1 ? 'Child' : 'Children'})
              </span>
            </div>
            <p className="text-xs text-[#1C1C1C] opacity-75 mb-3">
              Play as your surviving child! Inherit 70% of family liquid assets, properties, and corporate shares to carry forward the family legacy.
            </p>

            <div className="space-y-2">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="p-3 rounded-md bg-[#F4F2EE] border border-black/10 flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <CharacterAvatar
                      name={child.name}
                      age={child.age}
                      gender={child.gender}
                      size="sm"
                      animated={true}
                    />
                    <div className="min-w-0">
                      <h4 className="font-grotesk font-bold text-sm text-[#1C1C1C] flex items-center gap-1.5 truncate">
                        <span className="truncate">{child.name}</span>
                        <span className="text-[10px] font-normal opacity-70">
                          (Age {child.age} · {child.gender})
                        </span>
                      </h4>
                      <p className="text-[11px] text-[#1C1C1C] opacity-70 truncate">
                        Vocation: <strong>{child.occupation}</strong> · {child.personality}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => continueAsChild(child.id)}
                    className="btn-v4-accent text-xs py-2 px-3.5 flex items-center gap-1 font-bold"
                  >
                    <span>Play as {child.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Start Brand New Generation from Age 0 */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={deletePlayedHistory}
            className="btn-v4-accent w-full py-3 text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Baby className="w-4 h-4 text-white" />
            <span>Begin Next Generation (Start at Age 0)</span>
          </button>

          <button
            onClick={onRestart}
            className="btn-v4-outline w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Customize Character (Pakistan City, Heritage &amp; Trait)</span>
          </button>

          {/* 3. Delete Played History & Reset to Age 0 */}
          <button
            onClick={deletePlayedHistory}
            className="w-full py-2 px-4 text-xs font-semibold text-rose-700 hover:text-rose-900 border border-rose-300 rounded hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Played History &amp; Clear All Saves</span>
          </button>
        </div>
      </div>
    </div>
  );
};
