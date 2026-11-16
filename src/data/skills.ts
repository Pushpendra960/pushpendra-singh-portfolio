export type ProficiencyLevel = 'Advanced' | 'Intermediate' | 'Beginner' | 'Working Knowledge';

export interface SkillItem {
  name: string;
  level: ProficiencyLevel;
  note?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle?: string;
  items: SkillItem[];
}

export interface AwsCategory {
  category: string;
  services: string[];
}

export const CORE_SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    items: [
      { name: 'Java', level: 'Intermediate' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    items: [
      { name: 'REST APIs', level: 'Intermediate' },
      { name: 'Spring Boot', level: 'Beginner' },
    ],
  },
  {
    id: 'database',
    title: 'Database Systems',
    items: [
      { name: 'MySQL / SQL', level: 'Advanced' },
      { name: 'DBMS', level: 'Intermediate' },
    ],
  },
  {
    id: 'version-control',
    title: 'Version Control',
    items: [
      { name: 'Git', level: 'Advanced' },
      { name: 'GitHub', level: 'Advanced' },
    ],
  },
  {
    id: 'applied-ai',
    title: 'Applied AI',
    subtitle: 'Practical AI application development & workflow automation',
    items: [
      { name: 'Generative AI', level: 'Intermediate' },
      { name: 'LLM Concepts', level: 'Beginner' },
      { name: 'RAG', level: 'Beginner' },
      { name: 'Agentic AI', level: 'Beginner' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Exposure',
    items: [
      { name: 'Linux / Ubuntu', level: 'Beginner' },
      { name: 'Docker', level: 'Beginner' },
      { name: 'Kubernetes', level: 'Beginner' },
      { name: 'CI/CD', level: 'Beginner' },
    ],
  },
  {
    id: 'networking',
    title: 'Networking',
    items: [
      { name: 'Computer Networks', level: 'Intermediate' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Exposure',
    items: [
      { name: 'HTML5', level: 'Beginner' },
      { name: 'CSS3', level: 'Beginner' },
    ],
  },
];

export const DSA_PROFILE = {
  level: 'Working Knowledge' as ProficiencyLevel,
  coveredTopics: [
    'Arrays',
    'Strings',
    'Linked Lists',
    'Recursion',
    'Sorting',
    'Trees',
    'Binary Trees',
    'Binary Search Trees',
    'Tree Traversals',
    'Core Studied Fundamentals',
  ],
  needsDevelopment: ['Hashing', 'Graphs'],
};

export const AWS_CLOUD_PROFILE = {
  heading: 'AWS & Cloud Computing – Practical Exposure',
  overallLevel: 'Intermediate' as ProficiencyLevel,
  note: 'Practical hands-on exploration and conceptual study across AWS core services and cloud architecture fundamentals.',
  categories: [
    {
      category: 'Compute',
      services: ['EC2', 'AMI', 'EBS', 'Lambda'],
    },
    {
      category: 'Storage',
      services: [
        'S3',
        'Bucket Policies',
        'Versioning',
        'Replication',
        'Storage Classes',
        'Lifecycle Management',
        'Snow Family',
        'Storage Gateway',
      ],
    },
    {
      category: 'Databases',
      services: ['RDS', 'DynamoDB', 'DAX'],
    },
    {
      category: 'Networking',
      services: ['VPC', 'Subnets', 'Security Groups', 'Route 53', 'CloudFront', 'Load Balancers'],
    },
    {
      category: 'Scaling',
      services: ['Elastic Load Balancing', 'Auto Scaling Groups', 'Scalability', 'Elasticity'],
    },
    {
      category: 'Containers',
      services: ['ECS', 'EKS', 'Kubernetes'],
    },
    {
      category: 'Security',
      services: ['IAM', 'MFA', 'SSL/TLS'],
    },
    {
      category: 'Infrastructure',
      services: ['Infrastructure as Code', 'Terraform Fundamentals'],
    },
    {
      category: 'Integration',
      services: ['AWS SDKs', 'APIs'],
    },
  ] as AwsCategory[],
  fundamentals: [
    'Virtualization',
    'Hypervisors',
    'IaaS',
    'PaaS',
    'SaaS',
    'Public Cloud',
    'Private Cloud',
    'Hybrid Cloud',
    'Community Cloud',
  ],
};
