export type PhotoCategory =
  | 'Profile'
  | 'Events'
  | 'Hackathons'
  | 'College & Community'
  | 'Volunteering'
  | 'Networking'
  | 'Personal';

export type EventFilterCategory =
  | 'All'
  | 'Events'
  | 'Hackathons'
  | 'College & Community'
  | 'Volunteering'
  | 'Networking';

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  title: string;
  event?: string;
  date?: string;
  location?: string;
  role?: string;
  caption?: string;
  aspect: 'landscape' | 'portrait' | 'wide';
  objectPosition: string;
  spanClass: string;
  aspectClass: string;
  depthOffsetClass: string;
  tiltDeg: number;
  floatClass: 'animate-float-vertical' | 'animate-float-horizontal' | 'animate-float-orbit';
  floatDelay: string;
}

export const EVENT_PHOTO_FILTERS: EventFilterCategory[] = [
  'All',
  'Events',
  'Hackathons',
  'College & Community',
  'Volunteering',
  'Networking',
];

/**
 * Expandable image catalog.
 * To add new photography later, append an item to GALLERY_PHOTOS with the appropriate category.
 */
export const GALLERY_PHOTOS: PhotoItem[] = [
  {
    id: 'ignite-2026-stage-award',
    src: '/assets/aistudio/IMG-20260408-WA0009_8fee28a8.jpg',
    alt: 'Pushpendra Singh on stage receiving the 2nd Position cheque at IGNITE Tech Fest 2026, IILM University',
    category: 'Events',
    title: 'IGNITE 2K26 Tech Fest Award Stage',
    event: 'IGNITE 2K26 Tech Fest',
    date: '8 April 2026',
    location: 'IILM University, Greater Noida',
    role: '2nd Position — Model Presentation',
    aspect: 'wide',
    objectPosition: '50% 20%',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
    depthOffsetClass: '',
    tiltDeg: -1.1,
    floatClass: 'animate-float-vertical',
    floatDelay: '0s',
  },
  {
    id: 'wcid-2026-gold-medal',
    src: '/assets/aistudio/IMG_20260421_211701_86783382.png',
    alt: 'Pushpendra Singh wearing a gold medal and holding the Certificate of Merit with faculty at IILM University',
    category: 'Events',
    title: 'World Creativity & Innovation Day Honor',
    event: 'World Creativity and Innovation Day',
    date: '21 April 2026',
    location: 'IILM University, Greater Noida',
    role: '1st Position — Model Exhibition',
    aspect: 'landscape',
    objectPosition: '50% 16%',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3]',
    depthOffsetClass: 'md:mt-8',
    tiltDeg: 1.3,
    floatClass: 'animate-float-orbit',
    floatDelay: '0.6s',
  },
  {
    id: 'aurix-2026-team-table',
    src: '/assets/aistudio/IMG-20261027-WA0021_e599d626.jpg',
    alt: 'Pushpendra Singh and teammates working with laptops at the AURIX 2026 hackathon table',
    category: 'Hackathons',
    title: 'AURIX 2026 Team Build Table',
    event: 'AURIX 2026 AI Hackathon',
    date: '27 October 2026',
    location: 'IILM University, Greater Noida',
    role: 'Team Collaboration & Participant',
    aspect: 'landscape',
    objectPosition: '50% 25%',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3]',
    depthOffsetClass: 'md:-mt-2',
    tiltDeg: 1.0,
    floatClass: 'animate-float-horizontal',
    floatDelay: '1.1s',
  },
  {
    id: 'paytm-visit-fixmycampus-badge',
    src: '/assets/aistudio/file_00000000ae8482118d4ca5c55edbedf3_838193f2.png',
    alt: 'Paytm Visitor pass held above a laptop displaying the FixMyCampus web application',
    category: 'Networking',
    title: 'Paytm Visit & FixMyCampus Walkthrough',
    event: 'Paytm Industry Visit',
    date: '21 November 2026',
    location: 'One97 Communications Limited, Noida',
    role: 'Visitor',
    aspect: 'landscape',
    objectPosition: '50% 45%',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
    depthOffsetClass: 'md:mt-6',
    tiltDeg: -0.9,
    floatClass: 'animate-float-vertical',
    floatDelay: '0.4s',
  },
  {
    id: 'aurix-2026-volunteer-doc',
    src: '/assets/aistudio/file_00000000c4888208ae3d3d3a5f4df6cf_ae1658c5.png',
    alt: 'Pushpendra Singh outdoors on campus wearing the AURIX 2026 Volunteer (Doc) pass',
    category: 'Volunteering',
    title: 'AURIX 2026 Documentation Volunteering',
    event: 'AURIX 2026 AI Ideathon',
    date: '27–28 October 2026',
    location: 'IILM University, Greater Noida',
    role: 'Volunteer (Documentation)',
    aspect: 'portrait',
    objectPosition: '50% 14%',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]',
    depthOffsetClass: '',
    tiltDeg: -1.3,
    floatClass: 'animate-float-orbit',
    floatDelay: '0.8s',
  },
  {
    id: 'team-discussion-mic-walkthrough',
    src: '/assets/aistudio/Screenshot_2026_1122_220432_52090d8f.png',
    alt: 'Pushpendra Singh speaking into a microphone while discussing a project with teammates at a laptop table',
    category: 'Hackathons',
    title: 'Team Discussion & Project Walkthrough',
    date: 'November 2026',
    aspect: 'wide',
    objectPosition: '50% 25%',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/3]',
    depthOffsetClass: 'md:mt-10',
    tiltDeg: 0.9,
    floatClass: 'animate-float-horizontal',
    floatDelay: '1.4s',
  },
  {
    id: 'paytm-solo-office-portrait',
    src: '/assets/aistudio/file_000000008e98821196fe1975397530d4_cc4ae99b.png',
    alt: 'Pushpendra Singh wearing a Paytm Visitor pass in front of the Paytm wall logo',
    category: 'Networking',
    title: 'Paytm Office Visit',
    date: '21 November 2026',
    location: 'One97 Communications Limited, Noida',
    role: 'Visitor',
    aspect: 'portrait',
    objectPosition: '50% 16%',
    spanClass: 'md:col-span-4',
    aspectClass: 'aspect-[4/5]',
    depthOffsetClass: 'md:mt-2',
    tiltDeg: 1.2,
    floatClass: 'animate-float-vertical',
    floatDelay: '0.3s',
  },
  {
    id: 'campus-faculty-courtyard-group',
    src: '/assets/aistudio/IMG-20250810-WA0014_6b4fcaa9.jpg',
    alt: 'Group photograph of Pushpendra Singh and peers with university faculty in the campus courtyard',
    category: 'College & Community',
    title: 'Campus Faculty & Student Group',
    date: 'August 2025',
    location: 'IILM University, Greater Noida',
    aspect: 'landscape',
    objectPosition: '50% 25%',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]',
    depthOffsetClass: '',
    tiltDeg: -0.8,
    floatClass: 'animate-float-horizontal',
    floatDelay: '0.9s',
  },
  {
    id: 'aurix-2026-participant-id-pass',
    src: '/assets/aistudio/IMG_20261027_085659_2b84f7ad.jpg',
    alt: 'AURIX 2026 AI Hackathon participant pass for Pushpendra Singh resting on a laptop',
    category: 'Hackathons',
    title: 'AURIX 2026 Hackathon Credentials',
    event: 'AURIX 2026 AI Hackathon',
    date: '27–28 October 2026',
    location: 'IILM University, Greater Noida',
    role: 'AI Hackathon Participant',
    aspect: 'landscape',
    objectPosition: '50% 45%',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[16/10]',
    depthOffsetClass: 'md:mt-6',
    tiltDeg: 1.1,
    floatClass: 'animate-float-orbit',
    floatDelay: '0.5s',
  },
  {
    id: 'paytm-group-visit',
    src: '/assets/aistudio/Screenshot_2026_1123_192543_686dca2f.png',
    alt: 'Group photograph of visiting students in front of the Paytm office wall logo',
    category: 'Networking',
    title: 'Group Visit at Paytm',
    date: 'November 2026',
    location: 'Noida',
    aspect: 'landscape',
    objectPosition: '50% 22%',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3]',
    depthOffsetClass: 'md:mt-4',
    tiltDeg: -1.1,
    floatClass: 'animate-float-vertical',
    floatDelay: '1.2s',
  },
  {
    id: 'event-cohort-gathering',
    src: '/assets/aistudio/IMG-20261122-WA0046_e1f98447.jpg',
    alt: 'Large group photograph of participants and peers inside an indoor event hall',
    category: 'Events',
    title: 'Event Cohort & Community Gathering',
    date: 'November 2026',
    aspect: 'wide',
    objectPosition: '50% 36%',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10]',
    depthOffsetClass: '',
    tiltDeg: 0.8,
    floatClass: 'animate-float-horizontal',
    floatDelay: '0.7s',
  },
  // Personal & Profile Editorial Photographs
  {
    id: 'personal-outdoor-portrait',
    src: '/assets/aistudio/file_00000000157c8208aa332b7c92b6ba91_75e7236a.png',
    alt: 'Natural outdoor portrait of Pushpendra Singh wearing sunglasses and a maroon shirt',
    category: 'Personal',
    title: 'Outside the Terminal',
    caption: 'Quiet moments outdoors between semester sprints, project builds, and campus life.',
    aspect: 'portrait',
    objectPosition: '50% 20%',
    spanClass: 'lg:col-span-5',
    aspectClass: 'aspect-[4/5]',
    depthOffsetClass: '',
    tiltDeg: -1.0,
    floatClass: 'animate-float-vertical',
    floatDelay: '0.2s',
  },
  {
    id: 'personal-focused-build-session',
    src: '/assets/aistudio/file_00000000defc82089c9c359a816308a0_02278419.png',
    alt: 'Candid photograph of Pushpendra Singh focused on his laptop during a coding session',
    category: 'Personal',
    title: 'Heads-Down Build Session',
    caption: 'Iterative debugging, backend experiments, and turning late-afternoon ideas into working prototypes.',
    aspect: 'wide',
    objectPosition: '50% 22%',
    spanClass: 'lg:col-span-7',
    aspectClass: 'aspect-[16/10]',
    depthOffsetClass: '',
    tiltDeg: 0.8,
    floatClass: 'animate-float-orbit',
    floatDelay: '0.8s',
  },
  {
    id: 'profile-formal-portrait',
    src: '/assets/aistudio/IMG-20260915-WA0001_2a9e1067.jpg',
    alt: 'Formal portrait of Pushpendra Singh in a black suit and tie',
    category: 'Profile',
    title: 'Formal Portrait',
    caption: 'Prepared for technical evaluations, project demonstrations, and engineering discussions.',
    aspect: 'portrait',
    objectPosition: '50% 15%',
    spanClass: 'lg:col-span-4',
    aspectClass: 'aspect-[4/4]',
    depthOffsetClass: '',
    tiltDeg: -0.6,
    floatClass: 'animate-float-horizontal',
    floatDelay: '0.5s',
  },
];

export const EVENT_EXPERIENCE_PHOTOS = GALLERY_PHOTOS.filter(
  (photo) => photo.category !== 'Personal' && photo.category !== 'Profile'
);

export const PERSONAL_EDITORIAL_PHOTOS = GALLERY_PHOTOS.filter(
  (photo) => photo.category === 'Personal' || photo.category === 'Profile'
);
