export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  location: string;
  availability: string;
  bio: string[];
  funFacts: {
    icon: string;
    title: string;
    text: string;
  }[];
}

export const personalInfo: PersonalInfo = {
  name: "Nanda Kumar",
  title: "Web Designer & Developer",
  tagline: "Vibe Coder | Founder of Zeridex",
  location: "Bangalore, India",
  availability: "Available for freelance projects and internships",
  bio: [
    "Hey there! I'm Nanda Kumar, a passionate student and freelancer based in Bangalore, India. Currently pursuing my BCA in AI/ML, I'm on a journey to master the art of web development.",
    "I run my own startup called Zeridex, where we build AI-powered websites and automation systems for modern businesses. I love exploring new technologies and staying on the cutting edge of what's possible.",
    "When I'm not coding, you'll find me watching MCU movies or getting inspired by Tony Stark's genius. Yes, I'm building my own J.A.R.V.I.S. — stay tuned!"
  ],
  funFacts: [
    { icon: "Film", title: "MCU Fanatic", text: "Watching movies since Iron Man (2008)" },
    { icon: "Glasses", title: "Tony Stark Inspired", text: "Building my own version of JARVIS" },
    { icon: "Rocket", title: "Startup Founder", text: "Founder of Zeridex @ 19" },
    { icon: "Hash", title: "Vibe Coder", text: "Coding with music and coffee" }
  ]
};
