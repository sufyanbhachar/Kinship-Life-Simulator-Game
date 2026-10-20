import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CharacterState,
  BackgroundOrigin,
  PersonalityTrait,
  Gender,
  LifeDilemma,
  RelationshipContact,
  CorporateField,
  CorporateJob,
  SportType,
  SportsCareer,
  ArtisticMedium,
  ArtisticWork,
  ArtisticCareer,
  BusinessVenture,
  RealEstateAsset,
  LuxuryToy,
  SocialTier,
  LifeLogEntry,
  Education
} from '../types/game';
import { CORPORATE_LADDER, AVAILABLE_DEGREES, CorporateJobTemplate } from '../data/careerData';
import { SPORTS_REGISTRY } from '../data/sportsData';
import { ARTS_CONFIG } from '../data/artsData';
import { BUSINESS_BLUEPRINTS } from '../data/businessData';
import { SOCIAL_TIERS, INITIAL_CLUBS, REAL_ESTATE_CATALOG, LUXURY_TOYS_CATALOG } from '../data/societyData';
import { DILEMMAS_DECK } from '../data/dilemmasData';
import { generateNPC, generateRandomName, generateBabyName, getRandomElement } from '../utils/names';
import { sounds } from '../utils/sound';

interface NewGameParams {
  name: string;
  gender: Gender;
  city: string;
  origin: BackgroundOrigin;
  trait: PersonalityTrait;
  startAge?: number;
}

interface GameContextType {
  character: CharacterState;
  activeDilemma: LifeDilemma | null;
  activeContact: RelationshipContact | null;
  audioEnabled: boolean;
  toggleAudio: () => void;
  setActiveContact: (contact: RelationshipContact | null) => void;
  ageUp: () => void;
  startNewLife: (params: NewGameParams) => void;
  resolveDilemma: (choiceIndex: number) => void;
  quickRoutine: (type: 'gym' | 'meditate' | 'nightclub' | 'study' | 'spa') => { success: boolean; message: string };
  enrollDegree: (degreeName: string) => { success: boolean; message: string };
  applyCorporateJob: (field: CorporateField, rank: number) => { success: boolean; message: string };
  workOvertime: () => { success: boolean; message: string };
  askForRaise: () => { success: boolean; message: string };
  resignCorporateJob: () => void;
  startSportCareer: (sport: SportType) => { success: boolean; message: string };
  trainAthletics: () => { success: boolean; message: string };
  playSeasonMatch: () => { success: boolean; message: string; won: boolean };
  retireSport: () => void;
  produceArtPiece: (medium: ArtisticMedium, title?: string) => { success: boolean; message: string; work?: ArtisticWork };
  foundBusinessVenture: (blueprintIndex: number, customName?: string) => { success: boolean; message: string };
  upgradeBusinessRD: (bizId: string) => { success: boolean; message: string };
  adjustMarketing: (bizId: string, delta: number) => void;
  sellBusiness: (bizId: string) => { success: boolean; message: string };
  ipoBusiness: (bizId: string) => { success: boolean; message: string };
  interactContact: (contactId: string, action: 'chat' | 'gift' | 'vacation' | 'favor' | 'propose' | 'marry' | 'divorce' | 'breakup') => { success: boolean; message: string };
  makeNewFriend: () => { success: boolean; message: string; friend?: RelationshipContact };
  meetDatingCandidate: () => { success: boolean; message: string; candidate?: RelationshipContact };
  addDatingContact: (contact: RelationshipContact, dateStory?: string, dateCost?: number) => { success: boolean; message: string };
  haveBaby: (babyName?: string, babyGender?: Gender) => { success: boolean; message: string; child?: RelationshipContact };
  guideContactCareer: (contactId: string, career: string) => { success: boolean; message: string };
  buyRealEstate: (catalogIndex: number) => { success: boolean; message: string };
  sellRealEstate: (assetId: string) => { success: boolean; message: string };
  toggleRental: (assetId: string) => void;
  buyLuxuryToy: (catalogIndex: number) => { success: boolean; message: string };
  sellLuxuryToy: (toyId: string) => { success: boolean; message: string };
  joinClub: (clubId: string) => { success: boolean; message: string };
  leaveClub: (clubId: string) => void;
  hostSocietyGala: () => { success: boolean; message: string };
  deletePlayedHistory: () => void;
  continueAsChild: (childId: string) => { success: boolean; message: string };
  relocateCharacter: (destinationCity: string, type: 'city' | 'study_visa' | 'work_visa' | 'return_home', cost: number) => { success: boolean; message: string };
}

const STORAGE_KEY = 'LEGACY_AMBITION_SAVE_V3';

export const GameContext = createContext<GameContextType | null>(null);

function calculateSocialTier(reputation: number, netWorth: number): SocialTier {
  for (let i = SOCIAL_TIERS.length - 1; i >= 0; i--) {
    const tierReq = SOCIAL_TIERS[i];
    if (reputation >= tierReq.minReputation && netWorth >= tierReq.minNetWorth) {
      return tierReq.tier;
    }
  }
  return 'Working Class';
}

function createInitialCharacter(params: NewGameParams): CharacterState {
  let startingCash = 3500;
  let startingRep = 50;
  const stats = {
    health: 85,
    happiness: 75,
    smarts: 65,
    looks: 65,
    energy: 100,
    karma: 70
  };

  if (params.origin === 'Humble Beginnings') {
    startingCash = 800;
    stats.energy = 100;
    stats.smarts += 5;
    startingRep = 30;
  } else if (params.origin === 'Working Class') {
    startingCash = 2500;
    startingRep = 50;
  } else if (params.origin === 'Middle Class') {
    startingCash = 9500;
    startingRep = 90;
  } else if (params.origin === 'Academic Family') {
    startingCash = 14000;
    stats.smarts += 18;
    startingRep = 140;
  } else if (params.origin === 'Old Money Elite') {
    startingCash = 120000;
    stats.looks += 10;
    startingRep = 320;
  }

  if (params.trait === 'Genius Mind') stats.smarts = Math.min(100, stats.smarts + 20);
  if (params.trait === 'Natural Athlete') stats.health = Math.min(100, stats.health + 15);
  if (params.trait === 'Creative Prodigy') {
    stats.happiness += 10;
    stats.smarts += 8;
  }
  if (params.trait === 'Silver Tongue') stats.looks = Math.min(100, stats.looks + 15);
  if (params.trait === 'Workaholic') stats.energy = 100;
  if (params.trait === 'Resilient') {
    stats.health += 10;
    stats.happiness += 10;
  }

  const startAge = params.startAge !== undefined ? params.startAge : 0;
  const nameParts = params.name.trim().split(' ');
  const familyLastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'Malik';

  const motherAge = startAge === 0 ? 26 : 46;
  const fatherAge = startAge === 0 ? 28 : 48;

  const mother = generateNPC('Parent', motherAge, params.origin === 'Old Money Elite' ? 'elite' : 'humble', familyLastName);
  mother.name = `${mother.name.split(' ')[0]} ${familyLastName}`;
  mother.gender = 'Female';

  const father = generateNPC('Parent', fatherAge, params.origin === 'Old Money Elite' ? 'elite' : 'humble', familyLastName);
  father.name = `${father.name.split(' ')[0]} ${familyLastName}`;
  father.gender = 'Male';

  const relationships: RelationshipContact[] = [mother, father];
  if (startAge >= 18) {
    relationships.push(generateNPC('Friend', 19, 'humble'));
  }

  const initialLog: LifeLogEntry[] = [
    {
      id: 'log_0',
      age: startAge,
      year: 2026,
      text: startAge === 0
        ? `Born in ${params.city}, Pakistan to loving parents. A brand new life begins with the '${params.trait}' gift at Age 0!`
        : `Graduated secondary school in ${params.city}, Pakistan. Began independent adulthood with the '${params.trait}' gift.`,
      category: 'general',
      impact: 'positive'
    }
  ];

  const clubs = INITIAL_CLUBS.map((c) => ({ ...c }));
  const actualCash = startAge === 0 ? Math.max(150, Math.round(startingCash * 0.05)) : startingCash;
  const birthYear = startAge === 0 ? 2026 : 2008;

  return {
    name: params.name,
    gender: params.gender,
    birthYear,
    currentYear: 2026,
    age: startAge,
    city: params.city,
    origin: params.origin,
    trait: params.trait,
    isAlive: true,
    stats,
    cash: actualCash,
    debt: 0,
    socialStatus: {
      tier: calculateSocialTier(startingRep, actualCash),
      reputationScore: startingRep,
      socialCapital: 10,
      fame: 0
    },
    education: {
      degree: startAge === 0 ? 'Infancy' : 'High School Diploma',
      inProgress: null
    },
    corporateJob: null,
    sportsCareer: null,
    artisticCareer: null,
    businesses: [],
    relationships,
    datingPool: startAge >= 18 ? [generateNPC('Friend', 19, 'humble'), generateNPC('Friend', 20, 'humble')] : [],
    realEstate: [],
    luxuryToys: [],
    socialClubs: clubs,
    lifeLog: initialLog,
    achievements: []
  };
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<CharacterState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return createInitialCharacter({
      name: 'Hamza Malik',
      gender: 'Male',
      city: 'Karachi',
      origin: 'Middle Class',
      trait: 'Silver Tongue',
      startAge: 0
    });
  });

  const [activeDilemma, setActiveDilemma] = useState<LifeDilemma | null>(null);
  const [activeContact, setActiveContact] = useState<RelationshipContact | null>(null);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Sync to local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(character));
    }
  }, [character]);

  const toggleAudio = () => {
    sounds.enabled = !audioEnabled;
    setAudioEnabled(!audioEnabled);
  };

  const addLifeLog = useCallback((text: string, category: LifeLogEntry['category'] = 'general', impact: LifeLogEntry['impact'] = 'neutral') => {
    setCharacter((prev) => {
      const entry: LifeLogEntry = {
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        age: prev.age,
        year: prev.currentYear,
        text,
        category,
        impact
      };
      return {
        ...prev,
        lifeLog: [entry, ...prev.lifeLog]
      };
    });
  }, []);

  const startNewLife = useCallback((params: NewGameParams) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.error('Storage clear error:', err);
      }
    }
    const fresh = createInitialCharacter(params);
    setCharacter(fresh);
    setActiveDilemma(null);
    setActiveContact(null);
    sounds.playPromotion();
  }, []);

  const deletePlayedHistory = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('LEGACY_AMBITION_SAVE_V1');
        localStorage.removeItem('LEGACY_AMBITION_SAVE_V2');
        localStorage.removeItem('LEGACY_AMBITION_SAVE_V3');
        localStorage.clear();
      } catch (err) {
        console.error('Error clearing local storage:', err);
      }
    }
    const fresh = createInitialCharacter({
      name: 'Hamza Malik',
      gender: 'Male',
      city: 'Karachi',
      origin: 'Middle Class',
      trait: 'Natural Athlete',
      startAge: 0
    });
    setCharacter(fresh);
    setActiveDilemma(null);
    setActiveContact(null);
    sounds.playPromotion();
  }, []);

  const continueAsChild = useCallback((childId: string) => {
    let msg = '';
    setCharacter((prev) => {
      const child = prev.relationships.find((c) => c.id === childId);
      if (!child) {
        msg = 'Child heir not found in relationships.';
        return prev;
      }

      const inheritedCash = Math.max(3500, Math.round(prev.cash * 0.7));
      const familyLastName = prev.name.split(' ')[1] || 'Malik';

      const ancestorParent: RelationshipContact = {
        id: 'ancestor_' + Date.now(),
        name: prev.name,
        type: 'Parent',
        age: prev.age,
        gender: prev.gender,
        occupation: prev.corporateJob?.title || 'Former Dynasty Patriarch / Matriarch',
        netWorth: 0,
        affection: 100,
        respect: 100,
        trust: 100,
        personality: 'Loyal',
        avatarSeed: 1
      };

      const otherChildrenAsSiblings: RelationshipContact[] = prev.relationships
        .filter((c) => c.type === 'Child' && c.id !== childId)
        .map((s) => ({
          ...s,
          type: 'Sibling' as const
        }));

      const childStats = {
        health: 95,
        happiness: 90,
        smarts: 75,
        looks: 75,
        energy: 100,
        karma: 85
      };

      const startDegree = child.age < 6 ? 'Infancy' : child.age < 18 ? 'High School Diploma' : (child.guidedCareer ? 'MBA Business' : 'High School Diploma');

      const genLog: LifeLogEntry[] = [
        {
          id: 'gen_start_' + Date.now(),
          age: child.age,
          year: prev.currentYear,
          text: `Ascended as the next generation heir of the ${familyLastName} family dynasty in ${prev.city}, Pakistan! Inherited estate deeds, company shares, and $${inheritedCash.toLocaleString()} in liquid inheritance.`,
          category: 'achievement',
          impact: 'positive'
        }
      ];

      msg = `Now continuing dynasty as ${child.name} (Generation 2+)!`;

      return {
        name: child.name,
        gender: child.gender,
        birthYear: prev.currentYear - child.age,
        currentYear: prev.currentYear,
        age: child.age,
        city: prev.city,
        origin: prev.origin,
        trait: prev.trait,
        isAlive: true,
        stats: childStats,
        cash: inheritedCash,
        debt: 0,
        socialStatus: {
          tier: prev.socialStatus.tier,
          reputationScore: Math.round(prev.socialStatus.reputationScore * 0.65),
          socialCapital: 25,
          fame: Math.round(prev.socialStatus.fame * 0.35)
        },
        education: {
          degree: startDegree,
          inProgress: null
        },
        corporateJob: null,
        sportsCareer: null,
        artisticCareer: null,
        businesses: prev.businesses.map((b) => ({ ...b })),
        relationships: [ancestorParent, ...otherChildrenAsSiblings],
        datingPool: [],
        realEstate: prev.realEstate.map((r) => ({ ...r })),
        luxuryToys: [],
        socialClubs: INITIAL_CLUBS.map((c) => ({ ...c })),
        lifeLog: genLog,
        achievements: [`Dynasty Heir: Continued as ${child.name}`]
      };
    });

    setActiveDilemma(null);
    setActiveContact(null);
    sounds.playPromotion();
    return { success: true, message: msg };
  }, []);

  // Quick actions
  const quickRoutine = useCallback((type: 'gym' | 'meditate' | 'nightclub' | 'study' | 'spa') => {
    if (character.stats.energy < 15) {
      sounds.playWarning();
      return { success: false, message: 'Not enough energy! Wait for next year or rest.' };
    }

    let msg = '';
    setCharacter((prev) => {
      const stats = { ...prev.stats };
      let cashChange = 0;
      stats.energy = Math.max(0, stats.energy - 20);

      if (type === 'gym') {
        stats.health = Math.min(100, stats.health + 6);
        stats.looks = Math.min(100, stats.looks + 3);
        stats.happiness = Math.min(100, stats.happiness + 2);
        msg = 'Intense strength & conditioning workout completed! (+6 Health, +3 Looks)';
      } else if (type === 'meditate') {
        stats.happiness = Math.min(100, stats.happiness + 8);
        stats.karma = Math.min(100, stats.karma + 5);
        msg = 'Mindfulness meditation at dawn brought serene mental clarity. (+8 Happiness, +5 Karma)';
      } else if (type === 'nightclub') {
        if (prev.cash < 500) {
          msg = 'Need at least $500 for entry and cocktails!';
          return prev;
        }
        cashChange = -500;
        stats.happiness = Math.min(100, stats.happiness + 10);
        stats.health = Math.max(0, stats.health - 4);
        stats.looks = Math.min(100, stats.looks + 2);
        msg = 'VIP bottle service and dancing all night at the high-society lounge! (+10 Happiness, -$500)';
      } else if (type === 'study') {
        stats.smarts = Math.min(100, stats.smarts + 6);
        stats.happiness = Math.max(0, stats.happiness - 2);
        msg = 'Delved into advanced finance, literature, and technology research. (+6 Smarts)';
      } else if (type === 'spa') {
        if (prev.cash < 1500) {
          msg = 'Luxury mineral spa requires $1,500.';
          return prev;
        }
        cashChange = -1500;
        stats.health = Math.min(100, stats.health + 8);
        stats.happiness = Math.min(100, stats.happiness + 12);
        stats.looks = Math.min(100, stats.looks + 6);
        msg = 'Rejuvenating Swiss mineral hydrotherapy and deep massage. (+8 Health, +12 Happiness, +6 Looks)';
      }

      sounds.playClick();
      return {
        ...prev,
        stats,
        cash: Math.max(0, prev.cash + cashChange)
      };
    });

    return { success: true, message: msg };
  }, [character.stats.energy]);

  // Education enrollment
  const enrollDegree = useCallback((degreeName: string) => {
    const template = AVAILABLE_DEGREES.find((d) => d.degree === degreeName);
    if (!template) return { success: false, message: 'Degree not found.' };

    if (character.education.inProgress) {
      return { success: false, message: `Already enrolled in ${character.education.inProgress.degree}!` };
    }

    if (character.stats.smarts < template.minSmarts) {
      return { success: false, message: `Requires at least ${template.minSmarts} Smarts to be admitted.` };
    }

    if (character.cash < template.costPerYear) {
      return { success: false, message: `Tuition requires $${template.costPerYear.toLocaleString()} upfront.` };
    }

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - template.costPerYear,
      education: {
        ...prev.education,
        inProgress: {
          degree: template.degree,
          yearsRemaining: template.durationYears,
          tuitionPerYear: template.costPerYear
        }
      }
    }));

    addLifeLog(`Enrolled in ${degreeName} at prestigious university. Paid tuition $${template.costPerYear.toLocaleString()}.`, 'career', 'positive');
    sounds.playPromotion();
    return { success: true, message: `Successfully enrolled in ${degreeName}!` };
  }, [character, addLifeLog]);

  // Corporate Career Actions
  const applyCorporateJob = useCallback((field: CorporateField, rank: number) => {
    const ladder = CORPORATE_LADDER[field];
    const jobTemplate = ladder.find((j) => j.rank === rank);
    if (!jobTemplate) return { success: false, message: 'Position not found.' };

    if (character.stats.smarts < jobTemplate.minSmarts) {
      sounds.playWarning();
      return { success: false, message: `The interview board found your qualifications lacking (requires ${jobTemplate.minSmarts} Smarts).` };
    }

    if (jobTemplate.requiredDegree && character.education.degree !== jobTemplate.requiredDegree) {
      sounds.playWarning();
      return { success: false, message: `Application rejected: Requires a ${jobTemplate.requiredDegree}.` };
    }

    const newJob: CorporateJob = {
      field,
      title: jobTemplate.title,
      rank: jobTemplate.rank,
      salary: jobTemplate.salary,
      performance: 65,
      yearsInRole: 0
    };

    setCharacter((prev) => ({
      ...prev,
      corporateJob: newJob,
      sportsCareer: null, // full-time commitment
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + jobTemplate.prestigePoints
      }
    }));

    addLifeLog(`Hired as ${newJob.title} in ${field} with an annual salary of $${newJob.salary.toLocaleString()}!`, 'career', 'positive');
    sounds.playPromotion();
    return { success: true, message: `Congratulations! You were hired as ${newJob.title}.` };
  }, [character, addLifeLog]);

  const workOvertime = useCallback(() => {
    if (!character.corporateJob) return { success: false, message: 'You have no active corporate job.' };
    if (character.stats.energy < 25) {
      sounds.playWarning();
      return { success: false, message: 'Too exhausted to work overtime!' };
    }

    setCharacter((prev) => {
      if (!prev.corporateJob) return prev;
      const job = { ...prev.corporateJob };
      job.performance = Math.min(100, job.performance + 18);
      const stats = { ...prev.stats };
      stats.energy = Math.max(0, stats.energy - 25);
      stats.health = Math.max(0, stats.health - 4);
      stats.happiness = Math.max(0, stats.happiness - 3);

      return {
        ...prev,
        corporateJob: job,
        stats
      };
    });

    sounds.playClick();
    return { success: true, message: 'Pulled long midnight shifts. Performance jumped to impressive heights!' };
  }, [character]);

  const askForRaise = useCallback(() => {
    if (!character.corporateJob) return { success: false, message: 'You have no active corporate job.' };
    if (character.corporateJob.performance < 75) {
      sounds.playWarning();
      return { success: false, message: `Management declined: Your performance is only ${character.corporateJob.performance}%. Reach 75%+ first.` };
    }

    const bonusRaise = Math.round(character.corporateJob.salary * 0.15);
    setCharacter((prev) => {
      if (!prev.corporateJob) return prev;
      return {
        ...prev,
        corporateJob: {
          ...prev.corporateJob,
          salary: prev.corporateJob.salary + bonusRaise,
          performance: 60
        }
      };
    });

    addLifeLog(`Negotiated a 15% salary increase! New compensation: $${(character.corporateJob.salary + bonusRaise).toLocaleString()}/yr.`, 'career', 'positive');
    sounds.playCash();
    return { success: true, message: `Promotion approved! +$${bonusRaise.toLocaleString()} raise.` };
  }, [character, addLifeLog]);

  const resignCorporateJob = useCallback(() => {
    if (!character.corporateJob) return;
    const title = character.corporateJob.title;
    setCharacter((prev) => ({
      ...prev,
      corporateJob: null
    }));
    addLifeLog(`Resigned from position as ${title}.`, 'career', 'neutral');
    sounds.playClick();
  }, [character.corporateJob, addLifeLog]);

  // Sports Career Actions
  const startSportCareer = useCallback((sport: SportType) => {
    const config = SPORTS_REGISTRY[sport];
    if (!config) return { success: false, message: 'Sport unavailable.' };

    if (character.age < 15) {
      sounds.playWarning();
      return { success: false, message: 'Athletes can only start their sports career after age 15!' };
    }

    if (character.age > 40) {
      sounds.playWarning();
      return { success: false, message: 'Athletes automatically retire after age 40 and cannot start after 40.' };
    }

    if (character.stats.health < 60) {
      sounds.playWarning();
      return { success: false, message: 'Physique too frail. Reach 60+ Health to pass athletic screening.' };
    }

    const newSports: SportsCareer = {
      sport,
      division: 'Amateur League',
      skill: Math.round(character.stats.health * 0.7 + (character.trait === 'Natural Athlete' ? 20 : 0)),
      championships: 0,
      endorsementsPerYear: 0,
      salary: config.baseSalaryByDivision['Amateur League'],
      fame: 10,
      seasonsPlayed: 0
    };

    setCharacter((prev) => ({
      ...prev,
      sportsCareer: newSports,
      corporateJob: null
    }));

    addLifeLog(`Signed amateur athletic contract in ${sport} at age ${character.age}!`, 'career', 'positive');
    sounds.playPromotion();
    return { success: true, message: `Began professional athletic career in ${sport}!` };
  }, [character, addLifeLog]);

  const trainAthletics = useCallback(() => {
    if (!character.sportsCareer) return { success: false, message: 'Not currently an active athlete.' };
    if (character.stats.energy < 25) {
      sounds.playWarning();
      return { success: false, message: 'Not enough energy to train!' };
    }

    setCharacter((prev) => {
      if (!prev.sportsCareer) return prev;
      const sports = { ...prev.sportsCareer };
      sports.skill = Math.min(100, sports.skill + 7);
      const stats = { ...prev.stats };
      stats.energy = Math.max(0, stats.energy - 25);
      stats.health = Math.min(100, stats.health + 4);
      return {
        ...prev,
        sportsCareer: sports,
        stats
      };
    });

    sounds.playClick();
    return { success: true, message: 'Dedicated high-intensity training camp completed. Tactical skill increased!' };
  }, [character]);

  const playSeasonMatch = useCallback(() => {
    if (!character.sportsCareer) return { success: false, message: 'No active sport career.', won: false };
    if (character.stats.energy < 30) {
      sounds.playWarning();
      return { success: false, message: 'Need at least 30 Energy to contest a tournament match.', won: false };
    }

    const currentSport = character.sportsCareer;
    const winProb = (currentSport.skill * 0.6 + character.stats.health * 0.4) / 100;
    const won = Math.random() < winProb;

    setCharacter((prev) => {
      if (!prev.sportsCareer) return prev;
      const sports = { ...prev.sportsCareer };
      const stats = { ...prev.stats };
      stats.energy = Math.max(0, stats.energy - 30);

      let repGain = 0;
      let cashPrize = 0;

      if (won) {
        sports.championships += 1;
        sports.fame = Math.min(100, sports.fame + 12);
        repGain = 25;
        cashPrize = sports.division === 'World Elite' ? 350000 : 45000;
        stats.happiness = Math.min(100, stats.happiness + 15);

        // Division promotions
        if (sports.championships >= 2 && sports.division === 'Amateur League') {
          sports.division = 'Regional Circuit';
          sports.salary = SPORTS_REGISTRY[sports.sport].baseSalaryByDivision['Regional Circuit'];
        } else if (sports.championships >= 5 && sports.division === 'Regional Circuit') {
          sports.division = 'National Pro';
          sports.salary = SPORTS_REGISTRY[sports.sport].baseSalaryByDivision['National Pro'];
          sports.endorsementsPerYear += 120000;
        } else if (sports.championships >= 9 && sports.division === 'National Pro') {
          sports.division = 'World Elite';
          sports.salary = SPORTS_REGISTRY[sports.sport].baseSalaryByDivision['World Elite'];
          sports.endorsementsPerYear += 850000;
        }
      } else {
        stats.happiness = Math.max(0, stats.happiness - 8);
        stats.health = Math.max(0, stats.health - 5);
      }

      return {
        ...prev,
        stats,
        cash: prev.cash + cashPrize,
        sportsCareer: sports,
        socialStatus: {
          ...prev.socialStatus,
          reputationScore: prev.socialStatus.reputationScore + repGain,
          fame: Math.min(100, prev.socialStatus.fame + (won ? 8 : 0))
        }
      };
    });

    if (won) {
      sounds.playPromotion();
      addLifeLog(`Victorious in the ${currentSport.sport} Championship match! Crowned champion with massive applause.`, 'career', 'positive');
      return { success: true, message: `VICTORY! You dominated the championship match and claimed the trophy!`, won: true };
    } else {
      sounds.playWarning();
      addLifeLog(`Narrowly fell short in the grueling ${currentSport.sport} tournament finals.`, 'career', 'negative');
      return { success: true, message: 'Defeated in a hard-fought contest. Regroup and train harder for next season.', won: false };
    }
  }, [character, addLifeLog]);

  const retireSport = useCallback(() => {
    if (!character.sportsCareer) return;
    const sport = character.sportsCareer.sport;
    const titles = character.sportsCareer.championships;
    setCharacter((prev) => ({
      ...prev,
      sportsCareer: null
    }));
    addLifeLog(`Hung up your boots and officially retired from professional ${sport} with ${titles} career trophies.`, 'career', 'neutral');
    sounds.playClick();
  }, [character.sportsCareer, addLifeLog]);

  // Artistic Career Actions
  const produceArtPiece = useCallback((medium: ArtisticMedium, title?: string) => {
    const config = ARTS_CONFIG[medium];
    if (character.stats.energy < config.creationEnergyCost) {
      sounds.playWarning();
      return { success: false, message: `Need ${config.creationEnergyCost} Energy to craft a ${config.projectTerm}.` };
    }

    if (character.cash < config.creationCashCost) {
      sounds.playWarning();
      return { success: false, message: `Production and studio costs require $${config.creationCashCost.toLocaleString()}.` };
    }

    const artTitle = title?.trim() || getRandomElement(config.sampleTitles);

    // Calculate critical acclaim
    let baseScore = Math.round(
      character.stats.smarts * 0.4 +
      character.stats.happiness * 0.3 +
      (character.artisticCareer?.mastery || 40) * 0.3
    );

    if (character.trait === 'Creative Prodigy') baseScore += 15;
    const acclaim = Math.min(100, Math.max(30, baseScore + Math.floor(Math.random() * 20 - 10)));
    const isMasterpiece = acclaim >= 88;
    const royalties = Math.round(acclaim * 1200 * (isMasterpiece ? 3.5 : 1));

    const newWork: ArtisticWork = {
      id: 'art_' + Date.now(),
      title: artTitle,
      medium,
      yearCreated: character.currentYear,
      acclaimScore: acclaim,
      annualRoyalties: royalties,
      isMasterpiece
    };

    setCharacter((prev) => {
      const artCareer: ArtisticCareer = prev.artisticCareer || {
        medium,
        mastery: 40,
        fame: 10,
        works: [],
        awards: []
      };

      artCareer.works.push(newWork);
      artCareer.mastery = Math.min(100, artCareer.mastery + 8);
      artCareer.fame = Math.min(100, artCareer.fame + (isMasterpiece ? 20 : 8));

      if (isMasterpiece && !artCareer.awards.includes(config.highestAward)) {
        artCareer.awards.push(config.highestAward);
      }

      const stats = { ...prev.stats };
      stats.energy = Math.max(0, stats.energy - config.creationEnergyCost);
      stats.happiness = Math.min(100, stats.happiness + (isMasterpiece ? 20 : 10));

      return {
        ...prev,
        stats,
        cash: prev.cash - config.creationCashCost,
        artisticCareer: artCareer,
        socialStatus: {
          ...prev.socialStatus,
          reputationScore: prev.socialStatus.reputationScore + (isMasterpiece ? 80 : 25),
          fame: Math.min(100, prev.socialStatus.fame + (isMasterpiece ? 15 : 5))
        }
      };
    });

    if (isMasterpiece) {
      sounds.playPromotion();
      addLifeLog(`Unveiled "${artTitle}" (${medium}) to historic critical raves! Acclaimed as an undeniable masterpiece (${acclaim}/100).`, 'achievement', 'positive');
    } else {
      sounds.playClick();
      addLifeLog(`Released "${artTitle}" (${medium}). Received respectable critical reviews (${acclaim}/100) and steady royalties.`, 'career', 'positive');
    }

    return {
      success: true,
      message: isMasterpiece
        ? `MAGNUM OPUS! "${artTitle}" received a stellar ${acclaim}/100 score and entered cultural history!`
        : `Released "${artTitle}"! Critical reception score: ${acclaim}/100. Earns $${royalties.toLocaleString()}/yr.`,
      work: newWork
    };
  }, [character, addLifeLog]);

  // Business Empire Actions
  const foundBusinessVenture = useCallback((blueprintIndex: number, customName?: string) => {
    const blueprint = BUSINESS_BLUEPRINTS[blueprintIndex];
    if (!blueprint) return { success: false, message: 'Blueprint not found.' };

    if (character.cash < blueprint.initialCost) {
      sounds.playWarning();
      return { success: false, message: `Requires $${blueprint.initialCost.toLocaleString()} initial seed capital.` };
    }

    const companyName = customName?.trim() || getRandomElement(blueprint.nameOptions);
    const initialRev = Math.round(blueprint.initialCost * 1.4);
    const initialProfit = Math.round(initialRev * blueprint.baseMargin);

    const venture: BusinessVenture = {
      id: 'biz_' + Date.now(),
      name: companyName,
      industry: blueprint.industry,
      valuation: blueprint.initialCost * 2,
      annualRevenue: initialRev,
      annualProfit: initialProfit,
      employees: 6,
      rdLevel: 1,
      marketingBudget: 15000,
      sharesOwnedPct: 100,
      isPublic: false
    };

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - blueprint.initialCost,
      businesses: [...prev.businesses, venture],
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + blueprint.reputationPrestige
      }
    }));

    addLifeLog(`Founded venture "${companyName}" in ${blueprint.industry} with $${blueprint.initialCost.toLocaleString()} initial investment!`, 'finance', 'positive');
    sounds.playPromotion();
    return { success: true, message: `Successfully incorporated "${companyName}"!` };
  }, [character.cash, addLifeLog]);

  const upgradeBusinessRD = useCallback((bizId: string) => {
    const biz = character.businesses.find((b) => b.id === bizId);
    if (!biz) return { success: false, message: 'Business not found.' };
    if (biz.rdLevel >= 5) return { success: false, message: 'R&D already at maximum Tier 5 pinnacle.' };

    const cost = biz.rdLevel * 45000;
    if (character.cash < cost) {
      sounds.playWarning();
      return { success: false, message: `R&D Upgrade costs $${cost.toLocaleString()}.` };
    }

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - cost,
      businesses: prev.businesses.map((b) => {
        if (b.id !== bizId) return b;
        const newRd = b.rdLevel + 1;
        const revBoost = Math.round(b.annualRevenue * 0.25);
        const profitBoost = Math.round(b.annualProfit * 0.3);
        return {
          ...b,
          rdLevel: newRd,
          annualRevenue: b.annualRevenue + revBoost,
          annualProfit: b.annualProfit + profitBoost,
          valuation: Math.round(b.valuation * 1.35)
        };
      })
    }));

    sounds.playCash();
    return { success: true, message: `R&D upgraded to Level ${biz.rdLevel + 1}! Product quality and valuation surged.` };
  }, [character]);

  const adjustMarketing = useCallback((bizId: string, delta: number) => {
    setCharacter((prev) => ({
      ...prev,
      businesses: prev.businesses.map((b) => {
        if (b.id !== bizId) return b;
        const newBudget = Math.max(5000, b.marketingBudget + delta);
        return { ...b, marketingBudget: newBudget };
      })
    }));
    sounds.playClick();
  }, []);

  const sellBusiness = useCallback((bizId: string) => {
    const biz = character.businesses.find((b) => b.id === bizId);
    if (!biz) return { success: false, message: 'Business not found.' };

    const payout = Math.round(biz.valuation * (biz.sharesOwnedPct / 100));

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash + payout,
      businesses: prev.businesses.filter((b) => b.id !== bizId),
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + 40
      }
    }));

    addLifeLog(`Sold "${biz.name}" to an acquisition syndicate for an all-cash exit of $${payout.toLocaleString()}!`, 'achievement', 'positive');
    sounds.playCash();
    return { success: true, message: `Acquisition finalized! You walked away with $${payout.toLocaleString()}.` };
  }, [character.businesses, addLifeLog]);

  const ipoBusiness = useCallback((bizId: string) => {
    const biz = character.businesses.find((b) => b.id === bizId);
    if (!biz) return { success: false, message: 'Business not found.' };
    if (biz.valuation < 5000000) {
      sounds.playWarning();
      return { success: false, message: 'Requires at least $5,000,000 enterprise valuation to file for an Initial Public Offering.' };
    }

    const ipoPop = Math.round(biz.valuation * 2.2);
    const founderLiquidCash = Math.round(ipoPop * 0.25);

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash + founderLiquidCash,
      businesses: prev.businesses.map((b) => {
        if (b.id !== bizId) return b;
        return {
          ...b,
          isPublic: true,
          valuation: ipoPop,
          sharesOwnedPct: 45
        };
      }),
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + 180,
        fame: Math.min(100, prev.socialStatus.fame + 30)
      }
    }));

    addLifeLog(`RANG THE OPENING BELL! "${biz.name}" completed its public listing on the stock exchange. Payout: $${founderLiquidCash.toLocaleString()}.`, 'achievement', 'positive');
    sounds.playPromotion();
    return { success: true, message: `IPO SUCCESS! "${biz.name}" trades on the exchange. You took $${founderLiquidCash.toLocaleString()} off the table!` };
  }, [character.businesses, addLifeLog]);

  // Relationship Interactions
  const interactContact = useCallback((contactId: string, action: 'chat' | 'gift' | 'vacation' | 'favor' | 'propose' | 'marry' | 'divorce') => {
    const contact = character.relationships.find((c) => c.id === contactId);
    if (!contact) return { success: false, message: 'Contact not found.' };

    let outcomeMsg = '';

    setCharacter((prev) => {
      let cashDelta = 0;
      let repDelta = 0;
      const stats = { ...prev.stats };

      const updatedRelationships = prev.relationships.map((c) => {
        if (c.id !== contactId) return c;
        const target = { ...c };

        if (action === 'chat') {
          target.affection = Math.min(100, target.affection + 6);
          target.trust = Math.min(100, target.trust + 5);
          stats.happiness = Math.min(100, stats.happiness + 4);
          outcomeMsg = `Had a thoughtful, deep conversation with ${target.name}. Bond strengthened.`;
        } else if (action === 'gift') {
          if (prev.cash < 2500) {
            outcomeMsg = 'Need at least $2,500 to send a luxury curated gift.';
            return c;
          }
          cashDelta = -2500;
          target.affection = Math.min(100, target.affection + 15);
          target.respect = Math.min(100, target.respect + 8);
          outcomeMsg = `Sent ${target.name} vintage champagne and artisanal leather goods. They were delighted!`;
        } else if (action === 'vacation') {
          if (prev.cash < 12000) {
            outcomeMsg = 'A five-star holiday retreat requires $12,000.';
            return c;
          }
          cashDelta = -12000;
          target.affection = Math.min(100, target.affection + 25);
          target.trust = Math.min(100, target.trust + 15);
          stats.happiness = Math.min(100, stats.happiness + 18);
          stats.health = Math.min(100, stats.health + 6);
          outcomeMsg = `Flew with ${target.name} to a private cliffside villa in Amalfi. Unforgettable memories!`;
        } else if (action === 'favor') {
          if (target.respect < 60) {
            target.affection = Math.max(0, target.affection - 10);
            outcomeMsg = `${target.name} declined to assist: "You haven't earned that level of influence with me yet."`;
            return target;
          }
          repDelta = 20;
          target.trust = Math.max(0, target.trust - 10);
          outcomeMsg = `${target.name} called in high-society favors on your behalf, granting valuable business introductions!`;
        } else if (action === 'propose') {
          if (target.type !== 'Dating') {
            outcomeMsg = 'You are not currently dating this person!';
            return c;
          }
          if (prev.age < 18) {
            outcomeMsg = 'You cannot marry before age 18! Both partners must be at least 18 years old.';
            return target;
          }
          if (target.age < 18) {
            outcomeMsg = `${target.name} is only ${target.age} years old. Legal marriage age is at least 18!`;
            return target;
          }
          if (prev.gender === target.gender) {
            outcomeMsg = 'In Kinship, males cannot marry males, and females cannot marry females. Marriage must be between opposite genders.';
            return target;
          }
          const existingSpouses = prev.relationships.filter((r) => r.type === 'Spouse');
          if (prev.gender === 'Female' && existingSpouses.length >= 1) {
            outcomeMsg = 'A female can only marry 1 person at a time! You must divorce your current spouse before remarrying.';
            return target;
          }
          if (prev.gender === 'Male' && existingSpouses.length >= 4) {
            outcomeMsg = 'A male can marry up to 4 wives simultaneously. You have already reached the maximum of 4 wives.';
            return target;
          }
          if (target.affection < 75) {
            outcomeMsg = `${target.name} felt it was too soon (Affection: ${target.affection}%). Reach 75%+ Affection first.`;
            target.affection = Math.max(0, target.affection - 5);
            return target;
          }

          target.type = 'Spouse';
          target.marriedToPlayer = true;
          repDelta = 35;
          stats.happiness = 100;
          const wifeIndex = existingSpouses.length + 1;
          outcomeMsg = prev.gender === 'Male'
            ? `PROPOSAL ACCEPTED! ${target.name} happily accepted your marriage proposal! (Wife #${wifeIndex}).`
            : `PROPOSAL ACCEPTED! ${target.name} happily accepted your marriage proposal! You are now legally married.`;
        } else if (action === 'divorce') {
          if (target.type !== 'Spouse') {
            outcomeMsg = 'You are not married to this person!';
            return c;
          }
          target.type = 'Friend';
          target.marriedToPlayer = false;
          target.affection = 20;
          // Asset division
          const split = Math.round(prev.cash * 0.35);
          cashDelta = -split;
          stats.happiness = Math.max(0, stats.happiness - 25);
          outcomeMsg = `Divorced ${target.name}. Marital settlement divided $${split.toLocaleString()} in liquid assets.`;
        } else if (action === 'breakup') {
          if (target.type !== 'Dating') {
            outcomeMsg = 'You are not currently dating this person!';
            return c;
          }
          target.type = 'Friend';
          target.affection = Math.max(10, target.affection - 35);
          stats.happiness = Math.max(0, stats.happiness - 12);
          outcomeMsg = `Ended romantic relationship with ${target.name}. You parted ways as friends.`;
        }

        return target;
      });

      return {
        ...prev,
        relationships: updatedRelationships,
        cash: Math.max(0, prev.cash + cashDelta),
        stats,
        socialStatus: {
          ...prev.socialStatus,
          reputationScore: prev.socialStatus.reputationScore + repDelta
        }
      };
    });

    sounds.playClick();
    return { success: true, message: outcomeMsg };
  }, [character.relationships]);

  // Make New Friend (Friends appear more frequently than romantic dates)
  const makeNewFriend = useCallback(() => {
    if (character.stats.energy < 15) {
      sounds.playWarning();
      return { success: false, message: 'Need at least 15 Energy to socialize with friends!' };
    }

    const approxAge = character.age < 18 ? character.age : Math.round(character.age + (Math.random() * 8 - 4));
    const isElite = character.socialStatus.tier === 'High Society' || character.socialStatus.tier === 'Elite Luminary';
    const friend = generateNPC('Friend', approxAge, isElite ? 'elite' : 'humble');

    setCharacter((prev) => ({
      ...prev,
      relationships: [friend, ...prev.relationships],
      stats: {
        ...prev.stats,
        energy: Math.max(0, prev.stats.energy - 15),
        happiness: Math.min(100, prev.stats.happiness + 8)
      }
    }));

    addLifeLog(`Made a wonderful new friend: ${friend.name} (${friend.occupation}) in ${character.city}!`, 'relationship', 'positive');
    sounds.playClick();
    return { success: true, message: `Connected with ${friend.name}! Added to your circle of friends.`, friend };
  }, [character, addLifeLog]);

  // Meet candidate in dating pool (Min age 15, opposite gender only)
  const meetDatingCandidate = useCallback(() => {
    if (character.age < 15) {
      sounds.playWarning();
      return { success: false, message: 'You cannot date before age 15! Focus on childhood, education, and hobbies.' };
    }
    if (character.stats.energy < 20) {
      sounds.playWarning();
      return { success: false, message: 'Need at least 20 Energy to socialize and mingle.' };
    }

    const tierToMeet = character.socialStatus.tier === 'High Society' || character.socialStatus.tier === 'Elite Luminary' ? 'elite' : 'humble';
    // Opposite gender for dating (males date females, females date males)
    const targetGender: Gender = character.gender === 'Male' ? 'Female' : 'Male';
    const candidate = generateNPC('Dating', character.age, tierToMeet, undefined, targetGender);

    setCharacter((prev) => ({
      ...prev,
      relationships: [...prev.relationships, candidate],
      stats: {
        ...prev.stats,
        energy: Math.max(0, prev.stats.energy - 20),
        happiness: Math.min(100, prev.stats.happiness + 8)
      }
    }));

    addLifeLog(`Met ${candidate.name} (${candidate.occupation}) at a social gathering and began dating!`, 'relationship', 'positive');
    sounds.playClick();
    return { success: true, message: `Connected with ${candidate.name}! They have been added to your relationships.`, candidate };
  }, [character, addLifeLog]);

  // Add dating contact directly from Dating App with optional date story, cost, and jealousy check
  const addDatingContact = useCallback((contact: RelationshipContact, dateStory?: string, dateCost: number = 0) => {
    if (character.age < 15) {
      sounds.playWarning();
      return { success: false, message: 'You cannot date before age 15!' };
    }
    if (character.cash < dateCost) {
      sounds.playWarning();
      return { success: false, message: `You need $${dateCost.toLocaleString()} to pay for this date!` };
    }

    // Check if other dating partners find out and get angry!
    const existingDates = character.relationships.filter((r) => r.type === 'Dating' && r.id !== contact.id);
    let jealousyWarning = '';
    const otherDateFoundOut = existingDates.length >= 1 && Math.random() < 0.55;
    let angryDateName = '';

    setCharacter((prev) => {
      let updatedRel = [contact, ...prev.relationships.filter((c) => c.id !== contact.id)];
      const updatedStats = { ...prev.stats };

      if (otherDateFoundOut) {
        const angryTarget = getRandomElement(existingDates);
        angryDateName = angryTarget.name;
        updatedRel = updatedRel.map((c) => {
          if (c.id !== angryTarget.id) return c;
          return {
            ...c,
            affection: Math.max(5, c.affection - 35),
            trust: Math.max(5, c.trust - 40),
            respect: Math.max(10, c.respect - 25)
          };
        });
        updatedStats.happiness = Math.max(0, updatedStats.happiness - 10);
      }

      return {
        ...prev,
        cash: Math.max(0, prev.cash - dateCost),
        relationships: updatedRel,
        stats: {
          ...updatedStats,
          happiness: Math.min(100, updatedStats.happiness + (otherDateFoundOut ? -5 : 15)),
          energy: Math.max(0, prev.stats.energy - 10)
        }
      };
    });

    const logText = dateStory || `Matched on DilMil Dating App with ${contact.name} (${contact.occupation}) and began dating!`;
    addLifeLog(logText, 'relationship', 'positive');

    if (otherDateFoundOut && angryDateName) {
      jealousyWarning = ` ⚠️ JEALOUSY SCANDAL! Your other date ${angryDateName} spotted you with ${contact.name} and is furious! Affection plummeted.`;
      addLifeLog(`Scandal! ${angryDateName} caught you dating ${contact.name} and angrily confronted you!`, 'relationship', 'negative');
    }

    sounds.playPromotion();
    return {
      success: true,
      message: `Matched with ${contact.name}! They have been added to your relationships as your dating partner.${jealousyWarning}`
    };
  }, [character.age, character.cash, character.relationships, addLifeLog]);

  // Childbirth (Baby Born)
  // Rules:
  // 1. Couple cannot have baby before marriage
  // 2. Couple can only have baby once every 2 years
  // 3. Twins 5% of the time
  // 4. Cannot have baby once both reach 50 years
  const haveBaby = useCallback((babyName?: string, babyGender?: Gender) => {
    const spouses = character.relationships.filter((c) => c.type === 'Spouse');
    if (spouses.length === 0) {
      sounds.playWarning();
      return { success: false, message: 'A couple cannot have a baby before marriage! You must be legally married to a spouse first.' };
    }

    const partner = spouses[0];

    // Check age limits: cannot have baby once both reach 50 years
    if (character.age >= 50 && partner.age >= 50) {
      sounds.playWarning();
      return { success: false, message: 'Cannot have a baby once both partners reach 50 years of age.' };
    }
    const femaleAge = character.gender === 'Female' ? character.age : partner.age;
    if (femaleAge >= 50) {
      sounds.playWarning();
      return { success: false, message: 'Natural biological childbirth has concluded once the mother reaches 50 years of age.' };
    }

    // Check 2-year cooldown between babies
    const children = character.relationships.filter((c) => c.type === 'Child');
    const youngestChild = children.reduce(
      (min, c) => (min === null || c.age < min.age ? c : min),
      null as RelationshipContact | null
    );
    if (youngestChild && youngestChild.age < 2) {
      sounds.playWarning();
      return {
        success: false,
        message: `A couple can only have a baby once every 2 years! Your youngest child (${youngestChild.name}) is only ${youngestChild.age} year${youngestChild.age === 1 ? '' : 's'} old. Please wait until they are at least 2.`
      };
    }

    const familyLastName = character.name.split(' ')[1] || partner.name.split(' ')[1] || 'Malik';
    const isTwins = Math.random() < 0.05; // 5% chance of twins!

    const finalGender1: Gender = babyGender || (Math.random() < 0.5 ? 'Male' : 'Female');
    const childName1 = babyName?.trim() || generateBabyName(finalGender1, familyLastName);

    const baby1: RelationshipContact = {
      id: 'child_' + Date.now() + '_1',
      name: childName1,
      type: 'Child',
      age: 0,
      gender: finalGender1,
      occupation: 'Infant / Newborn',
      netWorth: 0,
      affection: 100,
      respect: 50,
      trust: 100,
      personality: getRandomElement(['Playful', 'Loyal', 'Ambitious', 'Sophisticated']),
      avatarSeed: Math.floor(Math.random() * 1000)
    };

    const newChildren: RelationshipContact[] = [baby1];

    if (isTwins) {
      const finalGender2: Gender = Math.random() < 0.5 ? 'Male' : 'Female';
      const childName2 = generateBabyName(finalGender2, familyLastName);
      const baby2: RelationshipContact = {
        id: 'child_' + (Date.now() + 1) + '_2',
        name: childName2,
        type: 'Child',
        age: 0,
        gender: finalGender2,
        occupation: 'Infant / Newborn (Twin)',
        netWorth: 0,
        affection: 100,
        respect: 50,
        trust: 100,
        personality: getRandomElement(['Playful', 'Loyal', 'Ambitious', 'Sophisticated']),
        avatarSeed: Math.floor(Math.random() * 1000)
      };
      newChildren.push(baby2);
    }

    setCharacter((prev) => ({
      ...prev,
      relationships: [...newChildren, ...prev.relationships],
      stats: {
        ...prev.stats,
        happiness: Math.min(100, prev.stats.happiness + (isTwins ? 40 : 25))
      },
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + (isTwins ? 30 : 15)
      }
    }));

    if (isTwins) {
      addLifeLog(`MIRACLE OF TWINS! Your spouse ${partner.name} gave birth to twins: ${newChildren[0].name} and ${newChildren[1].name} in ${character.city}!`, 'relationship', 'positive');
      sounds.playPromotion();
      return { success: true, message: `BLESSED WITH TWINS (5% rare event)! You welcomed twin newborns ${newChildren[0].name} and ${newChildren[1].name}!`, child: baby1 };
    } else {
      addLifeLog(`A newborn baby ${finalGender1 === 'Male' ? 'boy' : 'girl'} was born with your spouse ${partner.name}! Named ${childName1}.`, 'relationship', 'positive');
      sounds.playPromotion();
      return { success: true, message: `Congratulations! Newborn baby ${childName1} has arrived into your family!`, child: baby1 };
    }
  }, [character, addLifeLog]);

  // Relationship Career Selection & Guidance
  const guideContactCareer = useCallback((contactId: string, career: string) => {
    const contact = character.relationships.find((c) => c.id === contactId);
    if (!contact) return { success: false, message: 'Subject not found.' };

    setCharacter((prev) => ({
      ...prev,
      relationships: prev.relationships.map((c) => {
        if (c.id !== contactId) return c;
        return {
          ...c,
          guidedCareer: career,
          occupation: career,
          respect: Math.min(100, c.respect + 20),
          affection: Math.min(100, c.affection + 15)
        };
      })
    }));

    addLifeLog(`Guided ${contact.name}'s career trajectory. They accepted your mentorship and are now practicing as a ${career}!`, 'relationship', 'positive');
    sounds.playClick();
    return { success: true, message: `Successfully steered ${contact.name}'s vocation into ${career}!` };
  }, [character.relationships, addLifeLog]);

  // Society Real Estate & Assets
  const buyRealEstate = useCallback((catalogIndex: number) => {
    const template = REAL_ESTATE_CATALOG[catalogIndex];
    if (!template) return { success: false, message: 'Property not found.' };

    if (character.cash < template.purchasePrice) {
      sounds.playWarning();
      return { success: false, message: `Requires $${template.purchasePrice.toLocaleString()} purchase funds.` };
    }

    const newAsset: RealEstateAsset = {
      id: 'prop_' + Date.now(),
      name: template.name,
      type: template.type,
      purchasePrice: template.purchasePrice,
      currentValue: template.purchasePrice,
      maintenancePerYear: template.maintenancePerYear,
      isRental: false,
      rentalIncomePerYear: template.rentalIncomePerYear
    };

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - template.purchasePrice,
      realEstate: [...prev.realEstate, newAsset],
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + Math.round(template.purchasePrice / 75000)
      }
    }));

    addLifeLog(`Acquired title deed for luxury estate: ${template.name}!`, 'finance', 'positive');
    sounds.playCash();
    return { success: true, message: `Purchased ${template.name} for $${template.purchasePrice.toLocaleString()}!` };
  }, [character.cash, addLifeLog]);

  const sellRealEstate = useCallback((assetId: string) => {
    const asset = character.realEstate.find((a) => a.id === assetId);
    if (!asset) return { success: false, message: 'Property not found.' };

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash + asset.currentValue,
      realEstate: prev.realEstate.filter((a) => a.id !== assetId)
    }));

    addLifeLog(`Sold ${asset.name} for $${asset.currentValue.toLocaleString()} in liquid proceeds.`, 'finance', 'neutral');
    sounds.playCash();
    return { success: true, message: `Sold property for $${asset.currentValue.toLocaleString()}!` };
  }, [character.realEstate, addLifeLog]);

  const toggleRental = useCallback((assetId: string) => {
    setCharacter((prev) => ({
      ...prev,
      realEstate: prev.realEstate.map((a) => (a.id === assetId ? { ...a, isRental: !a.isRental } : a))
    }));
    sounds.playClick();
  }, []);

  const buyLuxuryToy = useCallback((catalogIndex: number) => {
    const template = LUXURY_TOYS_CATALOG[catalogIndex];
    if (!template) return { success: false, message: 'Item not found.' };

    if (character.cash < template.value) {
      sounds.playWarning();
      return { success: false, message: `Requires $${template.value.toLocaleString()} in capital.` };
    }

    const toy: LuxuryToy = {
      id: 'toy_' + Date.now(),
      name: template.name,
      type: template.type,
      value: template.value,
      prestigeBoost: template.prestigeBoost,
      maintenancePerYear: template.maintenancePerYear
    };

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - template.value,
      luxuryToys: [...prev.luxuryToys, toy],
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + template.prestigeBoost
      }
    }));

    addLifeLog(`Acquired collector's luxury piece: ${template.name}!`, 'society', 'positive');
    sounds.playCash();
    return { success: true, message: `Purchased ${template.name}!` };
  }, [character.cash, addLifeLog]);

  const sellLuxuryToy = useCallback((toyId: string) => {
    const toy = character.luxuryToys.find((t) => t.id === toyId);
    if (!toy) return { success: false, message: 'Asset not found.' };

    const resale = Math.round(toy.value * 0.85);
    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash + resale,
      luxuryToys: prev.luxuryToys.filter((t) => t.id !== toyId)
    }));

    sounds.playCash();
    return { success: true, message: `Liquidated asset for $${resale.toLocaleString()}.` };
  }, [character.luxuryToys]);

  // Social Clubs & Gala
  const joinClub = useCallback((clubId: string) => {
    const club = character.socialClubs.find((c) => c.id === clubId);
    if (!club) return { success: false, message: 'Club not found.' };

    if (character.socialStatus.reputationScore < club.reputationRequired) {
      sounds.playWarning();
      return { success: false, message: `Membership committee rejected: Requires at least ${club.reputationRequired} Reputation score.` };
    }

    if (character.cash < club.annualFee) {
      sounds.playWarning();
      return { success: false, message: `Initiation and dues require $${club.annualFee.toLocaleString()}.` };
    }

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - club.annualFee,
      socialClubs: prev.socialClubs.map((c) => (c.id === clubId ? { ...c, isMember: true } : c)),
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + club.prestigeBonus,
        socialCapital: prev.socialStatus.socialCapital + 25
      }
    }));

    addLifeLog(`Elected as a distinguished member of ${club.name}!`, 'society', 'positive');
    sounds.playPromotion();
    return { success: true, message: `Admitted to ${club.name}!` };
  }, [character, addLifeLog]);

  const leaveClub = useCallback((clubId: string) => {
    setCharacter((prev) => ({
      ...prev,
      socialClubs: prev.socialClubs.map((c) => (c.id === clubId ? { ...c, isMember: false } : c))
    }));
    sounds.playClick();
  }, []);

  const hostSocietyGala = useCallback(() => {
    const cost = 85000;
    if (character.cash < cost) {
      sounds.playWarning();
      return { success: false, message: `Hosting an elite charity gala costs $${cost.toLocaleString()} for venue, catering, and orchestra.` };
    }

    setCharacter((prev) => ({
      ...prev,
      cash: prev.cash - cost,
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + 70,
        socialCapital: prev.socialStatus.socialCapital + 40,
        fame: Math.min(100, prev.socialStatus.fame + 15)
      },
      stats: {
        ...prev.stats,
        happiness: Math.min(100, prev.stats.happiness + 15)
      }
    }));

    addLifeLog(`Hosted the season\'s most anticipated High Society Charity Gala. Donated $85,000 and greeted diplomats, aristocrats, and stars.`, 'society', 'positive');
    sounds.playPromotion();
    return { success: true, message: 'Your Gala was the social event of the year! Gained +70 Reputation and +40 Social Capital!' };
  }, [character.cash, addLifeLog]);

  // Dilemma resolution
  const resolveDilemma = useCallback((choiceIndex: number) => {
    if (!activeDilemma) return;
    const choice = activeDilemma.choices[choiceIndex];
    if (!choice) return;

    setCharacter((prev) => {
      const stats = { ...prev.stats };
      if (choice.statEffects) {
        if (choice.statEffects.health) stats.health = Math.max(0, Math.min(100, stats.health + choice.statEffects.health));
        if (choice.statEffects.happiness) stats.happiness = Math.max(0, Math.min(100, stats.happiness + choice.statEffects.happiness));
        if (choice.statEffects.smarts) stats.smarts = Math.max(0, Math.min(100, stats.smarts + choice.statEffects.smarts));
        if (choice.statEffects.looks) stats.looks = Math.max(0, Math.min(100, stats.looks + choice.statEffects.looks));
        if (choice.statEffects.energy) stats.energy = Math.max(0, Math.min(100, stats.energy + choice.statEffects.energy));
        if (choice.statEffects.karma) stats.karma = Math.max(0, Math.min(100, stats.karma + choice.statEffects.karma));
      }

      const cash = Math.max(0, prev.cash + (choice.cashChange || 0));
      const rep = Math.max(0, prev.socialStatus.reputationScore + (choice.reputationChange || 0));

      let updatedCorp = prev.corporateJob;
      let updatedSports = prev.sportsCareer;
      if (choice.jobOffer) {
        updatedCorp = choice.jobOffer;
        updatedSports = null;
      }

      let updatedRelationships = [...prev.relationships];
      if (choice.dateCandidate) {
        updatedRelationships = [choice.dateCandidate, ...prev.relationships.filter((c) => c.id !== choice.dateCandidate!.id)];
      } else if (choice.tag === 'DATE') {
        const targetGender = prev.gender === 'Male' ? 'Female' : 'Male';
        const suitor = generateNPC('Dating', prev.age, 'elite', undefined, targetGender);
        updatedRelationships = [suitor, ...prev.relationships];
      }

      const updatedCity = choice.relocateTo || prev.city;
      const updatedTrait = choice.traitChange || prev.trait;

      return {
        ...prev,
        stats,
        cash,
        city: updatedCity,
        trait: updatedTrait,
        corporateJob: updatedCorp,
        sportsCareer: updatedSports,
        relationships: updatedRelationships,
        socialStatus: {
          ...prev.socialStatus,
          reputationScore: rep
        }
      };
    });

    addLifeLog(`[${activeDilemma.title}] Selected: "${choice.text}". ${choice.outcomeText}`, 'general', choice.reputationChange && choice.reputationChange > 0 ? 'positive' : 'neutral');
    setActiveDilemma(null);
    sounds.playClick();
  }, [activeDilemma, addLifeLog]);

  // Relocation & Visa Application (Domestic move, Study Visa, Work Visa, Return Home)
  const relocateCharacter = useCallback((
    destinationCity: string,
    type: 'city' | 'study_visa' | 'work_visa' | 'return_home',
    cost: number
  ) => {
    if (character.cash < cost) {
      sounds.playWarning();
      return { success: false, message: `Insufficient funds! Moving to ${destinationCity} requires $${cost.toLocaleString()}.` };
    }

    if (type === 'study_visa') {
      if (character.age < 18 || character.age > 35) {
        sounds.playWarning();
        return { success: false, message: 'Study visas are available for ages 18 to 35.' };
      }
      if (character.stats.smarts < 60) {
        sounds.playWarning();
        return { success: false, message: 'Foreign university admissions require at least 60 Smarts.' };
      }
    } else if (type === 'work_visa') {
      if (character.age < 21) {
        sounds.playWarning();
        return { success: false, message: 'International work visas require a minimum age of 21.' };
      }
      if (character.stats.smarts < 50) {
        sounds.playWarning();
        return { success: false, message: 'Work visa sponsorship screening requires at least 50 Smarts.' };
      }
    } else if (type === 'city') {
      if (character.age < 18) {
        sounds.playWarning();
        return { success: false, message: 'Must be at least 18 years old to relocate independently.' };
      }
    }

    const repBonus = type === 'study_visa' ? 30 : type === 'work_visa' ? 45 : 10;
    const smartsBonus = type === 'study_visa' ? 12 : 0;

    setCharacter((prev) => ({
      ...prev,
      city: destinationCity,
      cash: Math.max(0, prev.cash - cost),
      stats: {
        ...prev.stats,
        smarts: Math.min(100, prev.stats.smarts + smartsBonus),
        happiness: Math.min(100, prev.stats.happiness + 15)
      },
      socialStatus: {
        ...prev.socialStatus,
        reputationScore: prev.socialStatus.reputationScore + repBonus
      }
    }));

    const logText = type === 'study_visa'
      ? `Approved for Study Visa! Relocated to ${destinationCity} for higher education.`
      : type === 'work_visa'
      ? `Secured Expatriate Work Visa! Relocated to ${destinationCity} for lucrative international employment.`
      : type === 'return_home'
      ? `Returned home to Pakistan (${destinationCity}) with overseas wealth and prestige.`
      : `Relocated residence to ${destinationCity}, Pakistan.`;

    addLifeLog(logText, 'achievement', 'positive');
    sounds.playPromotion();
    return { success: true, message: `Successfully relocated to ${destinationCity}!` };
  }, [character, addLifeLog]);

  // AGE UP (Annual Turn Engine)
  const ageUp = useCallback(() => {
    if (!character.isAlive) return;

    sounds.playAgeUp();

    setCharacter((prev) => {
      const newAge = prev.age + 1;
      const newYear = prev.currentYear + 1;

      // 1. Calculate Incomes
      let annualEarnings = 0;
      let livingExpenses = newAge < 18 ? 0 : 28000 + Math.round(newAge * 450);

      // Corporate Job
      if (prev.corporateJob) {
        annualEarnings += prev.corporateJob.salary;
      }

      // Sports
      if (prev.sportsCareer) {
        annualEarnings += prev.sportsCareer.salary + prev.sportsCareer.endorsementsPerYear;
      }

      // Artistic Royalties
      if (prev.artisticCareer) {
        const royaltyTotal = prev.artisticCareer.works.reduce((sum, w) => sum + w.annualRoyalties, 0);
        annualEarnings += royaltyTotal;
      }

      // Businesses Net Profits
      const businessProfits = prev.businesses.reduce((sum, b) => {
        const share = (b.sharesOwnedPct / 100) * b.annualProfit;
        return sum + share;
      }, 0);
      annualEarnings += businessProfits;

      // Real Estate Rental Income vs Maintenance
      const propertyNet = prev.realEstate.reduce((sum, prop) => {
        const rent = prop.isRental ? prop.rentalIncomePerYear : 0;
        return sum + (rent - prop.maintenancePerYear);
      }, 0);
      annualEarnings += propertyNet;

      // Luxury Toys Maintenance
      const toyExpenses = prev.luxuryToys.reduce((sum, t) => sum + t.maintenancePerYear, 0);
      livingExpenses += toyExpenses;

      // Club Fees
      const clubFees = prev.socialClubs.filter((c) => c.isMember).reduce((sum, c) => sum + c.annualFee, 0);
      livingExpenses += clubFees;

      const netCashChange = annualEarnings - livingExpenses;
      const finalCash = Math.max(0, prev.cash + netCashChange);

      // 2. Education Progression
      let updatedEducation = { ...prev.education };
      const newChildLogs: LifeLogEntry[] = [];

      // Childhood schooling milestones
      if (newAge === 1) {
        newChildLogs.push({
          id: 'child_milestone_1_' + Date.now(),
          age: 1,
          year: newYear,
          text: `Celebrated your 1st birthday in ${prev.city}! Took your first walking steps.`,
          category: 'general',
          impact: 'positive'
        });
      } else if (newAge === 3) {
        newChildLogs.push({
          id: 'child_milestone_3_' + Date.now(),
          age: 3,
          year: newYear,
          text: `Speaking fluently in Urdu and English; exploring your childhood world with joy.`,
          category: 'general',
          impact: 'positive'
        });
      } else if (newAge === 6) {
        updatedEducation.degree = 'Primary School';
        newChildLogs.push({
          id: 'child_milestone_6_' + Date.now(),
          age: 6,
          year: newYear,
          text: `Enrolled in Grade 1 at local primary school in ${prev.city}. Made your first school friends!`,
          category: 'general',
          impact: 'positive'
        });
      } else if (newAge === 10) {
        newChildLogs.push({
          id: 'child_milestone_10_' + Date.now(),
          age: 10,
          year: newYear,
          text: `Captained the neighborhood street cricket team and scored top marks on academic exams!`,
          category: 'general',
          impact: 'positive'
        });
      } else if (newAge === 13) {
        updatedEducation.degree = 'Matric / High School';
        newChildLogs.push({
          id: 'child_milestone_13_' + Date.now(),
          age: 13,
          year: newYear,
          text: `Enrolled in High School for Matriculation / O-Levels. Preparing for senior academic life.`,
          category: 'general',
          impact: 'positive'
        });
      } else if (newAge === 18) {
        updatedEducation.degree = 'High School Diploma';
        newChildLogs.push({
          id: 'child_milestone_18_' + Date.now(),
          age: 18,
          year: newYear,
          text: `Graduated High School! Unlocked adult career opportunities, university degrees, business ventures, and personal independence.`,
          category: 'achievement',
          impact: 'positive'
        });
      }

      if (updatedEducation.inProgress) {
        const prog = { ...updatedEducation.inProgress };
        prog.yearsRemaining -= 1;
        if (prog.yearsRemaining <= 0) {
          // Graduated!
          updatedEducation = {
            degree: prog.degree as Education['degree'],
            inProgress: null
          };
          sounds.playPromotion();
        } else {
          updatedEducation.inProgress = prog;
        }
      }

      // 3. Stats Adjustment
      const stats = { ...prev.stats };
      stats.energy = 100; // Refill energy for new year
      if (newAge > 60) {
        stats.health = Math.max(10, stats.health - Math.floor(Math.random() * 4 + 2));
      }
      if (newAge > 75) {
        stats.health = Math.max(0, stats.health - Math.floor(Math.random() * 6 + 3));
      }

      // Sports age check & automatic retirement after 40
      let updatedSports = prev.sportsCareer ? { ...prev.sportsCareer, seasonsPlayed: prev.sportsCareer.seasonsPlayed + 1 } : null;
      if (updatedSports) {
        if (newAge > 40) {
          const sportName = updatedSports.sport;
          const trophies = updatedSports.championships;
          updatedSports = null;
          newChildLogs.push({
            id: 'sport_retire_' + Date.now(),
            age: newAge,
            year: newYear,
            text: `Reached age ${newAge} and officially retired from professional ${sportName} athletics with ${trophies} career championship trophies! Commemorated as an esteemed national sports icon with a lifetime pension.`,
            category: 'career',
            impact: 'neutral'
          });
        } else if (newAge > 33) {
          updatedSports.skill = Math.max(20, updatedSports.skill - 4);
        }
      }

      // Corporate Performance check
      let updatedCorp = prev.corporateJob ? { ...prev.corporateJob, yearsInRole: prev.corporateJob.yearsInRole + 1 } : null;

      // Relationships Age & Drift
      const updatedRelationships = prev.relationships.map((c) => {
        const n = { ...c };
        n.age += 1;
        if (n.type === 'Child') {
          if (n.age === 6) n.occupation = 'School Student';
          else if (n.age >= 18) {
            n.occupation = n.guidedCareer || 'University Student';
          }
        }
        if (Math.random() * 0.2) {
          n.affection = Math.max(10, Math.min(100, n.affection + Math.floor(Math.random() * 10 - 5)));
        }
        return n;
      });

      // 4. Calculate Net Worth & Social Status
      const realEstateTotal = prev.realEstate.reduce((sum, r) => sum + r.currentValue, 0);
      const bizTotal = prev.businesses.reduce((sum, b) => sum + b.valuation * (b.sharesOwnedPct / 100), 0);
      const toysTotal = prev.luxuryToys.reduce((sum, t) => sum + t.value, 0);
      const currentNetWorth = finalCash + realEstateTotal + bizTotal + toysTotal;

      const newTier = calculateSocialTier(prev.socialStatus.reputationScore, currentNetWorth);

      // Check if player died of old age
      let isAlive = true;
      let deathAge = undefined;
      let causeOfDeath = undefined;
      if (stats.health <= 0 || (newAge > 82 && Math.random() < (newAge - 80) * 0.05)) {
        isAlive = false;
        deathAge = newAge;
        causeOfDeath = stats.health <= 0 ? 'Severe cardiovascular complications' : 'Peaceful natural causes in old age';
      }

      const yearLogText = `Turn of Year ${newYear} (Age ${newAge}): Net income: ${netCashChange >= 0 ? '+' : ''}$${netCashChange.toLocaleString()}. Current liquid funds: $${finalCash.toLocaleString()}.`;

      return {
        ...prev,
        age: newAge,
        currentYear: newYear,
        cash: finalCash,
        stats,
        isAlive,
        deathAge,
        causeOfDeath,
        education: updatedEducation,
        corporateJob: updatedCorp,
        sportsCareer: updatedSports,
        relationships: updatedRelationships,
        socialStatus: {
          ...prev.socialStatus,
          tier: newTier
        },
        lifeLog: [
          ...newChildLogs,
          {
            id: 'log_' + Date.now(),
            age: newAge,
            year: newYear,
            text: yearLogText,
            category: 'general',
            impact: netCashChange >= 0 ? 'positive' : 'negative'
          },
          ...prev.lifeLog
        ]
      };
    });

    // Frequent Emergent Dilemma Trigger (~80% chance every year from age 6+)
    const nextAge = character.age + 1;
    if (nextAge >= 6 && Math.random() < 0.82) {
      let chosenDilemma: LifeDilemma;
      const hasJob = character.corporateJob !== null || character.sportsCareer !== null;
      const hasPartner = character.relationships.some((r) => r.type === 'Dating' || r.type === 'Spouse');

      // Context 1: Adult with no job (prioritize career/job/forces/syndicate offers)
      if (nextAge >= 18 && !hasJob && Math.random() < 0.65) {
        const careerPool = DILEMMAS_DECK.filter((d) => d.category === 'career');
        chosenDilemma = (careerPool.length > 0 ? getRandomElement(careerPool) : null) || getRandomElement(DILEMMAS_DECK);
      }
      // Context 2: Teen/adult with no dating partner (prioritize romance proposals)
      else if (nextAge >= 15 && !hasPartner && Math.random() < 0.60) {
        const romancePool = DILEMMAS_DECK.filter((d) => d.category === 'romance');
        chosenDilemma = (romancePool.length > 0 ? getRandomElement(romancePool) : null) || getRandomElement(DILEMMAS_DECK);
      }
      // General rich deck
      else {
        chosenDilemma = getRandomElement(DILEMMAS_DECK);
      }

      setTimeout(() => {
        setActiveDilemma(chosenDilemma);
      }, 350);
    }
  }, [character.isAlive, character.age, character.corporateJob, character.sportsCareer, character.relationships]);

  const value: GameContextType = {
    character,
    activeDilemma,
    activeContact,
    audioEnabled,
    toggleAudio,
    setActiveContact,
    ageUp,
    startNewLife,
    resolveDilemma,
    quickRoutine,
    enrollDegree,
    applyCorporateJob,
    workOvertime,
    askForRaise,
    resignCorporateJob,
    startSportCareer,
    trainAthletics,
    playSeasonMatch,
    retireSport,
    produceArtPiece,
    foundBusinessVenture,
    upgradeBusinessRD,
    adjustMarketing,
    sellBusiness,
    ipoBusiness,
    interactContact,
    meetDatingCandidate,
    addDatingContact,
    haveBaby,
    guideContactCareer,
    buyRealEstate,
    sellRealEstate,
    toggleRental,
    buyLuxuryToy,
    sellLuxuryToy,
    joinClub,
    leaveClub,
    hostSocietyGala,
    deletePlayedHistory,
    continueAsChild,
    relocateCharacter
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
