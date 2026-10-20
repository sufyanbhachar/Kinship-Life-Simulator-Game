import { SportType } from '../types/game';

export interface SportInfo {
  type: SportType;
  description: string;
  primaryStat: 'health' | 'looks' | 'smarts';
  baseSalaryByDivision: {
    'Amateur League': number;
    'Regional Circuit': number;
    'National Pro': number;
    'World Elite': number;
  };
  reputationMultiplier: number;
}

export const SPORTS_REGISTRY: Record<SportType, SportInfo> = {
  Cricket: {
    type: 'Cricket',
    description: 'The national passion of Pakistan. PSL stardom, raw pace, majestic cover drives, and World Cup glory.',
    primaryStat: 'health',
    baseSalaryByDivision: {
      'Amateur League': 25000,
      'Regional Circuit': 95000,
      'National Pro': 850000,
      'World Elite': 4200000
    },
    reputationMultiplier: 2.2
  },
  Soccer: {
    type: 'Soccer',
    description: 'The world\'s most popular game. Demands endurance, agility, and tactical vision.',
    primaryStat: 'health',
    baseSalaryByDivision: {
      'Amateur League': 18000,
      'Regional Circuit': 65000,
      'National Pro': 450000,
      'World Elite': 3800000
    },
    reputationMultiplier: 1.5
  },
  Basketball: {
    type: 'Basketball',
    description: 'High-octane court competition with massive shoe deals and global celebrity culture.',
    primaryStat: 'health',
    baseSalaryByDivision: {
      'Amateur League': 15000,
      'Regional Circuit': 70000,
      'National Pro': 650000,
      'World Elite': 4500000
    },
    reputationMultiplier: 1.6
  },
  'Formula Racing': {
    type: 'Formula Racing',
    description: 'Prestigious open-wheel motorsport requiring razor-sharp reflexes and billionaire sponsorships.',
    primaryStat: 'smarts',
    baseSalaryByDivision: {
      'Amateur League': 25000,
      'Regional Circuit': 120000,
      'National Pro': 850000,
      'World Elite': 6000000
    },
    reputationMultiplier: 2.0
  },
  Tennis: {
    type: 'Tennis',
    description: 'Individual Grand Slam prestige, country club pedigree, and lucrative luxury endorsements.',
    primaryStat: 'health',
    baseSalaryByDivision: {
      'Amateur League': 12000,
      'Regional Circuit': 55000,
      'National Pro': 380000,
      'World Elite': 3200000
    },
    reputationMultiplier: 1.8
  },
  'Combat Sports': {
    type: 'Combat Sports',
    description: 'Championship prize-fighting, pay-per-view spectacles, and intense combat discipline.',
    primaryStat: 'health',
    baseSalaryByDivision: {
      'Amateur League': 10000,
      'Regional Circuit': 45000,
      'National Pro': 320000,
      'World Elite': 2800000
    },
    reputationMultiplier: 1.4
  },
  Squash: {
    type: 'Squash',
    description: 'Pakistan\'s historic golden dynasty. 14 World Open titles and unmatched agility in the glass court.',
    primaryStat: 'health',
    baseSalaryByDivision: {
      'Amateur League': 15000,
      'Regional Circuit': 60000,
      'National Pro': 480000,
      'World Elite': 2900000
    },
    reputationMultiplier: 2.0
  }
};
