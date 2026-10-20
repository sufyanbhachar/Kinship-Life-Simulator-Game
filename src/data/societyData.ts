import { RealEstateAsset, LuxuryToy, SocialClub, SocialTier } from '../types/game';

export interface TierRequirement {
  tier: SocialTier;
  minReputation: number;
  minNetWorth: number;
  perks: string;
}

export const SOCIAL_TIERS: TierRequirement[] = [
  {
    tier: 'Working Class',
    minReputation: 0,
    minNetWorth: 0,
    perks: 'Baseline social status. Access to local community institutions.'
  },
  {
    tier: 'Middle Class',
    minReputation: 100,
    minNetWorth: 50000,
    perks: 'Respectable credit rating, university circles, municipal recognition.'
  },
  {
    tier: 'Upper Middle Class',
    minReputation: 250,
    minNetWorth: 300000,
    perks: 'Private club invites, angel investor circles, corporate headhunter priority.'
  },
  {
    tier: 'High Society',
    minReputation: 500,
    minNetWorth: 2000000,
    perks: 'Charity gala host privileges, private banking concierges, elite matrimonial suitors.'
  },
  {
    tier: 'Elite Luminary',
    minReputation: 750,
    minNetWorth: 10000000,
    perks: 'State banquet invitations, museum trustee seats, presidential advisory pass.'
  },
  {
    tier: 'Global Icon',
    minReputation: 900,
    minNetWorth: 50000000,
    perks: 'Generational legacy. Unconditional entry to every salon, summit, and palace in the world.'
  }
];

export const INITIAL_CLUBS: SocialClub[] = [
  {
    id: 'club_athletic',
    name: 'Karachi Gymkhana & Racquet Guild',
    tier: 'Middle Class',
    annualFee: 3500,
    reputationRequired: 120,
    prestigeBonus: 25,
    description: 'Squash courts, cedar saunas, and young professionals networking after work in Karachi.',
    isMember: false
  },
  {
    id: 'club_investors',
    name: 'Lahore Polo & Sovereign Capital Roundtable',
    tier: 'Upper Middle Class',
    annualFee: 15000,
    reputationRequired: 300,
    prestigeBonus: 60,
    description: 'Private oak-paneled library and polo grounds where major enterprise deals and industrial partnerships are forged.',
    isMember: false
  },
  {
    id: 'club_yacht',
    name: 'Islamabad Diplomatic & Sailing Squadron',
    tier: 'High Society',
    annualFee: 45000,
    reputationRequired: 550,
    prestigeBonus: 120,
    description: 'Prestigious lakeside pavilion in Islamabad hosting foreign ambassadors and enterprise leaders.',
    isMember: false
  },
  {
    id: 'club_royal',
    name: 'Pakistan National Elite Patronage Council',
    tier: 'Elite Luminary',
    annualFee: 120000,
    reputationRequired: 800,
    prestigeBonus: 250,
    description: 'Exclusive assembly of industrial titans, philanthropic benefactors, and celebrated national icons.',
    isMember: false
  }
];

export const REAL_ESTATE_CATALOG: Omit<RealEstateAsset, 'id' | 'isRental'>[] = [
  {
    name: 'Clifton Beachfront Residence, Karachi',
    type: 'Apartment',
    purchasePrice: 280000,
    currentValue: 280000,
    maintenancePerYear: 3200,
    rentalIncomePerYear: 22000
  },
  {
    name: 'DHA Phase 6 Luxury Villa, Lahore',
    type: 'Suburban Villa',
    purchasePrice: 850000,
    currentValue: 850000,
    maintenancePerYear: 9000,
    rentalIncomePerYear: 58000
  },
  {
    name: 'Margalla Hills Panoramic Penthouse, Islamabad',
    type: 'Manhattan Penthouse',
    purchasePrice: 3800000,
    currentValue: 3800000,
    maintenancePerYear: 36000,
    rentalIncomePerYear: 240000
  },
  {
    name: 'Canal Road Heritage Estate, Faisalabad',
    type: 'Chateau Estate',
    purchasePrice: 12500000,
    currentValue: 12500000,
    maintenancePerYear: 120000,
    rentalIncomePerYear: 750000
  },
  {
    name: 'Arabian Seafront Private Island Villa, Karachi',
    type: 'Private Island',
    purchasePrice: 42000000,
    currentValue: 42000000,
    maintenancePerYear: 450000,
    rentalIncomePerYear: 2200000
  }
];

export const LUXURY_TOYS_CATALOG: Omit<LuxuryToy, 'id'>[] = [
  {
    name: 'Audemars Royal Grand Skeleton Timepiece',
    type: 'Timepiece',
    value: 65000,
    prestigeBoost: 20,
    maintenancePerYear: 1200
  },
  {
    name: 'Custom Land Cruiser 300 Armored VIP Edition',
    type: 'Car',
    value: 260000,
    prestigeBoost: 45,
    maintenancePerYear: 9000
  },
  {
    name: 'Ferrari Daytona SP3 Supercar',
    type: 'Car',
    value: 2250000,
    prestigeBoost: 95,
    maintenancePerYear: 28000
  },
  {
    name: 'Benetti 50-Meter Custom Tri-Deck Superyacht',
    type: 'Yacht',
    value: 28000000,
    prestigeBoost: 280,
    maintenancePerYear: 1200000
  },
  {
    name: 'Gulfstream G700 Intercontinental Jet',
    type: 'Private Jet',
    value: 75000000,
    prestigeBoost: 450,
    maintenancePerYear: 3500000
  }
];
