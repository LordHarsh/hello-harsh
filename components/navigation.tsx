"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Home, User, Briefcase, Code2, Trophy, Mail } from "lucide-react";

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > (previous ?? 0) && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Experience", href: "#experience" },
    { icon: Code2, label: "Projects", href: "#projects" },
    { icon: Trophy, label: "Achievements", href: "#achievements" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-130%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 mx-auto z-50 w-fit"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="glass rounded-full px-6 py-3 flex items-center gap-2"
      >
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          
          return (
            <motion.button
              key={index}
              onClick={() => scrollToSection(item.href)}
              className="relative p-3 rounded-full transition-all duration-300 group hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: 1.2 + (index * 0.1),
                type: "spring",
                stiffness: 200
              }}
            >
              <IconComponent className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              
              {/* Tooltip */}
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
              >
                {item.label}
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.nav>
  );
} 