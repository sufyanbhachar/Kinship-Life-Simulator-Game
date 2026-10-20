export type Gender = 'Male' | 'Female' | 'Non-Binary';

export type BackgroundOrigin = 'Humble Beginnings' | 'Working Class' | 'Middle Class' | 'Academic Family' | 'Old Money Elite';

export type PersonalityTrait =
  | 'Genius Mind'
  | 'Natural Athlete'
  | 'Creative Prodigy'
  | 'Silver Tongue'
  | 'Workaholic'
  | 'Resilient';

export type SocialTier =
  | 'Working Class'
  | 'Middle Class'
  | 'Upper Middle Class'
  | 'High Society'
  | 'Elite Luminary'
  | 'Global Icon';

export interface PlayerStats {
  health: number; // 0 - 100
  happiness: number; // 0 - 100
  smarts: number; // 0 - 100
  looks: number; // 0 - 100
  energy: number; // 0 - 100
  karma: number; // 0 - 100
}

export interface Education {
  degree:
    | 'None'
    | 'Infancy'
    | 'Primary School'
    | 'Matric / High School'
    | 'High School Diploma'
    | 'B.S. Computer Science'
    | 'B.A. Literature & Arts'
    | 'B.S. Economics & Finance'
    | 'B.Eng. Mechanical & Electrical'
    | 'B.Arch Architecture & Design'
    | 'B.S. Data Science & AI'
    | 'Chartered Accountancy (CA / ACCA)'
    | 'M.D. Medicine'
    | 'J.D. Law'
    | 'MBA Business'
    | 'M.Phil International Relations'
    | 'Ph.D. Advanced Scientific Research';
  inProgress?: {
    degree: string;
    yearsRemaining: number;
    tuitionPerYear: number;
  } | null;
}

export type CorporateField =
  | 'Tech'
  | 'Finance'
  | 'Medicine'
  | 'Law'
  | 'Civil_Service'
  | 'Media_Arts'
  | 'Aviation_Defense'
  | 'Corporate_Industry'
  | 'Armed_Forces'
  | 'Underworld_Crime';

export interface CorporateJob {
  field: CorporateField;
  title: string;
  rank: number; // 1 to 5
  salary: number;
  performance: number; // 0 - 100
  yearsInRole: number;
}

export type SportType = 'Cricket' | 'Squash' | 'Soccer' | 'Basketball' | 'Formula Racing' | 'Tennis' | 'Combat Sports';

export interface SportsCareer {
  sport: SportType;
  division: 'Amateur League' | 'Regional Circuit' | 'National Pro' | 'World Elite';
  skill: number; // 0 - 100
  championships: number;
  endorsementsPerYear: number;
  salary: number;
  fame: number; // 0 - 100
  seasonsPlayed: number;
}

export type ArtisticMedium = 'Music' | 'Literature' | 'Fine Arts' | 'Cinema';

export interface ArtisticWork {
  id: string;
  title: string;
  medium: ArtisticMedium;
  yearCreated: number;
  acclaimScore: number; // 0 - 100
  annualRoyalties: number;
  isMasterpiece: boolean;
}

export interface ArtisticCareer {
  medium: ArtisticMedium;
  mastery: number; // 0 - 100
  fame: number; // 0 - 100
  works: ArtisticWork[];
  awards: string[];
}

export interface BusinessVenture {
  id: string;
  name: string;
  industry:
    | 'Coffee Roastery & Cafe'
    | 'SaaS Software'
    | 'Luxury Fashion House'
    | 'Boutique Record Label'
    | 'Real Estate Syndicate'
    | 'Clean Tech Ventures'
    | 'Textile & Garment Export'
    | 'Specialty Chai Cafe Network'
    | 'Luxury Wedding Marquee & Banquet'
    | 'Hospital & Diagnostic Healthcare'
    | 'Commercial Freight & Fleet Logistics'
    | 'Solar Energy & Clean Power'
    | 'Organic Mango & Citrus Orchards'
    | 'Fintech & Digital Banking';
  valuation: number;
  annualRevenue: number;
  annualProfit: number;
  employees: number;
  rdLevel: number; // 1 - 5
  marketingBudget: number;
  sharesOwnedPct: number; // e.g. 100 or diluted after funding
  isPublic: boolean;
}

export type RelationType = 'Parent' | 'Sibling' | 'Child' | 'Friend' | 'Spouse' | 'Dating' | 'Work Rival' | 'High Society Patron';

export interface RelationshipContact {
  id: string;
  name: string;
  type: RelationType;
  age: number;
  gender: Gender;
  occupation: string;
  netWorth: number;
  affection: number; // 0 - 100
  respect: number; // 0 - 100
  trust: number; // 0 - 100
  personality: 'Loyal' | 'Ambitious' | 'Sophisticated' | 'Cynical' | 'Playful';
  avatarSeed: number;
  marriedToPlayer?: boolean;
  guidedCareer?: string;
  educationStage?: string;
}

export interface RealEstateAsset {
  id: string;
  name: string;
  type: 'Apartment' | 'Suburban Villa' | 'Manhattan Penthouse' | 'Chateau Estate' | 'Private Island';
  purchasePrice: number;
  currentValue: number;
  maintenancePerYear: number;
  isRental: boolean;
  rentalIncomePerYear: number;
}

export interface LuxuryToy {
  id: string;
  name: string;
  type: 'Car' | 'Yacht' | 'Private Jet' | 'Timepiece';
  value: number;
  prestigeBoost: number;
  maintenancePerYear: number;
}

export interface SocialClub {
  id: string;
  name: string;
  tier: SocialTier;
  annualFee: number;
  reputationRequired: number;
  prestigeBonus: number;
  description: string;
  isMember: boolean;
}

export interface LifeLogEntry {
  id: string;
  age: number;
  year: number;
  text: string;
  category: 'general' | 'career' | 'relationship' | 'achievement' | 'health' | 'finance' | 'society';
  impact?: 'positive' | 'negative' | 'neutral';
}

export interface DilemmaChoice {
  text: string;
  description: string;
  tag?: 'GOOD' | 'EVIL' | 'JOB' | 'DATE' | 'CAREER' | 'SECRET' | 'TRAIT' | 'VISA' | 'RANDOM';
  statEffects?: Partial<PlayerStats>;
  cashChange?: number;
  reputationChange?: number;
  relationImpact?: { contactId?: string; change: number; message: string };
  jobOffer?: CorporateJob;
  dateCandidate?: RelationshipContact;
  traitChange?: PersonalityTrait;
  relocateTo?: string;
  outcomeText: string;
}

export interface LifeDilemma {
  id: string;
  title: string;
  situation: string;
  category: 'career' | 'romance' | 'ethics' | 'society' | 'business' | 'sports' | 'art' | 'secret' | 'visa' | 'lifestyle';
  choices: DilemmaChoice[];
}

export interface CharacterState {
  name: string;
  gender: Gender;
  birthYear: number;
  currentYear: number;
  age: number;
  city: string;
  origin: BackgroundOrigin;
  trait: PersonalityTrait;
  isAlive: boolean;
  deathAge?: number;
  causeOfDeath?: string;
  yearsLivingAbroad?: number;
  foreignBullyCount?: number;

  stats: PlayerStats;
  cash: number;
  debt: number;

  socialStatus: {
    tier: SocialTier;
    reputationScore: number; // 0 to 1000
    socialCapital: number; // Currency to spend on high-society favors
    fame: number; // 0 to 100
  };

  education: Education;
  corporateJob: CorporateJob | null;
  sportsCareer: SportsCareer | null;
  artisticCareer: ArtisticCareer | null;
  businesses: BusinessVenture[];

  relationships: RelationshipContact[];
  datingPool: RelationshipContact[];

  realEstate: RealEstateAsset[];
  luxuryToys: LuxuryToy[];
  socialClubs: SocialClub[];

  lifeLog: LifeLogEntry[];
  achievements: string[];
}
