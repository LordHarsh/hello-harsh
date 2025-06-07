"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import ResumeDownload from "./resume-download";

export default function AboutSection() {
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

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-40 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
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
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Passionate AI/ML Engineer and Full Stack Developer with expertise in building 
            intelligent systems and scalable web applications. Currently pursuing Computer 
            Science Engineering with a focus on cutting-edge technologies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Education Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold text-gradient-blue">Education</h3>
            </div>

            <motion.div
              className="glass-hover rounded-2xl p-6 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Bachelor of Technology in Computer Science and Engineering
                  </h4>
                  <p className="text-blue-400 font-semibold mb-2">
                    SRM Institute of Science and Technology
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Sep 2022 – May 2026
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Chennai, India
                    </div>
                  </div>
                </div>
                <div className="glass rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-gradient-blue">8.8</div>
                  <div className="text-xs text-muted-foreground">CGPA</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Resume Download Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CV</span>
              </div>
              <h3 className="text-2xl font-bold text-gradient-blue">Resume</h3>
            </div>
            <ResumeDownload />
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-bold text-gradient-blue mb-8">Technical Skills</h3>
            
            <div className="space-y-6">
              <motion.div
                className="glass-hover rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "TypeScript", "Java", "C/C++", "HTML/CSS", "MATLAB"].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20 hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="glass-hover rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">AI/ML & Data Science</h4>
                <div className="flex flex-wrap gap-2">
                  {["TensorFlow", "MLFlow", "ZenML", "Numpy", "Pandas", "Data Analysis", "Model Development", "MLOPs"].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-blue-500/20 rounded-full text-sm border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="glass-hover rounded-2xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="text-lg font-semibold text-white mb-4">Software Development</h4>
                <div className="flex flex-wrap gap-2">
                  {["NodeJs", "Express", "React", "NextJs", "SpringBoot", "FastAPI", "Flask", "Django", "MongoDB", "SQL", "Redis", "Docker", "AWS", "Azure"].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-sm border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 