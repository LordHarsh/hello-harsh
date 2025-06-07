"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Download, FileText, Eye, Sparkles, Star, Zap, CheckCircle } from "lucide-react";

export default function ResumeDownload() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      
      // Create download link
      const link = document.createElement('a');
      link.href = '/Harsh_Kumar_Banka_Resume.pdf';
      link.download = 'Harsh_Kumar_Banka_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset after animation
      setTimeout(() => setDownloadComplete(false), 2000);
    }, 1500);
  };

  const handlePreview = () => {
    window.open('/Harsh_Kumar_Banka_Resume.pdf', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating sparkles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 50 : -50)],
                  y: [0, -30 - (i * 10)]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main download card */}
      <motion.div
        className="glass-hover rounded-3xl p-8 relative overflow-hidden group"
        whileHover={{ 
          scale: 1.02,
          rotateY: 5,
          rotateX: 2,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl"
          animate={isHovered ? {
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))",
              "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))",
              "linear-gradient(225deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
              "linear-gradient(315deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(6, 182, 212, 0.1))"
            ]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FileText className="w-8 h-8 text-blue-400" />
              
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-blue-400/50"
                animate={isHovered ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <div>
              <motion.h3
                className="text-2xl font-bold text-white mb-2"
                animate={isHovered ? { x: [0, 5, 0] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Resume / CV
              </motion.h3>
              <p className="text-muted-foreground">
                Download my professional resume
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            {/* Download button */}
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 relative overflow-hidden group/btn disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              <div className="relative z-10 flex items-center gap-3">
                <AnimatePresence mode="wait">
                  {downloadComplete ? (
                    <motion.div
                      key="complete"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Downloaded!
                    </motion.div>
                  ) : isDownloading ? (
                    <motion.div
                      key="downloading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                      Downloading...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="download"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                      Download
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <AnimatePresence>
                {isDownloading && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute bottom-0 left-0 h-1 bg-yellow-400 origin-left"
                  />
                )}
              </AnimatePresence>
            </motion.button>

            {/* Preview button */}
            <motion.button
              onClick={handlePreview}
              className="glass-hover p-4 rounded-2xl group/preview"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5 text-white group-hover/preview:text-cyan-400 transition-colors" />
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 flex justify-between text-sm text-muted-foreground"
          >
            <span>Format: PDF</span>
            <span>Size: 2.3 MB</span>
            <span>Updated: Dec 2024</span>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-4 right-4 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 text-yellow-400" />
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-4 opacity-20"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-purple-400" />
        </motion.div>

        {/* Hover border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent"
          animate={isHovered ? {
            borderImage: [
              "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6) 1",
              "linear-gradient(135deg, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6) 1",
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
} 