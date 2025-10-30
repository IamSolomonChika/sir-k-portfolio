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
