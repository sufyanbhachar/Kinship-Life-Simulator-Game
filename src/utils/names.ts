import { Gender, RelationshipContact, RelationType } from '../types/game';

export const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Peshawar',
  'Quetta',
  'Multan',
  'Sialkot',
  'Gujranwala'
] as const;

export type PakistanCity = typeof PAKISTAN_CITIES[number];

export const FIRST_NAMES_MALE = [
  'Hamza', 'Zaid', 'Daniyal', 'Bilal', 'Haris', 'Zain', 'Omar', 'Ahad',
  'Rayyan', 'Farhan', 'Shahmeer', 'Azlan', 'Mustafa', 'Talha', 'Rehan', 'Usman',
  'Babar', 'Shaheen', 'Shadab', 'Rizwan', 'Naseem', 'Ayan', 'Shahryar', 'Arham',
  'Mikaal', 'Huzaifa', 'Taha', 'Rohail', 'Waleed', 'Shahnawaz', 'Sarmad', 'Jahangir',
  'Jansher', 'Fawad', 'Ahsan', 'Shehryar', 'Saad', 'Hammad', 'Asad', 'Danish',
  'Kamran', 'Shoaib', 'Wasim', 'Waqar', 'Inzamam', 'Sarfaraz', 'Shahid', 'Imran',
  'Jibran', 'Hashir', 'Affan', 'Sameer', 'Zohair', 'Ibrahim', 'Moiz', 'Ali'
];

export const FIRST_NAMES_FEMALE = [
  'Ayesha', 'Fatima', 'Zara', 'Mahnoor', 'Hania', 'Dua', 'Anaya', 'Noor',
  'Maryam', 'Alizeh', 'Iman', 'Zoya', 'Minahil', 'Rania', 'Kinza', 'Sana',
  'Mahira', 'Sajal', 'Yumna', 'Ayeza', 'Iqra', 'Meerab', 'Shireen', 'Syra',
  'Maya', 'Nimra', 'Bakhtawar', 'Bushra', 'Zunaira', 'Ushna', 'Sanam', 'Mehwish',
  'Saboor', 'Mawra', 'Urwa', 'Hira', 'Sumbul', 'Amna', 'Sadia', 'Rabia',
  'Khadija', 'Zainab', 'Nida', 'Natasha', 'Sidra', 'Romaisa', 'Laiba', 'Komal',
  'Aiman', 'Minal', 'Momina', 'Anoushey', 'Juggun', 'Sarwat', 'Sania', 'Samina'
];

export const FIRST_NAMES_NB = [
  'Noor', 'Sasha', 'Rowan', 'Dani', 'Quinn', 'Morgan', 'Shayan', 'Zain',
  'Kiran', 'Shams', 'Farah', 'Afreen', 'Roshan', 'Gohar', 'Nayyab', 'Sehar'
];

export const LAST_NAMES = [
  'Khan', 'Malik', 'Chaudhry', 'Shah', 'Qureshi', 'Siddiqui', 'Mirza',
  'Abbasi', 'Butt', 'Dar', 'Sheikh', 'Hashmi', 'Farooqi', 'Tareen', 'Niazi',
  'Bajwa', 'Cheema', 'Gill', 'Warraich', 'Gondal', 'Virk', 'Bhatti', 'Junejo',
  'Soomro', 'Jamali', 'Bugti', 'Mengal', 'Khattak', 'Afridi', 'Shinwari', 'Durrani',
  'Yousafzai', 'Bukhari', 'Gardezi', 'Gilani', 'Alvi', 'Leghari', 'Mazari', 'Jatoi',
  'Khosa', 'Rind', 'Talpur', 'Magsi', 'Pasha', 'Baig', 'Ansari', 'Kazmi'
];

export const OCCUPATIONS_WORKING = [
  'Textile Fashion Designer', 'Junior Software Developer', 'Chartered Accountant Trainee',
  'Boutique Fashion Stylist', 'Commercial Pilot Cadet', 'College Lecturer',
  'Civil Engineer Site Supervisor', 'Cricket Academy Coach', 'Graphic UI Designer',
  'Specialty Chai Dhaba Manager', 'Digital Marketing Strategist', 'Clinical Pharmacist',
  'Architecture Associate', 'Broadcast Journalist', 'Solar Power Technician', 'Bank Operations Officer'
];

export const OCCUPATIONS_HIGH = [
  'Textile Mill Industrialist', 'Venture Capitalist', 'Supreme Court Senior Advocate',
  'Cardiothoracic Surgeon', 'CSP Civil Service Assistant Commissioner', 'Fintech Platform Founder',
  'Diplomatic Foreign Service Officer', 'Real Estate Syndicate Mogul', 'National Cricket Captain',
  'Chai Cafe Franchise Tycoon', 'Hospital Network Director', 'Commercial Freight Magnate',
  'Television Drama Executive Producer', 'Aviation Fleet Commander', 'Solar Energy Pioneer'
];

export function getRandomElement<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomName(gender: Gender, familyLastName?: string): string {
  let first = '';
  if (gender === 'Male') first = getRandomElement(FIRST_NAMES_MALE);
  else if (gender === 'Female') first = getRandomElement(FIRST_NAMES_FEMALE);
  else first = getRandomElement(FIRST_NAMES_NB);
  const last = familyLastName || getRandomElement(LAST_NAMES);
  return `${first} ${last}`;
}

export function generateBabyName(gender: Gender, parentLastName: string): string {
  let first = '';
  if (gender === 'Male') first = getRandomElement(FIRST_NAMES_MALE);
  else if (gender === 'Female') first = getRandomElement(FIRST_NAMES_FEMALE);
  else first = getRandomElement(FIRST_NAMES_NB);
  return `${first} ${parentLastName}`;
}

export function generateNPC(
  type: RelationType,
  approxAge: number,
  tier: 'humble' | 'elite' = 'humble',
  familyLastName?: string,
  forcedGender?: Gender
): RelationshipContact {
  const genders: Gender[] = ['Male', 'Female', 'Non-Binary'];
  let gender: Gender = forcedGender || genders[Math.floor(Math.random() * (type === 'Parent' ? 2 : 3))];

  // For dating, default to binary Male/Female if not forced
  if (type === 'Dating' && !forcedGender) {
    gender = Math.random() < 0.5 ? 'Male' : 'Female';
  }

  const name = generateRandomName(gender, familyLastName);

  const occList = tier === 'elite' ? OCCUPATIONS_HIGH : OCCUPATIONS_WORKING;
  let occupation = getRandomElement(occList);
  if (approxAge < 6) occupation = 'Infant / Toddler';
  else if (approxAge < 18) occupation = 'Student';

  const netWorth = approxAge < 18
    ? 0
    : tier === 'elite'
    ? Math.floor(Math.random() * 5000000 + 500000)
    : Math.floor(Math.random() * 80000 + 15000);

  const personalities: Array<'Loyal' | 'Ambitious' | 'Sophisticated' | 'Cynical' | 'Playful'> = [
    'Loyal', 'Ambitious', 'Sophisticated', 'Cynical', 'Playful'
  ];

  return {
    id: 'npc_' + Math.random().toString(36).substring(2, 9),
    name,
    type,
    age: Math.max(0, Math.round(approxAge + (type === 'Child' ? 0 : Math.random() * 6 - 3))),
    gender,
    occupation,
    netWorth,
    affection: type === 'Parent' ? 90 : type === 'Child' ? 95 : Math.floor(Math.random() * 30 + 50),
    respect: Math.floor(Math.random() * 35 + 45),
    trust: type === 'Parent' ? 85 : type === 'Child' ? 90 : Math.floor(Math.random() * 30 + 40),
    personality: getRandomElement(personalities),
    avatarSeed: Math.floor(Math.random() * 1000)
  };
}
