export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "full-time" | "part-time" | "freelance" | "internship" | "startup" | "learning";
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  icon: string;
  achievements: string[];
  technologies: string[];
  gradient: string;
  statusText?: string;
}

export const experiences: Experience[] = [
  {
    id: "edu-expert",
    title: "Web Developer & Maintenance",
    company: "Edu Expert & Academic Expert",
    location: "Bangalore, India",
    type: "freelance",
    startDate: "2025-04",
    endDate: null,
    current: true,
    icon: "💼",
    description: "Building and maintaining educational websites. Full-stack development, feature implementation, and ongoing support for academic platforms.",
    achievements: [
      "Optimized site performance for thousands of concurrent students",
      "Implemented automated booking systems for tutoring sessions",
      "Integrated secure payment gateways for course enrollments"
    ],
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "TypeScript"],
    gradient: "from-blue-500 to-cyan-500",
    statusText: "Current",
  },
  {
    id: "zeridex-founder",
    title: "Founder & Developer",
    company: "Zeridex",
    location: "Bangalore, India",
    type: "startup",
    startDate: "2025-01",
    endDate: null,
    current: true,
    icon: "🚀",
    description: "Founded my own tech agency specializing in AI-powered websites and automation for modern businesses and startups.",
    achievements: [
      "Launched 5+ AI-integrated business websites in the first quarter",
      "Developed custom automation workflows for client operations",
      "Built a reputation for high-vibe, fast-turnaround digital products"
    ],
    technologies: ["React", "OpenAI API", "Framer Motion", "Supabase"],
    gradient: "from-cyan-500 to-purple-600",
    statusText: "Current",
  },
  {
    id: "freelance-web",
    title: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    type: "freelance",
    startDate: "2024-06",
    endDate: null,
    current: true,
    icon: "🌐",
    description: "Taking on various client projects, building responsive websites, and continuously learning new technologies to stay ahead.",
    achievements: [
      "Completed 10+ diverse web projects for international clients",
      "Maintained high client satisfaction ratings",
      "Mastered modern full-stack development patterns"
    ],
    technologies: ["React", "Node.js", "Firebase", "CSS Modules"],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "journey-start",
    title: "Started Coding Journey",
    company: "Self-taught + AI",
    location: "Learning",
    type: "learning",
    startDate: "2024-01",
    endDate: "2024-05",
    current: false,
    icon: "💻",
    description: "Began my journey into web development, exploring HTML, CSS, JavaScript, and React. Embraced 'vibe coding' with AI assistance from day one.",
    achievements: [
      "Built first responsive portfolio within 3 months",
      "Integrated AI tools to accelerate the learning curve",
      "Fell in love with the art of building digital products"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "AI Prompting"],
    gradient: "from-orange-500 to-yellow-500",
  },
];

export interface Education {
  id: string;
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | null;
  duration: string;
  currentStatus: string;
  current: boolean;
  description: string;
  achievements: string[];
  gradient: string;
}

export const education: Education[] = [
  {
    id: "bca-ai-ml",
    degree: "Bachelor of Computer Applications (BCA)",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "Swamy Vivekananda Rural First Grade College",
    location: "India",
    startDate: "2025",
    endDate: "2028 (Expected)",
    duration: "Year 1 of 3",
    currentStatus: "1st Year • 2nd Semester",
    current: true,
    description: "Currently focusing on web development while pursuing my degree in AI/ML. Combining classroom learning with real-world project experience.",
    achievements: [
      "Self-taught web development",
      "Running a startup while studying",
      "Multiple live client projects"
    ],
    gradient: "from-blue-600 via-indigo-600 to-cyan-500",
  },
];
