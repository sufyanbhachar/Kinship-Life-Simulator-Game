import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { REAL_ESTATE_CATALOG, LUXURY_TOYS_CATALOG } from '../../data/societyData';
import { Home, Compass, ShieldCheck, Sparkles, DollarSign, Award } from 'lucide-react';

export const AssetsClubsTab: React.FC = () => {
  const {
    character,
    buyRealEstate,
    sellRealEstate,
    toggleRental,
    buyLuxuryToy,
    sellLuxuryToy,
    joinClub,
    leaveClub,
    hostSocietyGala
  } = useGame();

  const [activeSubTab, setActiveSubTab] = useState<'realEstate' | 'toys' | 'clubs'>('realEstate');
  const [feedback, setFeedback] = useState<string | null>(null);

  const showMsg = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4500);
  };

  const totalRealEstateVal = character.realEstate.reduce((sum, r) => sum + r.currentValue, 0);
  const totalToysVal = character.luxuryToys.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Strip */}
      <div className="card-v4 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="meta-label text-[#B8860B] mb-1">Material Assets &amp; Society Ties</span>
          <h3 className="font-grotesk text-3xl font-bold text-[#1C1C1C]">
            Standing: {character.socialStatus.tier}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#1C1C1C] opacity-75 mt-1">
            <span>
              Real Estate: <strong className="font-bold text-[#1C1C1C]">${totalRealEstateVal.toLocaleString()}</strong>
            </span>
            <span>·</span>
            <span>
              Luxury Holdings: <strong className="font-bold text-[#1C1C1C]">${totalToysVal.toLocaleString()}</strong>
            </span>
            <span>·</span>
            <span>
              Social Capital: <strong className="font-bold text-[#B8860B]">{character.socialStatus.socialCapital} Pts</strong>
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const res = hostSocietyGala();
            showMsg(res.message);
          }}
          disabled={character.cash < 85000}
          className="btn-v4-accent text-xs py-2.5 px-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Host Charity Gala ($85k)
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-lg bg-white border border-[#B8860B]/30 shadow-xs text-xs text-[#1C1C1C] font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B8860B] shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Sub-Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-black/10 pb-3">
        {[
          { id: 'realEstate', label: `Real Estate Portfolio (${character.realEstate.length})` },
          { id: 'toys', label: `Luxury Collector Pieces (${character.luxuryToys.length})` },
          { id: 'clubs', label: `Elite Clubs & Guilds (${character.socialClubs.filter((c) => c.isMember).length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold cursor-pointer transition-colors ${
              activeSubTab === tab.id
                ? 'bg-[#1C1C1C] text-white shadow-xs'
                : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Real Estate Section */}
      {activeSubTab === 'realEstate' && (
        <div className="space-y-6">
          {/* Owned Properties */}
          <div>
            <span className="meta-label text-[#B8860B] mb-2">Owned Property Portfolio</span>
            {character.realEstate.length === 0 ? (
              <div className="card-v4 p-6 text-center text-xs opacity-70">
                You do not own any real estate deeds. Purchase prime properties in Pakistan below!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.realEstate.map((prop) => (
                  <div key={prop.id} className="card-v4 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-grotesk text-lg font-bold text-[#1C1C1C]">
                            {prop.name}
                          </h4>
                          <span className="meta-label text-slate-500">
                            {prop.type} · Pakistan
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          prop.isRental ? 'bg-[#2E7D32]/10 text-[#2E7D32]' : 'bg-black/5 text-[#1C1C1C]'
                        }`}>
                          {prop.isRental ? 'Rented Out' : 'Primary Residence'}
                        </span>
                      </div>

                      <div className="text-xs space-y-1 mb-4 text-[#1C1C1C] opacity-80">
                        <p>Estimated Market Value: <strong>${prop.currentValue.toLocaleString()}</strong></p>
                        <p>Annual Upkeep: <strong>${prop.maintenancePerYear.toLocaleString()}/yr</strong></p>
                        {prop.isRental && (
                          <p className="text-[#2E7D32] font-semibold">
                            Rental Yield: +${prop.rentalIncomePerYear.toLocaleString()}/yr
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-black/10 pt-3">
                      <button
                        onClick={() => toggleRental(prop.id)}
                        className="btn-v4-outline text-xs py-1.5 px-3 flex-1"
                      >
                        {prop.isRental ? 'Occupy Myself' : 'Lease to Tenants'}
                      </button>
                      <button
                        onClick={() => {
                          const res = sellRealEstate(prop.id);
                          showMsg(res.message);
                        }}
                        className="text-xs text-rose-700 hover:text-rose-900 px-3 py-1.5 rounded hover:bg-rose-50"
                      >
                        Liquidate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Catalog for Sale */}
          <div>
            <span className="meta-label text-[#B8860B] mb-2">Prime Real Estate Catalog (Pakistan)</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {REAL_ESTATE_CATALOG.map((item, idx) => (
                <div key={item.name} className="card-v4 p-5 flex flex-col justify-between">
                  <div>
                    <span className="meta-label text-slate-500 mb-1">{item.type}</span>
                    <h4 className="font-grotesk text-lg font-bold text-[#1C1C1C] mb-2">
                      {item.name}
                    </h4>
                    <div className="text-xs space-y-1 text-[#1C1C1C] opacity-80 mb-4">
                      <p>Price: <strong>${item.purchasePrice.toLocaleString()}</strong></p>
                      <p>Annual Maintenance: ${item.maintenancePerYear.toLocaleString()}/yr</p>
                      <p className="text-[#2E7D32]">Potential Rental Income: ${item.rentalIncomePerYear.toLocaleString()}/yr</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const res = buyRealEstate(idx);
                      showMsg(res.message);
                    }}
                    disabled={character.cash < item.purchasePrice}
                    className="btn-v4 w-full text-xs py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Acquire Deed (${item.purchasePrice.toLocaleString()})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Luxury Toys Section */}
      {activeSubTab === 'toys' && (
        <div className="space-y-6">
          {/* Owned Toys */}
          <div>
            <span className="meta-label text-[#B8860B] mb-2">Private Fleet &amp; Timepieces</span>
            {character.luxuryToys.length === 0 ? (
              <div className="card-v4 p-6 text-center text-xs opacity-70">
                No high-society luxury assets registered.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.luxuryToys.map((toy) => (
                  <div key={toy.id} className="card-v4 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-grotesk text-lg font-bold text-[#1C1C1C]">
                            {toy.name}
                          </h4>
                          <span className="meta-label text-[#B8860B]">
                            {toy.type} · +{toy.prestigeBoost} Prestige
                          </span>
                        </div>
                      </div>
                      <div className="text-xs space-y-1 mb-4 text-[#1C1C1C] opacity-80">
                        <p>Appraised Value: <strong>${toy.value.toLocaleString()}</strong></p>
                        <p>Annual Hangar / Upkeep: ${toy.maintenancePerYear.toLocaleString()}/yr</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const res = sellLuxuryToy(toy.id);
                        showMsg(res.message);
                      }}
                      className="btn-v4-outline text-xs py-1.5 px-3 self-start text-rose-700"
                    >
                      Resell Asset (-15% Depreciation)
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Luxury Catalog */}
          <div>
            <span className="meta-label text-[#B8860B] mb-2">Acquisition Catalog</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {LUXURY_TOYS_CATALOG.map((toy, idx) => (
                <div key={toy.name} className="card-v4 p-5 flex flex-col justify-between">
                  <div>
                    <span className="meta-label text-slate-500 mb-1">{toy.type}</span>
                    <h4 className="font-grotesk text-lg font-bold text-[#1C1C1C] mb-2">
                      {toy.name}
                    </h4>
                    <div className="text-xs space-y-1 text-[#1C1C1C] opacity-80 mb-4">
                      <p>Price: <strong>${toy.value.toLocaleString()}</strong></p>
                      <p>Social Prestige: <strong>+{toy.prestigeBoost} Points</strong></p>
                      <p>Annual Upkeep: ${toy.maintenancePerYear.toLocaleString()}/yr</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const res = buyLuxuryToy(idx);
                      showMsg(res.message);
                    }}
                    disabled={character.cash < toy.value}
                    className="btn-v4 w-full text-xs py-2 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Acquire (${toy.value.toLocaleString()})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Elite Clubs Section */}
      {activeSubTab === 'clubs' && (
        <div className="space-y-4">
          <span className="meta-label text-[#B8860B] mb-2">Elite Private Guilds &amp; Clubs</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {character.socialClubs.map((club) => (
              <div key={club.id} className="card-v4 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-grotesk text-xl font-bold text-[#1C1C1C]">
                        {club.name}
                      </h4>
                      <span className="meta-label text-[#B8860B]">
                        {club.tier} Tier · Req: {club.reputationRequired} Rep
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                      club.isMember ? 'bg-[#2E7D32] text-white' : 'bg-black/5 text-[#1C1C1C]'
                    }`}>
                      {club.isMember ? 'Active Member' : 'Not Enrolled'}
                    </span>
                  </div>

                  <p className="text-xs text-[#1C1C1C] opacity-75 mb-4 leading-relaxed">
                    {club.description}
                  </p>

                  <div className="text-xs space-y-1 text-[#1C1C1C] opacity-80 mb-4 p-3 rounded bg-white/70 border border-black/5">
                    <p>Annual Subscription: <strong>${club.annualFee.toLocaleString()}/yr</strong></p>
                    <p>Prestige Bonus: <strong>+{club.prestigeBonus} Rep Points</strong></p>
                  </div>
                </div>

                <div>
                  {club.isMember ? (
                    <button
                      onClick={() => leaveClub(club.id)}
                      className="btn-v4-outline text-xs py-2 px-4 w-full"
                    >
                      Resign Membership
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        const res = joinClub(club.id);
                        showMsg(res.message);
                      }}
                      disabled={character.socialStatus.reputationScore < club.reputationRequired || character.cash < club.annualFee}
                      className="btn-v4 text-xs py-2 px-4 w-full disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Apply for Initiation (${club.annualFee.toLocaleString()})
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
