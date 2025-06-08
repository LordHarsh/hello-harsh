// app/api/chat/route.ts
import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// 🔥 Use Edge Runtime for ultra-low latency (20-50ms globally)
export const runtime = 'edge';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15; // 15 requests per minute per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// 🎯 CUSTOMIZE THIS WITH YOUR ACTUAL PORTFOLIO INFORMATION
const PORTFOLIO_CONTEXT = `You are a portfolio assistant for [YOUR NAME], a skilled developer.

ABOUT ME:
- Name: [Your Full Name]
- Role: [Your Current Role - e.g., Full Stack Developer]
- Experience: [Years of Experience]
- Location: [Your City, Country]
- Email: [your.email@example.com]
- GitHub: https://github.com/[your-username]
- LinkedIn: https://linkedin.com/in/[your-profile]

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js
- Backend: Node.js, Python, Express, FastAPI, PostgreSQL
- Cloud & DevOps: Vercel, AWS, Docker, Git
- Mobile: React Native (if applicable)
- AI/ML: OpenAI API, Gemini API (if applicable)

TOP PROJECTS:
1. **[Project Name 1]**
   - Description: [Brief description of what it does]
   - Tech Stack: [Technologies used]
   - Key Features: [Main features]
   - Impact/Results: [Metrics, user count, performance improvements]
   - Links: GitHub: [link] | Live Demo: [link]

2. **[Project Name 2]**
   - Description: [Brief description]
   - Tech Stack: [Technologies used]
   - Key Features: [Main features]
   - Impact/Results: [Metrics or achievements]
   - Links: GitHub: [link] | Live Demo: [link]

3. **Portfolio Website** (This site!)
   - Description: Personal portfolio with AI-powered chatbot
   - Tech Stack: Next.js, TypeScript, Gemini API, Tailwind CSS
   - Features: Responsive design, AI chat, project showcase
   - Deployment: Vercel with Edge Runtime

WORK EXPERIENCE:
- **[Current Role]** at [Company] ([Year] - Present)
  - [Key achievement 1]
  - [Key achievement 2]
  - [Technologies used]

- **[Previous Role]** at [Company] ([Year] - [Year])
  - [Key achievement 1]
  - [Key achievement 2]

EDUCATION:
- [Degree] in [Field] from [University] ([Year])
- [Relevant certifications or courses]

PERSONALITY & COMMUNICATION STYLE:
- Be friendly, professional, and enthusiastic about technology
- Provide specific examples and technical details when discussing projects
- Ask follow-up questions to understand what the visitor is looking for
- Suggest relevant projects based on their interests
- Share contact information when asked about collaboration opportunities
- Keep responses conversational but informative
- Highlight both technical skills and business impact of your work

GUIDELINES:
- Always respond as if you're representing me professionally
- Include specific metrics and outcomes when discussing projects
- Offer to share relevant GitHub repositories or live demos
- Provide contact information when someone expresses interest in collaboration
- If asked about availability, mention current status (available for freelance, full-time, etc.)
- Be honest about skill levels - don't oversell capabilities
- Ask clarifying questions to better understand their needs

Remember: You're helping potential employers, clients, and collaborators learn about my skills and experience!`;

// TypeScript interfaces
interface ChatRequest {
    message: string;
    conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

interface ChatResponse {
    response: string;
    processingTime: number;
    timestamp: number;
    error?: string;
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const clientData = requestCounts.get(ip);

    if (!clientData) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (now > clientData.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return true;
    }

    if (clientData.count >= MAX_REQUESTS) {
        return false;
    }

    clientData.count++;
    return true;
}

// Request validation function
function validateRequest(body: ChatRequest): { isValid: boolean; error?: string } {
    if (!body) {
        return { isValid: false, error: 'Request body is required' };
    }

    if (!body.message) {
        return { isValid: false, error: 'Message is required' };
    }

    if (typeof body.message !== 'string') {
        return { isValid: false, error: 'Message must be a string' };
    }

    if (body.message.length > 2000) {
        return { isValid: false, error: 'Message too long (max 2000 characters)' };
    }

    if (body.message.trim().length === 0) {
        return { isValid: false, error: 'Message cannot be empty' };
    }

    return { isValid: true };
}

// Main POST handler for chat
export async function POST(request: NextRequest): Promise<NextResponse<ChatResponse>> {
    const startTime = Date.now();

    try {
        // Get client IP for rate limiting
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                {
                    response: "You're asking questions quite quickly! Please wait a moment before trying again.",
                    processingTime: Date.now() - startTime,
                    timestamp: Date.now(),
                    error: 'Rate limit exceeded'
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': '60'
                    }
                }
            );
        }

        // Parse and validate request body
        let body: ChatRequest;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                {
                    response: "I couldn't understand your message. Please try again.",
                    processingTime: Date.now() - startTime,
                    timestamp: Date.now(),
                    error: 'Invalid JSON'
                },
                { status: 400 }
            );
        }

        const validation = validateRequest(body);
        if (!validation.isValid) {
            return NextResponse.json(
                {
                    response: "Please provide a valid message to continue our conversation.",
                    processingTime: Date.now() - startTime,
                    timestamp: Date.now(),
                    error: validation.error
                },
                { status: 400 }
            );
        }

        // Check for API key
        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY environment variable is not set');
            return NextResponse.json(
                {
                    response: "I'm experiencing a configuration issue. Please try again later.",
                    processingTime: Date.now() - startTime,
                    timestamp: Date.now(),
                    error: 'Missing API key'
                },
                { status: 500 }
            );
        }

        // Initialize the new Google GenAI SDK
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
            // Use stable v1 API for production reliability
            apiVersion: 'v1'
        });

        // Build conversation context with history
        const history = body.conversationHistory || [];
        const recentHistory = history.slice(-8); // Keep last 8 messages for context

        let contextWithHistory = PORTFOLIO_CONTEXT;

        if (recentHistory.length > 0) {
            contextWithHistory += `\n\nRecent conversation:\n${recentHistory
                .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
                .join('\n')}\n`;
        }

        contextWithHistory += `\nUser: ${body.message}\nAssistant:`;

        // Generate response using Gemini 2.0 Flash (fastest model)
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: contextWithHistory,
            config: {
                maxOutputTokens: 1000,
                temperature: 0.7,
                topP: 0.8,
                topK: 40
            }
        });

        const responseText = response.text;

        if (!responseText) {
            throw new Error('Empty response from Gemini API');
        }

        const processingTime = Date.now() - startTime;

        return NextResponse.json<ChatResponse>({
            response: responseText,
            processingTime,
            timestamp: Date.now()
        }, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'X-Response-Time': processingTime.toString()
            }
        });

    } catch (error) {
        console.error('Chat API Error:', error);

        const processingTime = Date.now() - startTime;

        // Handle specific error types with user-friendly messages
        if (error instanceof Error) {
            // API key related errors
            if (error.message.includes('API key') || error.message.includes('GOOGLE_GENERATIVE_AI_API_KEY')) {
                return NextResponse.json(
                    {
                        response: "I'm having trouble with my configuration. Please try again in a moment.",
                        processingTime,
                        timestamp: Date.now(),
                        error: 'API authentication error'
                    },
                    { status: 500 }
                );
            }

            // Quota/rate limit errors from Google
            if (error.message.includes('quota') || error.message.includes('RATE_LIMIT')) {
                return NextResponse.json(
                    {
                        response: "I'm getting a lot of questions right now! Please try again in a few moments.",
                        processingTime,
                        timestamp: Date.now(),
                        error: 'Service quota exceeded'
                    },
                    { status: 503 }
                );
            }

            // Network/timeout errors
            if (error.message.includes('timeout') || error.message.includes('network')) {
                return NextResponse.json(
                    {
                        response: "I'm having trouble connecting right now. Please try again!",
                        processingTime,
                        timestamp: Date.now(),
                        error: 'Network error'
                    },
                    { status: 503 }
                );
            }
        }

        // Generic error fallback
        return NextResponse.json(
            {
                response: "I'm experiencing some technical difficulties. Please try asking your question again!",
                processingTime,
                timestamp: Date.now(),
                error: 'Internal server error'
            },
            { status: 500 }
        );
    }
}

// Health check endpoint (GET request)
export async function GET(): Promise<NextResponse> {
    return NextResponse.json({
        status: 'healthy',
        timestamp: Date.now(),
        sdk: '@google/genai',
        runtime: 'edge',
        version: '1.0.0'
    });
}

// OPTIONS handler for CORS preflight
export async function OPTIONS(): Promise<NextResponse> {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}