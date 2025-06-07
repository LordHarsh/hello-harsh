"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin,  Send, MessageCircle, CheckCircle, AlertCircle, LucideIcon } from "lucide-react";

type ContactColor = 'blue' | 'green' | 'purple' | 'white' | 'cyan';

interface ContactMethod {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  color: ContactColor;
}

interface SocialLink {
  icon: LucideIcon;
  label: string;
  href: string;
  color: ContactColor;
}

export default function ContactSection() {
  // Form state management
  const [status, setStatus] = useState<{
    submitted: boolean;
    submitting: boolean;
    info: { error: boolean; msg: string | null };
  }>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Auto-dismiss success toast after 5 seconds
  useEffect(() => {
    if (status.submitted && !status.info.error) {
      const timer = setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          submitted: false,
          info: { error: false, msg: null }
        }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status.submitted, status.info.error]);

  const contactMethods: ContactMethod[] = [
    {
      icon: Mail,
      label: "Email",
      value: "hb8088@srmist.edu.in",
      href: "mailto:hb8088@srmist.edu.in",
      color: "blue"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7275059321",
      href: "tel:+917275059321",
      color: "green"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, India",
      href: "#",
      color: "purple"
    }
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/harsh-banka",
      color: "blue"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/LordHarsh",
      color: "white"
    },
  ];

  const getColorClasses = (color: ContactColor) => {
    const colors = {
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-400/30",
        hover: "hover:bg-blue-500/20",
        icon: "text-blue-400",
        accent: "from-blue-500 to-cyan-500"
      },
      green: {
        bg: "bg-green-500/10",
        border: "border-green-400/30",
        hover: "hover:bg-green-500/20",
        icon: "text-green-400",
        accent: "from-green-500 to-emerald-500"
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-400/30",
        hover: "hover:bg-purple-500/20",
        icon: "text-purple-400",
        accent: "from-purple-500 to-pink-500"
      },
      white: {
        bg: "bg-white/10",
        border: "border-white/30",
        hover: "hover:bg-white/20",
        icon: "text-white",
        accent: "from-white to-gray-300"
      },
      cyan: {
        bg: "bg-cyan-500/10",
        border: "border-cyan-400/30",
        hover: "hover:bg-cyan-500/20",
        icon: "text-cyan-400",
        accent: "from-cyan-500 to-blue-500"
      }
    };
    return colors[color];
  };

  // Form handling functions
  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        name: '',
        email: '',
        message: '',
      });
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: msg },
      });
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      const response = await fetch('https://formspree.io/f/mzzgdooy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        handleServerResponse(
          true,
          'I\'ll get back to you soon! Thanks for reaching out.',
        );
      } else {
        handleServerResponse(false, 'Oops! There was a problem submitting your form. Please try again.');
      }
    } catch {
      handleServerResponse(false, 'Network error. Please check your connection and try again.');
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 18,
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
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m always open to discussing new opportunities, collaborations,
            or just having a conversation about technology and innovation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gradient-blue mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const colors = getColorClasses(method.color);
                  const IconComponent = method.icon;

                  return (
                    <motion.a
                      key={index}
                      href={method.href}
                      className="glass-hover rounded-2xl p-6 flex items-center gap-4 group block"
                      whileHover={{ scale: 1.02, x: 10 }}
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border group-hover:${colors.hover} transition-colors`}>
                        <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-1">{method.label}</p>
                        <p className="text-muted-foreground group-hover:text-white transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const colors = getColorClasses(social.color);
                  const IconComponent = social.icon;

                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`glass-hover p-4 rounded-xl group ${colors.hover} transition-all duration-300`}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <IconComponent className={`w-6 h-6 ${colors.icon} group-hover:scale-110 transition-transform`} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold text-white">Send a Message</h3>
            </div>

            <form onSubmit={handleOnSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="Your Name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-white mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  value={inputs.message}
                  onChange={handleOnChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={status.submitting || status.submitted}
                className={`w-full font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group relative overflow-hidden ${status.submitting
                    ? 'bg-gray-500 cursor-not-allowed'
                    : status.submitted
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                  } text-white`}
                whileHover={!status.submitting && !status.submitted ? {
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                } : {}}
                whileTap={!status.submitting && !status.submitted ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Button background animation */}
                {!status.submitting && !status.submitted && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                )}

                <div className="relative z-10 flex items-center justify-center gap-2">
                  {status.submitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : status.submitted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </motion.div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </motion.button>

              {/* In-form Error Messages */}
              {status.info.error && status.info.msg && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="glass-hover p-4 rounded-xl flex items-center gap-3 border border-red-500/30 bg-red-500/10"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <p className="text-sm text-red-300">{status.info.msg}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Success Toast Notification */}
        {status.submitted && status.info.msg && !status.info.error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 50 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: [0, -1, 1, -1, 0]
            }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              rotate: {
                duration: 0.6,
                ease: "easeInOut"
              }
            }}
            className="fixed top-8 right-8 z-50 max-w-md"
          >
            <div className="glass-hover rounded-2xl p-6 border border-green-400/30 bg-green-500/10 backdrop-blur-lg shadow-2xl">
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="flex-shrink-0"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <motion.h4
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-bold text-white mb-1"
                  >
                    Message Sent Successfully!
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-green-300"
                  >
                    {status.info.msg}
                  </motion.p>
                </div>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setStatus(prev => ({
                    ...prev,
                    submitted: false,
                    info: { error: false, msg: null }
                  }))}
                  className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors text-green-300 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Celebration particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.random() * 200 - 100,
                      y: Math.random() * 200 - 100,
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl p-6">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Harsh Kumar Banka. Built with{" "}
              <span className="text-gradient">Next.js</span>,{" "}
              <span className="text-gradient">TypeScript</span>, and{" "}
              <span className="text-gradient">Tailwind CSS</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}