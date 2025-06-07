"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-8 md:p-12 animate-float"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient-blue"
          >
            Harsh Kumar Banka
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            <span className="text-gradient">AI/ML Engineer</span> & 
            <span className="text-gradient"> Full Stack Developer</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Chennai, India
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              7275059321
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              hb8088@srmist.edu.in
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-6"
          >
            <motion.a
              href="https://linkedin.com/in/harsh-banka"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-hover p-3 rounded-xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://github.com/LordHarsh"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-hover p-3 rounded-xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6 text-white group-hover:text-gray-300 transition-colors" />
            </motion.a>
            <motion.a
              href="https://harshbanka.codes"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-hover p-3 rounded-xl group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 