export interface Experience {
  id: string
  company: string
  position: string
  period: string
  location: string
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
}

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    company: "Tech Company Inc.",
    position: "Senior Product Manager",
    period: "2022 - Present",
    location: "San Francisco, CA",
    description: "Lead product strategy and development for enterprise SaaS platform serving 10,000+ customers worldwide.",
    achievements: [
      "Launched 3 major product features resulting in 40% revenue growth",
      "Reduced customer churn by 25% through improved onboarding experience",
      "Led cross-functional team of 15 engineers, designers, and marketers",
      "Established product metrics framework and improved data-driven decision making"
    ],
    technologies: ["Product Strategy", "Agile/Scrum", "Data Analysis", "User Research", "Stakeholder Management"],
    logo: "/api/placeholder/60/60"
  },
  {
    id: "exp-2",
    company: "StartupXYZ",
    position: "Product Manager",
    period: "2020 - 2022",
    location: "New York, NY",
    description: "Managed product development for AI-powered analytics platform from early-stage to Series A funding.",
    achievements: [
      "Grew user base from 1,000 to 50,000+ active users",
      "Increased user engagement by 300% through feature optimization",
      "Collaborated with engineering team to improve system performance by 60%",
      "Conducted 100+ user interviews to inform product roadmap"
    ],
    technologies: ["Product Discovery", "Growth Hacking", "A/B Testing", "SQL", "Product Analytics"],
    logo: "/api/placeholder/60/60"
  },
  {
    id: "exp-3",
    company: "Digital Solutions Co.",
    position: "Associate Product Manager",
    period: "2018 - 2020",
    location: "Austin, TX",
    description: "Supported product development for mobile banking application with 2M+ downloads.",
    achievements: [
      "Led redesign of mobile app user interface increasing user satisfaction by 35%",
      "Implemented user feedback system reducing support tickets by 20%",
      "Coordinated with UX team to improve accessibility compliance",
      "Managed product backlog and sprint planning for agile development team"
    ],
    technologies: ["Mobile Product Management", "UX Design", "Agile Methodology", "User Testing", "JIRA"],
    logo: "/api/placeholder/60/60"
  }
]