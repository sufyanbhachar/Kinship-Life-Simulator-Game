import { ArtisticMedium } from '../types/game';

export interface MediumConfig {
  medium: ArtisticMedium;
  projectTerm: string; // e.g. "Studio Album", "Literary Novel", "Solo Exhibition", "Feature Film"
  creationEnergyCost: number;
  creationCashCost: number;
  highestAward: string;
  description: string;
  sampleTitles: string[];
}

export const ARTS_CONFIG: Record<ArtisticMedium, MediumConfig> = {
  Music: {
    medium: 'Music',
    projectTerm: 'Studio Album & Tour',
    creationEnergyCost: 35,
    creationCashCost: 5000,
    highestAward: 'Gramophone Golden Record',
    description: 'Compose soul-stirring ballads, viral anthems, or avant-garde symphonies.',
    sampleTitles: [
      'Midnight Reverie', 'Echoes of the Metropolitan', 'Velvet Melancholy',
      'Neon Constellations', 'Requiem for the Striving', 'Acoustic Solitude'
    ]
  },
  Literature: {
    medium: 'Literature',
    projectTerm: 'Literary Novel',
    creationEnergyCost: 30,
    creationCashCost: 2000,
    highestAward: 'International Laureate Prize',
    description: 'Pen compelling fiction, philosophical memoirs, or page-turning bestsellers.',
    sampleTitles: [
      'The Shadow of Ambition', 'A Winter in Florence', 'Glass Towers & Broken Vows',
      'The Last Aristocrat', 'Anatomy of Silence', 'Beneath the Golden Pavilion'
    ]
  },
  'Fine Arts': {
    medium: 'Fine Arts',
    projectTerm: 'Curated Solo Exhibition',
    creationEnergyCost: 30,
    creationCashCost: 8000,
    highestAward: 'Biennale Golden Lion Trophy',
    description: 'Paint monumental oils, sculpt marble, and capture high-society gallery collectors.',
    sampleTitles: [
      'Studies in Raw Indigo', 'Fragments of Empire', 'The Geometry of Longing',
      'Nocturne in Gold Leaf', 'Monolith & Mist', 'Ephemeral Portraits'
    ]
  },
  Cinema: {
    medium: 'Cinema',
    projectTerm: 'Feature Film Production',
    creationEnergyCost: 40,
    creationCashCost: 25000,
    highestAward: 'Academy Palme d\'Or',
    description: 'Direct or star in independent festival darlings or global cinematic epics.',
    sampleTitles: [
      'The Gilded Cage', 'Fugue State', 'Avenue of the Vanities',
      'The Conductor\'s Gambit', 'Chronicles of Solitude', 'Blood & Velvet'
    ]
  }
};
