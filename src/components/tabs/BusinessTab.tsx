import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { BUSINESS_BLUEPRINTS } from '../../data/businessData';

export const BusinessTab: React.FC = () => {
  const {
    character,
    foundBusinessVenture,
    upgradeBusinessRD,
    adjustMarketing,
    sellBusiness,
    ipoBusiness
  } = useGame();

  const [selectedBlueprintIdx, setSelectedBlueprintIdx] = useState(0);
  const [customBizName, setCustomBizName] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const showMsg = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 5000);
  };

  if (character.age < 18) {
    return (
      <div className="card-v4 p-8 text-center space-y-3 animate-fade-in">
        <span className="meta-label text-[#B8860B]">Age Requirement Locked</span>
        <h3 className="font-grotesk text-2xl font-bold text-[#1C1C1C]">
          Too Young to Incorporate Companies
        </h3>
        <p className="text-xs text-[#1C1C1C] opacity-75 max-w-md mx-auto">
          Company incorporation and commercial enterprises under Pakistani SECP regulations require legal adulthood (Age 18+). Focus on schooling and sports!
        </p>
      </div>
    );
  }

  const totalEnterpriseValue = character.businesses.reduce(
    (sum, b) => sum + (b.valuation * (b.sharesOwnedPct / 100)),
    0
  );

  const totalAnnualProfits = character.businesses.reduce(
    (sum, b) => sum + (b.annualProfit * (b.sharesOwnedPct / 100)),
    0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Portfolio Header */}
      <div className="card-v4 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="meta-label text-[#B8860B] mb-1">Commercial Holdings</span>
          <h3 className="font-grotesk text-3xl font-bold text-[#1C1C1C]">
            {character.businesses.length} Active Ventures
          </h3>
          <div className="text-xs text-[#1C1C1C] opacity-75 mt-1 flex flex-wrap gap-2">
            <span>Valuation: <strong>${totalEnterpriseValue.toLocaleString()}</strong></span>
            <span>·</span>
            <span>Annual Dividends: <strong>${totalAnnualProfits.toLocaleString()}/yr</strong></span>
          </div>
        </div>

        <div className="text-right">
          <span className="meta-label">Liquid Capital</span>
          <span className="font-grotesk text-2xl font-bold text-[#1C1C1C] tabular-nums">
            ${character.cash.toLocaleString()}
          </span>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded bg-white border border-black/10 text-xs text-[#1C1C1C] font-medium">
          {feedback}
        </div>
      )}

      {/* Active Holdings Grid */}
      {character.businesses.length > 0 && (
        <div className="space-y-4">
          <div className="meta-label">Operating Businesses</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {character.businesses.map((biz) => {
              const founderEquity = Math.round(biz.valuation * (biz.sharesOwnedPct / 100));

              return (
                <div key={biz.id} className="card-v4 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C]">{biz.name}</h4>
                        <span className="meta-label">{biz.industry}</span>
                      </div>
                      <div className="text-right">
                        <span className="meta-label">Valuation</span>
                        <span className="font-bold text-sm text-[#1C1C1C]">${biz.valuation.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-3 p-3 rounded bg-white border border-black/10 text-xs">
                      <div>
                        <span className="meta-label text-[10px]">Revenue</span>
                        <span className="font-bold text-[#1C1C1C]">${biz.annualRevenue.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="meta-label text-[10px]">Profit</span>
                        <span className="font-bold text-[#2E7D32]">${biz.annualProfit.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="meta-label text-[10px]">Equity</span>
                        <span className="font-bold text-[#1C1C1C]">{biz.sharesOwnedPct}% (${founderEquity.toLocaleString()})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-black/10">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          const res = upgradeBusinessRD(biz.id);
                          showMsg(res.message);
                        }}
                        disabled={biz.rdLevel >= 5 || character.cash < biz.rdLevel * 45000}
                        className="btn-v4-outline text-xs py-2 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {biz.rdLevel >= 5 ? 'R&D Maxed' : `Upgrade R&D ($${(biz.rdLevel * 45000).toLocaleString()})`}
                      </button>

                      <button
                        onClick={() => adjustMarketing(biz.id, 10000)}
                        className="btn-v4-outline text-xs py-2"
                      >
                        + Marketing ($10k)
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          const res = sellBusiness(biz.id);
                          showMsg(res.message);
                        }}
                        className="btn-v4-outline text-xs py-2 text-rose-700 border-rose-300"
                      >
                        Sell Entity
                      </button>

                      {!biz.isPublic && (
                        <button
                          onClick={() => {
                            const res = ipoBusiness(biz.id);
                            showMsg(res.message);
                          }}
                          disabled={biz.valuation < 5000000}
                          className="btn-v4-accent text-xs py-2 font-bold disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {biz.valuation >= 5000000 ? 'Ring IPO Bell' : 'Req $5M for IPO'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Incorporate New Venture Section */}
      <div className="card-v4 p-6">
        <span className="meta-label mb-1">Incorporate New Venture</span>
        <p className="text-xs text-[#1C1C1C] opacity-75 mb-4">
          Select an industrial sector blueprint, allocate initial capital, and build high-margin enterprise value.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          {BUSINESS_BLUEPRINTS.map((bp, idx) => (
            <button
              key={bp.industry}
              onClick={() => setSelectedBlueprintIdx(idx)}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                selectedBlueprintIdx === idx ? 'bg-[#1C1C1C] text-white border-black' : 'bg-white border-black/10'
              }`}
            >
              <h5 className="font-grotesk font-bold text-xs uppercase mb-1">{bp.industry}</h5>
              <p className="text-[11px] opacity-75 mb-2 leading-snug">{bp.description}</p>
              <div className="text-[10px] opacity-70 border-t border-current/20 pt-1.5 flex justify-between">
                <span>Seed: ${bp.initialCost.toLocaleString()}</span>
                <span>+{bp.reputationPrestige} Rep</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={customBizName}
            onChange={(e) => setCustomBizName(e.target.value)}
            placeholder={`Venture Name (Optional, e.g. ${BUSINESS_BLUEPRINTS[selectedBlueprintIdx].nameOptions[0]})`}
            className="flex-1 px-3.5 py-2.5 rounded border border-black/20 bg-white text-xs text-[#1C1C1C] focus:outline-none focus:border-[#B8860B]"
          />
          <button
            onClick={() => {
              const res = foundBusinessVenture(selectedBlueprintIdx, customBizName);
              showMsg(res.message);
              setCustomBizName('');
            }}
            disabled={character.cash < BUSINESS_BLUEPRINTS[selectedBlueprintIdx].initialCost}
            className="btn-v4-accent text-xs py-2.5 px-5 disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Incorporate (${BUSINESS_BLUEPRINTS[selectedBlueprintIdx].initialCost.toLocaleString()})
          </button>
        </div>
      </div>
    </div>
  );
};
