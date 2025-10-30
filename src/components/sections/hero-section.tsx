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