import { CorporateField, CorporateJob } from '../types/game';

export interface CorporateJobTemplate {
  field: CorporateField;
  title: string;
  rank: number;
  salary: number;
  minSmarts: number;
  minExperience: number; // in years
  requiredDegree?: string;
  prestigePoints: number;
}

export const CORPORATE_LADDER: Record<CorporateField, CorporateJobTemplate[]> = {
  Tech: [
    {
      field: 'Tech',
      title: 'Junior Software Engineer',
      rank: 1,
      salary: 82000,
      minSmarts: 45,
      minExperience: 0,
      requiredDegree: 'B.S. Computer Science',
      prestigePoints: 20
    },
    {
      field: 'Tech',
      title: 'Senior Systems Architect',
      rank: 2,
      salary: 165000,
      minSmarts: 60,
      minExperience: 3,
      requiredDegree: 'B.S. Computer Science',
      prestigePoints: 45
    },
    {
      field: 'Tech',
      title: 'Director of Platform Engineering',
      rank: 3,
      salary: 280000,
      minSmarts: 70,
      minExperience: 6,
      requiredDegree: 'B.S. Computer Science',
      prestigePoints: 80
    },
    {
      field: 'Tech',
      title: 'VP of Global Engineering',
      rank: 4,
      salary: 490000,
      minSmarts: 80,
      minExperience: 9,
      prestigePoints: 140
    },
    {
      field: 'Tech',
      title: 'Chief Technology Officer (CTO)',
      rank: 5,
      salary: 850000,
      minSmarts: 88,
      minExperience: 12,
      prestigePoints: 220
    }
  ],
  Finance: [
    {
      field: 'Finance',
      title: 'Investment Banking Analyst',
      rank: 1,
      salary: 110000,
      minSmarts: 55,
      minExperience: 0,
      requiredDegree: 'B.S. Economics & Finance',
      prestigePoints: 25
    },
    {
      field: 'Finance',
      title: 'Private Equity Associate',
      rank: 2,
      salary: 210000,
      minSmarts: 65,
      minExperience: 3,
      requiredDegree: 'B.S. Economics & Finance',
      prestigePoints: 60
    },
    {
      field: 'Finance',
      title: 'Fund Portfolio Director',
      rank: 3,
      salary: 420000,
      minSmarts: 75,
      minExperience: 6,
      requiredDegree: 'MBA Business',
      prestigePoints: 110
    },
    {
      field: 'Finance',
      title: 'Managing Director',
      rank: 4,
      salary: 950000,
      minSmarts: 82,
      minExperience: 10,
      prestigePoints: 190
    },
    {
      field: 'Finance',
      title: 'Senior Hedge Fund General Partner',
      rank: 5,
      salary: 2100000,
      minSmarts: 90,
      minExperience: 14,
      prestigePoints: 300
    }
  ],
  Medicine: [
    {
      field: 'Medicine',
      title: 'Clinical Medical Intern',
      rank: 1,
      salary: 68000,
      minSmarts: 65,
      minExperience: 0,
      requiredDegree: 'M.D. Medicine',
      prestigePoints: 30
    },
    {
      field: 'Medicine',
      title: 'Resident Physician',
      rank: 2,
      salary: 95000,
      minSmarts: 72,
      minExperience: 2,
      requiredDegree: 'M.D. Medicine',
      prestigePoints: 50
    },
    {
      field: 'Medicine',
      title: 'Attending Specialized Physician',
      rank: 3,
      salary: 285000,
      minSmarts: 80,
      minExperience: 5,
      requiredDegree: 'M.D. Medicine',
      prestigePoints: 100
    },
    {
      field: 'Medicine',
      title: 'Chief of Specialized Surgery',
      rank: 4,
      salary: 620000,
      minSmarts: 88,
      minExperience: 9,
      requiredDegree: 'M.D. Medicine',
      prestigePoints: 180
    },
    {
      field: 'Medicine',
      title: 'Hospital Medical Director & Dean',
      rank: 5,
      salary: 1150000,
      minSmarts: 92,
      minExperience: 13,
      requiredDegree: 'M.D. Medicine',
      prestigePoints: 260
    }
  ],
  Law: [
    {
      field: 'Law',
      title: 'Junior Litigation Associate',
      rank: 1,
      salary: 95000,
      minSmarts: 55,
      minExperience: 0,
      requiredDegree: 'J.D. Law',
      prestigePoints: 25
    },
    {
      field: 'Law',
      title: 'Senior Corporate Counsel',
      rank: 2,
      salary: 190000,
      minSmarts: 68,
      minExperience: 3,
      requiredDegree: 'J.D. Law',
      prestigePoints: 60
    },
    {
      field: 'Law',
      title: 'Trial Practice Director',
      rank: 3,
      salary: 350000,
      minSmarts: 78,
      minExperience: 6,
      requiredDegree: 'J.D. Law',
      prestigePoints: 110
    },
    {
      field: 'Law',
      title: 'Senior Equity Partner',
      rank: 4,
      salary: 880000,
      minSmarts: 85,
      minExperience: 10,
      requiredDegree: 'J.D. Law',
      prestigePoints: 200
    },
    {
      field: 'Law',
      title: 'Federal Appellate Senior Judge',
      rank: 5,
      salary: 650000,
      minSmarts: 90,
      minExperience: 15,
      requiredDegree: 'J.D. Law',
      prestigePoints: 320
    }
  ],
  Civil_Service: [
    {
      field: 'Civil_Service',
      title: 'CSS Probationer Officer',
      rank: 1,
      salary: 65000,
      minSmarts: 55,
      minExperience: 0,
      prestigePoints: 40
    },
    {
      field: 'Civil_Service',
      title: 'Assistant Commissioner (AC)',
      rank: 2,
      salary: 120000,
      minSmarts: 65,
      minExperience: 3,
      prestigePoints: 85
    },
    {
      field: 'Civil_Service',
      title: 'Deputy Commissioner (DC)',
      rank: 3,
      salary: 240000,
      minSmarts: 75,
      minExperience: 7,
      prestigePoints: 150
    },
    {
      field: 'Civil_Service',
      title: 'Provincial Chief Secretary',
      rank: 4,
      salary: 490000,
      minSmarts: 84,
      minExperience: 12,
      prestigePoints: 240
    },
    {
      field: 'Civil_Service',
      title: 'Federal Secretary to the Cabinet',
      rank: 5,
      salary: 820000,
      minSmarts: 90,
      minExperience: 16,
      prestigePoints: 350
    }
  ],
  Media_Arts: [
    {
      field: 'Media_Arts',
      title: 'Broadcast Field Journalist',
      rank: 1,
      salary: 58000,
      minSmarts: 45,
      minExperience: 0,
      prestigePoints: 25
    },
    {
      field: 'Media_Arts',
      title: 'Lead Television Drama Actor / Anchor',
      rank: 2,
      salary: 145000,
      minSmarts: 55,
      minExperience: 2,
      prestigePoints: 70
    },
    {
      field: 'Media_Arts',
      title: 'Executive Drama Director',
      rank: 3,
      salary: 290000,
      minSmarts: 68,
      minExperience: 5,
      prestigePoints: 120
    },
    {
      field: 'Media_Arts',
      title: 'Head of National Television Programming',
      rank: 4,
      salary: 580000,
      minSmarts: 78,
      minExperience: 9,
      prestigePoints: 200
    },
    {
      field: 'Media_Arts',
      title: 'Media Network Chairman & Studio Mogul',
      rank: 5,
      salary: 1350000,
      minSmarts: 88,
      minExperience: 14,
      prestigePoints: 310
    }
  ],
  Aviation_Defense: [
    {
      field: 'Aviation_Defense',
      title: 'Commercial Flight Cadet',
      rank: 1,
      salary: 78000,
      minSmarts: 55,
      minExperience: 0,
      prestigePoints: 35
    },
    {
      field: 'Aviation_Defense',
      title: 'Airline First Officer Pilot',
      rank: 2,
      salary: 160000,
      minSmarts: 65,
      minExperience: 3,
      prestigePoints: 75
    },
    {
      field: 'Aviation_Defense',
      title: 'Senior Long-Haul Flight Captain',
      rank: 3,
      salary: 320000,
      minSmarts: 78,
      minExperience: 7,
      prestigePoints: 140
    },
    {
      field: 'Aviation_Defense',
      title: 'Director of Flight Operations',
      rank: 4,
      salary: 610000,
      minSmarts: 85,
      minExperience: 11,
      prestigePoints: 220
    },
    {
      field: 'Aviation_Defense',
      title: 'Civil Aviation Authority Director General',
      rank: 5,
      salary: 1050000,
      minSmarts: 90,
      minExperience: 15,
      prestigePoints: 320
    }
  ],
  Corporate_Industry: [
    {
      field: 'Corporate_Industry',
      title: 'Industrial Operations Management Trainee',
      rank: 1,
      salary: 56000,
      minSmarts: 45,
      minExperience: 0,
      prestigePoints: 20
    },
    {
      field: 'Corporate_Industry',
      title: 'Textile Plant & Supply Chain Manager',
      rank: 2,
      salary: 130000,
      minSmarts: 60,
      minExperience: 3,
      prestigePoints: 60
    },
    {
      field: 'Corporate_Industry',
      title: 'General Manager of Export Operations',
      rank: 3,
      salary: 270000,
      minSmarts: 72,
      minExperience: 6,
      prestigePoints: 110
    },
    {
      field: 'Corporate_Industry',
      title: 'VP of Global Supply Chain & Manufacturing',
      rank: 4,
      salary: 540000,
      minSmarts: 82,
      minExperience: 10,
      prestigePoints: 190
    },
    {
      field: 'Corporate_Industry',
      title: 'Conglomerate Group Chief Executive (CEO)',
      rank: 5,
      salary: 1200000,
      minSmarts: 88,
      minExperience: 15,
      prestigePoints: 290
    }
  ],
  Armed_Forces: [
    {
      field: 'Armed_Forces',
      title: 'Second Lieutenant (PMA Cadet Commission)',
      rank: 1,
      salary: 58000,
      minSmarts: 40,
      minExperience: 0,
      prestigePoints: 45
    },
    {
      field: 'Armed_Forces',
      title: 'Captain / Company Commander',
      rank: 2,
      salary: 115000,
      minSmarts: 52,
      minExperience: 3,
      prestigePoints: 85
    },
    {
      field: 'Armed_Forces',
      title: 'Major / Battalion Executive Officer',
      rank: 3,
      salary: 245000,
      minSmarts: 65,
      minExperience: 7,
      prestigePoints: 160
    },
    {
      field: 'Armed_Forces',
      title: 'Brigadier General / Base Commander',
      rank: 4,
      salary: 560000,
      minSmarts: 78,
      minExperience: 12,
      prestigePoints: 270
    },
    {
      field: 'Armed_Forces',
      title: 'Four-Star General / Chief of Armed Staff',
      rank: 5,
      salary: 1250000,
      minSmarts: 88,
      minExperience: 16,
      prestigePoints: 400
    }
  ],
  Underworld_Crime: [
    {
      field: 'Underworld_Crime',
      title: 'Street Enforcer & Syndicate Courier',
      rank: 1,
      salary: 45000,
      minSmarts: 25,
      minExperience: 0,
      prestigePoints: 10
    },
    {
      field: 'Underworld_Crime',
      title: 'Smuggling Operations Lieutenant',
      rank: 2,
      salary: 135000,
      minSmarts: 42,
      minExperience: 2,
      prestigePoints: 40
    },
    {
      field: 'Underworld_Crime',
      title: 'Hawala-Hundi Money Laundering Broker',
      rank: 3,
      salary: 310000,
      minSmarts: 60,
      minExperience: 5,
      prestigePoints: 90
    },
    {
      field: 'Underworld_Crime',
      title: 'Black Market Syndicate Boss',
      rank: 4,
      salary: 720000,
      minSmarts: 75,
      minExperience: 9,
      prestigePoints: 180
    },
    {
      field: 'Underworld_Crime',
      title: 'Underworld Shadow Kingpin & Don',
      rank: 5,
      salary: 1850000,
      minSmarts: 86,
      minExperience: 14,
      prestigePoints: 280
    }
  ]
};

export const AVAILABLE_DEGREES = [
  {
    degree: 'B.S. Computer Science' as const,
    durationYears: 4,
    costPerYear: 24000,
    minSmarts: 40,
    field: 'Tech'
  },
  {
    degree: 'B.S. Economics & Finance' as const,
    durationYears: 4,
    costPerYear: 28000,
    minSmarts: 45,
    field: 'Finance'
  },
  {
    degree: 'B.A. Literature & Arts' as const,
    durationYears: 4,
    costPerYear: 20000,
    minSmarts: 35,
    field: 'Arts'
  },
  {
    degree: 'M.D. Medicine' as const,
    durationYears: 4,
    costPerYear: 45000,
    minSmarts: 65,
    prerequisite: 'High School Diploma',
    field: 'Medicine'
  },
  {
    degree: 'J.D. Law' as const,
    durationYears: 3,
    costPerYear: 38000,
    minSmarts: 60,
    prerequisite: 'High School Diploma',
    field: 'Law'
  },
  {
    degree: 'MBA Business' as const,
    durationYears: 2,
    costPerYear: 42000,
    minSmarts: 55,
    prerequisite: 'High School Diploma',
    field: 'Finance'
  },
  {
    degree: 'B.Eng. Mechanical & Electrical' as const,
    durationYears: 4,
    costPerYear: 26000,
    minSmarts: 50,
    field: 'Tech'
  },
  {
    degree: 'B.Arch Architecture & Design' as const,
    durationYears: 5,
    costPerYear: 22000,
    minSmarts: 45,
    field: 'Arts'
  },
  {
    degree: 'B.S. Data Science & AI' as const,
    durationYears: 4,
    costPerYear: 29000,
    minSmarts: 55,
    field: 'Tech'
  },
  {
    degree: 'Chartered Accountancy (CA / ACCA)' as const,
    durationYears: 3,
    costPerYear: 18000,
    minSmarts: 52,
    field: 'Finance'
  },
  {
    degree: 'M.Phil International Relations' as const,
    durationYears: 2,
    costPerYear: 24000,
    minSmarts: 60,
    prerequisite: 'High School Diploma',
    field: 'Arts'
  },
  {
    degree: 'Ph.D. Advanced Scientific Research' as const,
    durationYears: 4,
    costPerYear: 32000,
    minSmarts: 75,
    prerequisite: 'High School Diploma',
    field: 'Tech'
  }
];
