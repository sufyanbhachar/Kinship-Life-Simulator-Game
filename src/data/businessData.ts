import { BusinessVenture } from '../types/game';

export interface BusinessBlueprint {
  industry: BusinessVenture['industry'];
  nameOptions: string[];
  initialCost: number;
  baseMargin: number; // profit margin e.g. 0.20
  rdEffect: string;
  reputationPrestige: number;
  description: string;
}

export const BUSINESS_BLUEPRINTS: BusinessBlueprint[] = [
  {
    industry: 'Specialty Chai Cafe Network',
    nameOptions: ['Quetta Karak Chai Co.', 'Chai Kafi Dhaba Express', 'Truck Art Chai Lounge', 'Sufi Chai & Paratha Club'],
    initialCost: 28000,
    baseMargin: 0.24,
    rdEffect: 'Formulates signature elaichi-zafran brew blends and fast-casual franchise growth.',
    reputationPrestige: 25,
    description: 'Vibrant Pakistani chai dhaba chain serving artisanal karak chai, parathas, and late-night snacks.'
  },
  {
    industry: 'Coffee Roastery & Cafe',
    nameOptions: ['Artisan Brew Labs', 'Velvet Crema Roasters', 'Monochrome Coffeehouse', 'Crown Heritage Roasts'],
    initialCost: 45000,
    baseMargin: 0.18,
    rdEffect: 'Curates rare single-origin beans and premium retail margins.',
    reputationPrestige: 30,
    description: 'A stylish third-wave artisanal coffee chain with loyal urban patrons in Clifton and Gulberg.'
  },
  {
    industry: 'SaaS Software',
    nameOptions: ['Aether Data Cloud', 'Hyperion Intelligence', 'Vektor Systems', 'OmniScale Enterprise', 'Indus Logic Labs'],
    initialCost: 75000,
    baseMargin: 0.35,
    rdEffect: 'Builds proprietary AI algorithms and multi-tenant cloud scalability for global clients.',
    reputationPrestige: 75,
    description: 'High-growth B2B enterprise software with recurring subscription cash flows.'
  },
  {
    industry: 'Textile & Garment Export',
    nameOptions: ['Indus Valley Spinning Mills', 'Crescent Textile Giants', 'Kohinoor Weaving Syndicate', 'Sapphire Apparel Exports'],
    initialCost: 120000,
    baseMargin: 0.22,
    rdEffect: 'Upgrades high-speed European automated looms and secures export contracts with European retail chains.',
    reputationPrestige: 110,
    description: 'Large-scale cotton spinning, denim, and apparel manufacturing powerhouse centered in Faisalabad & Karachi.'
  },
  {
    industry: 'Luxury Fashion House',
    nameOptions: ['Maison Noir Couture', 'Atelier Sterling', 'Vanderbilt & Finch', 'Shahzadi Bridal Haute Couture'],
    initialCost: 150000,
    baseMargin: 0.28,
    rdEffect: 'Secures bespoke pure silk mills, handcrafted zardozi embroidery, and exclusive fashion week showcases.',
    reputationPrestige: 125,
    description: 'Haute couture bridal and luxury formal fashion brand catering to elite society weddings and celebrities.'
  },
  {
    industry: 'Luxury Wedding Marquee & Banquet',
    nameOptions: ['Grand Mughal Marquee Palace', 'Royal Palm Banquet Complex', 'Crystal Pavilion Marquees', 'Emerald Ballroom Haven'],
    initialCost: 180000,
    baseMargin: 0.32,
    rdEffect: 'Introduces imported crystal chandeliers, VIP bridal suites, and master celebrity chef catering.',
    reputationPrestige: 135,
    description: 'Palatial event venue hosting multi-million rupee grand Pakistani weddings and corporate gala dinners.'
  },
  {
    industry: 'Boutique Record Label',
    nameOptions: ['Echo Chamber Records', 'Vanguard Soundworks', 'Velvet Vinyl Society', 'Coke Studio Soundworks'],
    initialCost: 90000,
    baseMargin: 0.22,
    rdEffect: 'Discovers viral songwriting talent and licenses sync catalogues for streaming platforms and cinema.',
    reputationPrestige: 80,
    description: 'Independent music publisher that signs cutting-edge South Asian artists and produces cultural chart-toppers.'
  },
  {
    industry: 'Organic Mango & Citrus Orchards',
    nameOptions: ['Multan Sun-Gold Mango Estates', 'Punjab Royal Citrus Groves', 'Sargodha Kinnow Farms', 'Sindhri Heritage Orchards'],
    initialCost: 110000,
    baseMargin: 0.26,
    rdEffect: 'Installs drip irrigation systems, cold storage facilities, and air-freight export pipelines to Dubai & London.',
    reputationPrestige: 85,
    description: 'Fertile agricultural estates harvesting premium Chaunsa, Sindhri, and Anwar Ratol mangoes.'
  },
  {
    industry: 'Commercial Freight & Fleet Logistics',
    nameOptions: ['Indus Express Freight', 'Karakoram Logistics Network', 'Falcon Cargo Carriers', 'CPEC Highway Transporters'],
    initialCost: 240000,
    baseMargin: 0.20,
    rdEffect: 'Deploys telematics fleet tracking, heavy Volvo haulers, and nationwide bonded transit warehouses.',
    reputationPrestige: 140,
    description: 'Fleet of heavy commercial trucks transporting industrial goods between ports and trade hubs.'
  },
  {
    industry: 'Hospital & Diagnostic Healthcare',
    nameOptions: ['Shifa Horizon Specialized Hospitals', 'National Medicare Laboratories', 'Apex Surgical & Trauma Centers'],
    initialCost: 320000,
    baseMargin: 0.27,
    rdEffect: 'Acquires advanced 3T MRI scanners, robotic surgical suites, and attracts world-class cardiologists.',
    reputationPrestige: 190,
    description: 'Modern private healthcare network providing acute tertiary surgical care and diagnostic imaging.'
  },
  {
    industry: 'Solar Energy & Clean Power',
    nameOptions: ['PakSun Green Power Systems', 'Solaris Indus Energy', 'Helios Megawatt Grid', 'EcoVolt Renewable Assets'],
    initialCost: 400000,
    baseMargin: 0.29,
    rdEffect: 'Patents high-efficiency bifacial solar cells and grid-tied utility battery storage banks.',
    reputationPrestige: 210,
    description: 'Clean energy utility company building distributed solar parks and commercial rooftop installations.'
  },
  {
    industry: 'Real Estate Syndicate',
    nameOptions: ['Kensington Capital Holdings', 'Apex Metropolitan Assets', 'Heritage Realty Partners', 'DHA Skyline Towers'],
    initialCost: 350000,
    baseMargin: 0.25,
    rdEffect: 'Acquires prime historic buildings, luxury high-rises, and gated commercial plazas.',
    reputationPrestige: 160,
    description: 'Commercial and residential property portfolio generating steady rental dividends and capital appreciation.'
  },
  {
    industry: 'Fintech & Digital Banking',
    nameOptions: ['Paisapay Digital Wallet', 'Razaq Microfinance Systems', 'Kinship Digital Cash', 'IndusPay Global Transfer'],
    initialCost: 450000,
    baseMargin: 0.36,
    rdEffect: 'Integrates central bank Raast instant payments and biometric micro-credit scoring algorithms.',
    reputationPrestige: 240,
    description: 'Next-generation digital financial app offering mobile wallets, merchant QR payments, and peer remittances.'
  },
  {
    industry: 'Clean Tech Ventures',
    nameOptions: ['Helios Fusion Labs', 'Verdant Grid Solutions', 'AeroCarbon Capture', 'TerraNova Kinetics'],
    initialCost: 500000,
    baseMargin: 0.30,
    rdEffect: 'Patents next-generation solid-state battery and carbon sequestration systems.',
    reputationPrestige: 260,
    description: 'Revolutionary green engineering venture aimed at solving atmospheric and industrial environmental crises.'
  }
];
