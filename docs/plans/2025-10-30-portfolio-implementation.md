# Portfolio Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a single-page portfolio website showcasing product management expertise with smooth animations and professional design.

**Architecture:** Single-page Next.js application with section-based navigation, smooth scrolling, and Framer Motion animations. Component-based architecture using Shadcn/ui components customized for the portfolio.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui, Framer Motion

---

## Task 1: Project Setup and Dependencies

**Files:**
- Modify: `package.json`
- Create: `components.json` (if missing)
- Modify: `next.config.ts`

**Step 1: Install required animation dependencies**

```bash
pnpm add framer-motion react-intersection-observer lucide-react
```

**Step 2: Install additional UI components**

```bash
pnpm add @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-scroll-area
```

**Step 3: Configure Next.js for optimal performance**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
```

**Step 4: Commit**

```bash
git add package.json next.config.ts
git commit -m "feat: add animation and UI dependencies"
```

---

## Task 2: Component Library Setup

**Files:**
- Create: `src/components/ui/animated-text.tsx`
- Create: `src/components/ui/section-container.tsx`
- Create: `src/components/ui/skill-card.tsx`
- Create: `src/components/ui/project-card.tsx`

**Step 1: Write animated text component**

```typescript
// src/components/ui/animated-text.tsx
'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {text}
    </motion.div>
  )
}
```

**Step 2: Write section container component**

```typescript
// src/components/ui/section-container.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  id?: string
}

export function SectionContainer({ children, className = '', id }: SectionContainerProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`section-padding ${className}`}
      id={id}
    >
      {children}
    </motion.section>
  )
}
```

**Step 3: Write skill card component**

```typescript
// src/components/ui/skill-card.tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SkillCardProps {
  title: string
  description: string
  skills: string[]
  icon?: React.ReactNode
  index: number
}

export function SkillCard({ title, description, skills, icon, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

**Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: create animated UI components"
```

---

## Task 3: Navigation Component

**Files:**
- Create: `src/components/layout/navigation.tsx`
- Create: `src/components/layout/mobile-menu.tsx`

**Step 1: Write navigation component**

```typescript
// src/components/layout/navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            Your Name
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.href.slice(1) ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pt-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/layout/
git commit -m "feat: create animated navigation component"
```

---

## Task 4: Hero Section

**Files:**
- Create: `src/components/sections/hero-section.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Write hero section component**

```typescript
// src/components/sections/hero-section.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/ui/animated-text'
import { ArrowDown, Download } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Product Manager
            </span>
          </h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AnimatedText
            text="Building products that solve real problems and delight users"
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            delay={0.5}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <p className="text-lg max-w-2xl mx-auto">
            Passionate about bridging the gap between user needs and business goals through
            data-driven product development and cross-functional collaboration.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button size="lg" className="group">
            View My Work
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button variant="outline" size="lg">
            Download Resume
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </div>
    </motion.section>
  )
}
```

**Step 2: Update main page**

```typescript
// src/app/page.tsx
import { Navigation } from '@/components/layout/navigation'
import { HeroSection } from '@/components/sections/hero-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
    </main>
  )
}
```

**Step 3: Commit**

```bash
git add src/app/page.tsx src/components/sections/
git commit -m "feat: create hero section with animations"
```

---

## Task 5: About & Skills Section

**Files:**
- Create: `src/components/sections/about-skills-section.tsx`
- Create: `src/data/skills.ts`

**Step 1: Create skills data**

```typescript
// src/data/skills.ts
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
```

**Step 2: Write about and skills section**

```typescript
// src/components/sections/about-skills-section.tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionContainer } from '@/components/ui/section-container'
import { AnimatedText } from '@/components/ui/animated-text'
import { SkillCard } from '@/components/ui/skill-card'
import { skillsData } from '@/data/skills'

export function AboutSkillsSection() {
  return (
    <SectionContainer id="about" className="py-20">
      <div className="container mx-auto px-4">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="About Me"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground mb-4">
              I'm a results-driven Product Manager with X years of experience building products that
              users love and businesses need. I excel at translating complex user needs into clear,
              actionable product requirements.
            </p>
            <p className="text-lg text-muted-foreground">
              My approach combines deep user empathy with analytical rigor, ensuring that every product
              decision is backed by both qualitative insights and quantitative data.
            </p>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <AnimatedText
            text="Core Competencies"
            className="text-2xl md:text-3xl font-bold mb-4"
          />
          <p className="text-muted-foreground">
            A comprehensive toolkit of product management skills and expertise
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((skillCategory, index) => (
            <SkillCard
              key={skillCategory.title}
              title={skillCategory.title}
              description={skillCategory.description}
              skills={skillCategory.skills}
              icon={<span className="text-2xl">{skillCategory.icon}</span>}
              index={index}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
```

**Step 3: Update main page to include section**

```typescript
// src/app/page.tsx
import { Navigation } from '@/components/layout/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSkillsSection } from '@/components/sections/about-skills-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSkillsSection />
    </main>
  )
}
```

**Step 4: Commit**

```bash
git add src/data/ src/components/sections/about-skills-section.tsx src/app/page.tsx
git commit -m "feat: add about and skills section"
```

---

## Task 6: Projects Section

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/components/sections/projects-section.tsx`
- Create: `src/components/ui/project-modal.tsx`

**Step 1: Create projects data**

```typescript
// src/data/projects.ts
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
      { label: "Feature Adoption", value="+60%" },
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
```

**Step 2: Create project modal component**

```typescript
// src/components/ui/project-modal.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, ExternalLink } from 'lucide-react'
import { Project } from '@/data/projects'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-muted-foreground">{project.description}</p>

                {/* Problem Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Problem</h3>
                  <p className="text-muted-foreground">{project.problem}</p>
                </div>

                {/* Solution Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Solution</h3>
                  <p className="text-muted-foreground">{project.solution}</p>
                </div>

                {/* Results Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Results</h3>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {result}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Impact Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {project.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 bg-secondary/50 rounded-lg"
                      >
                        <div className="text-2xl font-bold text-primary mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technologies Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
```

**Step 3: Commit**

```bash
git add src/data/projects.ts src/components/ui/project-modal.tsx
git commit -m "feat: create projects data and modal component"
```

---

## Task 7: Complete Projects Section

**Files:**
- Modify: `src/components/sections/projects-section.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Write projects section component**

```typescript
// src/components/sections/projects-section.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SectionContainer } from '@/components/ui/section-container'
import { AnimatedText } from '@/components/ui/animated-text'
import { ProjectModal } from '@/components/ui/project-modal'
import { projectsData, Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const featuredProjects = projectsData.filter(project => project.featured)

  return (
    <SectionContainer id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="Featured Projects"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of products I've managed from concept to launch,
            delivering measurable business impact and user value.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              onClick={() => openProjectModal(project)}
              className="cursor-pointer"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Key Metrics Preview */}
                    <div className="grid grid-cols-2 gap-2">
                      {project.metrics.slice(0, 2).map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center p-2 bg-primary/10 rounded">
                          <div className="text-sm font-semibold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies Preview */}
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </SectionContainer>
  )
}
```

**Step 2: Update main page**

```typescript
// src/app/page.tsx
import { Navigation } from '@/components/layout/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSkillsSection } from '@/components/sections/about-skills-section'
import { ProjectsSection } from '@/components/sections/projects-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSkillsSection />
      <ProjectsSection />
    </main>
  )
}
```

**Step 3: Commit**

```bash
git add src/components/sections/projects-section.tsx src/app/page.tsx
git commit -m "feat: complete projects section with modal interactions"
```

---

## Task 8: Experience Timeline Section

**Files:**
- Create: `src/data/experience.ts`
- Create: `src/components/sections/experience-section.tsx`

**Step 1: Create experience data**

```typescript
// src/data/experience.ts
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
```

**Step 2: Create experience section component**

```typescript
// src/components/sections/experience-section.tsx
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionContainer } from '@/components/ui/section-container'
import { AnimatedText } from '@/components/ui/animated-text'
import { experienceData } from '@/data/experience'
import { MapPin, Calendar, Briefcase } from 'lucide-react'

export function ExperienceSection() {
  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <SectionContainer id="experience" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="Professional Experience"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey through product management, driving innovation and delivering measurable results.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />

          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              variants={itemVariants}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl">{experience.position}</CardTitle>
                      <div className="text-sm text-muted-foreground font-medium">
                        {experience.period}
                      </div>
                    </div>
                    <CardDescription className="text-lg font-semibold text-primary">
                      {experience.company}
                    </CardDescription>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {experience.location}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{experience.description}</p>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-1">
                        {experience.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-2">Skills Applied</h4>
                      <div className="flex flex-wrap gap-1">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}
```

**Step 3: Update main page**

```typescript
// src/app/page.tsx
import { Navigation } from '@/components/layout/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSkillsSection } from '@/components/sections/about-skills-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ExperienceSection } from '@/components/sections/experience-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSkillsSection />
      <ProjectsSection />
      <ExperienceSection />
    </main>
  )
}
```

**Step 4: Commit**

```bash
git add src/data/experience.ts src/components/sections/experience-section.tsx src/app/page.tsx
git commit -m "feat: add experience timeline section"
```

---

## Task 9: Contact Section and Footer

**Files:**
- Create: `src/components/sections/contact-section.tsx`
- Create: `src/components/layout/footer.tsx`
- Modify: `src/app/globals.css`

**Step 1: Create contact section**

```typescript
// src/components/sections/contact-section.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { SectionContainer } from '@/components/ui/section-container'
import { AnimatedText } from '@/components/ui/animated-text'
import { Mail, Phone, MapPin, Download, Send, Github, Linkedin } from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Handle form submission here
    console.log('Form submitted:', formData)

    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
  }

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: 'Email',
      value: 'your.email@example.com',
      href: 'mailto:your.email@example.com'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#'
    }
  ]

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/yourprofile'
    },
    {
      icon: <Github className="h-5 w-5" />,
      label: 'GitHub',
      href: 'https://github.com/yourprofile'
    }
  ]

  return (
    <SectionContainer id="contact" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="Get In Touch"
            className="text-3xl md:text-4xl font-bold mb-6"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and collaborations.
            Feel free to reach out if you'd like to connect!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                Whether you have a project in mind, want to discuss potential opportunities,
                or just want to chat about product management, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  className="block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="flex items-center p-4">
                      <div className="text-primary mr-4">{info.icon}</div>
                      <div>
                        <div className="font-medium">{info.label}</div>
                        <div className="text-sm text-muted-foreground">{info.value}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Connect Online</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="outline" className="p-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                      {social.icon}
                    </Badge>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" className="w-full group">
                <Download className="mr-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Your message here..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  )
}
```

**Step 2: Create footer component**

```typescript
// src/components/layout/footer.tsx
'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: 'https://linkedin.com/in/yourprofile',
      label: 'LinkedIn'
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: 'https://github.com/yourprofile',
      label: 'GitHub'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: 'mailto:your.email@example.com',
      label: 'Email'
    }
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center md:text-left mb-4 md:mb-0"
          >
            <p className="text-muted-foreground">
              © {currentYear} Your Name. Built with Next.js and ❤️
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
```

**Step 3: Add custom CSS styles**

```css
/* src/app/globals.css - add at the end */

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Section padding */
.section-padding {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--primary));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.8);
}

/* Animation keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Selection styling */
::selection {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

/* Focus styles */
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

**Step 4: Update main page with contact and footer**

```typescript
// src/app/page.tsx
import { Navigation } from '@/components/layout/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSkillsSection } from '@/components/sections/about-skills-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
```

**Step 5: Commit**

```bash
git add src/components/sections/contact-section.tsx src/components/layout/footer.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: add contact section and footer"
```

---

## Task 10: Final Polish and Optimization

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/robots.ts`
- Create: `public/sitemap.xml`
- Modify: `src/app/globals.css`

**Step 1: Update layout with metadata**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Your Name - Product Manager',
    template: '%s | Your Name'
  },
  description: 'Product Manager with expertise in building user-centric products that drive business growth. Specializing in product strategy, user research, and cross-functional collaboration.',
  keywords: ['Product Manager', 'Product Strategy', 'User Research', 'Product Development', 'UX Design', 'Agile'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourwebsite.com',
    title: 'Your Name - Product Manager',
    description: 'Product Manager with expertise in building user-centric products that drive business growth.',
    siteName: 'Your Name - Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Product Manager',
    description: 'Product Manager with expertise in building user-centric products that drive business growth.',
    creator: '@yourtwitter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

**Step 2: Create robots.txt**

```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://yourwebsite.com/sitemap.xml',
  }
}
```

**Step 3: Create sitemap.xml**

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourwebsite.com</loc>
    <lastmod>2025-10-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Step 4: Add loading states and error handling**

```typescript
// src/components/ui/loading-spinner.tsx
'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-primary border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}
```

**Step 5: Test the application**

```bash
pnpm dev
```

**Step 6: Build and verify**

```bash
pnpm build
```

**Step 7: Run type checking**

```bash
pnpm type-check
```

**Step 8: Commit final changes**

```bash
git add .
git commit -m "feat: complete portfolio website implementation"
```

---

## Testing Checklist

1. **Functionality Testing**
   - [ ] Navigation scrolls to correct sections
   - [ ] Mobile menu opens/closes properly
   - [ ] Project modals open and display content
   - [ ] Contact form validates inputs
   - [ ] All animations play smoothly

2. **Responsive Testing**
   - [ ] Mobile (320px - 768px)
   - [ ] Tablet (768px - 1024px)
   - [ ] Desktop (1024px+)
   - [ ] All breakpoints work correctly

3. **Performance Testing**
   - [ ] Page load speed under 3 seconds
   - [ ] Lighthouse score 90+ in all categories
   - [ ] No console errors
   - [ ] Images optimized

4. **Accessibility Testing**
   - [ ] Keyboard navigation works
   - [ ] Screen reader friendly
   - [ ] Color contrast ratios met
   - [ ] Alt text for images

5. **Browser Compatibility**
   - [ ] Chrome/Chromium
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge

## Next Steps

1. **Personalization**: Replace placeholder content with your actual information
2. **Content Creation**: Add your own project details and achievements
3. **Assets**: Add personal photos and company logos
4. **Deployment**: Deploy to Vercel, Netlify, or your preferred hosting platform
5. **Custom Domain**: Set up custom domain if desired
6. **Analytics**: Add Google Analytics or similar tracking
7. **SEO Optimization**: Refine meta tags and structured data

---

**Plan complete and saved to `docs/plans/2025-10-30-portfolio-implementation.md`.**