'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
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
                <DialogTitle className="text-2xl">{project.title}</DialogTitle>
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