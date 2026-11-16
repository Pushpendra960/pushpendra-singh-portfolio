export interface ArchitectureNode {
  step: string;
  label: string;
  detail: string;
}

export interface ProjectItem {
  slug: string;
  index: string;
  title: string;
  category: string;
  status: string;
  statusTone: 'working' | 'prototype' | 'backend' | 'in-development';
  shortDescription: string;
  overview: string;
  problemStatement: string;
  solution: string;
  techStack: string[];
  architectureLabel: string;
  architectureNodes: ArchitectureNode[];
  implementedFeatures: string[];
  contribution: string[];
  limitations: string[];
  githubUrl: string;
  featuredNote?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'daily-linkedin-news-agent',
    index: '01',
    title: 'Daily LinkedIn News Agent',
    category: 'AI Automation / Agentic Workflow',
    status: 'Working Automation System',
    statusTone: 'working',
    shortDescription:
      'An automated daily technology news briefing system that collects news, uses Gemini API for AI-powered summarization, and delivers an email briefing with a generated image.',
    overview:
      'Daily LinkedIn News Agent is an automated workflow built to curate daily technology updates without manual searching and formatting. Using scheduled triggers inside Google Apps Script alongside Google Sheets and the Gemini API, it collects news items, summarizes key takeaways, generates a companion visual, and sends out a formatted email briefing.',
    problemStatement:
      'Staying consistent with daily technology updates and LinkedIn-ready briefings requires repetitive manual curation, reading across multiple sources, summarizing key developments, and preparing visual assets every morning.',
    solution:
      'Designed an end-to-end scheduled automation pipeline powered by Google Apps Script and the Gemini API that collects technology news, structures the data in Google Sheets, synthesizes a concise briefing with a generated image, and delivers it automatically by email.',
    techStack: [
      'Google Apps Script',
      'Google Sheets',
      'Gemini API',
      'Scheduled Automation',
      'Email Delivery',
    ],
    architectureLabel: 'Automated Daily Briefing Workflow',
    architectureNodes: [
      { step: '01', label: 'Daily Trigger', detail: 'Time-driven Google Apps Script schedule' },
      { step: '02', label: 'Collect News', detail: 'Gather daily technology news entries' },
      { step: '03', label: 'Process Data', detail: 'Structure & log items via Google Sheets' },
      { step: '04', label: 'Gemini API', detail: 'AI summarization & image generation' },
      { step: '05', label: 'Prepare Email', detail: 'Assemble briefing layout & media' },
      { step: '06', label: 'Send Briefing', detail: 'Automated email delivery to inbox' },
    ],
    implementedFeatures: [
      'Scheduled daily time-driven trigger automation',
      'Automated technology news collection and data processing',
      'Google Sheets logging and structured data handling',
      'Gemini API integration for AI-powered news summarization',
      'Automated image generation for visual briefing accompaniment',
      'Formatted automated email briefing delivery',
    ],
    contribution: [
      'Designed the multi-step scheduled automation workflow end-to-end',
      'Implemented Google Apps Script orchestration and Google Sheets state tracking',
      'Integrated Gemini API calls for summarization and image generation',
      'Configured automated email formatting and scheduled dispatch',
    ],
    limitations: [
      'Operates as an automated email briefing pipeline rather than an auto-publishing social bot',
      'Dependent on upstream feed availability and Gemini API quota limits',
    ],
    githubUrl: 'https://github.com/Pushpendra960/Daily-linkedin-news-agent',
    featuredNote: 'Core Featured System',
  },
  {
    slug: 'fixmycampus-2-0',
    index: '02',
    title: 'FixMyCampus 2.0',
    category: 'AI-Powered Campus Issue Management System',
    status: 'Functional Prototype – Final Refinements in Progress',
    statusTone: 'prototype',
    shortDescription:
      'An AI-assisted campus issue reporting and management system designed to help faculty report institutional problems and route them to the appropriate departments.',
    overview:
      'FixMyCampus 2.0 streamlines how campus infrastructure or operational issues are reported by faculty members and routed to responsible institutional teams. Built using Google AI Studio, Google Apps Script, and Google Sheets, it pairs structured reporting with AI classification and automated email notifications.',
    problemStatement:
      'Campus facility and operational issues reported informally often lack structured categorization, unique tracking identifiers, or clear routing to the responsible department coordinator, causing delays and missing follow-up evidence.',
    solution:
      'Created a faculty reporting workflow backed by AI-based issue classification and department recommendation, assigning unique ticket IDs in Google Sheets, notifying coordinators with department head CCs, and tracking resolution evidence.',
    techStack: [
      'Google AI Studio',
      'Google Apps Script',
      'Google Sheets',
      'Generative AI',
      'Email Automation',
    ],
    architectureLabel: 'Issue Intake & AI Routing Pipeline',
    architectureNodes: [
      { step: '01', label: 'Faculty Form', detail: 'Issue description & photo upload submission' },
      { step: '02', label: 'AI Classifier', detail: 'Issue categorization & department suggestion' },
      { step: '03', label: 'Ticket Registry', detail: 'Unique ticket ID & Google Sheets storage' },
      { step: '04', label: 'Auto Routing', detail: 'Coordinator email + department head CC' },
      { step: '05', label: 'Status & Logs', detail: 'Notification logs, evidence & admin view' },
    ],
    implementedFeatures: [
      'Faculty issue-reporting form with photo upload support',
      'AI-based issue classification and department recommendation',
      'Google Sheets ticket storage with unique ticket ID generation',
      'Automated coordinator email notifications with department head CC',
      'Ticket status tracking and resolution evidence logging',
      'Notification logs and administrative dashboard',
    ],
    contribution: [
      'Built the Google Apps Script backend logic and Google Sheets ticket schema',
      'Integrated generative AI classification and department routing prompts',
      'Implemented ticket ID generation, notification logs, and resolution tracking',
    ],
    limitations: [
      'Backend implementation is completed and mostly functional, with a few remaining issues to resolve',
      'Has not yet been deployed or used by actual campus users',
    ],
    githubUrl: 'https://github.com/Pushpendra960/FixMyCampus2-o',
  },
  {
    slug: 'campushire',
    index: '03',
    title: 'CampusHire',
    category: 'Backend Development / Placement Management',
    status: 'Backend Implemented – Frontend and Deployment Pending',
    statusTone: 'backend',
    shortDescription:
      'A cloud-oriented college placement and career management platform designed to organize student and placement-related workflows.',
    overview:
      'CampusHire is a backend-driven placement and career management platform built with Java 21, Spring Boot 4.1.1, and MySQL 8.0. The focus of the current phase is a structured, layered REST API backend with validation, global exception handling, standardized response DTOs, and JWT-based authentication.',
    problemStatement:
      'Managing student placement profiles, eligibility records, and authenticated access across college placement workflows requires consistent data validation, secure credential handling, and clean API contracts.',
    solution:
      'Architected a layered Spring Boot backend integrating MySQL via Spring Data JPA, standardized API response DTOs, global exception handling, BCrypt password hashing, and a JWT authentication filter chain.',
    techStack: [
      'Java 21',
      'Spring Boot 4.1.1',
      'Maven',
      'MySQL 8.0',
      'Spring Data JPA',
      'Spring Web',
      'Spring Security',
      'BCrypt',
      'JWT',
      'REST APIs',
    ],
    architectureLabel: 'Documented Backend Architecture (Local / Repository Implementation)',
    architectureNodes: [
      { step: '01', label: 'Client Request', detail: 'HTTP / REST API call' },
      { step: '02', label: 'Spring Security', detail: 'Security filter chain enforcement' },
      { step: '03', label: 'JWT Auth Filter', detail: 'Token validation & user context' },
      { step: '04', label: 'Controller', detail: 'REST endpoints & DTO validation' },
      { step: '05', label: 'Service Layer', detail: 'Business logic & BCrypt auth service' },
      { step: '06', label: 'Repository', detail: 'Spring Data JPA persistence' },
      { step: '07', label: 'MySQL 8.0', detail: 'Relational student & user tables' },
    ],
    implementedFeatures: [
      'Spring Boot 4.1.1 & MySQL 8.0 configuration',
      'Student entity with full CRUD REST APIs',
      'Request validation and global exception handling',
      'Standardized API response DTOs and Login request/response DTOs',
      'User entity, repository, and service layers',
      'BCrypt password hashing and JWT token service',
      'Authentication service, controller, JWT filter, and security configuration',
    ],
    contribution: [
      'Structured the multi-layer Spring Boot backend (Controller, Service, Repository, DTOs)',
      'Implemented Student CRUD endpoints with validation and global exception handling',
      'Configured JWT authentication flow with BCrypt password hashing',
    ],
    limitations: [
      'Backend implementation is completed, while frontend development and live deployment remain pending',
      'Documented backend architecture only — not yet a verified production deployment',
    ],
    githubUrl: 'https://github.com/Pushpendra960/CampusHire',
  },
  {
    slug: 'smart-attendance',
    index: '04',
    title: 'Smart Attendance',
    category: 'Attendance Automation / Application Development',
    status: 'In Development – Face Recognition Integration Pending',
    statusTone: 'in-development',
    shortDescription:
      'A personal project focused on simplifying attendance management through a digital application and cloud-connected backend.',
    overview:
      'Smart Attendance explores digital attendance workflows backed by a cloud-connected Supabase database. While the application frontend is prepared and Supabase connectivity is functional, automated face recognition integration is still under active troubleshooting and development.',
    problemStatement:
      'Manual classroom attendance tracking consumes instructional time and produces error-prone records that require manual digitization.',
    solution:
      'Built an application interface connected to Supabase for cloud-backed attendance record storage, designed to integrate biometric/face verification once the recognition pipeline functions reliably.',
    techStack: ['Supabase', 'Cloud Database Backend', 'Frontend UI', 'Attendance Workflow'],
    architectureLabel: 'Current Application & Cloud Persistence State',
    architectureNodes: [
      { step: '01', label: 'Frontend UI', detail: 'Prepared attendance interface' },
      { step: '02', label: 'Face Recognition', detail: 'Pending — not yet functioning correctly' },
      { step: '03', label: 'Supabase Backend', detail: 'Working cloud database integration' },
    ],
    implementedFeatures: [
      'Prepared frontend interface for attendance workflows',
      'Working Supabase cloud database integration',
    ],
    contribution: [
      'Prepared the client-side attendance interface structure',
      'Set up and verified Supabase cloud backend connectivity',
    ],
    limitations: [
      'Face recognition integration is not yet functioning correctly',
      'Complete end-to-end automated attendance system is still in development',
    ],
    githubUrl: 'https://github.com/Pushpendra960/smart-attendance',
  },
];
