export interface AchievementItem {
  id: string;
  rankOrMetric: string;
  title: string;
  event: string;
  organizer: string;
  date: string;
  theme?: string;
  proofImage?: string;
  proofTitle?: string;
  note?: string;
}

export const MAJOR_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'wcid-2026',
    rankOrMetric: '1st Position',
    title: 'World Creativity and Innovation Day',
    event: 'Model Exhibition',
    organizer: "Institution's Innovation Council (IIC), IILM University, Greater Noida",
    date: '21 April 2026',
    proofImage: '/assets/certificates/iilm-world-creativity-1st.jpg',
    proofTitle: 'Certificate of Merit & Gold Medal — World Creativity and Innovation Day',
  },
  {
    id: 'ignite-2k26',
    rankOrMetric: '2nd Position',
    title: 'IGNITE 2K26 Tech Fest',
    event: 'Model Presentation',
    theme: 'Viksit Bharat Abhiyan 2047',
    organizer: 'IILM University, Greater Noida',
    date: '8 April 2026',
    proofImage: '/assets/certificates/iilm-ignite-2nd.jpg',
    proofTitle: 'Certificate of Achievement & Trophy — IGNITE 2K26',
  },
  {
    id: 'deco-98',
    rankOrMetric: '98 / 100',
    title: 'Academic Excellence in DECO',
    event: 'Semester Academic Performance',
    organizer: 'IILM University, Greater Noida',
    date: 'Previous Semester',
    note: 'Highest marks across the college in DECO in the previous semester, as reported by the student.',
  },
];

export interface RecognitionItem {
  title: string;
  category: string;
  detail: string;
  proofImage?: string;
  proofTitle?: string;
}

export const OTHER_RECOGNITION: RecognitionItem[] = [
  {
    title: 'Smart India Hackathon (SIH) 2026',
    category: 'Hackathon Participation',
    detail: 'Participated in Smart India Hackathon (SIH) 2026.',
  },
  {
    title: 'AURIX 2026 AI Hackathon / AI Ideathon',
    category: 'Hackathon Participation',
    detail: 'Participated in the AI Hackathon at AURIX 2026 (27–28 October 2026, IILM University).',
    proofImage: '/assets/certificates/aurix-2026-ai-hackathon.jpg',
    proofTitle: 'AURIX 2026 AI Hackathon Certificate of Participation',
  },
  {
    title: 'LinkedIn Technical Community',
    category: 'Community Reach',
    detail: 'Approximately 1,200 followers on LinkedIn sharing cloud, backend, and project learning milestones.',
  },
];
