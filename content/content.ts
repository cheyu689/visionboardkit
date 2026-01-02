// 内容数据源 - 统一管理所有内容数据

export type Theme = 'career' | 'money' | 'health' | 'relationship' | 'study' | 'travel';
export type Style = 'minimalist' | 'aesthetic' | 'bold' | 'pastel' | 'dark';
export type Format = 'printable' | 'digital' | 'notion';

// 主题配置
export const themes: Record<Theme, { name: string; color: string; icon: string }> = {
  career: { name: 'Career', color: '#3b82f6', icon: '💼' },
  money: { name: 'Money', color: '#22c55e', icon: '💰' },
  health: { name: 'Health', color: '#ef4444', icon: '❤️' },
  relationship: { name: 'Relationship', color: '#ec4899', icon: '💕' },
  study: { name: 'Study', color: '#8b5cf6', icon: '📚' },
  travel: { name: 'Travel', color: '#f59e0b', icon: '✈️' },
};

// 风格配置
export const styles: Record<Style, { name: string; description: string }> = {
  minimalist: { name: 'Minimalist', description: 'Clean and simple design' },
  aesthetic: { name: 'Aesthetic', description: 'Beautiful and artistic' },
  bold: { name: 'Bold', description: 'Strong and impactful' },
  pastel: { name: 'Pastel', description: 'Soft and gentle colors' },
  dark: { name: 'Dark', description: 'Dark mode friendly' },
};

// 格式配置
export const formats: Record<Format, { name: string; icon: string }> = {
  printable: { name: 'Printable', icon: '🖨️' },
  digital: { name: 'Digital', icon: '💻' },
  notion: { name: 'Notion', icon: '📝' },
};

// 模板数据
export interface Template {
  id: string;
  title: string;
  theme: Theme;
  style: Style;
  format: Format;
  previewImage: string;
  downloadFiles: { type: 'svg' | 'png' | 'pdf'; url: string }[];
  tags: string[];
  featured: boolean;
}

export const templates: Template[] = [
  // Career - 2 templates (printable + digital)
  {
    id: 'career-printable-minimalist',
    title: 'Career Goals Vision Board - Minimalist',
    theme: 'career',
    style: 'minimalist',
    format: 'printable',
    previewImage: '/images/templates/career-printable-minimalist.png',
    downloadFiles: [
      { type: 'svg', url: '/downloads/templates/career-printable-minimalist.svg' },
      { type: 'png', url: '/downloads/templates/career-printable-minimalist.png' },
      { type: 'pdf', url: '/downloads/templates/career-printable-minimalist.pdf' },
    ],
    tags: ['goals', 'career', 'professional'],
    featured: true,
  },
  {
    id: 'career-digital-bold',
    title: 'Career Vision Board - Digital Bold',
    theme: 'career',
    style: 'bold',
    format: 'digital',
    previewImage: '/images/templates/career-digital-bold.png',
    downloadFiles: [
      { type: 'png', url: '/downloads/templates/career-digital-bold.png' },
    ],
    tags: ['digital', 'career', 'bold'],
    featured: true,
  },
  // Money
  {
    id: 'money-printable-pastel',
    title: 'Financial Goals Board - Pastel',
    theme: 'money',
    style: 'pastel',
    format: 'printable',
    previewImage: '/images/templates/money-printable-pastel.png',
    downloadFiles: [
      { type: 'svg', url: '/downloads/templates/money-printable-pastel.svg' },
      { type: 'pdf', url: '/downloads/templates/money-printable-pastel.pdf' },
    ],
    tags: ['finance', 'money', 'goals'],
    featured: true,
  },
  {
    id: 'money-digital-minimalist',
    title: 'Money Vision - Digital Minimal',
    theme: 'money',
    style: 'minimalist',
    format: 'digital',
    previewImage: '/images/templates/money-digital-minimalist.png',
    downloadFiles: [
      { type: 'png', url: '/downloads/templates/money-digital-minimalist.png' },
    ],
    tags: ['digital', 'finance', 'minimal'],
    featured: false,
  },
  // Health
  {
    id: 'health-printable-aesthetic',
    title: 'Health & Wellness Board - Aesthetic',
    theme: 'health',
    style: 'aesthetic',
    format: 'printable',
    previewImage: '/images/templates/health-printable-aesthetic.png',
    downloadFiles: [
      { type: 'svg', url: '/downloads/templates/health-printable-aesthetic.svg' },
      { type: 'pdf', url: '/downloads/templates/health-printable-aesthetic.pdf' },
    ],
    tags: ['health', 'wellness', 'fitness'],
    featured: true,
  },
  {
    id: 'health-digital-pastel',
    title: 'Health Goals - Digital Pastel',
    theme: 'health',
    style: 'pastel',
    format: 'digital',
    previewImage: '/images/templates/health-digital-pastel.png',
    downloadFiles: [
      { type: 'png', url: '/downloads/templates/health-digital-pastel.png' },
    ],
    tags: ['digital', 'health', 'wellness'],
    featured: false,
  },
  // Relationship
  {
    id: 'relationship-printable-minimalist',
    title: 'Love & Relationships Board - Minimal',
    theme: 'relationship',
    style: 'minimalist',
    format: 'printable',
    previewImage: '/images/templates/relationship-printable-minimalist.png',
    downloadFiles: [
      { type: 'svg', url: '/downloads/templates/relationship-printable-minimalist.svg' },
      { type: 'pdf', url: '/downloads/templates/relationship-printable-minimalist.pdf' },
    ],
    tags: ['love', 'relationships', 'minimal'],
    featured: true,
  },
  {
    id: 'relationship-digital-aesthetic',
    title: 'Relationship Vision - Digital Aesthetic',
    theme: 'relationship',
    style: 'aesthetic',
    format: 'digital',
    previewImage: '/images/templates/relationship-digital-aesthetic.png',
    downloadFiles: [
      { type: 'png', url: '/downloads/templates/relationship-digital-aesthetic.png' },
    ],
    tags: ['digital', 'love', 'relationships'],
    featured: false,
  },
  // Study
  {
    id: 'study-printable-bold',
    title: 'Study Goals Board - Bold',
    theme: 'study',
    style: 'bold',
    format: 'printable',
    previewImage: '/images/templates/study-printable-bold.png',
    downloadFiles: [
      { type: 'svg', url: '/downloads/templates/study-printable-bold.svg' },
      { type: 'pdf', url: '/downloads/templates/study-printable-bold.pdf' },
    ],
    tags: ['study', 'education', 'goals'],
    featured: true,
  },
  {
    id: 'study-digital-minimalist',
    title: 'Academic Vision - Digital Minimal',
    theme: 'study',
    style: 'minimalist',
    format: 'digital',
    previewImage: '/images/templates/study-digital-minimalist.png',
    downloadFiles: [
      { type: 'png', url: '/downloads/templates/study-digital-minimalist.png' },
    ],
    tags: ['digital', 'study', 'academic'],
    featured: false,
  },
  // Travel
  {
    id: 'travel-printable-pastel',
    title: 'Travel Dreams Board - Pastel',
    theme: 'travel',
    style: 'pastel',
    format: 'printable',
    previewImage: '/images/templates/travel-printable-pastel.png',
    downloadFiles: [
      { type: 'svg', url: '/downloads/templates/travel-printable-pastel.svg' },
      { type: 'pdf', url: '/downloads/templates/travel-printable-pastel.pdf' },
    ],
    tags: ['travel', 'adventure', 'dreams'],
    featured: true,
  },
  {
    id: 'travel-digital-aesthetic',
    title: 'Travel Vision - Digital Aesthetic',
    theme: 'travel',
    style: 'aesthetic',
    format: 'digital',
    previewImage: '/images/templates/travel-digital-aesthetic.png',
    downloadFiles: [
      { type: 'png', url: '/downloads/templates/travel-digital-aesthetic.png' },
    ],
    tags: ['digital', 'travel', 'aesthetic'],
    featured: false,
  },
];

// 灵感图库数据
export interface Idea {
  id: string;
  title: string;
  theme: Theme;
  style: Style;
  previewImage: string;
  tags: string[];
  description: string;
  featured: boolean;
}

export const ideas: Idea[] = [
  // Career - 3 ideas
  {
    id: 'idea-career-1',
    title: 'Executive Career Vision Board',
    theme: 'career',
    style: 'minimalist',
    previewImage: '/images/ideas/career-1.jpg',
    tags: ['career', 'professional', 'executive'],
    description: 'A clean and professional vision board focused on career advancement and leadership goals.',
    featured: true,
  },
  {
    id: 'idea-career-2',
    title: 'Creative Career Dream Board',
    theme: 'career',
    style: 'aesthetic',
    previewImage: '/images/ideas/career-2.jpg',
    tags: ['career', 'creative', 'artistic'],
    description: 'An artistic vision board for creative professionals and entrepreneurs.',
    featured: true,
  },
  {
    id: 'idea-career-3',
    title: 'Bold Career Goals Collage',
    theme: 'career',
    style: 'bold',
    previewImage: '/images/ideas/career-3.jpg',
    tags: ['career', 'bold', 'motivation'],
    description: 'A powerful and bold vision board to manifest your biggest career dreams.',
    featured: false,
  },
  // Money - 3 ideas
  {
    id: 'idea-money-1',
    title: 'Financial Freedom Vision Board',
    theme: 'money',
    style: 'minimalist',
    previewImage: '/images/ideas/money-1.jpg',
    tags: ['finance', 'freedom', 'goals'],
    description: 'Focus on financial independence and wealth building with this clean design.',
    featured: true,
  },
  {
    id: 'idea-money-2',
    title: 'Abundance Mindset Collage',
    theme: 'money',
    style: 'pastel',
    previewImage: '/images/ideas/money-2.jpg',
    tags: ['abundance', 'money', 'mindset'],
    description: 'Soft and inspiring vision board for cultivating an abundance mindset.',
    featured: true,
  },
  {
    id: 'idea-money-3',
    title: 'Wealth Building Vision Board',
    theme: 'money',
    style: 'bold',
    previewImage: '/images/ideas/money-3.jpg',
    tags: ['wealth', 'investing', 'bold'],
    description: 'Bold and motivating vision board focused on wealth creation strategies.',
    featured: false,
  },
  // Health - 3 ideas
  {
    id: 'idea-health-1',
    title: 'Fitness Goals Vision Board',
    theme: 'health',
    style: 'bold',
    previewImage: '/images/ideas/health-1.jpg',
    tags: ['fitness', 'workout', 'goals'],
    description: 'Energizing vision board to keep your fitness goals on track.',
    featured: true,
  },
  {
    id: 'idea-health-2',
    title: 'Wellness & Self-Care Board',
    theme: 'health',
    style: 'pastel',
    previewImage: '/images/ideas/health-2.jpg',
    tags: ['wellness', 'self-care', 'mental-health'],
    description: 'Gentle vision board focusing on holistic wellness and self-care practices.',
    featured: true,
  },
  {
    id: 'idea-health-3',
    title: 'Healthy Lifestyle Aesthetic Board',
    theme: 'health',
    style: 'aesthetic',
    previewImage: '/images/ideas/health-3.jpg',
    tags: ['healthy', 'lifestyle', 'aesthetic'],
    description: 'Beautiful and inspiring board for maintaining a balanced healthy lifestyle.',
    featured: false,
  },
  // Relationship - 3 ideas
  {
    id: 'idea-relationship-1',
    title: 'Love & Relationships Vision Board',
    theme: 'relationship',
    style: 'aesthetic',
    previewImage: '/images/ideas/relationship-1.jpg',
    tags: ['love', 'relationships', 'romance'],
    description: 'Romantic and beautiful vision board for manifesting your ideal relationship.',
    featured: true,
  },
  {
    id: 'idea-relationship-2',
    title: 'Self-Love & Self-Worth Board',
    theme: 'relationship',
    style: 'pastel',
    previewImage: '/images/ideas/relationship-2.jpg',
    tags: ['self-love', 'worth', 'healing'],
    description: 'Gentle board focused on cultivating self-love and personal worth.',
    featured: true,
  },
  {
    id: 'idea-relationship-3',
    title: 'Family Goals Vision Board',
    theme: 'relationship',
    style: 'minimalist',
    previewImage: '/images/ideas/relationship-3.jpg',
    tags: ['family', 'home', 'together'],
    description: 'Clean and heartwarming board for family and home life goals.',
    featured: false,
  },
  // Study - 3 ideas
  {
    id: 'idea-study-1',
    title: 'Academic Excellence Vision Board',
    theme: 'study',
    style: 'minimalist',
    previewImage: '/images/ideas/study-1.jpg',
    tags: ['study', 'academic', 'excellence'],
    description: 'Focused vision board for academic achievement and learning goals.',
    featured: true,
  },
  {
    id: 'idea-study-2',
    title: 'Learning Journey Board',
    theme: 'study',
    style: 'aesthetic',
    previewImage: '/images/ideas/study-2.jpg',
    tags: ['learning', 'growth', 'knowledge'],
    description: 'Beautiful board celebrating the journey of lifelong learning.',
    featured: true,
  },
  {
    id: 'idea-study-3',
    title: 'Study Goals Bold Board',
    theme: 'study',
    style: 'bold',
    previewImage: '/images/ideas/study-3.jpg',
    tags: ['study', 'motivation', 'goals'],
    description: 'Motivating and bold board to keep your study goals in focus.',
    featured: false,
  },
  // Travel - 3 ideas
  {
    id: 'idea-travel-1',
    title: 'Dream Destinations Vision Board',
    theme: 'travel',
    style: 'aesthetic',
    previewImage: '/images/ideas/travel-1.jpg',
    tags: ['travel', 'destinations', 'dreams'],
    description: 'Stunning vision board featuring your dream travel destinations.',
    featured: true,
  },
  {
    id: 'idea-travel-2',
    title: 'Adventure Awaits Board',
    theme: 'travel',
    style: 'bold',
    previewImage: '/images/ideas/travel-2.jpg',
    tags: ['adventure', 'explore', 'travel'],
    description: 'Bold and exciting board for adventure seekers and explorers.',
    featured: true,
  },
  {
    id: 'idea-travel-3',
    title: 'Travel Inspiration Pastel Board',
    theme: 'travel',
    style: 'pastel',
    previewImage: '/images/ideas/travel-3.jpg',
    tags: ['travel', 'inspiration', 'wanderlust'],
    description: 'Soft and dreamy board for travel inspiration and wanderlust.',
    featured: false,
  },
];

// 30分钟流程清单
export interface ChecklistItem {
  id: string;
  text: string;
  time: string;
}

export const checklist: ChecklistItem[] = [
  { id: '1', text: 'Choose your theme and format', time: '2 min' },
  { id: '2', text: 'Select or create a template', time: '3 min' },
  { id: '3', text: 'Gather your images and quotes', time: '10 min' },
  { id: '4', text: 'Arrange and paste your vision elements', time: '10 min' },
  { id: '5', text: 'Add final touches and affirmations', time: '5 min' },
];

// FAQ 数据
export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'What should I put on my New Year vision board?',
    answer: 'Include images, words, and symbols that represent your goals and dreams for the year ahead. Focus on 6-8 key areas like career, health, relationships, finances, personal growth, and experiences. Use both photos and text affirmations to create a powerful visual representation of your intentions.',
  },
  {
    question: 'When should I make my New Year vision board?',
    answer: 'The ideal time is between late December and early January. This allows you to reflect on the past year while setting clear intentions for the new one. However, you can create a vision board anytime you feel the need for clarity and motivation - there\'s no wrong time to visualize your goals.',
  },
  {
    question: 'Can I make my vision board in January?',
    answer: 'Absolutely! January is actually a perfect time to create a vision board. Many people find that after the holiday rush, they have more mental space to focus on their goals. The energy of new beginnings in January can amplify the power of your intentions.',
  },
  {
    question: 'What\'s the difference between printable and digital vision boards?',
    answer: 'Printable vision boards are designed to be printed and displayed physically in your space - perfect for visual reminders throughout your day. Digital vision boards are created for use on devices (phones, tablets, computers) and can include interactive elements, be easily shared, and serve as phone or desktop wallpapers.',
  },
  {
    question: 'How many goals should I put on my vision board?',
    answer: 'Aim for 6-10 meaningful goals across different life areas. Too many goals can feel overwhelming and dilute your focus. Choose goals that truly excite and inspire you - quality over quantity. Remember, you can always create additional boards for specific themes or timeframes.',
  },
  {
    question: 'Do vision boards actually work?',
    answer: 'Vision boards work through the psychology of visualization and focus. By regularly seeing your goals, you prime your brain to notice opportunities and take aligned actions. They serve as constant reminders of what you\'re working toward, helping maintain motivation and clarity. Combine your vision board with consistent action for best results.',
  },
];

// 资源包数据
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'checklist' | 'prompts' | 'guide' | 'keywords';
  file: string;
}

export const resources: Resource[] = [
  {
    id: 'resource-1',
    title: 'Complete Vision Board Checklist',
    description: 'Step-by-step checklist to create your perfect vision board in 30 minutes',
    type: 'checklist',
    file: '/downloads/vision-board-checklist.html',
  },
  {
    id: 'resource-2',
    title: 'AI Prompt Collection',
    description: '100+ AI prompts to generate vision board images and content',
    type: 'prompts',
    file: '/downloads/ai-prompt-collection.html',
  },
  {
    id: 'resource-3',
    title: 'What to Put Guide',
    description: 'Comprehensive guide on what content to include for each theme',
    type: 'guide',
    file: '/downloads/what-to-put-guide.html',
  },
  {
    id: 'resource-4',
    title: 'Keyword Collections',
    description: 'Curated keywords and phrases for each vision board theme',
    type: 'keywords',
    file: '/downloads/keyword-collections.html',
  },
];

// 关键词数据
export interface KeywordCollection {
  theme: Theme;
  keywords: string[];
  aiPrompts: string[];
}

export const keywordCollections: KeywordCollection[] = [
  {
    theme: 'career',
    keywords: ['Promotion', 'Leadership', 'Entrepreneurship', 'Passive Income', 'Remote Work', 'Networking', 'Skills', 'Certification', 'Dream Job', 'Side Hustle'],
    aiPrompts: [
      'Professional standing in modern office with city skyline view',
      'Inspirational workspace with laptop and vision board',
      'Leadership team collaboration in bright office',
    ],
  },
  {
    theme: 'money',
    keywords: ['Financial Freedom', 'Savings', 'Investments', 'Passive Income', 'Debt Free', 'Emergency Fund', 'Real Estate', 'Stocks', 'Budget', 'Wealth'],
    aiPrompts: [
      'Piggy bank with growing plant symbolizing financial growth',
      'Modern minimalist home office with success imagery',
      'Abstract representation of financial growth and abundance',
    ],
  },
  {
    theme: 'health',
    keywords: ['Fitness', 'Mental Health', 'Self-Care', 'Nutrition', 'Sleep', 'Yoga', 'Meditation', 'Energy', 'Strength', 'Balance'],
    aiPrompts: [
      'Peaceful yoga scene at sunrise',
      'Healthy meal prep aesthetic arrangement',
      'Person meditating in nature with mountains',
    ],
  },
  {
    theme: 'relationship',
    keywords: ['Love', 'Partnership', 'Communication', 'Trust', 'Family', 'Friendship', 'Self-Love', 'Boundaries', 'Quality Time', 'Connection'],
    aiPrompts: [
      'Couple watching sunset together on beach',
      'Cozy home scene with warmth and connection',
      'Friends laughing and enjoying outdoor activity',
    ],
  },
  {
    theme: 'study',
    keywords: ['Learning', 'Graduation', 'Skills', 'Knowledge', 'Languages', 'Reading', 'Focus', 'Discipline', 'Growth Mindset', 'Achievement'],
    aiPrompts: [
      'Cozy study nook with books and warm lighting',
      'Graduation cap with inspirational background',
      'Library aesthetic with natural light and plants',
    ],
  },
  {
    theme: 'travel',
    keywords: ['Adventure', 'Beach', 'Mountains', 'Europe', 'Asia', 'Road Trip', 'Flight', 'Exotic', 'Culture', 'Exploration'],
    aiPrompts: [
      'Hot air balloon over scenic landscape',
      'Tropical beach paradise at golden hour',
      'Mountain vista with hiking trail and clear sky',
    ],
  },
];
