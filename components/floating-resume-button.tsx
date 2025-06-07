"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Download, FileText, X, Sparkles } from "lucide-react";

export default function FloatingResumeButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling past the hero section
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/Harsh_Kumar_Banka_Resume.pdf';
      link.download = 'Harsh_Kumar_Banka_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsDownloading(false);
      setIsExpanded(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0, x: 100 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            {/* Main button */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="glass-hover w-16 h-16 rounded-full flex items-center justify-center group relative overflow-hidden"
              whileTap={{ scale: 0.95 }}
              layout
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
                animate={{
                  background: [
                    "radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                    "radial-gradient(circle, rgba(147, 51, 234, 0.2), rgba(6, 182, 212, 0.2))",
                    "radial-gradient(circle, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Icon */}
              <motion.div
                animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <FileText className="w-6 h-6 text-white" />
                )}
              </motion.div>

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Sparkles */}
              <AnimatePresence>
                {!isExpanded && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [0, (i === 0 ? -30 : i === 1 ? 30 : 0)],
                          y: [0, (i === 2 ? -30 : 10)]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                        className="absolute top-1/2 left-1/2 pointer-events-none"
                      >
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Expanded menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  className="absolute bottom-20 right-0 glass rounded-2xl p-4 min-w-[280px]"
                >
                  <div className="text-white mb-4">
                    <h3 className="font-bold text-lg mb-1">Download Resume</h3>
                    <p className="text-sm text-muted-foreground">
                      Get my latest professional resume
                    </p>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={isDownloading ? { rotate: 360 } : {}}
                        transition={{ duration: 1, repeat: isDownloading ? Infinity : 0 }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.div>
                      {isDownloading ? 'Downloading...' : 'Download PDF'}

                      {/* Progress bar */}
                      <AnimatePresence>
                        {isDownloading && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute bottom-0 left-0 h-1 bg-yellow-400 origin-left"
                          />
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <div className="flex justify-between text-xs text-muted-foreground pt-2">
                      <span>Format: PDF</span>
                      <span>Size: 2.3 MB</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tooltip */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  className="absolute right-20 top-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none"
                  transition={{ delay: 1 }}
                >
                  Download Resume
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/80 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 