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
