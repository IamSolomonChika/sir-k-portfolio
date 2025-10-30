'use client'

import { motion } from 'framer-motion'
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
              I&apos;m a results-driven Product Manager with X years of experience building products that
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