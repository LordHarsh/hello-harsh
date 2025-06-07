"use client";

import { motion } from "framer-motion";
import { Code, Brain, Server, LucideIcon } from "lucide-react";

type SkillColor = 'white' | 'blue' | 'purple';

interface SkillCategory {
  icon: LucideIcon;
  title: string;
  color: SkillColor;
  skills: string[];
}

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillCategories: SkillCategory[] = [
    {
      icon: Code,
      title: "Languages",
      color: "white",
      skills: ["Python", "JavaScript", "TypeScript", "Java", "C/C++", "HTML/CSS", "MATLAB"]
    },
    {
      icon: Brain,
      title: "AI/ML & Data Science",
      color: "blue",
      skills: ["TensorFlow", "MLFlow", "ZenML", "Numpy", "Pandas", "Data Analysis", "Model Development", "MLOPs"]
    },
    {
      icon: Server,
      title: "Software Development",
      color: "purple",
      skills: ["NodeJs", "Express", "React", "NextJs", "SpringBoot", "FastAPI", "Flask", "Django", "MongoDB", "SQL", "Redis", "Docker", "AWS", "Azure"]
    }
  ];

  const getSkillStyles = (color: SkillColor) => {
    const styles = {
      white: {
        bg: "bg-white/10",
        border: "border-white/20",
        hover: "hover:bg-white/20"
      },
      blue: {
        bg: "bg-blue-500/20",
        border: "border-blue-400/30",
        hover: "hover:bg-blue-500/30"
      },
      purple: {
        bg: "bg-purple-500/20",
        border: "border-purple-400/30",
        hover: "hover:bg-purple-500/30"
      }
    };
    return styles[color];
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 left-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Technical Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise spanning multiple domains
            including AI/ML, software development, and various programming languages.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left Column */}
          <div className="space-y-8">
            {skillCategories.slice(0, 2).map((category) => {
              const IconComponent = category.icon;
              const styles = getSkillStyles(category.color);
              
              return (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className="glass-hover rounded-2xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className={`w-6 h-6 ${
                      category.color === 'white' ? 'text-white' : 
                      category.color === 'blue' ? 'text-blue-400' : 
                      'text-purple-400'
                    }`} />
                    <h4 className="text-lg font-semibold text-white">{category.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-1 ${styles.bg} rounded-full text-sm border ${styles.border} ${styles.hover} transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: skillIndex * 0.05 
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {skillCategories.slice(2).map((category) => {
              const IconComponent = category.icon;
              const styles = getSkillStyles(category.color);
              
              return (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className="glass-hover rounded-2xl p-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className={`w-6 h-6 ${
                      category.color === 'white' ? 'text-white' : 
                      category.color === 'blue' ? 'text-blue-400' : 
                      'text-purple-400'
                    }`} />
                    <h4 className="text-lg font-semibold text-white">{category.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className={`px-3 py-1 ${styles.bg} rounded-full text-sm border ${styles.border} ${styles.hover} transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: skillIndex * 0.05 
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}

          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-gradient-blue mb-2">7+</div>
                <div className="text-muted-foreground">Programming Languages</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-gradient-blue mb-2">8+</div>
                <div className="text-muted-foreground">AI/ML Technologies</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-gradient-blue mb-2">14+</div>
                <div className="text-muted-foreground">Development Tools</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}