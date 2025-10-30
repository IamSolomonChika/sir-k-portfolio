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