// app/components/UnifiedFloatingButton.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, X, Minimize2, Maximize2, FileText, Download, Sparkles } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    processingTime?: number;
}

interface ChatResponse {
    response: string;
    processingTime: number;
    timestamp: number;
    error?: string;
}

const QUICK_QUESTIONS = [
    "What projects have you built?",
    "What technologies do you work with?",
    "Tell me about your experience",
    "How can we work together?",
    "What's your development process?"
];

export default function UnifiedFloatingButton() {
    // Button visibility and animations
    const [isVisible, setIsVisible] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(0); // 0 = chat, 1 = resume

    // Chat functionality
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "👋 Hi there! I'm here to help you learn about my professional background, projects, and experience. You can also download my resume anytime! What would you like to know?",
            timestamp: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Resume functionality
    const [isDownloading, setIsDownloading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Show button after scrolling
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Icon sliding animation
    useEffect(() => {
        if (!isChatOpen) {
            const interval = setInterval(() => {
                setCurrentIcon(prev => (prev + 1) % 2);
            }, 3000); // Switch every 3 seconds

            return () => clearInterval(interval);
        }
    }, [isChatOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isChatOpen && !isMinimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isChatOpen, isMinimized]);

    // Chat functions
    const sendMessage = async (messageText: string = input) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText.trim(),
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const conversationHistory = messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: messageText.trim(),
                    conversationHistory
                }),
            });

            const data: ChatResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: data.timestamp,
                processingTime: data.processingTime
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Error sending message:', error);
            setError(error instanceof Error ? error.message : 'Failed to send message');

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "I'm having trouble responding right now. Please try again in a moment! 🔄",
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    const handleQuickQuestion = (question: string) => {
        sendMessage(question);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Resume download function
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
        }, 1000);
    };

    const icons = [
        { component: Bot, label: "Chat" },
        { component: FileText, label: "Resume" }
    ];

    return (
        <>
            {/* Unified Floating Button */}
            <AnimatePresence>
                {isVisible && !isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0, x: 100 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0, x: 100 }}
                        className="fixed bottom-6 left-6 z-50"
                    >
                        <motion.button
                            onClick={toggleChat}
                            className="relative w-16 h-16 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-white/20 hover:shadow-purple-500/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                animation: 'float 6s ease-in-out infinite'
                            }}
                        >
                            {/* Animated background gradient */}
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                animate={{
                                    background: [
                                        "radial-gradient(circle, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))",
                                        "radial-gradient(circle, rgba(147, 51, 234, 0.2), rgba(6, 182, 212, 0.2))",
                                        "radial-gradient(circle, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))"
                                    ]
                                }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />

                            {/* Sliding Icons */}
                            <div className="relative flex items-center justify-center w-full h-full">
                                <AnimatePresence mode="wait">
                                    {icons.map((icon, index) => (
                                        currentIcon === index && (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className="absolute"
                                            >
                                                <icon.component className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                                            </motion.div>
                                        )
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pulse effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-purple-400/50"
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            {/* Notification dot */}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                                <motion.div
                                    className="w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>

                            {/* Sparkles */}
                            <AnimatePresence>
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0],
                                            x: [0, (i === 0 ? -35 : i === 1 ? 35 : 0)],
                                            y: [0, (i === 2 ? -35 : 15)]
                                        }}
                                        transition={{
                                            duration: 3,
                                            delay: i * 0.5,
                                            repeat: Infinity,
                                            repeatDelay: 3
                                        }}
                                        className="absolute top-1/2 left-1/2 pointer-events-none"
                                    >
                                        <Sparkles className="w-3 h-3 text-yellow-400" />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.button>

                        {/* Floating label */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                            className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none"
                        >
                            <div className="bg-black/80 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={currentIcon}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {currentIcon === 0 ? "Chat with AI" : "Download Resume"}
                                    </motion.span>
                                </AnimatePresence>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/80 rotate-45" />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Chat Window with Resume Download */}
            {isChatOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -50 }}
                    className={`fixed bottom-6 mx-4 sm:left-6 z-50 sm:w-[400px] lg:w-[450px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 ${isMinimized ? 'h-16' : 'h-[90vh] max-h-[600px]'
                        } flex flex-col`}
                    style={{
                        animation: 'float 6s ease-in-out infinite 2s'
                    }}
                >
                    {/* Header with Resume Download */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-lg animate-pulse" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
                                    Portfolio Assistant
                                </h3>
                                {!isMinimized && (
                                    <p className="text-xs text-white/70">Ask about projects • Download resume</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Resume Download Button */}
                            {!isMinimized && (
                                <motion.button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="p-2 rounded-lg bg-gradient-to-r from-purple-500/80 to-blue-500/80 hover:from-purple-600/80 hover:to-blue-600/80 transition-all duration-200 disabled:opacity-50"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    title="Download Resume"
                                >
                                    <motion.div
                                        animate={isDownloading ? { rotate: 360 } : {}}
                                        transition={{ duration: 1, repeat: isDownloading ? Infinity : 0 }}
                                    >
                                        <Download className="w-4 h-4 text-white" />
                                    </motion.div>
                                </motion.button>
                            )}

                            <button
                                onClick={toggleMinimize}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                            >
                                {isMinimized ? (
                                    <Maximize2 className="w-4 h-4 text-white/70 hover:text-white" />
                                ) : (
                                    <Minimize2 className="w-4 h-4 text-white/70 hover:text-white" />
                                )}
                            </button>
                            <button
                                onClick={toggleChat}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                            >
                                <X className="w-4 h-4 text-white/70 hover:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Chat Content - Only show when not minimized */}
                    {!isMinimized && (
                        <>
                            {/* Quick Questions + Resume Download */}
                            <div className="p-4 border-b border-white/10 bg-white/5 space-y-3 flex-shrink-0">
                                <p className="text-sm font-medium text-white/80">Quick actions:</p>

                                {/* Quick Questions */}
                                <div className="flex flex-wrap gap-2">
                                    {QUICK_QUESTIONS.map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleQuickQuestion(question)}
                                            disabled={isLoading}
                                            className="px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-200 text-white/90 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Messages - This will take up the remaining space */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/30 min-h-0">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                            }`}
                                    >
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/30'
                                            : 'bg-white/20 backdrop-blur-sm border border-white/30'
                                            }`}>
                                            {message.role === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-white" />
                                            )}
                                        </div>

                                        <div className={`flex-1 max-w-[75%] ${message.role === 'user' ? 'text-right' : 'text-left'
                                            }`}>
                                            <div className={`inline-block p-3 rounded-2xl ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-purple-500/80 to-blue-500/80 text-white rounded-tr-md backdrop-blur-sm shadow-lg shadow-purple-500/20'
                                                : 'bg-white/10 text-white/90 rounded-tl-md backdrop-blur-sm border border-white/20'
                                                }`}>
                                                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                                            </div>

                                            <div className="mt-1 text-xs text-white/50">
                                                {new Date(message.timestamp).toLocaleTimeString()}
                                                {message.processingTime && (
                                                    <span className="ml-2">• {message.processingTime}ms</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="inline-block p-3 bg-white/10 rounded-2xl rounded-tl-md backdrop-blur-sm border border-white/20">
                                                <div className="flex items-center gap-2 text-white/70">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span className="text-sm">Thinking...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div className="p-3 bg-red-500/20 border-t border-red-500/30 text-red-200 text-sm backdrop-blur-sm flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400">⚠️</span>
                                        {error}
                                    </div>
                                </div>
                            )}

                            {/* Input - Fixed at bottom */}
                            <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm flex-shrink-0">
                                <form onSubmit={handleSubmit} className="p-4">
                                    <div className="flex gap-3">
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Ask about my projects, skills, or experience..."
                                            disabled={isLoading}
                                            maxLength={2000}
                                            className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-white placeholder-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/15"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Send className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-white/50">
                                            {input.length}/2000 characters
                                        </p>
                                        <div className="text-xs text-white/40">
                                            Press Enter to send
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    )}
                </motion.div>
            )}

            {/* Backdrop overlay when chat is open */}
            {isChatOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={toggleChat}
                />
            )}
        </>
    );
}