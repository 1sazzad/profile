export const researchProjects = [
  {
    id: 'underwater',
    categoryLabel: 'Computer vision',
    title: 'Learning to recognize life beneath the surface',
    summary: 'Marine species classification in difficult underwater imagery, with attention to rare classes and robust evaluation.',
    question: 'How can a vision system recognize rare marine species without being dominated by common classes?',
    approach: ['Controlled dataset splits', 'Class-imbalance-aware learning', 'Probability-based model ensembles'],
    status: 'Conference research',
  },
  {
    id: 'reliability',
    categoryLabel: 'Model reliability',
    title: 'Knowing when a model should ask for help',
    summary: 'Investigating model routing, prediction agreement, and selective referral in visual classification.',
    question: 'When should an ensemble make a decision, and when is disagreement a reason to refer?',
    approach: ['Controlled flat versus routed comparisons', 'Consensus and disagreement scoring', 'Coverage and error trade-off analysis'],
    status: 'Research project',
  },
  {
    id: 'thermal',
    categoryLabel: 'Earth observation',
    title: 'Reading our planet through thermal infrared',
    summary: 'An emerging research direction in satellite temperature mapping and spatiotemporal learning.',
    question: 'How can satellite thermal observations be made more complete and reliable across space and time?',
    approach: ['Thermal infrared satellite data', 'Land surface temperature reconstruction', 'Multisensor and temporal modeling'],
    status: 'Exploring now',
  },
];

export const publications = [
  { venue: 'AII 2026', year: '2026', subject: 'Underwater visual recognition research', status: 'Accepted' },
  { venue: 'ITT 2026', year: '2026', subject: 'Consensus and selective referral in classification', status: 'Accepted' },
  { venue: 'CoMeSySo 2026', year: '2026', subject: 'Probability-preserving inference in hard-routed classification', status: 'Accepted' },
  { venue: 'TIDGN — Research Square', year: '2026', subject: 'Topology Invariant Dynamic Graph Networks · preprint', status: 'Preprint' },
];

export const milestones = [
  { year: '2025–2026', heading: 'President, Programming Club of IST', body: 'Leading technical sessions, programming contests, workshops, and peer-learning activities.' },
  { year: 'Teaching', heading: 'Data Science & AI foundation instructor', body: 'Teaching fundamental data science and artificial intelligence through the Programming Club of IST.' },
  { year: 'Two editions', heading: 'ICPC Dhaka Regional participant', body: 'Competing in algorithmic programming and collaborative problem-solving.' },
  { year: 'Recognition', heading: 'Competitive programming & presentation awards', body: 'Programming Combat 2022 champion, Battle of Brains 2024 second runner-up, and a poster presentation championship.' },
];

// Event folders and legacy filename aliases used by automatic photo discovery.
// Extensions .jpg, .jpeg, .png, .webp and .avif are supported.
export const photoSlots = [
  { stem: 'research-presentation', folder: 'research-presentation', category: 'research', title: 'Research presentation', hint: 'A poster, talk, or academic presentation' },
  { stem: 'research-underwater', folder: 'underwater', category: 'research', title: 'Underwater research', hint: 'Work on marine imagery and visual recognition' },
  { stem: 'research-reliability', folder: 'model-reliability', category: 'research', title: 'Model reliability research', hint: 'Experiments, presentations, or research setup' },
  { stem: 'research-thermal', folder: 'thermal-ir', category: 'research', title: 'Thermal infrared exploration', hint: 'Satellite or thermal research activity' },
  { stem: 'icpc-regional', folder: 'icpc', category: 'events', title: 'ICPC Dhaka Regional', hint: 'Team or contest-day photograph' },
  { stem: 'mumbai-hacks', folder: 'mumbai-hacks', category: 'events', title: 'MumbaiHacks invitation', hint: 'Use an invitation graphic unless you attended' },
  { stem: 'innovation-fair', folder: 'innovation-fair', category: 'events', title: 'National Innovation Fair', hint: 'Invitation or participation evidence' },
  { stem: 'club-leadership', folder: 'club', category: 'community', title: 'Leading PcIST', hint: 'Club activity or leadership moment' },
  { stem: 'teaching-foundation', folder: 'teaching', category: 'community', title: 'Teaching Data Science & AI', hint: 'A class or workshop moment' },
  { stem: 'campus-community', folder: 'campus', category: 'community', title: 'Community & campus', hint: 'Events with peers, mentors, or club members' },
  { stem: 'programming-combat', folder: 'programming-combat', category: 'awards', title: 'Programming Combat champion', hint: '2022 competition achievement' },
  { stem: 'battle-of-brains', folder: 'battle-of-brains', category: 'awards', title: 'Battle of Brains', hint: '2024 second runner-up' },
  { stem: 'poster-champion', folder: 'poster-champion', category: 'awards', title: 'Poster presentation champion', hint: 'Freshers’ Reception poster award' },
  { stem: 'awards-moment', folder: 'awards', category: 'awards', title: 'Recognition & awards', hint: 'Certificate, trophy, or award ceremony' },
];
