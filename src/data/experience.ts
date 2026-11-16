export interface ExperienceDocument {
  title: string;
  imagePath: string;
  kind: 'Certificate' | 'Letter of Recommendation';
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  duration: string;
  period: string;
  mode: string;
  credentialLabel: string;
  credentialId: string;
  summary: string;
  technologies: string[];
  deliverables: {
    title: string;
    detail: string;
  }[];
  documents: ExperienceDocument[];
}

export const INTERNSHIPS: ExperienceItem[] = [
  {
    id: 'thiranex',
    organization: 'Thiranex',
    role: 'Web Development Intern',
    duration: 'One Month',
    period: '29 July 2026 – 28 August 2026',
    mode: 'Remote / Project-Based',
    credentialLabel: 'Certificate ID',
    credentialId: 'THX-JUL2926-236',
    summary:
      'Completed a structured one-month remote internship consisting of five progressive frontend engineering tasks moving from semantic HTML5 and responsive layouts to asynchronous REST API integration and a multi-section capstone.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'CSS Grid',
      'Flexbox',
      'Media Queries',
      'CSS Variables',
      'Local Storage',
      'Fetch API',
      'Async/Await',
      'JSON',
      'Git',
      'GitHub',
      'VS Code',
      'Browser Developer Tools',
    ],
    deliverables: [
      {
        title: '1. Semantic HTML5 Portfolio',
        detail: 'Accessible multi-page structure built with semantic landmarks and keyboard navigation.',
      },
      {
        title: '2. Responsive Web Interface',
        detail: 'Adaptive layout using CSS Grid, Flexbox, media queries, and CSS variables.',
      },
      {
        title: '3. JavaScript To-Do Application',
        detail: 'Client-side CRUD task management with status filters and browser Local Storage.',
      },
      {
        title: '4. Real-Time Weather Dashboard',
        detail: 'Dynamic city-based weather lookup powered by Fetch API, async/await, and JSON parsing.',
      },
      {
        title: '5. NexStore E-Commerce Capstone Project',
        detail: 'Frontend shopping catalog interface with categories, product cards, and cart counter.',
      },
    ],
    documents: [
      {
        title: 'Thiranex Internship Completion Certificate',
        imagePath: '/assets/certificates/thiranex-internship-certificate.jpg',
        kind: 'Certificate',
      },
    ],
  },
  {
    id: 'codealpha',
    organization: 'CodeAlpha',
    role: 'C++ Programming Intern',
    duration: 'One Month',
    period: '1 August 2026 – 30 August 2026',
    mode: 'Virtual Internship',
    credentialLabel: 'Student ID',
    credentialId: 'CA/DF1/228366',
    summary:
      'Completed a one-month virtual C++ programming internship focused on structured problem-solving, file-based data persistence, and algorithmic backtracking, earning both a Completion Certificate and Letter of Recommendation.',
    technologies: ['C++', 'File I/O', 'Backtracking Algorithms', 'Input Validation'],
    deliverables: [
      {
        title: '1. Login & Registration System (C++)',
        detail:
          'Implemented user registration, input validation, duplicate username detection, file-based credential storage, password hashing function, login authentication, user dashboard, and logout.',
      },
      {
        title: '2. Sudoku Solver (C++)',
        detail:
          'Implemented a 9×9 two-dimensional array solver using recursive backtracking with row, column, and 3×3 subgrid constraint validation.',
      },
    ],
    documents: [
      {
        title: 'CodeAlpha Completion Certificate',
        imagePath: '/assets/certificates/codealpha-internship-certificate.jpg',
        kind: 'Certificate',
      },
      {
        title: 'CodeAlpha Letter of Recommendation',
        imagePath: '/assets/certificates/codealpha-lor.jpg',
        kind: 'Letter of Recommendation',
      },
    ],
  },
];

export interface LeadershipItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  detail: string;
}

export const LEADERSHIP_ROLES: LeadershipItem[] = [
  {
    id: 'ecell',
    organization: 'Entrepreneurship Cell (E-Cell), IILM University',
    role: 'Former Joint Secretary',
    period: 'First Year (Previous Leadership Experience)',
    detail:
      'Served as Joint Secretary during the first academic year, supporting club coordination and student entrepreneurship initiatives.',
  },
  {
    id: 'ieee',
    organization: 'IEEE Club',
    role: 'Member',
    period: 'Membership',
    detail: 'Active club member participating in technical campus activities without a committee office role.',
  },
];

export interface VolunteeringEvent {
  event: string;
  contributions: string[];
}

export const VOLUNTEERING_EVENTS: VolunteeringEvent[] = [
  {
    event: 'E-Cell Ideathon',
    contributions: ['Documentation', 'Event coordination', 'Class-to-class promotion'],
  },
  {
    event: 'IGNITE Tech Fest',
    contributions: ['Event coordination', 'Discipline & crowd coordination', 'Student outreach'],
  },
  {
    event: 'AURIX AI Ideathon',
    contributions: ['Documentation (Ideathon DOC)', 'Volunteer coordination', 'Event execution support'],
  },
];
