import React from 'react';
import { useGame } from '../context/GameContext';
import { Volume2, VolumeX, Plus, Trash2 } from 'lucide-react';
import { CharacterAvatar, getLifeStageLabel } from './CharacterAvatar';

interface SystemSidebarProps {
  onOpenNewLifeModal: () => void;
}

export const SystemSidebar: React.FC<SystemSidebarProps> = ({ onOpenNewLifeModal }) => {
  const { character, ageUp, audioEnabled, toggleAudio, deletePlayedHistory } = useGame();

  const realEstateVal = character.realEstate.reduce((sum, r) => sum + r.currentValue, 0);
  const bizVal = character.businesses.reduce((sum, b) => sum + (b.valuation * (b.sharesOwnedPct / 100)), 0);
  const toysVal = character.luxuryToys.reduce((sum, t) => sum + t.value, 0);
  const netWorth = character.cash + realEstateVal + bizVal + toysVal;

  return (
    <aside className="w-full lg:w-[350px] sidebar-v4 p-6 sm:p-8 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-6">
        {/* Character Title Block */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="meta-label">Character</span>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAudio}
                className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                title="Toggle Sound"
              >
                {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
              <span className="meta-label text-[#B8860B] font-bold">
                {character.isAlive ? 'Active' : 'Deceased'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 mt-2">
            <CharacterAvatar
              name={character.name}
              age={character.age}
              gender={character.gender}
              size="lg"
              animated={true}
              happiness={character.stats.happiness}
            />
            <div className="flex-1 min-w-0">
              <span className="meta-label text-[#B8860B] font-bold">
                {getLifeStageLabel(character.age)}
              </span>
              <h1 className="font-grotesk text-2xl font-bold leading-tight text-[#1C1C1C] truncate">
                {character.name}
              </h1>
              <p className="text-xs mt-0.5 text-[#1C1C1C] opacity-85 font-medium truncate flex items-center gap-1.5">
                <span>Age {character.age}</span>
                <span>·</span>
                <span className="font-bold text-[#B8860B]">Year {character.currentYear}</span>
                <span>·</span>
                <span className="truncate">{character.city}</span>
              </p>
              <div className="text-[11px] text-[#1C1C1C] opacity-65 mt-1 flex items-center gap-1.5 truncate">
                <span className="font-semibold">{character.socialStatus.tier}</span>
                <span>·</span>
                <span>Rep: {character.socialStatus.reputationScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liquid Assets Card */}
        <div className="card-v4 p-5">
          <div className="meta-label">Liquid Assets</div>
          <div className="font-grotesk text-3xl sm:text-4xl font-bold text-[#1C1C1C] mt-1 tabular-nums">
            ${character.cash.toLocaleString()}
          </div>
          <div className="text-xs text-[#1C1C1C] opacity-60 mt-1">
            Total Net Worth: ${netWorth.toLocaleString()}
          </div>
        </div>

        {/* Vitals Progress Bars */}
        <div className="space-y-3.5">
          {/* Health */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="meta-label">Health</span>
              <span className="text-xs font-semibold tabular-nums">{character.stats.health}%</span>
            </div>
            <div className="progress-v4">
              <div
                className="h-full bg-[#B8860B] transition-all duration-300"
                style={{ width: `${character.stats.health}%` }}
              />
            </div>
          </div>

          {/* Happiness */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="meta-label">Happiness</span>
              <span className="text-xs font-semibold tabular-nums">{character.stats.happiness}%</span>
            </div>
            <div className="progress-v4">
              <div
                className="h-full bg-[#B8860B] transition-all duration-300"
                style={{ width: `${character.stats.happiness}%` }}
              />
            </div>
          </div>

          {/* Smarts */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="meta-label">Smarts</span>
              <span className="text-xs font-semibold tabular-nums">{character.stats.smarts}%</span>
            </div>
            <div className="progress-v4">
              <div
                className="h-full bg-[#1C1C1C] transition-all duration-300"
                style={{ width: `${character.stats.smarts}%` }}
              />
            </div>
          </div>

          {/* Energy */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="meta-label">Energy</span>
              <span className="text-xs font-semibold tabular-nums text-[#2E7D32]">{character.stats.energy}%</span>
            </div>
            <div className="progress-v4">
              <div
                className="h-full bg-[#2E7D32] transition-all duration-300"
                style={{ width: `${character.stats.energy}%` }}
              />
            </div>
          </div>

          {/* Looks */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="meta-label">Looks & Charisma</span>
              <span className="text-xs font-semibold tabular-nums">{character.stats.looks}%</span>
            </div>
            <div className="progress-v4">
              <div
                className="h-full bg-[#555] transition-all duration-300"
                style={{ width: `${character.stats.looks}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-black/10 space-y-2 mt-6">
        <button
          onClick={ageUp}
          disabled={!character.isAlive}
          className={`w-full py-3.5 px-4 font-grotesk text-sm font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
            character.isAlive
              ? 'bg-[#1C1C1C] hover:bg-[#B8860B] text-white'
              : 'bg-black/20 text-black/40 cursor-not-allowed'
          }`}
        >
          {character.isAlive ? 'Age +1 Year' : 'Simulation Terminated'}
        </button>

        <button
          onClick={onOpenNewLifeModal}
          className="w-full btn-v4-outline py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Start New Life</span>
        </button>

        <button
          onClick={deletePlayedHistory}
          className="w-full py-2 px-3 text-[11px] font-medium text-rose-700 hover:text-rose-900 hover:bg-rose-50 rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reset &amp; Delete History</span>
        </button>
      </div>
    </aside>
  );
};
