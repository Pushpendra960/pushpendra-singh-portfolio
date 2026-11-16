export interface ProfileData {
  name: string;
  brandMark: string;
  positioning: string;
  headlineLines: string[];
  heroIntroLabel: string;
  heroSummary: string;
  availabilityNote: string;
  email: string;
  location: string;
  university: string;
  degree: string;
  branch: string;
  specialization: string;
  duration: string;
  cgpa: string;
  academicHighlight: {
    score: string;
    subject: string;
    note: string;
  };
  relevantSubjects: string[];
  heroTechnologies: string[];
  links: {
    linkedin: string;
    githubPrimary: string;
    githubCollege: string;
    resumePdf: string;
  };
  portraitPath: string;
  aboutParagraphs: string[];
  contactHeading: string;
  contactSubcopy: string;
}

export const PROFILE: ProfileData = {
  name: 'Pushpendra Singh',
  brandMark: 'PUSHPENDRA',
  positioning: 'Cloud Computing Student | Backend Development Enthusiast | AI Automation Builder',
  headlineLines: [
    'Building Backend Systems.',
    'Exploring Cloud Technology.',
    'Creating with AI.',
  ],
  heroIntroLabel: "Hello, I'm",
  heroSummary:
    "I'm a Computer Science and Engineering student specializing in Cloud Computing at IILM University, Greater Noida. I enjoy building practical software applications, exploring backend engineering, working with cloud technologies, and experimenting with AI-powered automation.",
  availabilityNote: 'Open to Internship Opportunities',
  email: 'singhpushpendra092006@gmail.com',
  location: 'Greater Noida, Uttar Pradesh, India',
  university: 'IILM University, Greater Noida',
  degree: 'Bachelor of Technology (B.Tech)',
  branch: 'Computer Science and Engineering',
  specialization: 'Cloud Computing',
  duration: '2025–2029',
  cgpa: '8.03',
  academicHighlight: {
    score: '98/100',
    subject: 'DECO',
    note: 'Highest marks across the college in the previous semester, as reported by the student.',
  },
  relevantSubjects: [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Computer Networks',
    'Operating Systems',
    'Cloud Computing',
    'Java Programming',
  ],
  heroTechnologies: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Generative AI', 'Git & GitHub'],
  links: {
    linkedin: 'https://www.linkedin.com/in/pushpendrasingh9996/',
    githubPrimary: 'https://github.com/Pushpendra960',
    githubCollege: 'https://github.com/Pushpendra8701',
    resumePdf: '/assets/documents/Pushpendra_Singh_Resume.pdf',
  },
  portraitPath: '/assets/aistudio/IMG-20260915-WA0001_2a9e1067.jpg',
  aboutParagraphs: [
    "I'm currently pursuing a B.Tech in Computer Science and Engineering with a specialization in Cloud Computing at IILM University, Greater Noida.",
    'My technical interests revolve around backend development, cloud infrastructure, and applied artificial intelligence.',
    'I primarily work with Java and SQL while developing an understanding of Spring Boot, AWS services, and modern application architecture.',
    'I also enjoy building AI-assisted automation systems using LLM APIs and tools such as Google Apps Script.',
    'My approach to learning is practical: understand a concept, experiment with it, build something functional, and improve it through implementation.',
  ],
  contactHeading: "Let's Build Something Meaningful.",
  contactSubcopy:
    "I'm always interested in connecting with people working in software development, cloud computing, and emerging technologies. Feel free to reach out for internships, technical discussions, collaborations, or opportunities.",
};
