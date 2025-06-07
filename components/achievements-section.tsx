"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star, Calendar, MapPin } from "lucide-react";

export default function AchievementsSection() {
  const achievements = [
    {
      title: "1st Place in CodeFest Hackathon",
      subtitle: "AuthentiCheck Interview System",
      organization: "SRM Technologies",
      location: "SRMIST",
      date: "September 2023",
      description: "Developed an innovative authentication system for interviews, showcasing technical excellence and problem-solving skills.",
      icon: Trophy,
      color: "gold",
      rank: "1st"
    },
    {
      title: "1st Place in DigiZest Hackathon",
      subtitle: "Armando IOT Project",
      organization: "SRMIST",
      location: "SRMIST",
      date: "February 2024",
      description: "Created an advanced IoT automation system with LLM integration and facial recognition capabilities.",
      icon: Award,
      color: "gold",
      rank: "1st"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      gold: {
        bg: "bg-yellow-500/10",
        border: "border-yellow-400/30",
        hover: "hover:bg-yellow-500/20",
        icon: "text-yellow-400",
        accent: "from-yellow-500 to-orange-500",
        glow: "shadow-yellow-500/20"
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-32 left-16 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-16 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
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
            Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Recognition and awards that showcase my technical expertise, 
            innovation, and competitive programming capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const colors = getColorClasses(achievement.color);
            const IconComponent = achievement.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="group perspective-1000"
              >
                <motion.div
                  className={`glass-hover rounded-3xl p-8 relative overflow-hidden h-full`}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -12,
                    rotateX: 5,
                    rotateY: -5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rank badge */}
                  <div className="absolute top-6 right-6">
                    <motion.div
                      className={`${colors.bg} ${colors.border} border-2 rounded-2xl px-4 py-2 flex items-center gap-2 animate-glow`}
                      animate={{ 
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Star className={`w-4 h-4 ${colors.icon} fill-current`} />
                      <span className={`text-sm font-bold ${colors.icon}`}>
                        {achievement.rank} Place
                      </span>
                    </motion.div>
                  </div>

                  {/* Main content */}
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      className={`p-4 rounded-2xl ${colors.bg} ${colors.border} border-2 group-hover:${colors.hover} transition-all duration-300`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={`w-10 h-10 ${colors.icon}`} />
                    </motion.div>

                    <div className="flex-1 pt-2">
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-2 group-hover:text-gradient-blue transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        {achievement.title}
                      </motion.h3>
                      
                      <motion.p 
                        className={`text-lg font-semibold ${colors.icon} mb-3`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {achievement.subtitle}
                      </motion.p>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                          <Award className="w-4 h-4" />
                          {achievement.organization}
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                          <MapPin className="w-4 h-4" />
                          {achievement.location}
                        </motion.div>
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                        >
                          <Calendar className="w-4 h-4" />
                          {achievement.date}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <motion.p 
                    className="text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {achievement.description}
                  </motion.p>

                  {/* Animated border gradient */}
                  <motion.div 
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${colors.accent} p-[2px]`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-3xl bg-background/95" />
                  </motion.div>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 ${colors.bg} rounded-full opacity-0 group-hover:opacity-100`}
                        style={{
                          left: `${20 + i * 12}%`,
                          top: `${30 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional stats or highlights can go here */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          {/* <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Competition Success Rate
            </h3>
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-blue mb-2">2</div>
                <div className="text-sm text-muted-foreground">Hackathons Won</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-blue mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient-blue mb-2">1st</div>
                <div className="text-sm text-muted-foreground">Average Position</div>
              </div>
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
} 