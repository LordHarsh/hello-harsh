"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      title: "AI/ML Engineer",
      company: "EmendoAI",
      location: "Hyderabad, India",
      period: "Oct. 2024 – Present",
      type: "Full-time",
      description: [
        "Developed a multifunctional AI agent using chain-of-thought methodology, enabling dynamic interaction across cloud services for comprehensive querying, decision-making, and automated task execution.",
        "Optimized serverless architecture using AWS Lambda, RDS Aurora, and Langsmith, reducing system latency by 80% and implementing an automated GitHub Actions evaluation engine for continuous performance tracking."
      ],
      color: "blue"
    },
    {
      title: "AI/ML Intern",
      company: "TrainingMug",
      location: "Hyderabad, India",
      period: "Jul. 2024 – Oct. 2024",
      type: "Internship",
      description: [
        "Deployed face, voice recognition, and plagiarism check models for AI-based interviews.",
        "Built pipelines for generating analysis reports and deployed systems on Azure."
      ],
      color: "purple"
    },
    {
      title: "Research Intern",
      company: "National Institute of Technology Trichy",
      location: "Tiruchirappalli, India",
      period: "May. 2024 – Jul. 2024",
      type: "Research",
      description: [
        "Developed HRNet model for pose estimation to monitor infant motor skill development using the FiDIP methodology.",
        "Created workflow to estimate movement of children using predicted key-points of individual frames."
      ],
      color: "cyan"
    },
    {
      title: "Technical Lead",
      company: "Alexa Developers SRM",
      location: "Chennai, India",
      period: "Nov. 2022 – Present",
      type: "Leadership",
      description: [
        "Developed event management service with Express and trigger.dev, automating registration and communication.",
        "Built club website using Next.js and Sanity, creating interactive user experience with modern animations.",
        "Contributed to AlexaTree open-source project through API documentation and team technical mentorship."
      ],
      color: "green"
    },
    {
      title: "Vice-President",
      company: "Data Science Community SRM",
      location: "Chennai, India",
      period: "Nov 2022 – Present",
      type: "Leadership",
      description: [
        "Implemented ML models using random forest algorithm resulting in a 40% increase in performance compared to previous LSTM-based approach for AI Chrome extension for validation of links."
      ],
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/20",
        border: "border-blue-400/30",
        hover: "hover:bg-blue-500/30",
        icon: "text-blue-400",
        accent: "bg-blue-500/10"
      },
      purple: {
        bg: "bg-purple-500/20",
        border: "border-purple-400/30",
        hover: "hover:bg-purple-500/30",
        icon: "text-purple-400",
        accent: "bg-purple-500/10"
      },
      cyan: {
        bg: "bg-cyan-500/20",
        border: "border-cyan-400/30",
        hover: "hover:bg-cyan-500/30",
        icon: "text-cyan-400",
        accent: "bg-cyan-500/10"
      },
      green: {
        bg: "bg-green-500/20",
        border: "border-green-400/30",
        hover: "hover:bg-green-500/30",
        icon: "text-green-400",
        accent: "bg-green-500/10"
      },
      orange: {
        bg: "bg-orange-500/20",
        border: "border-orange-400/30",
        hover: "hover:bg-orange-500/30",
        icon: "text-orange-400",
        accent: "bg-orange-500/10"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
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
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            My professional journey through various roles in AI/ML, software development, 
            and technical leadership positions.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const colors = getColorClasses(exp.color);
              
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
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-4 border-background hidden md:block animate-pulse" />
                  
                  <motion.div
                    className="glass-hover md:ml-16 rounded-2xl p-6 group"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Briefcase className={`w-5 h-5 ${colors.icon}`} />
                          <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${colors.bg} ${colors.border} border`}>
                            {exp.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <p className={`font-semibold ${colors.icon}`}>{exp.company}</p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {exp.description.map((desc, descIndex) => (
                        <motion.div
                          key={descIndex}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            delay: (index * 0.1) + (descIndex * 0.1),
                          }}
                          viewport={{ once: true }}
                          className="flex items-start gap-3"
                        >
                          <div className={`w-2 h-2 rounded-full ${colors.accent} mt-2 flex-shrink-0`} />
                          <p className="text-muted-foreground leading-relaxed">{desc}</p>
                        </motion.div>
                      ))}
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