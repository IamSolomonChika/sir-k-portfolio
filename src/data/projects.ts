export interface Project {
  id: string
  title: string
  description: string
  problem: string
  solution: string
  results: string[]
  technologies: string[]
  metrics: {
    label: string
    value: string
  }[]
  image?: string
  featured: boolean
}

export const projectsData: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform Redesign",
    description: "Led complete redesign of e-commerce platform resulting in improved user experience and increased conversions",
    problem: "Users struggled with complex checkout process and high cart abandonment rates",
    solution: "Redesigned user flow, implemented one-click checkout, and optimized mobile experience",
    results: [
      "Increased conversion rate by 35%",
      "Reduced cart abandonment by 50%",
      "Improved user satisfaction score by 40%"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
    metrics: [
      { label: "Conversion Rate", value: "+35%" },
      { label: "User Retention", value: "+25%" },
      { label: "Revenue Growth", value: "+40%" }
    ],
    featured: true
  },
  {
    id: "project-2",
    title: "SaaS Analytics Dashboard",
    description: "Developed comprehensive analytics platform for SaaS customers to track usage and optimize performance",
    problem: "Customers lacked visibility into product usage and ROI metrics",
    solution: "Built real-time dashboard with customizable reports and automated insights",
    results: [
      "Reduced customer support tickets by 30%",
      "Increased customer engagement by 45%",
      "Improved customer retention by 20%"
    ],
    technologies: ["Python", "React", "PostgreSQL", "Redis", "Docker"],
    metrics: [
      { label: "Customer Satisfaction", value: "+30%" },
      { label: "Feature Adoption", value: "+60%" },
      { label: "Support Efficiency", value: "+40%" }
    ],
    featured: true
  },
  {
    id: "project-3",
    title: "Mobile App Onboarding Optimization",
    description: "Revamped mobile app onboarding experience to improve user activation and retention",
    problem: "80% of users dropped off during initial onboarding process",
    solution: "Implemented progressive onboarding with contextual tips and gamification elements",
    results: [
      "Reduced onboarding dropout by 60%",
      "Increased user activation by 70%",
      "Improved 7-day retention by 45%"
    ],
    technologies: ["React Native", "Firebase", "Analytics", "A/B Testing"],
    metrics: [
      { label: "Activation Rate", value: "+70%" },
      { label: "Time to Value", value: "-50%" },
      { label: "User Retention", value: "+45%" }
    ],
    featured: true
  }
]