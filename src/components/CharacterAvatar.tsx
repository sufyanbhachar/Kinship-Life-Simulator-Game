import React from 'react';
import { Gender } from '../types/game';

export interface CharacterAvatarProps {
  name: string;
  age: number;
  gender?: Gender;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  animated?: boolean;
  showBadge?: boolean;
  happiness?: number;
}

// Simple deterministic hash based on name string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Life Stages:
// Age < 4 is a Baby (<4), Age 4 to 12 is a Child, etc.
export type LifeStage = 'baby' | 'child' | 'teen' | 'young_adult' | 'mature' | 'senior';

export function getLifeStage(age: number): LifeStage {
  if (age < 4) return 'baby';
  if (age <= 12) return 'child';
  if (age <= 19) return 'teen';
  if (age <= 39) return 'young_adult';
  if (age <= 59) return 'mature';
  return 'senior';
}

export function getLifeStageLabel(age: number): string {
  if (age === 0) return 'Newborn Baby';
  if (age === 1) return 'Infant Baby';
  if (age === 2) return 'Chubby Baby';
  if (age === 3) return 'Toddler Baby';
  if (age <= 12) return 'Child';
  if (age <= 19) return 'Teenager';
  if (age <= 39) return 'Young Adult';
  if (age <= 59) return 'Mature Adult';
  return 'Distinguished Elder';
}

// Warm Pakistani & South Asian inspired radiant skin tones
const SKIN_TONES = [
  { skin: '#F8D8B8', shadow: '#E2AB84', blush: '#FF9494' }, // Soft Peach
  { skin: '#EFC9A4', shadow: '#D49D72', blush: '#F28585' }, // Warm Ivory
  { skin: '#E2B386', shadow: '#C28859', blush: '#E57373' }, // Golden Tan
  { skin: '#D29C6C', shadow: '#B17242', blush: '#D96565' }, // Warm Almond
  { skin: '#BC8250', shadow: '#965C2B', blush: '#C55454' }, // Rich Caramel
  { skin: '#A46C3B', shadow: '#7F4C1F', blush: '#B34545' }, // Deep Bronze
];

const EYE_COLORS = [
  { iris: '#2A1810', rim: '#1A0C06' }, // Dark Chocolate
  { iris: '#3D2314', rim: '#24140A' }, // Deep Amber Brown
  { iris: '#1E242B', rim: '#11151A' }, // Obsidian Charcoal
  { iris: '#4A3425', rim: '#2B1C12' }, // Warm Chestnut
];

const HAIR_COLORS = [
  '#151414', // Jet Black
  '#251A14', // Espresso
  '#3A2416', // Dark Chocolate
  '#4A3020', // Warm Walnut
  '#2C221D', // Deep Charcoal
];

// Distinct MALE shirt color palettes (rich, bold, masculine Pakistani styles)
const MALE_SHIRT_PALETTES = [
  { primary: '#1B3B6F', secondary: '#FFFFFF', accent: '#E63946', collar: '#FFFFFF' }, // Royal Navy & White
  { primary: '#0A5C36', secondary: '#F4D03F', accent: '#FFFFFF', collar: '#EAE6DF' }, // Pakistan Cricket Emerald & Gold
  { primary: '#212529', secondary: '#E63946', accent: '#B8860B', collar: '#343A40' }, // Charcoal Executive & Crimson
  { primary: '#284B63', secondary: '#FFA07A', accent: '#FFFFFF', collar: '#FFFFFF' }, // Slate Blue & Coral
  { primary: '#354F52', secondary: '#CAD2C5', accent: '#D4AF37', collar: '#EAE6DF' }, // Deep Forest & Cream
  { primary: '#1D3557', secondary: '#457B9D', accent: '#F1FAEE', collar: '#F1FAEE' }, // Cobalt Sapphire & Ice
  { primary: '#5C1324', secondary: '#D4AF37', accent: '#FFFFFF', collar: '#F8F9FA' }, // Regal Maroon Sherwani & Gold
];

// Distinct FEMALE shirt color palettes (vibrant, elegant, graceful Pakistani lawn & silk styles)
const FEMALE_SHIRT_PALETTES = [
  { primary: '#E56B6F', secondary: '#FFF0F5', accent: '#B5179E', collar: '#FFF0F5' }, // Rose Blush & Soft Petal
  { primary: '#8338EC', secondary: '#FFBE0B', accent: '#FFFFFF', collar: '#FFF3BF' }, // Royal Violet & Golden Saffron
  { primary: '#2A9D8F', secondary: '#F4A261', accent: '#E76F51', collar: '#FFFFFF' }, // Persian Mint Teal & Peach
  { primary: '#E76F51', secondary: '#FFE3E0', accent: '#D81159', collar: '#FFF' },    // Coral Sunset & Cream
  { primary: '#D81159', secondary: '#FFBC42', accent: '#FFFFFF', collar: '#FFF' },    // Magenta Blossom & Marigold
  { primary: '#118AB2', secondary: '#06D6A0', accent: '#FFD166', collar: '#E0FBFC' }, // Sky Turquoise & Seafoam
  { primary: '#9B5DE5', secondary: '#F15BB5', accent: '#FEE440', collar: '#FFFFFF' }, // Orchid Lavender & Pink
  { primary: '#B5179E', secondary: '#7209B7', accent: '#4CC9F0', collar: '#FFF0F5' }, // Rich Plum & Cyan Trim
];

// MALE Baby Romper / Swaddle Palettes (Cool baby blues, fresh greens, soft slates)
const MALE_BABY_PALETTES = [
  { bg: '#BBDEFB', trim: '#64B5F6', badge: '#1976D2', accent: '#E63946' }, // Baby Sky Blue
  { bg: '#C8E6C9', trim: '#81C784', badge: '#2E7D32', accent: '#F4D03F' }, // Baby Mint Green
  { bg: '#FFF59D', trim: '#FBC02D', badge: '#F57F17', accent: '#1976D2' }, // Buttercup Star
  { bg: '#CFD8DC', trim: '#90A4AE', badge: '#37474F', accent: '#E53935' }, // Soft Slate Bear
  { bg: '#FFE0B2', trim: '#FFB74D', badge: '#E65100', accent: '#1E88E5' }, // Warm Peach Dino
];

// FEMALE Baby Romper / Dress Palettes (Cute baby roses, soft lilacs, pastel peaches)
const FEMALE_BABY_PALETTES = [
  { bg: '#F8BBD0', trim: '#F06292', badge: '#C2185B', accent: '#FF4081' }, // Baby Rose Petal
  { bg: '#E1BEE7', trim: '#BA68C8', badge: '#7B1FA2', accent: '#E91E63' }, // Pastel Lilac Fairy
  { bg: '#FFCCBC', trim: '#FF8A65', badge: '#D84315', accent: '#FF5722' }, // Soft Coral Peach
  { bg: '#FFF9C4', trim: '#FFF176', badge: '#FBC02D', accent: '#E91E63' }, // Lemon Honey Blossom
  { bg: '#B2DFDB', trim: '#4DB6AC', badge: '#00796B', accent: '#FF4081' }, // Mint Daisy Blossom
];

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  name,
  age,
  gender = 'Male',
  size = 'md',
  className = '',
  animated = true,
  showBadge = false,
  happiness = 85
}) => {
  const seed = hashString(name);
  const stage = getLifeStage(age);
  const isFemale = gender === 'Female';

  const tone = SKIN_TONES[seed % SKIN_TONES.length];
  const eyeColor = EYE_COLORS[(seed >> 1) % EYE_COLORS.length];

  // Hair color shifts dynamically
  let hairColor = HAIR_COLORS[(seed >> 2) % HAIR_COLORS.length];
  if (stage === 'senior') {
    const seniorGrays = ['#EAEAEA', '#D5D5D5', '#C0C0C0', '#9E9E9E'];
    hairColor = seniorGrays[seed % seniorGrays.length];
  } else if (stage === 'mature' && seed % 2 === 0) {
    hairColor = '#423E3D'; // Salt & pepper charcoal
  }

  // DEDICATED SHIRT & BABY PALETTES strictly separated for Male vs Female
  const outfit = isFemale
    ? FEMALE_SHIRT_PALETTES[(seed >> 3) % FEMALE_SHIRT_PALETTES.length]
    : MALE_SHIRT_PALETTES[(seed >> 3) % MALE_SHIRT_PALETTES.length];

  const babyOutfit = isFemale
    ? FEMALE_BABY_PALETTES[seed % FEMALE_BABY_PALETTES.length]
    : MALE_BABY_PALETTES[seed % MALE_BABY_PALETTES.length];

  const hasGlasses = stage === 'senior' || (age >= 16 && (seed % 3 === 0));
  const hasFacialHair = !isFemale && (stage === 'mature' || stage === 'senior' || (stage === 'young_adult' && (seed % 3 !== 0)));
  const facialHairStyle = seed % 3; // 0: neat stubble/goatee, 1: groomed beard, 2: full sherwani beard

  // Dimension mapping
  const sizeMap = {
    xs: 'w-8 h-8 text-[9px]',
    sm: 'w-10 h-10 text-[10px]',
    md: 'w-14 h-14 text-xs',
    lg: 'w-24 h-24 text-sm',
    xl: 'w-36 h-36 text-base',
    hero: 'w-48 h-48 sm:w-56 sm:h-56 text-lg'
  };

  const animClass = animated ? 'avatar-animated' : '';
  const uid = `ava_${isFemale ? 'f' : 'm'}_${seed}_${stage}`;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-2xl ${
          isFemale
            ? 'bg-gradient-to-b from-[#FFF5F7] via-[#FDF0F3] to-[#F7E1E7] border-2 border-pink-900/15'
            : 'bg-gradient-to-b from-[#F4F8FA] via-[#EBF2F6] to-[#DEE8EE] border-2 border-[#1C1C1C]/15'
        } shadow-sm overflow-hidden flex items-center justify-center p-1 relative transition-transform duration-200 hover:scale-[1.03]`}
      >
        <svg
          viewBox="0 0 120 120"
          className={`w-full h-full ${animClass}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`bg_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              {isFemale ? (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#F9E2E8" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2EAF0" />
                </>
              )}
            </linearGradient>
            <linearGradient id={`skin_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={tone.skin} />
              <stop offset="100%" stopColor={tone.shadow} />
            </linearGradient>
            <filter id={`shadow_${uid}`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Background aura circle */}
          <circle cx="60" cy="60" r="56" fill={`url(#bg_${uid})`} />
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke={isFemale ? 'rgba(233, 30, 99, 0.08)' : 'rgba(0, 0, 0, 0.06)'}
            strokeWidth="2"
            fill="none"
          />

          {/* Decorative subtle aura rings */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke={isFemale ? 'rgba(230, 80, 120, 0.12)' : 'rgba(27, 59, 111, 0.10)'}
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />

          {/* Group with gentle breathing animation */}
          <g className={animated ? 'avatar-body-group' : ''}>

            {/* ================= CLOTHING & SHOULDERS ================= */}
            {stage === 'baby' ? (
              // ULTRA CUTE BABY (<4): Female has frilly ruffled dress with bow; Male has romper with bowtie/suspenders
              isFemale ? (
                // BABY GIRL: Soft pastel pink/lilac ruffled onesie with frilly lace collar & ribbons
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M26 112 Q60 84 94 112 L94 120 L26 120 Z"
                    fill={babyOutfit.bg}
                  />
                  {/* Scalloped lace frills at bottom of neck */}
                  <path
                    d="M36 90 Q42 98 48 90 Q54 98 60 90 Q66 98 72 90 Q78 98 84 90"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Frilly dress collar */}
                  <path
                    d="M38 86 Q60 102 82 86 Q60 80 38 86 Z"
                    fill="#FFFFFF"
                    stroke={babyOutfit.trim}
                    strokeWidth="1.2"
                  />
                  {/* Sweet satin ribbon bow at chest */}
                  <polygon points="60,93 54,88 55,98" fill={babyOutfit.accent} />
                  <polygon points="60,93 66,88 65,98" fill={babyOutfit.accent} />
                  <circle cx="60" cy="93" r="2.2" fill="#FFD700" />
                  {/* Cute chubby baby hands peeking */}
                  <circle cx="34" cy="99" r="5" fill={tone.skin} stroke={tone.shadow} strokeWidth="1" />
                  <circle cx="86" cy="99" r="5" fill={tone.skin} stroke={tone.shadow} strokeWidth="1" />
                </g>
              ) : (
                // BABY BOY: Soft sky blue/mint romper with tiny bowtie & button suspenders
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M26 112 Q60 84 94 112 L94 120 L26 120 Z"
                    fill={babyOutfit.bg}
                  />
                  {/* Cute suspender straps */}
                  <line x1="44" y1="88" x2="44" y2="120" stroke={babyOutfit.trim} strokeWidth="3" />
                  <line x1="76" y1="88" x2="76" y2="120" stroke={babyOutfit.trim} strokeWidth="3" />
                  <circle cx="44" cy="94" r="2" fill="#FFFFFF" />
                  <circle cx="76" cy="94" r="2" fill="#FFFFFF" />
                  {/* White Peter Pan collar */}
                  <path d="M40 86 Q60 100 80 86 Q60 80 40 86 Z" fill="#FFFFFF" />
                  {/* Cute baby bowtie */}
                  <polygon points="60,91 54,87 54,95" fill={babyOutfit.accent} />
                  <polygon points="60,91 66,87 66,95" fill={babyOutfit.accent} />
                  <circle cx="60" cy="91" r="2" fill={babyOutfit.badge} />
                  {/* Cute chubby baby hands */}
                  <circle cx="34" cy="99" r="5" fill={tone.skin} stroke={tone.shadow} strokeWidth="1" />
                  <circle cx="86" cy="99" r="5" fill={tone.skin} stroke={tone.shadow} strokeWidth="1" />
                </g>
              )
            ) : stage === 'child' ? (
              // CUTE CARTOON CHILD (Ages 4-12):
              isFemale ? (
                // CHILD GIRL: Vibrant pastel frock / embroidered kurti with flower neckline
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M18 108 Q60 76 102 108 L104 120 L16 120 Z"
                    fill={outfit.primary}
                  />
                  {/* Scalloped floral lace neckline */}
                  <path
                    d="M42 84 Q51 96 60 88 Q69 96 78 84"
                    stroke={outfit.secondary}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <polygon points="60,88 56,104 64,104" fill={outfit.secondary} />
                  {/* Cute daisy / butterfly chest brooch */}
                  <circle cx="76" cy="96" r="3.5" fill="#FFFFFF" />
                  <circle cx="76" cy="96" r="1.8" fill="#F1C40F" />
                </g>
              ) : (
                // CHILD BOY: Sporty Pakistan polo / cricket jersey with collar and badges
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M18 108 Q60 76 102 108 L104 120 L16 120 Z"
                    fill={outfit.primary}
                  />
                  {/* White polo collar */}
                  <polygon points="60,86 42,75 50,96" fill={outfit.collar} />
                  <polygon points="60,86 78,75 70,96" fill={outfit.collar} />
                  <line x1="60" y1="86" x2="60" y2="108" stroke="rgba(0,0,0,0.2)" strokeWidth="2" />
                  <circle cx="60" cy="94" r="2" fill={outfit.secondary} />
                  <circle cx="60" cy="102" r="2" fill={outfit.secondary} />
                  {/* Crossed cricket bats or star badge */}
                  <g transform="translate(76, 96)">
                    <rect x="-1" y="-5" width="2" height="10" rx="1" fill="#D4A373" transform="rotate(35)" />
                    <rect x="-1" y="-5" width="2" height="10" rx="1" fill="#D4A373" transform="rotate(-35)" />
                    <circle cx="0" cy="0" r="2" fill="#E63946" />
                  </g>
                </g>
              )
            ) : stage === 'teen' ? (
              // TEEN (13-19):
              isFemale ? (
                // TEEN GIRL: Chic trendy modern kurti / pastel hoodie with delicate choker & embroidered trim
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M14 108 Q60 70 106 108 L108 120 L12 120 Z"
                    fill={outfit.primary}
                  />
                  {/* Elegant V-neck kurti opening with gold tassel embroidery */}
                  <path d="M46 76 Q60 96 74 76" stroke={outfit.secondary} strokeWidth="2.5" fill="none" />
                  <line x1="60" y1="92" x2="60" y2="120" stroke={outfit.secondary} strokeWidth="2" />
                  {/* Cute silver / pearl choker pendant */}
                  <path d="M52 74 Q60 80 68 74" stroke="#FFF" strokeWidth="1.2" fill="none" />
                  <circle cx="60" cy="78" r="2" fill="#F1C40F" />
                </g>
              ) : (
                // TEEN BOY: Streetwear hoodie with drawstrings & contrast inner hood
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M14 108 Q60 70 106 108 L108 120 L12 120 Z"
                    fill={outfit.primary}
                  />
                  <path d="M46 76 L60 97 L74 76" fill={outfit.secondary} />
                  <line x1="53" y1="92" x2="52" y2="110" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                  <line x1="67" y1="92" x2="68" y2="110" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
                </g>
              )
            ) : stage === 'young_adult' ? (
              // YOUNG ADULT (20-39):
              isFemale ? (
                // YOUNG ADULT WOMAN: Gorgeous Pakistani lawn / chiffon designer suit with graceful draped dupatta!
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M10 108 Q60 66 110 108 L112 120 L8 120 Z"
                    fill={outfit.primary}
                  />
                  {/* Beautiful embroidered neckline */}
                  <path d="M48 76 Q60 96 72 76" stroke={outfit.secondary} strokeWidth="3" fill="none" />
                  {/* Graceful chiffon dupatta draped across left shoulder */}
                  <path
                    d="M10 82 Q35 95 48 120 L25 120 L10 100 Z"
                    fill={outfit.secondary}
                    opacity="0.9"
                  />
                  <path d="M10 82 Q35 95 48 120" stroke="#FFF" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
                </g>
              ) : (
                // YOUNG ADULT MAN: Crisp tailored band-collar kurta / executive blazer
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M10 108 Q60 66 110 108 L112 120 L8 120 Z"
                    fill={outfit.primary}
                  />
                  <polygon points="60,84 44,72 52,106" fill="#FFFFFF" />
                  <polygon points="60,84 76,72 68,106" fill="#FFFFFF" />
                  <polygon points="60,90 56,120 64,120" fill={outfit.secondary} />
                  <circle cx="60" cy="87" r="2.5" fill="#D4AF37" />
                </g>
              )
            ) : stage === 'mature' ? (
              // MATURE ADULT (40-59):
              isFemale ? (
                // MATURE WOMAN: Regal Banarasi formal silk suit with gold zardozi embroidery & pearl necklace
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M8 108 Q60 64 112 108 L114 120 L6 120 Z"
                    fill={outfit.primary}
                  />
                  {/* Gold embroidered neckline border */}
                  <path d="M46 74 Q60 98 74 74" stroke="#D4AF37" strokeWidth="3" fill="none" />
                  {/* Pearl necklace */}
                  <path d="M50 72 Q60 84 70 72" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="1 3" fill="none" />
                  {/* Draped royal silk dupatta */}
                  <path d="M8 90 Q30 105 45 120 L20 120 Z" fill={outfit.secondary} opacity="0.9" />
                </g>
              ) : (
                // MATURE MAN: Regal midnight / emerald sherwani with engraved gold buttons
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M8 108 Q60 64 112 108 L114 120 L6 120 Z"
                    fill="#1C1C1C"
                  />
                  <path d="M50 72 L60 92 L70 72" fill={outfit.secondary} />
                  <line x1="60" y1="84" x2="60" y2="120" stroke="#B8860B" strokeWidth="3" />
                  <circle cx="60" cy="94" r="2.2" fill="#FFFFFF" />
                  <circle cx="60" cy="104" r="2.2" fill="#FFFFFF" />
                </g>
              )
            ) : (
              // SENIOR (60+):
              isFemale ? (
                // SENIOR WOMAN: Graceful Kashmiri pashmina shawl with traditional paisley floral embroidery
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M6 108 Q60 62 114 108 L116 120 L4 120 Z"
                    fill={outfit.primary}
                  />
                  {/* Kashmiri embroidered shawl drape */}
                  <path d="M20 78 Q60 106 100 78 L106 120 L14 120 Z" fill="#9B2226" opacity="0.92" />
                  <path d="M44 72 L60 88 L76 72" fill="#FFF0F5" />
                  <line x1="60" y1="84" x2="60" y2="120" stroke="#D4AF37" strokeWidth="2.5" />
                </g>
              ) : (
                // SENIOR MAN: Traditional waistcoat (waskat) over crisp kurta with gold buttons
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M6 108 Q60 62 114 108 L116 120 L4 120 Z"
                    fill="#2A2A2A"
                  />
                  <path d="M22 80 Q60 106 98 80 L104 120 L16 120 Z" fill="#3D5A45" opacity="0.92" />
                  <path d="M46 72 L60 88 L74 72" fill="#EAE6DF" />
                  <line x1="60" y1="84" x2="60" y2="120" stroke="#B8860B" strokeWidth="2.5" />
                </g>
              )
            )}

            {/* ================= NECK ================= */}
            {stage === 'baby' ? (
              <rect x="54" y="74" width="12" height="7" rx="3.5" fill={tone.shadow} />
            ) : stage === 'child' ? (
              <rect x="53" y="71" width="14" height="11" rx="5" fill={tone.shadow} />
            ) : (
              <rect
                x={isFemale ? '53' : '52'}
                y="67"
                width={isFemale ? '14' : '16'}
                height="15"
                rx={isFemale ? '7' : '6'}
                fill={tone.shadow}
              />
            )}

            {/* ================= HEAD & FACE SHAPE ================= */}
            {stage === 'baby' ? (
              // ULTRA CUTE BABY HEAD: Big round squishy face with soft chubby cheeks & tiny ears
              <g>
                <circle cx="32" cy="55" r="7.5" fill={tone.skin} />
                <circle cx="32" cy="55" r="4.5" fill={tone.shadow} />
                <circle cx="88" cy="55" r="7.5" fill={tone.skin} />
                <circle cx="88" cy="55" r="4.5" fill={tone.shadow} />

                {/* Head circle */}
                <circle
                  cx="60"
                  cy="53"
                  r="28"
                  fill={`url(#skin_${uid})`}
                  filter={`url(#shadow_${uid})`}
                />
                {/* Extra squishy chubby cheeks */}
                <circle cx="41" cy="61" r="11" fill={tone.skin} />
                <circle cx="79" cy="61" r="11" fill={tone.skin} />
              </g>
            ) : stage === 'child' ? (
              // CUTE CARTOON CHILD HEAD: Cheerful round face with playful ears
              <g>
                <circle cx="32" cy="52" r="8" fill={tone.skin} />
                <circle cx="32" cy="52" r="4.5" fill={tone.shadow} />
                <circle cx="88" cy="52" r="8" fill={tone.skin} />
                <circle cx="88" cy="52" r="4.5" fill={tone.shadow} />

                <circle
                  cx="60"
                  cy="51"
                  r="27.5"
                  fill={`url(#skin_${uid})`}
                  filter={`url(#shadow_${uid})`}
                />
                {/* Soft child cheeks */}
                <circle cx="43" cy="58" r="8.5" fill={tone.skin} />
                <circle cx="77" cy="58" r="8.5" fill={tone.skin} />
              </g>
            ) : (
              // ADULT / TEEN / MATURE / SENIOR:
              // Females have a softer, slightly gentler jawline; Males have a structured jawline
              <g>
                <circle cx="32" cy="50" r="8" fill={tone.skin} />
                <circle cx="32" cy="50" r="4" fill={tone.shadow} />
                <circle cx="88" cy="50" r="8" fill={tone.skin} />
                <circle cx="88" cy="50" r="4" fill={tone.shadow} />

                {isFemale ? (
                  // Softer, graceful feminine jawline
                  <path
                    d="M34 44 Q60 20 86 44 Q88 72 60 79 Q32 72 34 44 Z"
                    fill={`url(#skin_${uid})`}
                    filter={`url(#shadow_${uid})`}
                  />
                ) : (
                  // Stronger, defined masculine jawline
                  <path
                    d="M32 44 Q60 17 88 44 Q90 75 60 83 Q30 75 32 44 Z"
                    fill={`url(#skin_${uid})`}
                    filter={`url(#shadow_${uid})`}
                  />
                )}

                {/* Mature / Elder subtle contour lines */}
                {stage === 'mature' && (
                  <path
                    d="M42 66 Q48 72 52 75 M78 66 Q72 72 68 75"
                    stroke={tone.shadow}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.5"
                  />
                )}
                {stage === 'senior' && (
                  <g opacity="0.75">
                    <path d="M38 46 L34 44 M38 49 L33 50 M82 46 L86 44 M82 49 L87 50" stroke={tone.shadow} strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M43 64 Q49 71 52 76 M77 64 Q71 71 68 76" stroke={tone.shadow} strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M50 32 Q60 30 70 32" stroke={tone.shadow} strokeWidth="1" strokeLinecap="round" fill="none" />
                  </g>
                )}
              </g>
            )}

            {/* ================= CHEEKS & ROSY BLUSH ================= */}
            {stage === 'baby' ? (
              // ULTRA CUTE BABY BLUSH: Rosy glowing round circles with cute white catchlight sparkles!
              <g>
                <circle cx="41" cy="62" r={isFemale ? 8 : 7.5} fill={isFemale ? '#FF80AB' : tone.blush} opacity="0.7" />
                <circle cx="79" cy="62" r={isFemale ? 8 : 7.5} fill={isFemale ? '#FF80AB' : tone.blush} opacity="0.7" />
                <circle cx="39" cy="60" r="1.5" fill="#FFFFFF" opacity="0.8" />
                <circle cx="77" cy="60" r="1.5" fill="#FFFFFF" opacity="0.8" />
              </g>
            ) : stage === 'child' ? (
              // Child rosy blush with sweet freckles
              <g>
                <circle cx="43" cy="59" r="6" fill={isFemale ? '#FF80AB' : tone.blush} opacity="0.55" />
                <circle cx="77" cy="59" r="6" fill={isFemale ? '#FF80AB' : tone.blush} opacity="0.55" />
                {seed % 2 === 0 && (
                  <g fill={tone.shadow} opacity="0.7">
                    <circle cx="41" cy="58" r="0.8" />
                    <circle cx="45" cy="59" r="0.8" />
                    <circle cx="43" cy="61" r="0.8" />
                    <circle cx="75" cy="59" r="0.8" />
                    <circle cx="79" cy="58" r="0.8" />
                    <circle cx="77" cy="61" r="0.8" />
                  </g>
                )}
              </g>
            ) : (
              // Adult soft natural cheek warmth (more pronounced peach/pink for women)
              <g>
                <circle cx="43" cy="58" r={isFemale ? 5.5 : 4.5} fill={isFemale ? '#FF80AB' : tone.blush} opacity={isFemale ? '0.5' : '0.4'} />
                <circle cx="77" cy="58" r={isFemale ? 5.5 : 4.5} fill={isFemale ? '#FF80AB' : tone.blush} opacity={isFemale ? '0.5' : '0.4'} />
              </g>
            )}

            {/* ================= EYES & BLINK ANIMATION ================= */}
            <g className={animated ? 'avatar-eyes-group' : ''}>
              {/* Left Eye */}
              <g transform="translate(44, 49)">
                {stage === 'baby' ? (
                  // ULTRA CUTE BIG SHINY BABY EYE
                  <g>
                    <circle cx="0" cy="0" r="6.5" fill={eyeColor.rim} />
                    <circle cx="0" cy="0" r="5.6" fill={eyeColor.iris} />
                    <circle cx="0" cy="0" r="3.6" fill="#0D0D0D" />
                    <circle cx="-2" cy="-2.4" r="2.4" fill="#FFFFFF" />
                    <circle cx="2.2" cy="2.2" r="1.3" fill="#FFFFFF" />
                    {isFemale ? (
                      // Cute curved baby girl eyelashes
                      <g stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none">
                        <path d="M-5 -4 Q-2 -7 4 -5.5" />
                        <path d="M-6 -4.5 L-8 -6" />
                        <path d="M-4 -6 L-5 -8" />
                      </g>
                    ) : (
                      <path d="M-5 -4 Q-2 -6.5 4 -5.5" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    )}
                  </g>
                ) : stage === 'child' ? (
                  // CUTE SPARKLING CHILD EYE
                  <g>
                    <ellipse cx="0" cy="0" rx="5.4" ry="5.8" fill={eyeColor.rim} />
                    <circle cx="0" cy="0" r="4.6" fill={eyeColor.iris} />
                    <circle cx="0" cy="0" r="2.8" fill="#1C1C1C" />
                    <circle cx="-1.8" cy="-2" r="2.0" fill="#FFFFFF" />
                    <circle cx="1.8" cy="1.8" r="1.0" fill="#FFFFFF" />
                    {isFemale ? (
                      <g stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none">
                        <path d="M-4.5 -4 Q-1 -6 4.5 -4.5" />
                        <path d="M-5 -4.5 L-7 -6.5" />
                      </g>
                    ) : (
                      <path d="M-4.5 -4 Q-1 -6 4.5 -4.5" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    )}
                  </g>
                ) : (
                  // ADULT / TEEN / SENIOR EYE
                  <g>
                    <ellipse cx="0" cy="0" rx={isFemale ? '5.0' : '4.8'} ry={isFemale ? '5.4' : '5.2'} fill={eyeColor.rim} />
                    <circle cx="0" cy="0" r={isFemale ? '4.0' : '3.8'} fill={eyeColor.iris} />
                    <circle cx="0" cy="0" r="2.2" fill="#1C1C1C" />
                    <circle cx="-1.5" cy="-1.8" r="1.8" fill="#FFFFFF" />
                    <circle cx="1.6" cy="1.6" r="0.9" fill="#FFFFFF" />
                    {isFemale ? (
                      // Elegant feminine winged eyelashes
                      <g stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none">
                        <path d="M-4.5 -3.5 Q-1 -5.2 4 -3.8" />
                        <path d="M-5 -4 L-7.5 -5.8" />
                        <path d="M-3.5 -5 L-5 -7.2" />
                      </g>
                    ) : (
                      <path d="M-4 -3.5 Q-1 -5 4 -3.8" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    )}
                  </g>
                )}
              </g>

              {/* Right Eye */}
              <g transform="translate(76, 49)">
                {stage === 'baby' ? (
                  // ULTRA CUTE BIG SHINY BABY EYE
                  <g>
                    <circle cx="0" cy="0" r="6.5" fill={eyeColor.rim} />
                    <circle cx="0" cy="0" r="5.6" fill={eyeColor.iris} />
                    <circle cx="0" cy="0" r="3.6" fill="#0D0D0D" />
                    <circle cx="-2" cy="-2.4" r="2.4" fill="#FFFFFF" />
                    <circle cx="2.2" cy="2.2" r="1.3" fill="#FFFFFF" />
                    {isFemale ? (
                      <g stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none">
                        <path d="M-4 -5.5 Q2 -7 5 -4" />
                        <path d="M6 -4.5 L8 -6" />
                        <path d="M4 -6 L5 -8" />
                      </g>
                    ) : (
                      <path d="M-4 -5.5 Q2 -6.5 5 -4" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    )}
                  </g>
                ) : stage === 'child' ? (
                  // CUTE SPARKLING CHILD EYE
                  <g>
                    <ellipse cx="0" cy="0" rx="5.4" ry="5.8" fill={eyeColor.rim} />
                    <circle cx="0" cy="0" r="4.6" fill={eyeColor.iris} />
                    <circle cx="0" cy="0" r="2.8" fill="#1C1C1C" />
                    <circle cx="-1.8" cy="-2" r="2.0" fill="#FFFFFF" />
                    <circle cx="1.8" cy="1.8" r="1.0" fill="#FFFFFF" />
                    {isFemale ? (
                      <g stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none">
                        <path d="M-4.5 -4.5 Q1 -6 4.5 -4" />
                        <path d="M5 -4.5 L7 -6.5" />
                      </g>
                    ) : (
                      <path d="M-4.5 -4.5 Q1 -6 4.5 -4" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    )}
                  </g>
                ) : (
                  // ADULT / TEEN / SENIOR EYE
                  <g>
                    <ellipse cx="0" cy="0" rx={isFemale ? '5.0' : '4.8'} ry={isFemale ? '5.4' : '5.2'} fill={eyeColor.rim} />
                    <circle cx="0" cy="0" r={isFemale ? '4.0' : '3.8'} fill={eyeColor.iris} />
                    <circle cx="0" cy="0" r="2.2" fill="#1C1C1C" />
                    <circle cx="-1.5" cy="-1.8" r="1.8" fill="#FFFFFF" />
                    <circle cx="1.6" cy="1.6" r="0.9" fill="#FFFFFF" />
                    {isFemale ? (
                      <g stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" fill="none">
                        <path d="M-4 -3.8 Q1 -5.2 4.5 -3.5" />
                        <path d="M5 -4 L7.5 -5.8" />
                        <path d="M3.5 -5 L5 -7.2" />
                      </g>
                    ) : (
                      <path d="M-4 -3.8 Q1 -5 4 -3.5" stroke="#1C1C1C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    )}
                  </g>
                )}
              </g>
            </g>

            {/* ================= EYEBROWS ================= */}
            {stage === 'baby' ? (
              // Soft, cute gentle curved baby arches
              <g stroke="#5C4033" strokeWidth={isFemale ? '1.5' : '1.8'} strokeLinecap="round" fill="none">
                <path d="M39 39 Q44 35 49 39" />
                <path d="M71 39 Q76 35 81 39" />
              </g>
            ) : stage === 'child' ? (
              // Cheerful expressive child brows
              <g stroke={hairColor} strokeWidth={isFemale ? '2.0' : '2.5'} strokeLinecap="round" fill="none">
                <path d="M39 39 Q45 35 51 39" />
                <path d="M69 39 Q75 35 81 39" />
              </g>
            ) : stage === 'senior' ? (
              // Distinguished eyebrows
              <g stroke={hairColor} strokeWidth={isFemale ? '2.5' : '3.2'} strokeLinecap="round" fill="none">
                <path d="M38 40 Q45 37 52 41" />
                <path d="M68 41 Q75 37 82 40" />
              </g>
            ) : (
              // Stylish adult groomed eyebrows: Females have elegant soft arches; Males have bold defined brows
              <g stroke={hairColor} strokeWidth={isFemale ? '2.2' : '3.4'} strokeLinecap="round" fill="none">
                <path d={isFemale ? 'M39 38 Q45 33 52 38' : 'M39 38 Q45 34 52 39'} />
                <path d={isFemale ? 'M68 38 Q75 33 81 38' : 'M68 39 Q75 34 81 38'} />
              </g>
            )}

            {/* ================= NOSE ================= */}
            {stage === 'baby' ? (
              <circle cx="60" cy="55.5" r="1.6" fill={tone.shadow} />
            ) : stage === 'child' ? (
              <path d="M59 53 Q60 56 62 56" stroke={tone.shadow} strokeWidth="1.8" strokeLinecap="round" fill="none" />
            ) : (
              <path
                d={isFemale ? 'M59 48 L60 56 Q62 57 63 55' : 'M59 47 L60 57 Q63 58 64 56'}
                stroke={tone.shadow}
                strokeWidth={isFemale ? '1.8' : '2'}
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* ================= MOUTH & EXPRESSION ================= */}
            {stage === 'baby' ? (
              // BABY MOUTH: Cute pacifier OR joyful open baby smile
              seed % 2 === 0 ? (
                // SUPER CUTE PACIFIER: Heart for girls, Star for boys
                <g filter={`url(#shadow_${uid})`}>
                  <ellipse
                    cx="60"
                    cy="64.5"
                    rx="7.5"
                    ry="5.5"
                    fill={isFemale ? '#F48FB1' : '#64B5F6'}
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                  <circle cx="60" cy="64.5" r="3" fill="#FFFFFF" />
                  <circle cx="60" cy="64.5" r="1.6" fill={isFemale ? '#D81B60' : '#1976D2'} />
                  <path d="M55 67 Q60 74 65 67" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                // JOYFUL OPEN BABY LAUGH: Sweet open mouth with tiny pink tongue & bottom teeth
                <g>
                  <path d="M53 62 Q60 74 67 62 Z" fill="#9C2744" />
                  <path d="M55 68 Q60 65 65 68 Q60 74 55 68 Z" fill="#FF80AB" />
                  <rect x="57" y="62" width="2.4" height="2" rx="0.8" fill="#FFFFFF" />
                  <rect x="60.6" y="62" width="2.4" height="2" rx="0.8" fill="#FFFFFF" />
                </g>
              )
            ) : stage === 'child' ? (
              // CUTE ENERGETIC CHILD SMILE
              <g>
                <path d="M51 63 Q60 76 69 63 Z" fill="#9C2744" />
                <path d="M52.5 63 Q60 66 67.5 63 L66 65 Q60 68 54 65 Z" fill="#FFFFFF" />
                <path d="M55 70 Q60 67 65 70 Q60 76 55 70 Z" fill="#FF80AB" />
                {isFemale && (
                  <path d="M54 71 Q60 73 66 71" stroke="#FF80AB" strokeWidth="1.5" fill="none" />
                )}
              </g>
            ) : (
              // ADULT / TEEN / SENIOR SMILE
              <g>
                {happiness >= 50 ? (
                  <g>
                    <path
                      d="M52 64 Q60 73 68 64"
                      stroke="#8B2635"
                      strokeWidth={isFemale ? '2.4' : '2.6'}
                      strokeLinecap="round"
                      fill="none"
                    />
                    {isFemale ? (
                      // Soft glossy pink/peach lipstick bottom lip
                      <path d="M55 67 Q60 71 65 67" stroke="#FF4081" strokeWidth="2" fill="none" opacity="0.85" />
                    ) : (
                      <path d="M55 68 Q60 70 65 68" stroke={tone.blush} strokeWidth="1.5" fill="none" opacity="0.6" />
                    )}
                  </g>
                ) : (
                  <path
                    d="M53 67 Q60 63 67 67"
                    stroke="#8B2635"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>
            )}

            {/* ================= FACIAL HAIR (MEN ONLY: ADULT/MATURE/SENIOR) ================= */}
            {hasFacialHair && (
              <g fill={hairColor} opacity="0.95">
                {facialHairStyle === 0 ? (
                  <g>
                    <path d="M53 60 Q60 63 67 60 Q60 61 53 60 Z" />
                    <ellipse cx="60" cy="74" rx="4" ry="3.5" />
                  </g>
                ) : facialHairStyle === 1 ? (
                  <g>
                    <path d="M50 59 Q60 63 70 59 Q60 61 50 59 Z" />
                    <path d="M42 56 Q37 68 60 82 Q83 68 78 56 Q73 73 60 76 Q47 73 42 56 Z" />
                  </g>
                ) : (
                  <g>
                    <path d="M48 59 Q60 64 72 59 Q60 62 48 59 Z" />
                    <path d="M38 52 Q35 74 60 85 Q85 74 82 52 Q76 74 60 78 Q44 74 38 52 Z" />
                  </g>
                )}
              </g>
            )}

            {/* ================= EYEGLASSES ================= */}
            {hasGlasses && (
              <g stroke="#1C1C1C" strokeWidth="2.2" fill="none">
                <circle cx="44" cy="49" r="9.5" fill="rgba(255,255,255,0.25)" />
                <circle cx="76" cy="49" r="9.5" fill="rgba(255,255,255,0.25)" />
                <path d="M53.5 48 Q60 45 66.5 48" />
                <line x1="34.5" y1="49" x2="29" y2="47" strokeWidth="2" />
                <line x1="85.5" y1="49" x2="91" y2="47" strokeWidth="2" />
                <path d="M39 44 L47 52" stroke="#FFF" strokeWidth="1.2" opacity="0.6" />
                <path d="M71 44 L79 52" stroke="#FFF" strokeWidth="1.2" opacity="0.6" />
              </g>
            )}

            {/* ================= HAIRSTYLES & HEADWEAR (MALE VS FEMALE) ================= */}
            {stage === 'baby' ? (
              // ULTRA CUTE BABY HEADWEAR & HAIR
              isFemale ? (
                // BABY GIRL: Adorable floral headband / ribbon bow with pearl center & soft wispy baby curls
                <g filter={`url(#shadow_${uid})`}>
                  <path d="M54 27 Q57 22 61 25 Q64 22 67 27" stroke={hairColor} strokeWidth="2" strokeLinecap="round" fill="none" />
                  {/* Headband ribbon band */}
                  <path d="M34 38 Q60 22 86 38" stroke={babyOutfit.accent} strokeWidth="3" fill="none" />
                  {/* Big cute ribbon bow on crown */}
                  <polygon points="60,25 50,19 52,31" fill={babyOutfit.accent} />
                  <polygon points="60,25 70,19 68,31" fill={babyOutfit.accent} />
                  <circle cx="60" cy="25" r="3.5" fill="#FFD700" stroke="#FFF" strokeWidth="1" />
                </g>
              ) : (
                // BABY BOY: Cute swirled curl tuft on crown OR cute baby beanie with little bear ears!
                seed % 2 === 0 ? (
                  // Super cute baby beanie with two rounded bear ears!
                  <g filter={`url(#shadow_${uid})`}>
                    <circle cx="44" cy="23" r="6" fill={babyOutfit.bg} stroke={babyOutfit.trim} strokeWidth="2" />
                    <circle cx="44" cy="23" r="3" fill={babyOutfit.badge} />
                    <circle cx="76" cy="23" r="6" fill={babyOutfit.bg} stroke={babyOutfit.trim} strokeWidth="2" />
                    <circle cx="76" cy="23" r="3" fill={babyOutfit.badge} />
                    <path
                      d="M33 42 Q32 20 60 19 Q88 20 87 42 Q60 30 33 42 Z"
                      fill={babyOutfit.bg}
                    />
                    <path
                      d="M33 42 Q60 30 87 42"
                      stroke={babyOutfit.trim}
                      strokeWidth="3.5"
                      fill="none"
                    />
                    <path d="M58 35 Q60 31 63 34" stroke={hairColor} strokeWidth="2" strokeLinecap="round" fill="none" />
                  </g>
                ) : (
                  // Adorable swirled baby curl tuft on crown
                  <g filter={`url(#shadow_${uid})`}>
                    <path
                      d="M58 27 Q60 16 67 20 Q70 24 62 27 Z"
                      fill={hairColor}
                    />
                    <circle cx="60" cy="27" r="1.5" fill={hairColor} />
                  </g>
                )
              )
            ) : stage === 'child' ? (
              // CUTE CARTOON CHILD HAIR
              isFemale ? (
                // CHILD GIRL: Super cute twin high bouncy pigtails with colorful candy scrunchies & bangs
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <circle cx="28" cy="28" r="10" />
                  <circle cx="92" cy="28" r="10" />
                  <circle cx="32" cy="34" r="4" fill="#FF4081" />
                  <circle cx="88" cy="34" r="4" fill="#FF4081" />
                  {/* Soft forehead bangs */}
                  <path d="M33 42 Q60 20 87 42 Q75 32 60 33 Q45 32 33 42 Z" />
                </g>
              ) : (
                // CHILD BOY: Messy cheerful anime / sporty sweep
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path
                    d="M30 42 Q30 15 60 15 Q90 15 90 42 Q78 28 60 30 Q42 28 30 42 Z"
                  />
                  <polygon points="56,15 63,7 68,17" />
                </g>
              )
            ) : stage === 'teen' ? (
              // TEEN HAIR
              isFemale ? (
                // Long chic layered hair with stylish bangs & drop earrings
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path d="M28 46 Q28 16 60 14 Q92 16 92 46 Q96 78 94 92 Q88 94 86 60 Q60 28 34 60 Q32 94 26 92 Q24 78 28 46 Z" />
                  <path d="M36 34 Q60 44 84 34 Q60 26 36 34 Z" />
                  {/* Cute earrings */}
                  <circle cx="31" cy="56" r="2.2" fill="#F1C40F" />
                  <circle cx="89" cy="56" r="2.2" fill="#F1C40F" />
                </g>
              ) : (
                // Modern taper fade & textured quiff
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path d="M29 44 Q31 12 60 10 Q88 12 91 42 Q78 24 58 26 Q40 24 29 44 Z" />
                  <rect x="29" y="38" width="4" height="12" opacity="0.4" />
                  <rect x="87" y="38" width="4" height="12" opacity="0.4" />
                </g>
              )
            ) : stage === 'young_adult' ? (
              // YOUNG ADULT HAIR
              isFemale ? (
                // Elegant voluminous flowing hair with gold jhumka earrings
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path d="M26 48 Q26 12 60 12 Q94 12 94 48 Q98 84 92 98 Q86 100 84 64 Q60 26 36 64 Q34 100 28 98 Q22 84 26 48 Z" />
                  <path d="M35 34 Q60 42 85 34 Q60 26 35 34 Z" />
                  {/* Gold traditional Pakistani jhumka earrings */}
                  <g fill="#D4AF37">
                    <circle cx="31" cy="54" r="2.5" />
                    <polygon points="31,56 28,62 34,62" />
                    <circle cx="89" cy="54" r="2.5" />
                    <polygon points="89,56 86,62 92,62" />
                  </g>
                </g>
              ) : (
                // Executive side part / pompadour
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path d="M28 42 Q30 10 60 8 Q90 10 92 40 Q76 22 55 24 Q36 22 28 42 Z" />
                  <path d="M30 40 L30 52 L34 50 L34 40 Z" />
                  <path d="M90 40 L90 52 L86 50 L86 40 Z" />
                </g>
              )
            ) : stage === 'mature' ? (
              // MATURE HAIR
              isFemale ? (
                // Refined classic updo with pearl earrings
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <ellipse cx="60" cy="18" rx="20" ry="12" />
                  <path d="M28 46 Q28 14 60 14 Q92 14 92 46 Q84 40 60 36 Q36 40 28 46 Z" />
                  <circle cx="31" cy="56" r="3" fill="#F4F2EE" stroke="#D4AF37" strokeWidth="1" />
                  <circle cx="89" cy="56" r="3" fill="#F4F2EE" stroke="#D4AF37" strokeWidth="1" />
                </g>
              ) : (
                // Classic cut with silvered temple highlights
                <g filter={`url(#shadow_${uid})`}>
                  <path
                    d="M28 42 Q30 12 60 12 Q90 12 92 42 Q76 26 55 27 Q36 26 28 42 Z"
                    fill={hairColor}
                  />
                  <path d="M28 38 Q32 44 32 50" stroke="#C5C5C5" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M92 38 Q88 44 88 50" stroke="#C5C5C5" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )
            ) : (
              // SENIOR DIGNIFIED HAIR
              isFemale ? (
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path d="M26 48 Q26 12 60 12 Q94 12 94 48 Q86 64 88 80 Q82 82 80 58 Q60 34 40 58 Q38 82 32 80 Q34 64 26 48 Z" />
                  <circle cx="31" cy="56" r="2.5" fill="#D4AF37" />
                  <circle cx="89" cy="56" r="2.5" fill="#D4AF37" />
                </g>
              ) : (
                <g fill={hairColor} filter={`url(#shadow_${uid})`}>
                  <path d="M30 44 Q32 18 60 18 Q88 18 90 44 Q78 30 60 32 Q42 30 30 44 Z" />
                  <path d="M30 42 L30 54 L34 52 L34 42 Z" />
                  <path d="M90 42 L90 54 L86 52 L86 42 Z" />
                </g>
              )
            )}
          </g>
        </svg>

        {/* Small life stage indicator badge */}
        <div className="absolute top-1 right-1 bg-[#1C1C1C]/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold pointer-events-none shadow-xs">
          {age === 0 ? '0y' : `${age}y`}
        </div>

        {/* Gender & stage indicator icon */}
        <div className={`absolute bottom-1 left-1 ${
          isFemale ? 'bg-pink-600/90' : 'bg-blue-600/90'
        } backdrop-blur-xs text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold pointer-events-none flex items-center gap-0.5 shadow-xs`}>
          <span>{isFemale ? '♀' : '♂'}</span>
          <span>{stage === 'baby' ? 'Baby' : stage === 'child' ? 'Child' : ''}</span>
        </div>
      </div>

      {showBadge && (
        <div className="mt-1.5 flex flex-col items-center text-center">
          <span className="text-xs font-bold font-grotesk text-[#1C1C1C] truncate max-w-[120px]">
            {name}
          </span>
          <span className={`text-[9px] uppercase tracking-wider font-semibold ${isFemale ? 'text-pink-700' : 'text-[#B8860B]'}`}>
            {gender} · {getLifeStageLabel(age)}
          </span>
        </div>
      )}
    </div>
  );
};
