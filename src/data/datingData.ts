import { Gender, RelationshipContact } from '../types/game';
import { PAKISTAN_CITIES, getRandomElement, generateRandomName } from '../utils/names';

export interface SuitorProfile extends RelationshipContact {
  city: string;
  country: string;
  bio: string;
  compatibility: number;
  education: string;
  datingAppSource: string;
}

export interface RegionDatingConfig {
  id: string;
  appName: string;
  tagline: string;
  subTitle: string;
  badge: string;
  brandColor: string; // Tailwind gradient
  accentColor: string;
  region: string;
  cities: string[];
  universities: string[];
  occupations: string[];
  maleBios: string[];
  femaleBios: string[];
  dateSpots: {
    id: string;
    label: string;
    cost: number;
    bonusAffection: number;
    description: string;
  }[];
}

export const REGION_DATING_REGISTRY: Record<string, RegionDatingConfig> = {
  pakistan: {
    id: 'pakistan',
    appName: 'DilMil',
    tagline: 'DilMil · Kinship Match',
    subTitle: 'Pakistani Rishta & Courtship Network',
    badge: 'Pakistani Rishta & Dating',
    brandColor: 'from-pink-600 via-rose-500 to-amber-400',
    accentColor: 'text-pink-600',
    region: 'Pakistan',
    cities: [...PAKISTAN_CITIES],
    universities: [
      'LUMS · B.S. Economics & Finance',
      'NUST · B.S. Computer Engineering',
      'King Edward Medical University · MBBS',
      'National College of Arts (NCA) · B.Des',
      'IBA Karachi · MBA Business',
      'Aga Khan University · M.D. Medicine',
      'Quaid-i-Azam University · M.Phil International Relations',
      'GIKI · B.S. Mechanical & Robotics'
    ],
    occupations: [
      'Software Engineer', 'Pediatrician', 'Textile Designer', 'Corporate Lawyer',
      'Chartered Accountant', 'Civil Service Officer', 'Architect', 'Media Producer',
      'Cricket Athlete', 'Biochemist', 'Investment Banker'
    ],
    maleBios: [
      'Software Architect at Careem. 80% chai, 20% code. Looking for someone who never puts elaichi in biryani.',
      'Corporate litigation advocate. Will defend your honor in court and win every family dawat debate.',
      'National cricket academy pace bowler. Disciplined on the pitch, gentle off it. Big fan of Nusrat Fateh Ali Khan.',
      'Textile exporter & industrialist. Splitting time between Faisalabad and Lahore. Loves weekend road trips to Murree.',
      'Civil Service (PAS) officer. Deep thinker, loves Faiz poetry, vintage fountain pens, and Margalla Hills hiking.',
      'Fintech founder & amateur squash player. Big ambition, family values, and a weakness for Peshawari chapli kebabs.'
    ],
    femaleBios: [
      'Resident Doctor at Shifa International. Passionate about pediatric care, classical ghazals, and Sunday baking.',
      'Textile & Haute Couture Designer from NCA Lahore. Aesthetic soul, loves vintage truck art and specialty coffee.',
      'Chartered Accountant & Financial Analyst. Sharp with numbers, warm with family, loves long walks on Clifton beach.',
      'Broadcast journalist & documentary filmmaker. Curious mind, world traveler, and loves spirited political chai discussions.',
      'Biotech researcher & nature photographer. Loves exploring northern valleys, starry nights, and quiet reading corners.',
      'Architectural conservationist. Restoring Old Lahore havelis with modern flair. Seeking someone with genuine humor.'
    ],
    dateSpots: [
      {
        id: 'chai',
        label: 'Karak Chai & Paratha at Chaaye Khana',
        cost: 60,
        bonusAffection: 15,
        description: 'Enjoyed aromatic karak chai and steaming flaky parathas with lively conversation.'
      },
      {
        id: 'monal',
        label: 'Candlelit Dinner at Monal Margalla Hills',
        cost: 300,
        bonusAffection: 25,
        description: 'Fine dining overlooking the glittering night lights of the capital from the Margalla heights.'
      },
      {
        id: 'beach',
        label: 'Arabian Sea Shoreline Walk at Clifton Beach',
        cost: 30,
        bonusAffection: 12,
        description: 'Strolled along the breezy coastline, riding decorated camels and snacking on roasted corn.'
      },
      {
        id: 'gallery',
        label: 'Gulberg Contemporary Art Gallery & High Tea',
        cost: 180,
        bonusAffection: 20,
        description: 'Admired modern South Asian paintings and enjoyed artisanal cakes at a boutique tea salon.'
      }
    ]
  },

  united_kingdom: {
    id: 'united_kingdom',
    appName: 'Hinge UK',
    tagline: 'Hinge UK · London Match',
    subTitle: 'The Dating App Designed to Be Deleted',
    badge: 'United Kingdom Verified',
    brandColor: 'from-purple-700 via-indigo-600 to-sky-500',
    accentColor: 'text-purple-600',
    region: 'United Kingdom',
    cities: ['London', 'Manchester', 'Edinburgh', 'Cambridge', 'Oxford', 'Birmingham'],
    universities: [
      'Imperial College London · M.Sc Computing',
      'London School of Economics (LSE) · B.Sc Economics',
      'University College London (UCL) · Architecture',
      'University of Oxford · Philosophy, Politics & Economics',
      'University of Cambridge · Natural Sciences',
      'King’s College London · MBBS Medicine',
      'University of Edinburgh · Law LL.B'
    ],
    occupations: [
      'Canary Wharf Quant Trader', 'NHS Specialist Physician', 'Fintech Product Lead',
      'Barrister at Middle Temple', 'Bioinformatics Researcher', 'BBC Documentary Producer',
      'Aviation Aerospace Engineer', 'Private Equity Associate', 'Contemporary Art Curator'
    ],
    maleBios: [
      'Fintech product lead in Shoreditch. Coffee snob, weekend cycler to Richmond Park, always ready for Sunday roast.',
      'Junior barrister in the City. Love historic London pubs, dry British humor, and cricket test matches at Lord\'s.',
      'NHS trauma surgeon. Living on black coffee and adrenaline. Looking for someone genuine to explore quiet bookshops in Soho.',
      'AI researcher at DeepMind. Originally from Lahore, now Londoner. Big fan of vinyl records, indie gigs, and hearty curries.'
    ],
    femaleBios: [
      'Senior analyst at Canary Wharf. Sharp mind, warm heart, loves autumn walks in Hampstead Heath and West End musicals.',
      'Architect designing sustainable urban havens. Passionate about Tate Modern exhibitions and weekend vintage markets in Notting Hill.',
      'BBC science producer. Traveled to 28 countries, loves spirited pub debates, pottery classes, and rainy day tea.',
      'Pediatric resident at Great Ormond Street. Balancing hospital rounds with classical piano and botanical garden trips.'
    ],
    dateSpots: [
      {
        id: 'afternoon_tea',
        label: 'Royal Afternoon Tea in Covent Garden',
        cost: 120,
        bonusAffection: 16,
        description: 'Tasted scones with clotted cream and Earl Grey tea in a historic glass atrium in central London.'
      },
      {
        id: 'shard',
        label: 'Skyline Dining at The Shard',
        cost: 450,
        bonusAffection: 28,
        description: 'Panoramic fine dining on the 32nd floor with breathtaking views across London and the River Thames.'
      },
      {
        id: 'thames_walk',
        label: 'River Thames & Southbank Evening Walk',
        cost: 40,
        bonusAffection: 14,
        description: 'Walked hand in hand past street performers, illuminated bridges, and book stalls under the London Eye.'
      },
      {
        id: 'tate_modern',
        label: 'Tate Modern Exhibition & River Wine Bar',
        cost: 200,
        bonusAffection: 22,
        description: 'Discussed contemporary abstract installations followed by vintage wine overlooking St. Paul’s Cathedral.'
      }
    ]
  },

  united_states: {
    id: 'united_states',
    appName: 'Bumble USA',
    tagline: 'Bumble USA · Metro Match',
    subTitle: 'Empowered Dating & Professional Connections',
    badge: 'United States Verified',
    brandColor: 'from-amber-500 via-orange-500 to-rose-500',
    accentColor: 'text-amber-600',
    region: 'United States',
    cities: ['Boston', 'Silicon Valley', 'New York', 'San Francisco', 'Chicago', 'Seattle'],
    universities: [
      'Harvard University · MBA Business',
      'MIT · B.S. Computer Science & AI',
      'Stanford University · B.S. Symbolic Systems',
      'Columbia University · M.S. Financial Engineering',
      'UC Berkeley · B.S. Electrical Engineering',
      'Johns Hopkins University · M.D. Medicine'
    ],
    occupations: [
      'Silicon Valley AI Architect', 'Venture Capital Associate', 'Biotech Startup Founder',
      'Wall Street Analyst', 'Cardiovascular Fellow', 'Cybersecurity Director', 'Aerospace Specialist'
    ],
    maleBios: [
      'Machine Learning lead at a generative AI lab. Marathon runner, pour-over enthusiast, building open-source tech.',
      'Bio-engineer in Kendall Square. Love sailing on the Charles River, jazz clubs in Cambridge, and hot pizza at 2 AM.',
      'Corporate attorney in Manhattan. Passionate about art collecting, rooftop sunsets, and discovering hidden dumpling spots.',
      'Stanford alum & startup founder. Big dreams, humble beginnings. Looking for deep conversations about tech and the future.'
    ],
    femaleBios: [
      'Clinical genetics researcher at Harvard Med. Passionate about curing rare diseases, indie films, and hiking in New England.',
      'Venture capital investor backing climate tech. Avid skier, weekend ceramicist, always scouting the best cold brew.',
      'Product designer at Apple. Minimalist aesthetics, love typography, farmer\'s markets, and Pacific Coast highway road trips.',
      'Data journalist covering global economics. World traveler, passionate reader, and lover of spirited dinner conversations.'
    ],
    dateSpots: [
      {
        id: 'specialty_coffee',
        label: 'Specialty Coffee in Harvard Square / SoHo',
        cost: 45,
        bonusAffection: 15,
        description: 'Shared artisanal pour-overs and warm pastries in a cozy brick cafe with lively intellectual banter.'
      },
      {
        id: 'rooftop_dining',
        label: 'High-Rise Rooftop Dinner Overlooking Skyline',
        cost: 380,
        bonusAffection: 26,
        description: 'Dined under fairy lights and towering skyscrapers with handcrafted mocktails and gourmet cuisine.'
      },
      {
        id: 'waterfront_stroll',
        label: 'Harbor Waterfront & Sunset Pier Walk',
        cost: 35,
        bonusAffection: 12,
        description: 'Walked along the harbor breeze, watching sailboats glide by with fresh gelato in hand.'
      },
      {
        id: 'art_museum',
        label: 'Modern Art Museum & Private Sculpture Garden',
        cost: 190,
        bonusAffection: 20,
        description: 'Explored modern masterpieces and sat by the tranquil reflecting pool sharing thoughts on life.'
      }
    ]
  },

  canada: {
    id: 'canada',
    appName: 'Tinder Canada',
    tagline: 'Tinder Canada · Toronto Match',
    subTitle: 'Modern Connections in the Great White North',
    badge: 'Canada Verified',
    brandColor: 'from-red-600 via-rose-500 to-amber-500',
    accentColor: 'text-red-600',
    region: 'Canada',
    cities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary'],
    universities: [
      'University of Toronto · B.Sc Computer Science',
      'McGill University · B.A. International Relations',
      'University of British Columbia (UBC) · Engineering',
      'University of Waterloo · Software Engineering',
      'Queen\'s University · Commerce / Finance'
    ],
    occupations: [
      'Cloud Solutions Architect', 'CleanTech Environmentalist', 'Chartered Professional Accountant (CPA)',
      'Pediatric Pharmacist', 'Film Festival Producer', 'Civil Infrastructure Engineer'
    ],
    maleBios: [
      'Software engineer in Downtown Toronto. Coffee obsessed, Leafs fan (against my better judgment), love road trips to Algonquin.',
      'Green energy consultant. Splitting time between Toronto and Vancouver. Love trail hiking, photography, and late night poutine.'
    ],
    femaleBios: [
      'Urban designer in Queen West. Passionate about bikeable cities, local bakeries, and weekend getaways in Prince Edward County.',
      'Biochemist at MaRS Discovery District. Love pottery workshops, outdoor ice skating, and lively board game nights.'
    ],
    dateSpots: [
      {
        id: 'queen_west_coffee',
        label: 'Boutique Coffee in Queen West',
        cost: 40,
        bonusAffection: 14,
        description: 'Sat in a sunlit Toronto cafe sipping maple lattes and discussing creative dreams.'
      },
      {
        id: 'cn_tower',
        label: 'CN Tower 360 Revolving Fine Dining',
        cost: 340,
        bonusAffection: 25,
        description: 'Dined high above Lake Ontario as the city lights rotated 360 degrees beneath your table.'
      },
      {
        id: 'harbourfront',
        label: 'Lake Ontario Promenade Walk & Beavertails',
        cost: 30,
        bonusAffection: 12,
        description: 'Brisk scenic walk along the waterfront boardwalk with warm pastries and lake views.'
      },
      {
        id: 'rom_museum',
        label: 'Royal Ontario Museum & Crystal Lounge',
        cost: 160,
        bonusAffection: 20,
        description: 'Walked through historical galleries followed by high tea under the glass architectural crystal.'
      }
    ]
  },

  gulf: {
    id: 'gulf',
    appName: 'Gulf Muzz',
    tagline: 'Gulf Muzz · Matrimonial Match',
    subTitle: 'Elite Courtship & High Society Matches in the Gulf',
    badge: 'GCC Expat & Matrimonial',
    brandColor: 'from-emerald-700 via-teal-600 to-amber-400',
    accentColor: 'text-emerald-700',
    region: 'Gulf & Middle East',
    cities: ['Dubai', 'Riyadh', 'Doha', 'Abu Dhabi', 'Sharjah', 'Manama'],
    universities: [
      'American University of Sharjah · B.Sc Engineering',
      'King Saud University · M.D. Medicine',
      'Qatar University · Law & Islamic Jurisprudence',
      'Sorbonne University Abu Dhabi · Humanities',
      'American University of Beirut · B.B.A'
    ],
    occupations: [
      'Sovereign Wealth Fund Analyst', 'Dubai Real Estate Broker', 'Commercial Aviation Captain',
      'Petroleum Reservoir Engineer', 'Luxury Fashion Brand Director', 'Corporate Hospital Director'
    ],
    maleBios: [
      'Real estate portfolio director in DIFC. Living between Marina and Downtown. Loves dune bashing, luxury watches, and Karak chai.',
      'Civil aviation captain. Flying long-haul across 5 continents. Looking for a family-oriented partner with grace and ambition.'
    ],
    femaleBios: [
      'Wealth manager in Riyadh King Abdullah Financial District. Passionate about Saudi Vision 2030, equestrian riding, and oud fragrances.',
      'Architectural designer in Doha. Restoring historic souqs with futuristic flair. Love quiet seaside dinners and desert stargazing.'
    ],
    dateSpots: [
      {
        id: 'karak_alfahidi',
        label: 'Authentic Karak Chai & Saffron Treats in Al Fahidi',
        cost: 45,
        bonusAffection: 15,
        description: 'Sat beneath wind-towers in the historic quarter enjoying cardamom karak and saffron luqaimat.'
      },
      {
        id: 'atmosphere_burj',
        label: 'Atmosphere Dining at Burj Khalifa / Kingdom Tower',
        cost: 490,
        bonusAffection: 28,
        description: 'World-record altitude fine dining amid the clouds with five-star Arabian hospitality.'
      },
      {
        id: 'jumeirah_stroll',
        label: 'Sunset Promenade Walk along Jumeirah Beach',
        cost: 35,
        bonusAffection: 14,
        description: 'Strolled along the turquoise Persian Gulf as the sun set behind the Burj Al Arab.'
      },
      {
        id: 'louvre_ad',
        label: 'Louvre Abu Dhabi Art & Dome Starlight Tour',
        cost: 220,
        bonusAffection: 22,
        description: 'Walked under the iconic rain-of-light dome admiring priceless civilization artifacts.'
      }
    ]
  },

  germany: {
    id: 'germany',
    appName: 'Tinder Berlin',
    tagline: 'Tinder Berlin · City Pulse',
    subTitle: 'Alternative Culture & Cosmopolitan Dating',
    badge: 'Germany Verified',
    brandColor: 'from-zinc-800 via-stone-700 to-amber-600',
    accentColor: 'text-amber-500',
    region: 'Germany',
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg'],
    universities: [
      'Technical University of Berlin · M.Sc Robotics',
      'Humboldt University of Berlin · Philosophy',
      'Ludwig Maximilian University of Munich · Medicine',
      'Heidelberg University · Life Sciences'
    ],
    occupations: [
      'Robotics Research Scientist', 'CleanTech Renewable Director', 'Fintech Platform Architect',
      'Classical Philharmonic Violinist', 'Industrial Product Designer'
    ],
    maleBios: [
      'Robotics engineer in Mitte. Coffee nerd, cycling through Tiergarten, into experimental ambient techno and contemporary art.',
      'Solar energy consultant. Passionate about European decarbonization, weekend train trips, and independent literature.'
    ],
    femaleBios: [
      'Biotech researcher in Charlottenburg. Love Spree river walks, classical concerts at Berliner Philharmonie, and specialty bakeries.',
      'Industrial designer in Kreuzberg. Minimalist, loves bauhaus architecture, sustainable materials, and Sunday flea markets.'
    ],
    dateSpots: [
      {
        id: 'mitte_cafe',
        label: 'Third-Wave Coffee in Berlin Mitte',
        cost: 40,
        bonusAffection: 15,
        description: 'Shared artisan filter coffee and freshly baked cardamom buns in a minimalist courtyard.'
      },
      {
        id: 'charlottenburg_dinner',
        label: 'Candlelit Dinner in Historic Charlottenburg',
        cost: 280,
        bonusAffection: 24,
        description: 'Intimate candlelight dining with seasonal European cuisine and fine Rhine valley wines.'
      },
      {
        id: 'spree_walk',
        label: 'Spree River & Museum Island Evening Walk',
        cost: 25,
        bonusAffection: 12,
        description: 'Walked along the historic riverbanks gazing at monumental colonnades under twilight.'
      },
      {
        id: 'museum_island',
        label: 'Pergamon & Bode Museum Private Exhibition',
        cost: 150,
        bonusAffection: 20,
        description: 'Admired ancient antiquities and discussed civilization philosophy.'
      }
    ]
  },

  australia: {
    id: 'australia',
    appName: 'Bumble Australia',
    tagline: 'Bumble Australia · Coastal Match',
    subTitle: 'Sunny Connections & Down Under Romance',
    badge: 'Australia Verified',
    brandColor: 'from-sky-600 via-cyan-500 to-amber-400',
    accentColor: 'text-sky-600',
    region: 'Australia',
    cities: ['Melbourne', 'Sydney', 'Brisbane', 'Perth'],
    universities: [
      'University of Melbourne · B.Sc Computing',
      'University of Sydney · Law LL.B',
      'Monash University · Pharmacy & Pharmaceutical Sciences',
      'UNSW Sydney · Renewable Energy Engineering'
    ],
    occupations: [
      'Marine Biology Researcher', 'Software Cloud Architect', 'Sport Medicine Physician',
      'Commercial Viticulturist', 'Architectural Environmentalist'
    ],
    maleBios: [
      'Software engineer in Melbourne. Laneway flat white enthusiast, weekend coastal camper, big Australian Open tennis fan.',
      'Environmental scientist. Protecting coastal reefs, love trail runs along the Yarra River and live comedy shows.'
    ],
    femaleBios: [
      'Architectural designer in Fitzroy. Coffee lover, weekend brunch explorer, into ceramic design and coastal road trips.',
      'Pediatric resident at Royal Children\'s Hospital. Passionate about healthcare, botanical gardens, and outdoor cinema nights.'
    ],
    dateSpots: [
      {
        id: 'laneway_coffee',
        label: 'Flat White in Melbourne Degraves Laneway',
        cost: 35,
        bonusAffection: 15,
        description: 'Sipped world-famous Melbourne flat whites in a bustling graffiti-adorned cobblestone laneway.'
      },
      {
        id: 'southbank_dining',
        label: 'Riverside Dining along Southbank Promenade',
        cost: 320,
        bonusAffection: 25,
        description: 'Enjoyed five-star seafood dining with panoramic views of the illuminated Melbourne skyline.'
      },
      {
        id: 'st_kilda_beach',
        label: 'St Kilda Pier Stroll & Sunset Gelato',
        cost: 30,
        bonusAffection: 13,
        description: 'Walked to the end of the pier catching glimpses of fairy penguins under pastel sunset skies.'
      },
      {
        id: 'ngv_exhibition',
        label: 'National Gallery of Victoria (NGV) Exhibition',
        cost: 160,
        bonusAffection: 20,
        description: 'Walked under the famous stained-glass ceiling admiring international design collections.'
      }
    ]
  }
};

/**
 * Determines which region dating config applies based on character city.
 */
export function getDatingConfigForCity(city: string): RegionDatingConfig {
  const c = city.toLowerCase();
  if (PAKISTAN_CITIES.some((pk) => city.includes(pk)) || c.includes('pakistan')) {
    return REGION_DATING_REGISTRY.pakistan;
  }
  if (c.includes('london') || c.includes('united kingdom') || c.includes('uk') || c.includes('manchester') || c.includes('oxford') || c.includes('cambridge')) {
    return REGION_DATING_REGISTRY.united_kingdom;
  }
  if (c.includes('boston') || c.includes('silicon valley') || c.includes('united states') || c.includes('new york') || c.includes('usa')) {
    return REGION_DATING_REGISTRY.united_states;
  }
  if (c.includes('toronto') || c.includes('canada') || c.includes('vancouver') || c.includes('montreal')) {
    return REGION_DATING_REGISTRY.canada;
  }
  if (c.includes('dubai') || c.includes('riyadh') || c.includes('doha') || c.includes('qatar') || c.includes('saudi') || c.includes('emirates') || c.includes('abu dhabi')) {
    return REGION_DATING_REGISTRY.gulf;
  }
  if (c.includes('berlin') || c.includes('germany') || c.includes('munich') || c.includes('frankfurt')) {
    return REGION_DATING_REGISTRY.germany;
  }
  if (c.includes('melbourne') || c.includes('australia') || c.includes('sydney')) {
    return REGION_DATING_REGISTRY.australia;
  }
  // Fallback for any international location
  return REGION_DATING_REGISTRY.united_kingdom;
}

const INTERNATIONAL_NAMES_MALE = [
  'Arthur Davies', 'Oliver Campbell', 'William Smith', 'Hamza Qureshi', 'Alexander Miller',
  'George Wilson', 'Tariq Hussain', 'James Taylor', 'Ethan Miller', 'Liam Anderson',
  'Lucas Chen', 'Noah Jackson', 'David Patel', 'Benjamin Ross', 'Connor MacDonald',
  'Tariq Al-Mansoor', 'Rashid Al-Maktoum', 'Faris Al-Ghamdi', 'Zaid Al-Thani', 'Julian Weber'
];

const INTERNATIONAL_NAMES_FEMALE = [
  'Charlotte Evans', 'Amelia Clark', 'Zara Khan', 'Olivia Harrison', 'Sophia Brooks',
  'Amina Begum', 'Emily Watson', 'Isabella Wright', 'Emma Watson', 'Maya Patel',
  'Chloe Bennett', 'Ava Johnson', 'Priya Sharma', 'Sophia Lin', 'Sarah Miller',
  'Dana Al-Hassan', 'Reem Al-Falasi', 'Noura Al-Otaibi', 'Maryam Al-Kuwari', 'Hannah Schmidt'
];

export function generateSuitorListForRegion(
  config: RegionDatingConfig,
  playerGender: Gender,
  playerAge: number,
  count = 6
): SuitorProfile[] {
  const targetGender: Gender = playerGender === 'Male' ? 'Female' : 'Male';
  const bios = targetGender === 'Female' ? config.femaleBios : config.maleBios;
  const isPk = config.id === 'pakistan';

  const results: SuitorProfile[] = [];
  for (let i = 0; i < count; i++) {
    const candidateAge = Math.max(15, Math.min(65, Math.round(playerAge + Math.random() * 6 - 2)));
    const fullName = isPk
      ? generateRandomName(targetGender)
      : getRandomElement(targetGender === 'Female' ? INTERNATIONAL_NAMES_FEMALE : INTERNATIONAL_NAMES_MALE);
    const city = getRandomElement(config.cities);
    const bio = getRandomElement(bios);
    const education = getRandomElement(config.universities);
    const occupation = getRandomElement(config.occupations);
    const compatibility = Math.floor(Math.random() * 25 + 75);

    results.push({
      id: 'suitor_' + Date.now() + '_' + i + '_' + Math.random().toString(36).substring(2, 6),
      name: fullName,
      type: 'Dating',
      age: candidateAge,
      gender: targetGender,
      occupation,
      netWorth: Math.floor(Math.random() * 1500000 + 40000),
      affection: Math.floor(Math.random() * 20 + 55),
      respect: Math.floor(Math.random() * 20 + 60),
      trust: Math.floor(Math.random() * 20 + 50),
      personality: getRandomElement(['Loyal', 'Ambitious', 'Sophisticated', 'Playful']),
      avatarSeed: Math.floor(Math.random() * 10000),
      city,
      country: config.region,
      bio,
      compatibility,
      education,
      datingAppSource: config.appName
    });
  }
  return results;
}
