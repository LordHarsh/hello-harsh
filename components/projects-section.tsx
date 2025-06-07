"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Zap, Database, Brain } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "News Insights: Geo-Temporal Keyword Analysis",
      description: "Engineered ML-driven news analysis pipeline using OCR, NLP, and Named Entity Recognition to extract and visualize geo-temporal trends from digital newspapers.",
      longDescription: "Developed full-stack web application with React and FastAPI to enable interactive geospatial data exploration of automated news insights.",
      technologies: ["PyTorch", "Next.js", "Appwrite", "NLP", "OCR", "FastAPI"],
      github: "https://github.com/LordHarsh/news-bug",
      demo: "#",
      icon: Brain,
      color: "blue",
      featured: true
    },
    {
      title: "Neural Style Transfer",
      description: "Created Python library for style transfer on videos by extracting frames from video and applying style transfer using pre-trained models.",
      longDescription: "Used pre-trained model from TF Hub based on Fast Style Transfer algorithm by Gatys et al. in 2016 for real-time video processing.",
      technologies: ["Python", "TensorFlow", "Computer Vision", "Deep Learning"],
      github: "https://github.com/LordHarsh/Neural-Style-Transfer",
      demo: "#",
      icon: Zap,
      color: "purple",
      featured: true
    },
    {
      title: "Armando IOT",
      description: "Developed backend systems for home automation using MongoDB to store user data, appliance details, and user preferences.",
      longDescription: "Integrated LLM for controlling devices through natural conversation and implemented facial recognition tool to automate devices based on user preferences.",
      technologies: ["TypeScript", "Node.js", "Express", "MongoDB", "LLM", "Computer Vision"],
      github: "https://github.com/LordHarsh/armando-iot-backend",
      demo: "#",
      icon: Database,
      color: "green",
      featured: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-400/30",
        hover: "hover:bg-blue-500/20",
        icon: "text-blue-400",
        accent: "from-blue-500 to-cyan-500"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-400/30",
        hover: "hover:bg-purple-500/20",
        icon: "text-purple-400",
        accent: "from-purple-500 to-pink-500"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-400/30",
        hover: "hover:bg-green-500/20",
        icon: "text-green-400",
        accent: "from-green-500 to-emerald-500"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 right-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A showcase of my technical projects spanning AI/ML, full-stack development, 
            and innovative solutions that demonstrate my expertise and passion for technology.
          </p>
        </motion.div>

        <div className="grid gap-8">
          {/* Featured Projects */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {projects.filter(project => project.featured).map((project, index) => {
              const colors = getColorClasses(project.color);
              const IconComponent = project.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="glass-hover rounded-3xl p-8 h-full flex flex-col"
                    whileHover={{ 
                      scale: 1.02, 
                      y: -8,
                      rotateY: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border group-hover:${colors.hover} transition-colors`}>
                        <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                      <div className="flex gap-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-hover p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-5 h-5 text-white" />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-hover p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.a>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient-blue transition-all duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed flex-grow">
                      {project.longDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className={`px-3 py-1 text-xs rounded-full ${colors.bg} ${colors.border} border ${colors.hover} transition-colors`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Animated border gradient */}
                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${colors.accent} p-[1px]`}>
                      <div className="w-full h-full rounded-3xl bg-background/95" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Regular Projects */}
          <div className="grid md:grid-cols-1 gap-6">
            {projects.filter(project => !project.featured).map((project, index) => {
              const colors = getColorClasses(project.color);
              const IconComponent = project.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <motion.div
                    className="glass-hover rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6"
                    whileHover={{ scale: 1.01, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`p-4 rounded-xl ${colors.bg} ${colors.border} border group-hover:${colors.hover} transition-colors flex-shrink-0`}>
                      <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-blue transition-all duration-300">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            {project.description}
                          </p>
                          <p className="text-sm text-muted-foreground/80">
                            {project.longDescription}
                          </p>
                        </div>
                        
                        <div className="flex gap-3 mt-4 md:mt-0 flex-shrink-0">
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-hover p-2 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Github className="w-4 h-4 text-white" />
                          </motion.a>
                          <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-hover p-2 rounded-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-4 h-4 text-white" />
                          </motion.a>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className={`px-2 py-1 text-xs rounded-full ${colors.bg} ${colors.border} border ${colors.hover} transition-colors`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 