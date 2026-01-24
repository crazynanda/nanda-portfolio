export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  status?: string;
  featured: boolean;
  color: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "zeridex",
    title: "Zeridex",
    category: "Startup • Agency",
    tagline: "AI Websites & Automation for Modern Businesses",
    description: "My own startup! A Bangalore-based tech agency building AI-powered websites and automation systems. Features ROI Calculator, AI chatbot demo, and seamless booking integration.",
    tech: ["React 19", "TypeScript", "Framer Motion", "PostgreSQL", "OpenAI API"],
    liveUrl: "https://www.zeridex.space",
    featured: true,
    color: "#06b6d4",
    gradient: "from-cyan-500 via-blue-500 to-purple-600",
  },
  {
    id: "academic-expert",
    title: "Academic Expert",
    category: "Educational Platform",
    tagline: "Language Learning Academy",
    description: "Professional educational platform offering French, German, English, Spanish courses and competitive exam preparation. Full blog system, booking dialogs, and admin dashboard.",
    tech: ["Next.js", "Tailwind CSS", "Authentication", "CMS"],
    liveUrl: "https://www.academicexpert.in",
    featured: false,
    color: "#f97316",
    gradient: "from-orange-500 via-red-500 to-pink-500",
  },
  {
    id: "academic-seva",
    title: "Academic Seva",
    category: "NGO Platform",
    tagline: "Bridging India's Education Divide",
    description: "Educational trust website supporting underprivileged students. Features Razorpay donations, volunteer management, impact tracking, and full transparency reports.",
    tech: ["React", "Razorpay", "OAuth", "Analytics"],
    liveUrl: "https://www.academicseva.org",
    featured: false,
    color: "#10b981",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
  },
  {
    id: "lango",
    title: "Lango",
    category: "EdTech Marketplace",
    tagline: "Learn from Expert Tutors",
    description: "Online tutoring marketplace connecting students with verified tutors. Gamification system with coins and badges, vendor storefronts, and affiliate program.",
    tech: ["Next.js", "TypeScript", "Gamification", "Payments"],
    liveUrl: "https://www.langoleaf.com",
    featured: false,
    color: "#a855f7",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
  },
  {
    id: "jarvis",
    title: "J.A.R.V.I.S.",
    category: "Mobile App • AI",
    tagline: "Your Personal AI Assistant",
    description: "Inspired by Tony Stark's AI assistant. Currently in development. An AI-powered personal assistant to help with daily tasks.",
    tech: ["React Native", "AI/ML", "Voice Recognition"],
    status: "In Development",
    featured: false,
    color: "#ef4444",
    gradient: "from-red-600 via-orange-600 to-yellow-500",
  },
];
