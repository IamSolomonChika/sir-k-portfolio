export interface SkillCategory {
  title: string
  description: string
  skills: string[]
  icon: string
}

export const skillsData: SkillCategory[] = [
  {
    title: "Product Strategy",
    description: "Strategic planning and product roadmap development",
    skills: ["Market Research", "Competitive Analysis", "Roadmapping", "KPI Definition", "Product Vision"],
    icon: "📊"
  },
  {
    title: "Design & UX",
    description: "User-centered design and experience optimization",
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"],
    icon: "🎨"
  },
  {
    title: "Technical Skills",
    description: "Technical understanding and collaboration",
    skills: ["API Integration", "Database Design", "Cloud Services", "Agile/Scrum", "Technical Documentation"],
    icon: "💻"
  },
  {
    title: "Analytics & Data",
    description: "Data-driven decision making and analysis",
    skills: ["A/B Testing", "Data Analysis", "User Analytics", "Growth Metrics", "Performance Tracking"],
    icon: "📈"
  }
]