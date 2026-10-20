import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { SystemSidebar } from './components/SystemSidebar';
import { OverviewTab } from './components/tabs/OverviewTab';
import { CareerTab } from './components/tabs/CareerTab';
import { BusinessTab } from './components/tabs/BusinessTab';
import { RelationshipsTab } from './components/tabs/RelationshipsTab';
import { AssetsClubsTab } from './components/tabs/AssetsClubsTab';
import { ChronicleTab } from './components/tabs/ChronicleTab';
import { DilemmaModal } from './components/DilemmaModal';
import { PersonModal } from './components/PersonModal';
import { NewGameModal } from './components/NewGameModal';
import { GameOverModal } from './components/GameOverModal';

const GameMain: React.FC = () => {
  const { character, activeContact, setActiveContact } = useGame();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isNewLifeModalOpen, setIsNewLifeModalOpen] = useState<boolean>(false);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'career', label: 'Careers & Arts' },
    { id: 'business', label: 'Businesses' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'society', label: 'Assets & Clubs' },
    { id: 'chronicle', label: 'Chronicle' }
  ];

  return (
    <div className="min-h-screen bg-[#F4F2EE] text-[#1C1C1C] flex flex-col font-sans">
      {/* 2-Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {/* Left Stats Sidebar (350px) */}
        <SystemSidebar onOpenNewLifeModal={() => setIsNewLifeModalOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-x-hidden">
          <div className="w-full max-w-5xl mx-auto space-y-6">
            {/* Header Block */}
            <header className="border-b border-black/10 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-grotesk text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1C1C]">
                    Kinship : Life Simulator
                  </h2>
                  <p className="text-sm text-[#1C1C1C] opacity-70 mt-1 max-w-xl">
                    Deep life simulation: careers, dating, marriage, businesses, and family dynasties in Pakistan.
                  </p>
                </div>

                {/* Current Year Badge Prominently Displayed */}
                <div className="flex items-center gap-2.5 bg-white border border-black/15 px-4 py-2.5 rounded-xl shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8860B] block leading-tight">
                      Simulation Timeline
                    </span>
                    <span className="font-mono text-lg font-bold text-[#1C1C1C]">
                      Year {character.currentYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs Bar */}
              <div className="flex items-center gap-2 mt-5 overflow-x-auto scrollbar-none pb-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#1C1C1C] text-white shadow-sm'
                        : 'bg-[#EAE6DF] text-[#1C1C1C] hover:bg-[#DFDBD3]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </header>

            {/* Active Tab View */}
            <div className="w-full">
              {activeTab === 'overview' && <OverviewTab />}
              {activeTab === 'career' && <CareerTab />}
              {activeTab === 'business' && <BusinessTab />}
              {activeTab === 'relationships' && <RelationshipsTab />}
              {activeTab === 'society' && <AssetsClubsTab />}
              {activeTab === 'chronicle' && <ChronicleTab />}
            </div>
          </div>
        </main>
      </div>

      {/* Quiet Clean Footer */}
      <footer className="border-t border-black/10 bg-[#EAE6DF] py-3 px-6 text-xs text-[#1C1C1C] opacity-70 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
        <span>© {character.currentYear} Kinship : Life Simulator · Pakistani Life &amp; Family Dynasty Engine</span>
        <span>
          Location: {character.city}, Pakistan · Simulation Year: <strong>{character.currentYear}</strong> · Status: {character.isAlive ? 'Active' : 'Deceased'}
        </span>
      </footer>

      {/* Interactive Modals */}
      <DilemmaModal />

      {activeContact && (
        <PersonModal
          contact={activeContact}
          onClose={() => setActiveContact(null)}
        />
      )}

      <NewGameModal
        isOpen={isNewLifeModalOpen}
        onClose={() => setIsNewLifeModalOpen(false)}
      />

      <GameOverModal
        onRestart={() => setIsNewLifeModalOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameMain />
    </GameProvider>
  );
}
