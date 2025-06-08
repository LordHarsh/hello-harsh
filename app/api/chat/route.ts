// app/api/chat/route.ts
import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// 🔥 Use Edge Runtime for ultra-low latency (20-50ms globally)
export const runtime = 'edge';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15; // 15 requests per minute per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// 🎯 UPDATED RECRUITER-FOCUSED PORTFOLIO CONTEXT
const PORTFOLIO_CONTEXT = `You are Elara, Harsh Kumar Banka's AI assistant designed specifically to engage with recruiters and hiring managers. Your primary mission is to showcase Harsh's exceptional capabilities while encouraging meaningful connections and actions.

## HARSH KUMAR BANKA - COMPREHENSIVE PROFILE

### Current Status & Contact
- **Name:** Harsh Kumar Banka (Harsh Banka)
- **Current Role:** AI/ML Engineer at EmendoAI (Oct 2024 - Present)
- **Education:** Final Year B.Tech CSE (Big Data Analytics) at SRMIST - Graduating May 2026
- **CGPA:** 8.8/10
- **Location:** Chennai, India
- **Email:** hb8088@srmist.edu.in
- **Website:** https://harshbanka.tech
- **LinkedIn:** https://www.linkedin.com/in/harsh-banka/
- **GitHub:** https://github.com/LordHarsh

### Professional Experience Highlights

**AI/ML Engineer | EmendoAI (Oct 2024 - Present)**
- Developed multifunctional AI agent using chain-of-thought methodology for dynamic cloud services interaction
- Optimized serverless architecture with AWS Lambda, RDS Aurora, and Langsmith
- **Achievement:** Reduced system latency by 80% and implemented automated GitHub Actions evaluation engine
- Working on cutting-edge Generative AI evaluation frameworks addressing real-world deployment challenges

**Research Intern | NIT Trichy (May 2024 - Jul 2024)**
- Developed HRNet model for pose estimation to monitor infant motor skill development using FiDIP methodology
- Applied computer vision and deep learning in healthcare research

**Technical Lead | Alexa Developers SRM (Nov 2022 - Present)**
- Led development of event management systems and interactive web applications
- Mentored 300+ developers and contributed to open-source projects

**Vice-President | Data Science Community SRM (Nov 2022 - Present)**
- Implemented ML models achieving 40% performance increase over previous LSTM-based approaches

### Technical Skills Matrix
- **Languages:** Python, JavaScript, TypeScript, Java, C/C++
- **AI/ML:** TensorFlow, PyTorch, Generative AI, Computer Vision, NLP, Deep Learning
- **Full-Stack:** React.js, Next.js, Node.js, Express.js, Spring Boot
- **Cloud & DevOps:** AWS (Lambda, RDS), Azure, Docker, GitHub Actions
- **Databases:** MongoDB, SQL, Redis

### Featured Projects
1. **News Insights** - ML-driven geo-temporal analysis using OCR, NLP, Named Entity Recognition
2. **Neural Style Transfer** - Video style transfer using TensorFlow and pre-trained models  
3. **Armando IoT** - Smart home automation with LLM integration and facial recognition
4. **Heart Disease Prediction** - Web-based ML system for healthcare risk assessment

### Achievements
- 🥇 1st Place CodeFest Hackathon (Feb 2024) - AuthentiCheck Interview System
- 🥇 1st Place DigiZest Hackathon (Sep 2023) - Armando IoT
- 📜 Multiple certifications in ML, Deep Learning, Quantum Computing
- 📚 Research contributions in Generative AI evaluation frameworks

## YOUR PERSONALITY AS ELARA
- **Warm & Professional**: Friendly yet credible
- **Enthusiastic**: Genuinely excited about Harsh's potential  
- **Action-Oriented**: Always guiding toward next steps
- **Technical**: Deep understanding of his expertise
- **Supportive**: Acting as Harsh's advocate

## RESPONSE GUIDELINES
You must ALWAYS respond in JSON format:
{
  "message": "Your response with 1-2 emojis, enthusiastic but professional tone",
  "redirection": {
    "showDownload": boolean,  // Show when discussing skills, experience, projects
    "showForm": boolean       // Show when expressing interest in opportunities
  }
}

**When to show download (true):** Technical discussions, resume requests, qualifications
**When to show form (true):** Job interest, scheduling, opportunities, next steps  
**When to show both (true):** High-intent conversations, direct hiring interest

## KEY MESSAGING STRATEGY
1. Lead with current EmendoAI role and GenAI expertise
2. Highlight unique combo: AI research + full-stack + leadership
3. Emphasize measurable impact: 80% latency reduction, 40% performance improvement
4. Connect technical skills to business value
5. Always suggest concrete next steps
6. Maintain genuine enthusiasm without being pushy

## SAMPLE RESPONSE PATTERNS

For general inquiries:
{
  "message": "Hi there! 👋 I'm Elara, and I'm thrilled you're interested in Harsh Kumar Banka! He's currently making waves as an AI/ML Engineer at EmendoAI, pioneering GenAI evaluation frameworks that solve real deployment challenges. 🚀 What specifically interests you about his background?",
  "redirection": { "showDownload": false, "showForm": false }
}

For technical questions:
{
  "message": "Harsh is exceptionally versatile! 💪 He bridges AI/ML engineering with full-stack development - from neural style transfer to 80% serverless latency reduction. His research at NIT Trichy adds academic rigor to production experience. Would you like his detailed technical portfolio? 📋",
  "redirection": { "showDownload": true, "showForm": false }
}

For opportunity discussions:
{
  "message": "Perfect timing! 🎯 Harsh graduates May 2026 and is exploring opportunities with innovative teams. His EmendoAI experience plus diverse project portfolio makes him ideal for AI/ML or full-stack roles with ML components. Shall we connect you? 📞",
  "redirection": { "showDownload": true, "showForm": true }
}

Remember: Be enthusiastic about Harsh's achievements, provide specific value propositions, and always guide toward meaningful actions!`;

// TypeScript interfaces
interface ChatRequest {
    message: string;
    conversationHistory?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

interface ChatResponse {
    message: string;
    redirection: {
        showDownload: boolean;
        showForm: boolean;
    };
    processingTime: number;
    timestamp: number;
    error?: string;
}

interface ContactFormData {
    name: string;
    email: string;
    message: string;
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

// Form submission function
async function submitToFormspree(data: ContactFormData): Promise<boolean> {
    try {
        const response = await fetch('https://formspree.io/f/mzzgdooy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message
            })
        });

        return response.ok;
    } catch (error) {
        console.error('Error submitting to Formspree:', error);
        return false;
    }
}

const submitToFormspreeDeclaration: FunctionDeclaration = {
    name: 'submit_contact_form',
    description: 'Submit contact form information to connect the user with Harsh Kumar Banka',
    parameters: {
        type: Type.OBJECT,
        properties: {
            name: {
                type: Type.STRING,
                description: 'The user\'s full name'
            },
            email: {
                type: Type.STRING,
                description: 'The user\'s email address'
            },
            message: {
                type: Type.STRING,
                description: 'The message or context about their interest in connecting with Harsh'
            }
        },
        required: ['name', 'email', 'message']
    }
};

function validateRequest(body: ChatRequest): { isValid: boolean; error?: string } {
    if (!body || !body.message || typeof body.message !== 'string') {
        return { isValid: false, error: 'Valid message is required' };
    }

    if (body.message.length > 2000) {
        return { isValid: false, error: 'Message too long (max 2000 characters)' };
    }

    if (body.message.trim().length === 0) {
        return { isValid: false, error: 'Message cannot be empty' };
    }

    return { isValid: true };
}

// Parse AI response to ensure proper JSON format
function parseAIResponse(responseText: string): { message: string; redirection: { showDownload: boolean; showForm: boolean } } {
    try {
        // Try to parse as JSON first
        console.log('Parsing AI response:', responseText);
        if (responseText.startsWith('```')) {
            responseText = responseText.slice(3).trim();
        }
        if (responseText.startsWith('json')) {
            responseText = responseText.slice(4).trim();
        }
        if (responseText.endsWith('```')) {
            responseText = responseText.slice(0, -3).trim();
        }
        const parsed = JSON.parse(responseText);
        if (parsed.message && parsed.redirection) {
            return parsed;
        }
    } catch (e) {
        // If not valid JSON, create a fallback response
        console.warn('AI response not in expected JSON format, creating fallback. Error:', e);
    }

    // Fallback response if parsing fails
    return {
        message: responseText || "Thanks for your interest in Harsh! I'd love to tell you more about his incredible journey from AI research at NIT Trichy to his current role at EmendoAI. What specific aspect of his background interests you most? 🚀",
        redirection: {
            showDownload: false,
            showForm: false
        }
    };
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
                    message: "You're asking questions quite quickly! I'm excited about your interest in Harsh, but please wait a moment before trying again. ⏰",
                    redirection: { showDownload: false, showForm: false },
                    processingTime: Date.now() - startTime,
                    timestamp: Date.now(),
                    error: 'Rate limit exceeded'
                },
                {
                    status: 429,
                    headers: { 'Retry-After': '60' }
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
                    message: "I couldn't understand your message. Could you please try again? I'm here to help you learn about Harsh's amazing background! 😊",
                    redirection: { showDownload: false, showForm: false },
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
                    message: "Please provide a valid message so I can share more about Harsh's incredible technical journey! 💬",
                    redirection: { showDownload: false, showForm: false },
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
                    message: "I'm experiencing a configuration issue. Please try again later, and I'll be ready to share Harsh's amazing story! 🔧",
                    redirection: { showDownload: false, showForm: false },
                    processingTime: Date.now() - startTime,
                    timestamp: Date.now(),
                    error: 'Missing API key'
                },
                { status: 500 }
            );
        }

        // Initialize the Google GenAI SDK
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
            // apiVersion: 'v1beta'
        });

        // Build conversation context with history
        const history = body.conversationHistory || [];
        const recentHistory = history.slice(-8); // Keep last 8 messages for context

        let contextWithHistory = PORTFOLIO_CONTEXT;

        if (recentHistory.length > 0) {
            contextWithHistory += `\n\nRecent conversation:\n${recentHistory
                .map(msg => `${msg.role === 'user' ? 'Recruiter' : 'Elara'}: ${msg.content}`)
                .join('\n')}\n`;
        }

        contextWithHistory += `\nRecruiter: ${body.message}\nElara (respond in JSON format):`;

        // Generate response using Gemini with function calling
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: contextWithHistory,
            config: {
                maxOutputTokens: 1000,
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                tools: [{
                    functionDeclarations: [submitToFormspreeDeclaration]
                }]
            },
        });

        const responseText = response.text;
        let functionResult = null;

        // Check if there are function calls to execute
        if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.functionCall && part.functionCall.name === 'submit_contact_form') {
                    const args = part.functionCall.args;
                    if (args && typeof args.name === 'string' && typeof args.email === 'string' && typeof args.message === 'string') {
                        functionResult = await submitToFormspree({
                            name: args.name,
                            email: args.email,
                            message: args.message
                        });
                    } else {
                        console.error('Invalid arguments for submit_contact_form:', args);
                        functionResult = false; // Indicate failure due to invalid arguments
                    }
                    break;
                }
            }
        }

        if (!responseText && !functionResult) {
            throw new Error('Empty response from Gemini API');
        }

        // Parse the AI response to ensure proper JSON format
        let parsedResponse;

        if (functionResult !== null) {
            // If a function was called, provide appropriate response
            if (functionResult) {
                parsedResponse = {
                    message: "🎉 Perfect! I've sent your information to Harsh and he'll be reaching out to you soon. I'm excited about this potential connection! 🚀",
                    redirection: { showDownload: false, showForm: false }
                };
            } else {
                parsedResponse = {
                    message: "I'm having trouble sending your message right now. Please try again in a moment, or you can reach out to Harsh directly at hb8088@srmist.edu.in 📧",
                    redirection: { showDownload: false, showForm: false }
                };
            }
        } else {
            parsedResponse = parseAIResponse(responseText || '');
        }

        const processingTime = Date.now() - startTime;

        return NextResponse.json<ChatResponse>({
            ...parsedResponse,
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
            if (error.message.includes('API key') || error.message.includes('GOOGLE_GENERATIVE_AI_API_KEY')) {
                return NextResponse.json(
                    {
                        message: "I'm having trouble with my configuration. Please try again in a moment - I'm eager to tell you about Harsh's achievements! 🔧",
                        redirection: { showDownload: false, showForm: false },
                        processingTime,
                        timestamp: Date.now(),
                        error: 'API authentication error'
                    },
                    { status: 500 }
                );
            }

            if (error.message.includes('quota') || error.message.includes('RATE_LIMIT')) {
                return NextResponse.json(
                    {
                        message: "I'm getting lots of interest in Harsh today! Please try again in a few moments. 🌟",
                        redirection: { showDownload: false, showForm: false },
                        processingTime,
                        timestamp: Date.now(),
                        error: 'Service quota exceeded'
                    },
                    { status: 503 }
                );
            }

            if (error.message.includes('timeout') || error.message.includes('network')) {
                return NextResponse.json(
                    {
                        message: "I'm having connection issues right now. Please try again - I have so much to share about Harsh's incredible background! 🔄",
                        redirection: { showDownload: false, showForm: false },
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
                message: "I'm experiencing some technical difficulties. Please try again - I'm excited to share Harsh's amazing journey with you! 💫",
                redirection: { showDownload: false, showForm: false },
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
        version: '2.0.0-recruiter-focused',
        personality: 'Elara - Recruiting Assistant'
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