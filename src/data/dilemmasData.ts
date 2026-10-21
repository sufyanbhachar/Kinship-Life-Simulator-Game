import { LifeDilemma } from '../types/game';

export const DILEMMAS_DECK: LifeDilemma[] = [
  // ==========================================
  // 1. JOB OFFERS & FORCES & EVIL CAREERS
  // ==========================================
  {
    id: 'dilemma_pma_cadet_draft',
    title: 'PMA Cadet Academy Commission',
    category: 'career',
    minAge: 18,
    requiresAdult: true,
    requiresLivingInPakistan: true,
    situation: 'A formal letter arrives from the Armed Forces Selection Board offering you direct cadet commission into the Military Academy.',
    choices: [
      {
        text: 'Enlist as Second Lieutenant',
        description: 'Join the Armed Forces and serve with honor.',
        tag: 'CAREER',
        statEffects: { health: 15, karma: 15, happiness: 10 },
        reputationChange: 45,
        jobOffer: {
          field: 'Armed_Forces',
          title: 'Second Lieutenant (PMA Cadet Commission)',
          rank: 1,
          salary: 58000,
          performance: 75,
          yearsInRole: 0
        },
        outcomeText: 'You put on the crisp military uniform! Commissioned as Second Lieutenant with deep national pride.'
      },
      {
        text: 'Request Military Engineering Wing',
        description: 'Serve as a technical officer with tech benefits.',
        tag: 'CAREER',
        statEffects: { smarts: 15, health: 10 },
        reputationChange: 40,
        jobOffer: {
          field: 'Armed_Forces',
          title: 'Second Lieutenant (PMA Cadet Commission)',
          rank: 1,
          salary: 62000,
          performance: 80,
          yearsInRole: 0
        },
        outcomeText: 'Assigned to the Signals & Technical Corps! Honored position with engineering perks.'
      },
      {
        text: 'Defer for Higher Education',
        description: 'Ask for a 2-year educational postponement.',
        tag: 'RANDOM',
        statEffects: { smarts: 10 },
        reputationChange: 10,
        outcomeText: 'The board approved your academic deferral. Your civilian pathway continues.'
      },
      {
        text: 'Decline for Civilian Enterprise',
        description: 'Pursue independent business and private career.',
        tag: 'RANDOM',
        statEffects: { happiness: 5 },
        reputationChange: 0,
        outcomeText: 'You politely declined military commission to focus on personal private pursuits.'
      }
    ]
  },
  {
    id: 'dilemma_underworld_recruitment',
    title: 'Shadow Syndicate Proposition',
    category: 'career',
    minAge: 18,
    requiresAdult: true,
    situation: 'A slick gang lieutenant in a tinted black SUV pulls up. He offers you $45,000/yr to oversee street logistics and black-market enforcements.',
    choices: [
      {
        text: 'Join the Shadow Syndicate',
        description: 'Embrace dangerous underworld power and fast cash.',
        tag: 'EVIL',
        cashChange: 25000,
        statEffects: { karma: -35, happiness: 10 },
        reputationChange: -20,
        jobOffer: {
          field: 'Underworld_Crime',
          title: 'Street Enforcer & Syndicate Courier',
          rank: 1,
          salary: 45000,
          performance: 70,
          yearsInRole: 0
        },
        outcomeText: 'You stepped into the criminal underworld. The money flows fast, but whispers follow your name.'
      },
      {
        text: 'Negotiate as Money Laundering Consultant',
        description: 'Offer financial accounting advice without street violence.',
        tag: 'EVIL',
        cashChange: 40000,
        statEffects: { karma: -25, smarts: 10 },
        reputationChange: -10,
        jobOffer: {
          field: 'Underworld_Crime',
          title: 'Hawala-Hundi Money Laundering Broker',
          rank: 3,
          salary: 110000,
          performance: 65,
          yearsInRole: 0
        },
        outcomeText: 'You set up shadow bookkeeping for the syndicate! High white-collar criminal payouts.'
      },
      {
        text: 'Refuse & Walk Away Clean',
        description: 'Keep your moral integrity intact.',
        tag: 'GOOD',
        statEffects: { karma: 25, happiness: 10 },
        reputationChange: 10,
        outcomeText: 'You told him you make honest money. The lieutenant smirked and drove away into the night.'
      },
      {
        text: 'Tip Off City Police & Anti-Gang Unit',
        description: 'Quietly report their hideout location to detectives.',
        tag: 'GOOD',
        statEffects: { karma: 35, smarts: 5 },
        reputationChange: 30,
        outcomeText: 'Police raided the warehouse. The precinct chief sent you a letter of private gratitude.'
      }
    ]
  },
  {
    id: 'dilemma_corporate_headhunter',
    title: 'Surprise Corporate Job Offer',
    category: 'career',
    minAge: 18,
    requiresAdult: true,
    requiresDegreeField: 'Tech',
    situation: 'An executive headhunter contacts you with an immediate opening at a top multinational software & tech firm.',
    choices: [
      {
        text: 'Accept Software Engineer Job',
        description: 'Start a lucrative corporate tech career ($82k/yr).',
        tag: 'JOB',
        statEffects: { smarts: 10, happiness: 15 },
        reputationChange: 25,
        jobOffer: {
          field: 'Tech',
          title: 'Junior Software Engineer',
          rank: 1,
          salary: 82000,
          performance: 70,
          yearsInRole: 0
        },
        outcomeText: 'You accepted the corporate tech offer! Received your ID badge, high-end laptop, and signing bonus.'
      },
      {
        text: 'Counter-Offer for $95,000 Package',
        description: 'Negotiate aggressively using your skills.',
        tag: 'JOB',
        statEffects: { smarts: 12, looks: 5 },
        reputationChange: 30,
        jobOffer: {
          field: 'Tech',
          title: 'Junior Software Engineer',
          rank: 1,
          salary: 95000,
          performance: 80,
          yearsInRole: 0
        },
        outcomeText: 'They accepted your salary counter-offer! Signed at $95,000/yr with full stock options.'
      },
      {
        text: 'Request Part-Time Remote Contract',
        description: 'Maintain freelance autonomy with partial pay.',
        tag: 'RANDOM',
        cashChange: 30000,
        statEffects: { energy: 10, happiness: 15 },
        outcomeText: 'They hired you on a flexible consulting retainer. Extra cash with zero corporate drama.'
      },
      {
        text: 'Decline to Focus on Current Path',
        description: 'Politely pass on the corporate desk job.',
        tag: 'RANDOM',
        statEffects: { happiness: 5 },
        outcomeText: 'You passed on the job offer to focus on your existing life projects.'
      }
    ]
  },
  {
    id: 'dilemma_banking_internship',
    title: 'Investment Banking Fast-Track',
    category: 'career',
    minAge: 18,
    requiresAdult: true,
    requiresDegreeField: 'Finance',
    situation: 'A family friend at a leading private equity house offers you an accelerated analyst desk position with an $110,000 annual package.',
    choices: [
      {
        text: 'Accept Investment Banking Role',
        description: 'Work long hours for massive Wall Street payouts.',
        tag: 'JOB',
        statEffects: { energy: -15, happiness: 10 },
        reputationChange: 30,
        jobOffer: {
          field: 'Finance',
          title: 'Investment Banking Analyst',
          rank: 1,
          salary: 110000,
          performance: 75,
          yearsInRole: 0
        },
        outcomeText: 'You joined the investment bank! Long midnight spreadsheets, but unmatched bonuses.'
      },
      {
        text: 'Negotiate for Private Wealth Desk',
        description: 'Ask for high-net-worth client portfolio management.',
        tag: 'JOB',
        statEffects: { looks: 10, smarts: 10 },
        reputationChange: 35,
        jobOffer: {
          field: 'Finance',
          title: 'Investment Banking Analyst',
          rank: 1,
          salary: 125000,
          performance: 80,
          yearsInRole: 0
        },
        outcomeText: 'Assigned to the ultra-high-net-worth desk! Networking with billionaire family offices.'
      },
      {
        text: 'Introduce a Talented Friend Instead',
        description: 'Pass the opportunity to a deserving companion.',
        tag: 'GOOD',
        statEffects: { karma: 30, happiness: 20 },
        reputationChange: 25,
        outcomeText: 'Your friend landed the job and cried tears of joy! They owe you lifelong loyalty.'
      },
      {
        text: 'Politely Decline for Work-Life Balance',
        description: 'Preserve your free time and sanity.',
        tag: 'RANDOM',
        statEffects: { happiness: 15 },
        outcomeText: 'You politely declined the banking analyst role to protect your peace of mind.'
      }
    ]
  },

  // ==========================================
  // 2. DATE PROPOSALS & RISHTAS
  // ==========================================
  {
    id: 'dilemma_unexpected_rishta',
    title: 'Grand Family Rishta Proposal',
    category: 'romance',
    minAge: 18,
    requiresAdult: true,
    requiresLivingInPakistan: true,
    situation: 'A respected family visits your house with boxes of fresh Gulab Jamun, proposing a matrimonial match with their accomplished child.',
    choices: [
      {
        text: 'Accept Suitor & Begin Courtship',
        description: 'Court the suitor and welcome them into your life.',
        tag: 'DATE',
        statEffects: { happiness: 25, karma: 10 },
        reputationChange: 25,
        outcomeText: 'You sat together over hot tea and discovered an instant mutual spark! Began formal dating.'
      },
      {
        text: 'Invite Them on a Casual Coffee Date First',
        description: 'Get to know them one-on-one before committing.',
        tag: 'DATE',
        statEffects: { smarts: 5, happiness: 15 },
        outcomeText: 'You shared a relaxed afternoon latte. You connected naturally without family pressure.'
      },
      {
        text: 'Propose Immediate Engagement',
        description: 'Rush forward into traditional matrimonial commitments.',
        tag: 'DATE',
        statEffects: { happiness: 20 },
        reputationChange: 35,
        outcomeText: 'Rings were exchanged amid joyful family cheers! A royal wedding celebration is planned.'
      },
      {
        text: 'Decline Politely with Respect',
        description: 'You are not ready for marriage right now.',
        tag: 'RANDOM',
        statEffects: { happiness: 5 },
        outcomeText: 'You graciously thanked them and explained that you need more time before settling down.'
      }
    ]
  },
  {
    id: 'dilemma_cafe_secret_note',
    title: 'The Hand-Written Coffee Note',
    category: 'romance',
    minAge: 15,
    situation: 'At your favorite cafe, the barista hands you a napkin with a phone number and a sweet sketch of your smile from a charming patron.',
    choices: [
      {
        text: 'Text Them & Plan a Dinner Date',
        description: 'Take a romantic leap of faith.',
        tag: 'DATE',
        statEffects: { happiness: 25, looks: 5 },
        outcomeText: 'You sent a witty message! You met for midnight chai and spent hours talking under the city lights.'
      },
      {
        text: 'Invite Them to Join Your Table Now',
        description: 'Walk right over and introduce yourself in person.',
        tag: 'DATE',
        statEffects: { looks: 15, happiness: 30 },
        reputationChange: 15,
        outcomeText: 'Your boldness was irresistible! You laughed over coffee together for the rest of the evening.'
      },
      {
        text: 'Send Back a Compliment with Cake',
        description: 'Send the waiter over with a slice of red velvet.',
        tag: 'DATE',
        cashChange: -30,
        statEffects: { looks: 10, karma: 10 },
        outcomeText: 'They blushed across the room and waved with a radiant smile! Contact info exchanged.'
      },
      {
        text: 'Leave the Note Behind Quietly',
        description: 'Focus on your laptop work instead.',
        tag: 'RANDOM',
        statEffects: { smarts: 5 },
        outcomeText: 'You tucked the napkin away and went home quietly.'
      }
    ]
  },
  {
    id: 'dilemma_childhood_friend_confession',
    title: 'A Friend\'s Secret Feelings',
    category: 'romance',
    minAge: 15,
    situation: 'During an evening walk on the terrace, a longtime close companion nervously admits they have been in love with you for years.',
    choices: [
      {
        text: 'Confess Your Love in Return',
        description: 'Turn friendship into a lifelong romance.',
        tag: 'DATE',
        statEffects: { happiness: 35, karma: 15 },
        reputationChange: 15,
        outcomeText: 'You held their hand and smiled. A golden warmth filled the night as romance blossomed.'
      },
      {
        text: 'Suggest Taking Things Very Slowly',
        description: 'Go on a few quiet dates without labels first.',
        tag: 'DATE',
        statEffects: { smarts: 10, happiness: 15 },
        outcomeText: 'They happily agreed. You started going on sweet weekend dates to explore the chemistry.'
      },
      {
        text: 'Gently Keep Things as Pure Friends',
        description: 'Preserve the friendship without romance.',
        tag: 'RANDOM',
        statEffects: { happiness: -5 },
        outcomeText: 'They nodded with a wistful smile. It was awkward for a few days, but your friendship survived.'
      },
      {
        text: 'Help Match Them with Someone Great',
        description: 'Introduce them to another wonderful single friend.',
        tag: 'GOOD',
        statEffects: { karma: 20, happiness: 10 },
        outcomeText: 'Your matchmaking worked wonders! They found true love and always credit your friendship.'
      }
    ]
  },

  // ==========================================
  // 3. GOOD AND EVIL CHOICES
  // ==========================================
  {
    id: 'dilemma_lost_cash_wallet',
    title: 'The Thick Leather Wallet',
    category: 'ethics',
    situation: 'You find an expensive leather wallet on a park bench containing $6,500 cash and an elderly pensioner\'s medical card.',
    choices: [
      {
        text: 'Return to Owner with All Cash',
        description: 'Track down the elderly owner immediately.',
        tag: 'GOOD',
        statEffects: { karma: 40, happiness: 20 },
        reputationChange: 35,
        outcomeText: 'The weeping pensioner blessed you with tearful prayers. Your heart feels lighter than gold!'
      },
      {
        text: 'Hand It Over to Central Police Station',
        description: 'File an official lost-and-found report with police.',
        tag: 'GOOD',
        statEffects: { karma: 25, smarts: 5 },
        reputationChange: 20,
        outcomeText: 'Police logged the wallet. Two days later, the grateful owner sent you a reward bouquet.'
      },
      {
        text: 'Keep Half for Rent & Return the Rest',
        description: 'Rationalize the compromise to pay urgent bills.',
        tag: 'RANDOM',
        cashChange: 3250,
        statEffects: { karma: -15 },
        outcomeText: 'You slipped $3,250 into your pocket and anonymously mailed the rest with the ID card.'
      },
      {
        text: 'Pocket All $6,500 & Throw Wallet',
        description: 'Take the money for yourself without remorse.',
        tag: 'EVIL',
        cashChange: 6500,
        statEffects: { karma: -45, happiness: -5 },
        reputationChange: -15,
        outcomeText: 'You slipped the cash into your pocket. You bought luxury items, but guilt lingers in your thoughts.'
      }
    ]
  },
  {
    id: 'dilemma_street_orphan_tuition',
    title: 'The Street Flower Child',
    category: 'ethics',
    situation: 'A barefoot 9-year-old child selling car flowers at a traffic stop asks if you know any school that would accept them.',
    choices: [
      {
        text: 'Sponsor Full School Tuition (-$3k)',
        description: 'Pay their school admission, uniform, and books.',
        tag: 'GOOD',
        cashChange: -3000,
        statEffects: { karma: 50, happiness: 35 },
        reputationChange: 40,
        outcomeText: 'You enrolled the child into a reputable academy. Seeing them in a fresh uniform brought pure tears of joy.'
      },
      {
        text: 'Connect Them with a Welfare NGO',
        description: 'Drive them to a certified children\'s shelter.',
        tag: 'GOOD',
        statEffects: { karma: 30, smarts: 10 },
        reputationChange: 20,
        outcomeText: 'The foundation took the child under their wing with free boarding and schooling.'
      },
      {
        text: 'Give a Generous $100 Cash Tip',
        description: 'Hand over some cash and buy all their flowers.',
        tag: 'RANDOM',
        cashChange: -100,
        statEffects: { karma: 10, happiness: 10 },
        outcomeText: 'The child beamed with excitement and ran to buy fresh bread for their family.'
      },
      {
        text: 'Roll Up Your Window & Ignore',
        description: 'Stare straight ahead at the traffic light.',
        tag: 'EVIL',
        statEffects: { karma: -20 },
        outcomeText: 'You rolled up your tinted glass and accelerated as the signal turned green.'
      }
    ]
  },
  {
    id: 'dilemma_bribe_the_inspector',
    title: 'The Corrupt Municipal Inspector',
    category: 'ethics',
    minAge: 18,
    requiresAdult: true,
    situation: 'A city building inspector threatens to halt construction on your family property unless you slip him a $4,000 cash envelope under the table.',
    choices: [
      {
        text: 'Refuse & Report to Anti-Corruption',
        description: 'Stand your ground and fight through the law.',
        tag: 'GOOD',
        statEffects: { karma: 30, smarts: 10 },
        reputationChange: 30,
        outcomeText: 'You filed a sting complaint. The corrupt inspector was caught red-handed by anti-corruption officers!'
      },
      {
        text: 'Hire a Top Lawyer to File an Injunction',
        description: 'Legally block him through the high court (-$2k).',
        tag: 'GOOD',
        cashChange: -2000,
        statEffects: { smarts: 15 },
        reputationChange: 25,
        outcomeText: 'The judge issued an immediate stay order! The inspector was reprimanded in court.'
      },
      {
        text: 'Call a Political Friend for a Favor',
        description: 'Have a high-society contact lean on his department.',
        tag: 'RANDOM',
        statEffects: { looks: 5 },
        reputationChange: 15,
        outcomeText: 'One phone call from your connected patron and the permits were stamped within an hour!'
      },
      {
        text: 'Pay the $4,000 Bribe Under the Table',
        description: 'Take the fast shortcut and avoid delays.',
        tag: 'EVIL',
        cashChange: -4000,
        statEffects: { karma: -30, happiness: 5 },
        reputationChange: -10,
        outcomeText: 'The inspector stamped the permits with a greasy grin. Work resumed, but you feel slightly dirty.'
      }
    ]
  },
  {
    id: 'dilemma_whistleblower_fraud',
    title: 'The Tax Evasion Ledger',
    category: 'ethics',
    minAge: 18,
    requiresAdult: true,
    situation: 'A partner at work asks you to sign off on a fraudulent tax return, offering to split $50,000 in saved tax money with you.',
    choices: [
      {
        text: 'Report the Fraud to Federal Revenue',
        description: 'Submit proof to federal revenue auditors.',
        tag: 'GOOD',
        statEffects: { karma: 40, smarts: 10 },
        reputationChange: 45,
        outcomeText: 'Auditors commended your honesty with an official integrity citation.'
      },
      {
        text: 'Confront Partner & Demand Clean Books',
        description: 'Force them to file honest figures or quit.',
        tag: 'GOOD',
        statEffects: { karma: 20, smarts: 15 },
        reputationChange: 20,
        outcomeText: 'Your partner backed down in fear of jail time and refiled legitimate figures.'
      },
      {
        text: 'Resign Immediately to Stay Untainted',
        description: 'Walk away from the firm with clean hands.',
        tag: 'RANDOM',
        statEffects: { karma: 15, happiness: 10 },
        outcomeText: 'You handed in your resignation. You lost the job, but preserved your legal innocence.'
      },
      {
        text: 'Sign Fraudulent Ledger (+$25,000 Cash)',
        description: 'Take your half of the illicit stolen money.',
        tag: 'EVIL',
        cashChange: 25000,
        statEffects: { karma: -50, happiness: 10 },
        reputationChange: -35,
        outcomeText: 'The money cleared into your offshore account. You are now tied to a criminal paper trail.'
      }
    ]
  },

  // ==========================================
  // 4. SECRET CHOICES
  // ==========================================
  {
    id: 'dilemma_ancestral_locked_box',
    title: 'The Secret Locked Brass Chest',
    category: 'secret',
    situation: 'While renovating an old storage room in your family home, you uncover a heavy brass chest stamped with an antique wax seal.',
    choices: [
      {
        text: 'Carefully Pick the Antique Lock',
        description: 'Use patience and precision to open it.',
        tag: 'SECRET',
        cashChange: 18000,
        statEffects: { smarts: 15, happiness: 20 },
        reputationChange: 20,
        outcomeText: 'The lock clicked! Inside were pure gold sovereign coins, vintage gemstones, and historic family deeds worth $18,000!'
      },
      {
        text: 'Hire a Professional Museum Conservator',
        description: 'Open it scientifically to preserve relics (-$1k).',
        tag: 'SECRET',
        cashChange: 24000,
        statEffects: { smarts: 20, karma: 15 },
        reputationChange: 45,
        outcomeText: 'Flawlessly preserved! Sold antique manuscripts to Sotheby\'s for $25,000 net profit!'
      },
      {
        text: 'Smash It with a Heavy Sledgehammer',
        description: 'Brute force the container open immediately.',
        tag: 'RANDOM',
        cashChange: 5000,
        statEffects: { energy: -15, health: -5 },
        outcomeText: 'The latch broke, but some antique porcelain inside shattered. You salvaged $5,000 in coins.'
      },
      {
        text: 'Donate to National Cultural Museum',
        description: 'Preserve cultural heritage for the nation.',
        tag: 'GOOD',
        statEffects: { karma: 40, happiness: 25 },
        reputationChange: 65,
        outcomeText: 'Historians declared it an authentic historic artifact! A glass display carries your family name.'
      }
    ]
  },
  {
    id: 'dilemma_darknet_usb',
    title: 'The Anonymous Encrypted USB',
    category: 'secret',
    situation: 'A padded envelope arrives in your mailbox with an unmarked titanium flash drive and an encrypted note: "Only for the curious."',
    choices: [
      {
        text: 'Decrypt the Digital Wallet',
        description: 'Run cryptographic cracking scripts.',
        tag: 'SECRET',
        cashChange: 35000,
        statEffects: { smarts: 20, karma: -10 },
        outcomeText: 'Jackpot! You unlocked a dormant Bitcoin wallet containing $35,000 in liquid crypto!'
      },
      {
        text: 'Sell the Raw Encrypted Drive Online',
        description: 'Auction the mystery drive on tech forums.',
        tag: 'SECRET',
        cashChange: 12000,
        statEffects: { smarts: 10 },
        outcomeText: 'An anonymous buyer wired $12,000 for the unopened drive without asking questions.'
      },
      {
        text: 'Hand It to Cybercrime Unit',
        description: 'Let federal cyber detectives inspect it.',
        tag: 'GOOD',
        statEffects: { karma: 25, smarts: 10 },
        reputationChange: 25,
        outcomeText: 'Detectives traced it to a dismantled hacker syndicate and thanked you for the crucial evidence.'
      },
      {
        text: 'Smash It & Throw It in the Sea',
        description: 'Avoid all unnecessary danger.',
        tag: 'RANDOM',
        statEffects: { happiness: 5 },
        outcomeText: 'You pulverized the drive and threw the pieces into the waves. No drama, no trouble.'
      }
    ]
  },
  {
    id: 'dilemma_vip_underground_poker',
    title: 'VIP High-Stakes Underground Game',
    category: 'secret',
    minAge: 18,
    requiresAdult: true,
    situation: 'A mysterious black card invite arrives inviting you to an ultra-exclusive midnight poker table in an elite Clifton penthouse ($10,000 buy-in).',
    choices: [
      {
        text: 'Play the High-Stakes Game (-$10k)',
        description: 'Trust your reading ability and nerve.',
        tag: 'SECRET',
        cashChange: 45000,
        statEffects: { smarts: 15, looks: 10, happiness: 25 },
        reputationChange: 40,
        outcomeText: 'You read the room like a grandmaster! Swept the final river pot and walked away with $45,000 in profit!'
      },
      {
        text: 'Attend as a Quiet VIP Spectator',
        description: 'Network with tycoons without risking chips.',
        tag: 'SECRET',
        statEffects: { smarts: 10, looks: 10 },
        reputationChange: 25,
        outcomeText: 'You sipped vintage drinks and rubbed shoulders with industrial billionaires. Great contacts!'
      },
      {
        text: 'Tip Off the Private Security Agency',
        description: 'Expose the illegal gambling ring to police.',
        tag: 'GOOD',
        statEffects: { karma: 20 },
        reputationChange: 15,
        outcomeText: 'Officers raided the penthouse. The venue was shut down, but your identity stayed hidden.'
      },
      {
        text: 'Politely Shred the Invitation',
        description: 'Keep your hard-earned savings safe at home.',
        tag: 'RANDOM',
        statEffects: { happiness: 5 },
        outcomeText: 'You stayed home with a warm cup of cardamom chai. Reliable peace of mind.'
      }
    ]
  },

  // ==========================================
  // 5. TRAIT CHOICES & LIFE TRANSFORMATIONS
  // ==========================================
  {
    id: 'dilemma_trait_speech_or_mind',
    title: 'The Grand University Debate',
    category: 'lifestyle',
    minAge: 18,
    requiresAdult: true,
    requiresUniversityEnrolled: true,
    situation: 'As a university student, you are selected to lead the national inter-university public speaking championship broadcast live on television. Which path do you master?',
    choices: [
      {
        text: 'Master Charisma & Persuasion',
        description: 'Become an unforgettable orator.',
        tag: 'TRAIT',
        traitChange: 'Silver Tongue',
        statEffects: { looks: 15, happiness: 20 },
        reputationChange: 45,
        outcomeText: 'Your magnetic speech brought down the house! Unlocked the "Silver Tongue" personality trait.'
      },
      {
        text: 'Study Logic & Raw Intellect',
        description: 'Outthink every opponent through pure reason.',
        tag: 'TRAIT',
        traitChange: 'Genius Mind',
        statEffects: { smarts: 25, happiness: 15 },
        reputationChange: 35,
        outcomeText: 'Your flawless analytical rebuttal stunned the judges! Unlocked the "Genius Mind" personality trait.'
      },
      {
        text: 'Show Stoic Emotional Resilience',
        description: 'Stay completely unflappable under fire.',
        tag: 'TRAIT',
        traitChange: 'Resilient',
        statEffects: { health: 15, happiness: 15 },
        reputationChange: 25,
        outcomeText: 'Your calm composure in front of cameras earned widespread respect! Unlocked "Resilient" trait.'
      },
      {
        text: 'Deliver a Passionate Poetic Performance',
        description: 'Move the audience to tears with artistic prose.',
        tag: 'TRAIT',
        traitChange: 'Creative Prodigy',
        statEffects: { looks: 10, smarts: 15 },
        reputationChange: 30,
        outcomeText: 'The crowd stood in awe of your literary poetry! Unlocked the "Creative Prodigy" trait.'
      }
    ]
  },
  {
    id: 'dilemma_trait_athlete_or_hustle',
    title: 'The Dawn Discipline Test',
    category: 'lifestyle',
    situation: 'You decide to radically transform your daily lifestyle. Which rigorous routine do you commit to for the next year?',
    choices: [
      {
        text: 'Extreme Athletic Training at Dawn',
        description: 'Train 3 hours every morning for peak physique.',
        tag: 'TRAIT',
        traitChange: 'Natural Athlete',
        statEffects: { health: 30, energy: 20 },
        reputationChange: 20,
        outcomeText: 'Your stamina and speed reached superhuman levels! Unlocked the "Natural Athlete" trait.'
      },
      {
        text: 'Relentless 80-Hour Work Weeks',
        description: 'Outwork every competitor in the city.',
        tag: 'TRAIT',
        traitChange: 'Workaholic',
        cashChange: 15000,
        statEffects: { energy: 30, smarts: 10 },
        reputationChange: 25,
        outcomeText: 'Your productivity became legendary across business circles! Unlocked the "Workaholic" trait.'
      },
      {
        text: 'Vipassana Meditation & Mental Toughness',
        description: 'Build indestructible calm through mindfulness.',
        tag: 'TRAIT',
        traitChange: 'Resilient',
        statEffects: { health: 20, happiness: 25 },
        reputationChange: 15,
        outcomeText: 'Your inner peace became unshakable! Unlocked the "Resilient" trait.'
      },
      {
        text: 'Balanced Harmonious Lifestyle',
        description: 'Equally divide time between health, family, and hobbies.',
        tag: 'RANDOM',
        statEffects: { health: 15, happiness: 25, energy: 20 },
        outcomeText: 'You achieved beautiful life balance! Calm, refreshed, and deeply content.'
      }
    ]
  },

  // ==========================================
  // 6. STUDY & WORK VISAS (GLOBAL RELOCATION)
  // ==========================================
  {
    id: 'dilemma_london_scholarship',
    title: 'UK University Study Visa Offer',
    category: 'visa',
    minAge: 18,
    requiresAdult: true,
    requiresLivingInPakistan: true,
    situation: 'Imperial College London awards you a fast-track admission offer for advanced postgraduate studies in the United Kingdom!',
    choices: [
      {
        text: 'Accept UK Study Visa & Fly to London',
        description: 'Move to London for world-class education (-$15,000).',
        tag: 'VISA',
        cashChange: -15000,
        statEffects: { smarts: 25, happiness: 25 },
        reputationChange: 60,
        relocateTo: 'London, United Kingdom',
        outcomeText: 'You boarded the flight to Heathrow! Relocated to London, UK with world-class academic prestige.'
      },
      {
        text: 'Apply for UK University Merit Grant',
        description: 'Request financial aid to lower tuition expenses.',
        tag: 'VISA',
        cashChange: -8000,
        statEffects: { smarts: 20, happiness: 20 },
        reputationChange: 50,
        relocateTo: 'London, United Kingdom',
        outcomeText: 'Merit grant awarded! Moved to London with half-tuition scholarship!'
      },
      {
        text: 'Decline & Enroll Locally in LUMS / NUST',
        description: 'Pursue premier education at home in Pakistan (-$5k).',
        tag: 'CAREER',
        cashChange: -5000,
        statEffects: { smarts: 18, happiness: 15 },
        reputationChange: 35,
        outcomeText: 'Enrolled in Pakistan\'s top university! Flourished close to family and heritage.'
      },
      {
        text: 'Decline to Build Local Business Instead',
        description: 'Invest the tuition funds into entrepreneurial trade.',
        tag: 'RANDOM',
        statEffects: { happiness: 10 },
        outcomeText: 'You chose to build your legacy right here at home in Pakistan.'
      }
    ]
  },
  {
    id: 'dilemma_dubai_work_visa',
    title: 'Dubai Tax-Free Corporate Work Visa',
    category: 'visa',
    minAge: 21,
    requiresAdult: true,
    requiresLivingInPakistan: true,
    situation: 'A prominent Gulf conglomerate in Dubai offers you an executive expatriate work visa with tax-free compensation and luxury housing.',
    choices: [
      {
        text: 'Relocate to Dubai on Work Visa',
        description: 'Fly to Dubai, UAE for tax-free wealth (-$3,500 moving).',
        tag: 'VISA',
        cashChange: -3500,
        statEffects: { happiness: 20, looks: 10 },
        reputationChange: 50,
        relocateTo: 'Dubai, United Arab Emirates',
        outcomeText: 'Welcome to Dubai! You landed at DXB and moved into a sleek marina apartment overlooking the glittering Arabian Gulf.'
      },
      {
        text: 'Counter-Offer for Family Flight Allowance',
        description: 'Demand company coverage for moving and visa fees.',
        tag: 'VISA',
        cashChange: 5000,
        statEffects: { smarts: 10, happiness: 25 },
        reputationChange: 55,
        relocateTo: 'Dubai, United Arab Emirates',
        outcomeText: 'They approved your relocation package with a $5,000 flight allowance! Arrived in Dubai like a VIP.'
      },
      {
        text: 'Work Remotely for Dubai Firm from Home',
        description: 'Earn foreign dirhams while living cheaply in Pakistan.',
        tag: 'JOB',
        cashChange: 45000,
        statEffects: { smarts: 15, happiness: 20 },
        reputationChange: 35,
        outcomeText: 'Dream setup! You earn foreign currency while enjoying home-cooked biryani in Pakistan.'
      },
      {
        text: 'Decline the Gulf Offer',
        description: 'Stay with your current homeland lifestyle.',
        tag: 'RANDOM',
        statEffects: { happiness: 5 },
        outcomeText: 'You turned down the Dubai offer to remain in your hometown.'
      }
    ]
  },

  // ==========================================
  // 7. FOREIGN BULLYING & IMMIGRANT STRUGGLES
  // (Triggers only 1-2 times in starting foreign years)
  // ==========================================
  {
    id: 'dilemma_foreign_metro_bullying',
    title: 'Foreigner Taunts at the Metro Station',
    category: 'visa',
    requiresLivingAbroad: true,
    situation: 'During your first years living abroad, a rowdy group on the train platform loudly mocks your accent and makes rude xenophobic remarks.',
    choices: [
      {
        text: 'Confront Them with Dignified Authority',
        description: 'Look them dead in the eye and speak with calm strength.',
        tag: 'GOOD',
        statEffects: { looks: 15, karma: 20, happiness: 10 },
        reputationChange: 30,
        outcomeText: 'Your sharp, articulate rebuke silenced them instantly. Surrounding commuters applauded your courage!'
      },
      {
        text: 'Disarm Them with Razor-Sharp Wit',
        description: 'Make a hilarious sarcastic joke that humiliates their ignorance.',
        tag: 'TRAIT',
        statEffects: { smarts: 20, looks: 10, happiness: 20 },
        reputationChange: 25,
        outcomeText: 'The entire train car erupted in laughter at your witty reply! The bullies shrunk away in embarrassment.'
      },
      {
        text: 'Alert Transit Police & File Incident Report',
        description: 'Hold them legally accountable through local authorities.',
        tag: 'GOOD',
        statEffects: { smarts: 10, karma: 15 },
        reputationChange: 15,
        outcomeText: 'Transit officers intercepted the group and banned them from the station. Justice was served.'
      },
      {
        text: 'Put On Headphones & Walk Away Unbothered',
        description: 'Small minds do not deserve your energy or peace.',
        tag: 'RANDOM',
        statEffects: { happiness: 15, energy: 10 },
        outcomeText: 'You plugged in classical ghazals and walked onto your train with royal grace. Unbothered and victorious.'
      }
    ]
  },
  {
    id: 'dilemma_foreign_work_prejudice',
    title: 'Workplace Accent & Heritage Bias',
    category: 'visa',
    requiresLivingAbroad: true,
    requiresJob: true,
    situation: 'At your new overseas company, a biased colleague condescendingly questions your background and tries to undermine your briefing presentation.',
    choices: [
      {
        text: 'Deliver a Flawless Analytical Defense',
        description: 'Destroy their doubts with undeniable technical brilliance.',
        tag: 'CAREER',
        statEffects: { smarts: 25, happiness: 20 },
        reputationChange: 45,
        outcomeText: 'Your mastery of the data blew the executive committee away! The CEO promoted your project on the spot.'
      },
      {
        text: 'Report to Corporate Diversity & Ethics Board',
        description: 'Formally log documentation of discrimination.',
        tag: 'GOOD',
        statEffects: { karma: 25, smarts: 15 },
        reputationChange: 25,
        outcomeText: 'HR conducted a swift inquiry. The offending colleague was issued a severe disciplinary reprimand.'
      },
      {
        text: 'Pull Them Aside for a Private Stern Warning',
        description: 'Make it abundantly clear you will not be bullied.',
        tag: 'TRAIT',
        statEffects: { looks: 10, energy: 10 },
        reputationChange: 20,
        outcomeText: 'Faced with your unyielding backbone, they nervously apologized and never crossed you again.'
      },
      {
        text: 'Let Your Stellar Results Do the Talking',
        description: 'Focus 100% on winning the company\'s top bonus.',
        tag: 'JOB',
        cashChange: 20000,
        statEffects: { smarts: 15 },
        reputationChange: 35,
        outcomeText: 'You smashed your quarterly targets and took home the top $20,000 performance award!'
      }
    ]
  },

  // ==========================================
  // 8. RANDOM & EVERYDAY LIFE CHOICES
  // ==========================================
  {
    id: 'dilemma_cricket_smashed_window',
    title: 'The Street Cricket Sixer',
    category: 'society',
    situation: 'Your thumping sixer smashed right through an ill-tempered neighbor\'s imported Mercedes windshield!',
    choices: [
      {
        text: 'Apologize & Pay Repairs (-$800)',
        description: 'Take adult responsibility for the damage.',
        tag: 'GOOD',
        cashChange: -800,
        statEffects: { karma: 20, happiness: 5 },
        reputationChange: 15,
        outcomeText: 'The neighbor grumbled, but respected your honesty and handed back your cricket ball.'
      },
      {
        text: 'Help Wash & Detail Their Entire Car',
        description: 'Offer sweat equity and a sincere handshake.',
        tag: 'GOOD',
        statEffects: { karma: 25, energy: -15, happiness: 10 },
        reputationChange: 20,
        outcomeText: 'Your respectful demeanor won him over! He forgave the costs and offered you chilled lemonade.'
      },
      {
        text: 'Blame It on the Street Wind & Negotiate',
        description: 'Convince him it was an act of nature.',
        tag: 'RANDOM',
        cashChange: -200,
        statEffects: { smarts: 10, looks: 5 },
        outcomeText: 'Your fast talking worked! He agreed to settle for just $200 in minor glass repair.'
      },
      {
        text: 'Sprint Away Down the Alley with Friends',
        description: 'Flee the scene before anyone spots you.',
        tag: 'EVIL',
        statEffects: { karma: -15, energy: -10, happiness: 10 },
        outcomeText: 'You sprinted through the narrow alleys like a gazelle! You got away with it, laughing with friends.'
      }
    ]
  },
  {
    id: 'dilemma_stray_injured_cat',
    title: 'The Rainstorm Kitten',
    category: 'society',
    situation: 'During heavy monsoon rains, you spot a shivering injured stray kitten huddled beside a storm drain.',
    choices: [
      {
        text: 'Rescue & Adopt into Your Home (-$200)',
        description: 'Take it to the vet and give it a loving home.',
        tag: 'GOOD',
        cashChange: -200,
        statEffects: { karma: 35, happiness: 30 },
        outcomeText: 'The kitten purred endlessly in a warm towel. You found a loyal little companion for life!'
      },
      {
        text: 'Build a Dry Insulated Shelter Box Outside',
        description: 'Provide food, dry blanket, and warm milk.',
        tag: 'GOOD',
        cashChange: -40,
        statEffects: { karma: 20, happiness: 15 },
        outcomeText: 'The kitten curled up safely in the dry box and happily drank the warm milk.'
      },
      {
        text: 'Call a Local Animal Rescue Foundation',
        description: 'Let animal protection specialists take care of it.',
        tag: 'GOOD',
        statEffects: { karma: 15, smarts: 5 },
        reputationChange: 10,
        outcomeText: 'The rescue volunteers arrived promptly and gave the kitten proper medical care.'
      },
      {
        text: 'Walk Past Quickly to Stay Dry',
        description: 'It\'s raining too hard to stop right now.',
        tag: 'RANDOM',
        statEffects: { happiness: -5 },
        outcomeText: 'You hurried through the downpour to get home dry.'
      }
    ]
  },
  {
    id: 'dilemma_biryani_wedding_argument',
    title: 'The Great Dawat Feud',
    category: 'society',
    situation: 'At a lavish cousin\'s wedding dinner, an argumentative uncle loudly insults your career choice while reaching for the last mutton shank.',
    choices: [
      {
        text: 'Gracefully Toast His Health & Compliment Him',
        description: 'Disarm his insult with superior elegance and wit.',
        tag: 'GOOD',
        statEffects: { looks: 15, smarts: 10, karma: 20 },
        reputationChange: 35,
        outcomeText: 'The entire dining table erupted in laughter at your charm. The uncle sat silenced in awe!'
      },
      {
        text: 'Snatch the Mutton Shank onto Your Plate First',
        description: 'Assert culinary dominance over the dawat table.',
        tag: 'RANDOM',
        statEffects: { happiness: 20, karma: -5 },
        outcomeText: 'You grabbed the golden shank onto your plate! The mutton was exquisite and victory tasted sweet.'
      },
      {
        text: 'Politely Serve the Shank to the Grandmother',
        description: 'Show traditional elders deep respect.',
        tag: 'GOOD',
        statEffects: { karma: 30, happiness: 20 },
        reputationChange: 30,
        outcomeText: 'Grandmother showered you with heartfelt blessings! The uncle turned red with embarrassment.'
      },
      {
        text: 'Engage in a Spirited Debate on Economics',
        description: 'Showcase your superior financial knowledge.',
        tag: 'CAREER',
        statEffects: { smarts: 15 },
        reputationChange: 20,
        outcomeText: 'You broke down market trends so thoroughly that the elders commended your intellect.'
      }
    ]
  },
  {
    id: 'dilemma_viral_debate_video',
    title: 'Viral Internet Sensation',
    category: 'society',
    situation: 'A clip of your passionate speech at a cultural symposium hits the internet and racks up 2,000,000 views overnight.',
    choices: [
      {
        text: 'Monetize & Sign Premium Brand Deals',
        description: 'Turn sudden fame into instant cash (+$25,000).',
        tag: 'JOB',
        cashChange: 25000,
        statEffects: { happiness: 20, looks: 10 },
        reputationChange: 40,
        outcomeText: 'Sponsors rushed to your inbox! You pocketed $25,000 in promotional endorsements.'
      },
      {
        text: 'Launch a Non-Profit Youth Educational Initiative',
        description: 'Channel your viral momentum into charitable impact.',
        tag: 'GOOD',
        statEffects: { karma: 45, happiness: 30 },
        reputationChange: 65,
        outcomeText: 'Your initiative empowered hundreds of students! Commemorated as an inspirational youth leader.'
      },
      {
        text: 'Write an Opinion Column for National Papers',
        description: 'Establish yourself as a premier cultural commentator.',
        tag: 'CAREER',
        statEffects: { smarts: 20, looks: 10 },
        reputationChange: 50,
        outcomeText: 'Your editorial went viral in intellectual circles! Invited to keynote prestigious forums.'
      },
      {
        text: 'Stay Humble & Log Off Social Media',
        description: 'Avoid superficial internet drama and clickbait.',
        tag: 'RANDOM',
        statEffects: { smarts: 10, karma: 15 },
        reputationChange: 15,
        outcomeText: 'You let the viral wave fade quietly and kept your focus on authentic personal growth.'
      }
    ]
  },
  {
    id: 'dilemma_school_spelling_bee',
    title: 'Inter-School Quiz Bowl & Spelling Bee',
    category: 'lifestyle',
    minAge: 7,
    maxAge: 14,
    situation: 'Your primary school selects you to represent the class in the televised regional Inter-School Quiz & Spelling Bee Championship!',
    choices: [
      {
        text: 'Study Night & Day for the Championship',
        description: 'Read the Oxford dictionary and encyclopedias.',
        tag: 'TRAIT',
        statEffects: { smarts: 20, happiness: 15 },
        reputationChange: 35,
        outcomeText: 'You spelled every word flawlessly and won 1st Place Gold Trophy! The whole school gave you a standing ovation.'
      },
      {
        text: 'Team Up with Classmates & Share the Spotlight',
        description: 'Form a study circle and support your peers.',
        tag: 'GOOD',
        statEffects: { karma: 25, smarts: 15, happiness: 20 },
        reputationChange: 25,
        outcomeText: 'Your school team took silver! Your classmates lifted you on their shoulders in pure joy.'
      },
      {
        text: 'Rely on Natural Wits & Confidence',
        description: 'No cramming needed; trust your instincts.',
        tag: 'RANDOM',
        statEffects: { looks: 10, smarts: 10, happiness: 10 },
        reputationChange: 15,
        outcomeText: 'You breezed through to the semi-finals with relaxed charisma and had great fun on stage.'
      },
      {
        text: 'Fake a Cough to Stay Home & Play Cricket',
        description: 'Skip the competition for street sports.',
        tag: 'RANDOM',
        statEffects: { health: 10, happiness: 15, karma: -10 },
        outcomeText: 'You spent the afternoon scoring boundaries in street cricket with neighborhood friends.'
      }
    ]
  },
  {
    id: 'dilemma_eid_eidi_savings',
    title: 'The Blessed Eid Morning Eidi',
    category: 'lifestyle',
    minAge: 6,
    maxAge: 17,
    situation: 'On Eid-ul-Fitr morning after delicious sheer khurma, visiting elders, uncles, and grandparents gift you crisp new paper bank notes totaling $300 in Eidi!',
    choices: [
      {
        text: 'Deposit in Childhood Savings Piggybank',
        description: 'Save the money to build future financial discipline.',
        tag: 'GOOD',
        cashChange: 300,
        statEffects: { smarts: 15, karma: 15 },
        reputationChange: 15,
        outcomeText: 'You tucked the crisp notes into your locked metal savings tin. Good financial habits start early!'
      },
      {
        text: 'Treat Neighborhood Friends to Kulfi & Treats',
        description: 'Buy everyone malai kulfi, kites, and fireworks.',
        tag: 'GOOD',
        cashChange: -100,
        statEffects: { karma: 30, happiness: 35 },
        reputationChange: 20,
        outcomeText: 'You shared sweets with all the neighborhood kids! Laughter and fireworks filled the street.'
      },
      {
        text: 'Buy a Brand New Cricket Bat & Accessories',
        description: 'Upgrade your street cricket gear (-$150).',
        tag: 'RANDOM',
        cashChange: 150,
        statEffects: { health: 15, happiness: 25 },
        reputationChange: 10,
        outcomeText: 'You bought a gleaming English willow cricket bat! You were named neighborhood team captain.'
      },
      {
        text: 'Donate Half to Orphan Children Welfare',
        description: 'Share your Eid blessings with those in need.',
        tag: 'GOOD',
        cashChange: 150,
        statEffects: { karma: 50, happiness: 30 },
        reputationChange: 35,
        outcomeText: 'Your generous heart brought radiant smiles to disadvantaged children. Elders showered you with heartfelt duas.'
      }
    ]
  },
  {
    id: 'dilemma_school_science_project',
    title: 'The Annual School Science Fair',
    category: 'lifestyle',
    minAge: 10,
    maxAge: 16,
    situation: 'It is the weekend before the National School Science & Robotics Olympiad. You need to build a breakthrough exhibition display!',
    choices: [
      {
        text: 'Engineer a Solar-Powered Model Vehicle',
        description: 'Build an eco-friendly automated miniature rover.',
        tag: 'TRAIT',
        statEffects: { smarts: 25, happiness: 20 },
        reputationChange: 40,
        outcomeText: 'The judges were astonished by your engineering precision! Awarded the Junior Scientist of the Year medal.'
      },
      {
        text: 'Collaborate on a Medical Biology Showcase',
        description: 'Map human anatomy and plant genetics.',
        tag: 'CAREER',
        statEffects: { smarts: 20, karma: 15 },
        reputationChange: 30,
        outcomeText: 'Your biology model won 2nd prize! The school principal commended your research dedication.'
      },
      {
        text: 'Build an Explosive Baking Soda Volcano',
        description: 'Keep it classic, messy, and crowd-pleasing.',
        tag: 'RANDOM',
        statEffects: { happiness: 20, looks: 5 },
        reputationChange: 15,
        outcomeText: 'Red foam erupted to the ceiling! The entire junior audience cheered with wild delight.'
      },
      {
        text: 'Help Younger Students with Their Projects',
        description: 'Mentor the junior grades instead of competing.',
        tag: 'GOOD',
        statEffects: { karma: 35, happiness: 25 },
        reputationChange: 25,
        outcomeText: 'You guided three younger pupils to blue ribbons! Parents praised your leadership and kindness.'
      }
    ]
  }
];

export function getRandomElement<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
