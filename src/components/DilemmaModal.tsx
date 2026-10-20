import React from 'react';
import { useGame } from '../context/GameContext';
import { Sparkles, Heart, Briefcase, Skull, Shield, Compass, Key, Zap, CheckCircle2 } from 'lucide-react';

export const DilemmaModal: React.FC = () => {
  const { activeDilemma, resolveDilemma } = useGame();

  if (!activeDilemma) return null;

  const getTagBadge = (tag?: string) => {
    switch (tag) {
      case 'GOOD':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            GOOD CHOICE
          </span>
        );
      case 'EVIL':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <Skull className="w-3 h-3 text-rose-700" />
            BAD / EVIL
          </span>
        );
      case 'JOB':
      case 'CAREER':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Briefcase className="w-3 h-3 text-blue-700" />
            CAREER &amp; JOB
          </span>
        );
      case 'DATE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-pink-100 text-pink-800 border border-pink-200">
            <Heart className="w-3 h-3 fill-pink-600 text-pink-600" />
            DATE PROPOSAL
          </span>
        );
      case 'SECRET':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Key className="w-3 h-3 text-purple-700" />
            SECRET CHOICE
          </span>
        );
      case 'VISA':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Compass className="w-3 h-3 text-amber-700" />
            VISA &amp; TRAVEL
          </span>
        );
      case 'TRAIT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Zap className="w-3 h-3 text-indigo-700" />
            TRAIT DISCOVERY
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'career':
        return 'Career & Job Opportunity';
      case 'romance':
        return 'Matrimonial & Dating Proposal';
      case 'ethics':
        return 'Good vs. Bad Moral Dilemma';
      case 'secret':
        return 'Clandestine & Secret Discovery';
      case 'visa':
        return 'Study / Work Visa Opportunity';
      case 'lifestyle':
        return 'Personal Life Transformation';
      default:
        return 'Life Crossroads';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in overflow-y-auto">
      <div className="card-v4 bg-[#F4F2EE] w-full max-w-xl p-5 sm:p-7 shadow-2xl border border-black/20 my-6 max-h-[92vh] overflow-y-auto">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8860B] animate-pulse" />
            <span className="meta-label text-[#B8860B] font-bold uppercase tracking-wider">
              {getCategoryTitle(activeDilemma.category)}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#1C1C1C] opacity-60">
            Kinship Decision Engine
          </span>
        </div>

        {/* Title & Situation (Short and Crisp) */}
        <h2 className="font-grotesk text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-2 leading-tight">
          {activeDilemma.title}
        </h2>

        <p className="text-xs sm:text-sm text-[#1C1C1C] mb-5 p-3.5 rounded-xl bg-white/80 border border-black/10 leading-relaxed shadow-2xs font-medium">
          {activeDilemma.situation}
        </p>

        {/* Choices List */}
        <div className="space-y-3">
          {activeDilemma.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => resolveDilemma(idx)}
              className="w-full text-left p-4 rounded-xl border border-black/15 bg-white hover:border-[#B8860B] hover:shadow-md hover:bg-amber-50/20 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-[#EAE6DF] px-1.5 py-0.5 rounded">
                      Option {idx + 1}
                    </span>
                    {getTagBadge(choice.tag)}
                  </div>
                </div>

                <div className="font-grotesk font-bold text-base text-[#1C1C1C] group-hover:text-[#B8860B] transition-colors">
                  {choice.text}
                </div>

                <p className="text-xs text-[#1C1C1C] opacity-75 mt-0.5 mb-2.5 leading-snug">
                  {choice.description}
                </p>
              </div>

              {/* Trade-off Previews / Quick Consequence Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/8 text-[11px] font-mono">
                {choice.cashChange !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      choice.cashChange >= 0
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Cash: {choice.cashChange >= 0 ? '+' : ''}${choice.cashChange.toLocaleString()}
                  </span>
                )}

                {choice.reputationChange !== undefined && choice.reputationChange !== 0 && (
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      choice.reputationChange >= 0
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Rep: {choice.reputationChange >= 0 ? '+' : ''}{choice.reputationChange}
                  </span>
                )}

                {choice.jobOffer && (
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">
                    Job: {choice.jobOffer.title}
                  </span>
                )}

                {choice.relocateTo && (
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold">
                    Move to: {choice.relocateTo}
                  </span>
                )}

                {choice.traitChange && (
                  <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold">
                    Trait: {choice.traitChange}
                  </span>
                )}

                {choice.statEffects?.karma !== undefined && choice.statEffects.karma !== 0 && (
                  <span
                    className={`px-2 py-0.5 rounded ${
                      choice.statEffects.karma > 0
                        ? 'bg-emerald-50 text-emerald-700 font-semibold'
                        : 'bg-rose-50 text-rose-700 font-semibold'
                    }`}
                  >
                    Karma {choice.statEffects.karma > 0 ? '+' : ''}{choice.statEffects.karma}
                  </span>
                )}

                {choice.statEffects?.health !== undefined && choice.statEffects.health !== 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    Health {choice.statEffects.health > 0 ? '+' : ''}{choice.statEffects.health}
                  </span>
                )}

                {choice.statEffects?.smarts !== undefined && choice.statEffects.smarts !== 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    Smarts {choice.statEffects.smarts > 0 ? '+' : ''}{choice.statEffects.smarts}
                  </span>
                )}

                {choice.statEffects?.happiness !== undefined && choice.statEffects.happiness !== 0 && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    Happy {choice.statEffects.happiness > 0 ? '+' : ''}{choice.statEffects.happiness}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
