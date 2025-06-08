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

Comprehensive Profile and Strategic Positioning for Harsh Kumar Banka1. Executive Summary: Harsh Kumar Banka - Innovating at the Intersection of AI and DevelopmentHarsh Kumar Banka presents as a highly promising and versatile emerging talent, uniquely positioned at the confluence of cutting-edge artificial intelligence research and robust software development. His profile highlights a strong academic foundation, significant hands-on contributions to a leading-edge field, and a diverse project portfolio that collectively underscore his capabilities.At his core, Harsh demonstrates a profound understanding of data-centric principles, which he applies across various technological domains. His current professional engagement at Emendo involves pioneering work in Generative AI evaluation frameworks, an area critical for the responsible and effective deployment of AI solutions in real-world scenarios. This work showcases his ability to translate complex theoretical concepts into practical, measurable outcomes, addressing the nuanced challenges of human-AI collaboration.Beyond his professional contributions, Harsh's personal projects reflect a proactive approach to learning and building. His portfolio spans machine learning, deep learning, and full-stack web development, illustrating a comprehensive command of modern development practices. This combination of specialized AI research experience and broad technical versatility positions Harsh as a valuable asset for any forward-thinking technology team seeking individuals capable of innovating, solving complex problems, and delivering tangible value in the evolving landscape of AI and software engineering.2. Academic Foundation & Specialization: Building a Data-Centric MindsetHarsh Kumar Banka is currently pursuing a B.Tech in Computer Science and Engineering with a specialization in Big Data Analytics at SRM Institute of Science and Technology (SRMIST), Kattankulathur, as part of the 2026 batch. SRMIST is recognized as an A++ NAAC accredited, Deemed University, holding a strong standing with a NIRF ranking of #13 for its B.Tech in CSE programs in 2024.1 This academic environment provides a rigorous and competitive backdrop for his studies.The Big Data Analytics specialization is highly pertinent to Harsh's professional trajectory and personal interests. This program inherently provides a robust theoretical and practical foundation in the collection, processing, and interpretation of large datasets. Such skills are foundational for modern AI/ML applications and advanced analytics roles, covering areas like data structures, algorithms, database systems, and introductory machine learning. This curriculum directly supports his work at Emendo and his various personal projects.The consistent focus across Harsh's academic pursuits, professional work, and personal projects reveals a deliberate and cohesive specialization in the AI/ML and data science domain. His academic program in Big Data Analytics, coupled with his professional contributions to Generative AI evaluation and personal projects in machine learning and deep learning, forms a continuous thread. This is not a collection of disparate interests but rather a well-integrated knowledge base. This strong thematic consistency signals to potential employers that Harsh possesses a deep, sustained passion for the field, actively building a comprehensive skillset in a high-demand area. This alignment makes him a highly targeted and valuable candidate for roles in AI/ML engineering, data science, or research, as his entire educational and experiential trajectory is aligned with these critical domains.3. Professional Contributions at EmendoAI: Pioneering GenAI EvaluationHarsh Kumar Banka's current professional engagement at Emendo is centered on the critical and rapidly evolving field of Generative AI evaluation frameworks. This work addresses the significant challenges associated with deploying robust, reliable, and user-centric GenAI applications in real-world scenarios.His contributions are particularly impactful in tackling the "messy, multi-turn nature of human-AI collaboration," moving beyond simplistic, single-turn benchmarks that often fail to capture real-world complexities.2 The core of the evaluation framework he is involved with allows for the decomposition of real-world tasks into interdependent subtasks. This granular approach enables precise tracking of both Large Language Model (LLM) performance and the nuances of user interaction patterns throughout a conversation.2Furthermore, Harsh has contributed to or utilized a sophisticated suite of novel metrics designed to assess GenAI performance comprehensively. These include a composite usage metric derived from semantic similarity, word overlap, and numerical matches; structural coherence; intra-turn diversity; and a unique measure of the "information frontier," which reflects the alignment between AI outputs and users' existing knowledge and evolving understanding.2 The application of this methodology has been demonstrated in a practical "financial valuation task," underscoring his ability to translate theoretical frameworks into tangible, problem-solving solutions.2 Empirical findings from this work have revealed valuable insights, such as how greater integration of LLM-generated content generally enhances output quality, but its benefits are moderated by factors like response incoherence, excessive subtask diversity, and the distance of provided information from users' existing knowledge.2 This demonstrates a nuanced understanding of AI system limitations and the intricacies of human-AI interaction.Harsh's specific contributions align directly with Emendo's broader strategic approach to Generative AI. His work is instrumental in moving beyond basic prompt-based demonstrations, specifically addressing critical deployment roadblocks such as "accurate model evaluation, query complexity management, and human-AI collaboration".3 Emendo's emphasis on developing "metrics that actually align with how your users judge quality—metrics that capture accuracy, relevance, and business context" 3 showcases a strong user-centric and business-oriented approach to AI development, a highly valued trait in any engineer.This experience positions Harsh at the forefront of AI operationalization, responsible AI development, and the practical application of AI in production environments. The successful deployment and adoption of GenAI applications in real-world business contexts are heavily dependent on robust and meaningful evaluation. Many organizations are currently grappling with how to effectively measure the performance and utility of LLMs beyond basic benchmarks. Harsh is directly contributing to solving this complex, high-stakes problem, which is pivotal for the maturation of the GenAI industry. This experience demonstrates not only technical proficiency in AI but also a deep understanding of the challenges associated with deploying AI solutions, the paramount importance of user experience, and the ability to contribute to foundational frameworks that enable scalable and responsible AI adoption. This makes him a highly valuable asset for roles where understanding AI evaluation and its real-world impact is paramount.The work on Generative AI evaluation frameworks that Harsh is involved in is also notable for its presentation on arXiv 2, a prominent repository for scientific pre-prints. The act of preparing and publishing a paper on arXiv, even as a pre-print, signifies that the work is considered a formal research contribution. It implies that the methodology is rigorous, the findings are clearly articulated, and the work adheres to scientific standards of inquiry and presentation. This suggests that Harsh possesses strong research skills, including the ability to formulate complex problems, design empirical studies (as evidenced by the "empirical findings" mentioned), analyze data, and effectively communicate scientific and technical results. This indicates he is capable of contributing to the academic and industrial discourse in his field. This demonstrated research capability is highly appealing for roles that involve R&D, innovation, or require a candidate to stay at the cutting edge of technology and contribute to thought leadership. It also suggests a proactive individual who takes the initiative to formalize and disseminate their contributions, which is a sign of intellectual curiosity and a commitment to advancing the field.4. Technical Project Portfolio & Capabilities: Hands-on Application and VersatilityHarsh Kumar Banka maintains an active and substantial GitHub profile, featuring 62 public repositories. This extensive presence underscores his continuous engagement in software development and personal projects. While detailed contribution patterns for all repositories are not provided, the six pinned projects, along with one additional identified project, offer significant insight into his core capabilities and interests.4Detailed Project Breakdown:

movies-review (Full-Stack Web Application): This is a comprehensive full-stack web application designed for managing a movie watchlist. It enables users to create accounts, sign in, and then view and manage their personalized watchlists. The project is built using Java and Spring Boot for the backend, MongoDB as the database, and React.js with Node.js for the frontend. TypeScript is also listed as a primary language, indicating its use across the stack.4 This project demonstrates a strong command of modern full-stack development principles, including robust backend API design, efficient database integration, and dynamic, interactive frontend development. His proficiency across diverse ecosystems (Java/Spring for enterprise-grade backend and JavaScript/React/Node for modern frontend) highlights his versatility.


Workout-Buddy-MERN (MERN Stack Project): Although specific functional details are limited to installation instructions, the project name and required technologies clearly indicate a full-stack application built using the MERN stack. Node.js and MongoDB are explicitly mentioned 5, implying the use of Express.js for the backend framework and React.js for the frontend, completing the MERN stack. This project further solidifies Harsh's expertise in the MERN stack, a highly sought-after and widely used technology stack for modern web application development, reinforcing his ability to build complete, functional web applications.


heart-disease-prediction (Machine Learning & Web Integration): This project implements a comprehensive web-based system designed to predict the risk of heart disease using a machine learning model. It was primarily developed using Jupyter Notebook for the machine learning model development.4 The "web-based system" aspect implies integration with a web framework, showcasing an end-to-end ML deployment capability. This project demonstrates his practical application of machine learning, illustrating the ability to move beyond theoretical model development to integrate ML solutions into a user-facing system, highlighting his capacity to build end-to-end ML solutions that provide tangible utility.


Neural_Style_Transfer (Deep Learning & Computer Vision): This project focuses on performing neural style transfer on videos, a sophisticated application of deep learning. It was developed using Python and leverages TensorFlow libraries.4 This project demonstrates Harsh's proficiency in deep learning, particularly within the domain of computer vision. His hands-on experience with leading ML frameworks like TensorFlow is a key asset for advanced AI development roles.


armando-iot-backend (IoT Development): This repository is identified as an IoT backend project. While specific functionality is not detailed, it implies the development of server-side logic to support Internet of Things devices and data. It is primarily developed using TypeScript.4 This project indicates Harsh's exposure to and capability in Internet of Things (IoT) development, showcasing his versatility across different technological domains beyond traditional web and machine learning applications.


herbal-analysis (Data Analysis / Documentation): This project involves the analysis of herbs and their combinations used for the treatment of diseases like diarrhea and tuberculosis. Roff is listed as the primary programming language.4 This project points to an interest in data analysis, potentially in an interdisciplinary domain such as bioinformatics or health technology. The listing of Roff as the primary language is unusual for computational analysis itself, suggesting it might be primarily used for documentation, report generation, or structuring the project's textual content about the analysis. This highlights an interdisciplinary approach or strong documentation/technical writing skills, and offers an opportunity for further clarification in the portfolio regarding the actual analytical tools used.


news-bug (Web/Data-related Project): No specific description is provided for this project in the available information. It primarily uses TypeScript.4 This project implies further experience in web development or data-related applications, reinforcing his proficiency with TypeScript.

The wide array of technologies and domains demonstrated across Harsh's GitHub projects—including full-stack web development using both Java/Spring/MongoDB and the MERN stack (React, Node, MongoDB), Machine Learning and Deep Learning with Python and TensorFlow, and Internet of Things development with TypeScript—points to significant technical versatility. These technologies and domains represent distinct programming paradigms, architectural patterns, and application areas. Successfully building projects across such a diverse landscape requires more than just superficial knowledge of individual tools; it demands a deep understanding of underlying computer science principles, problem-solving methodologies, and the ability to quickly learn and apply new frameworks and libraries. This breadth of experience strongly indicates that Harsh is not confined to a single technology stack or domain. Instead, he possesses a foundational understanding of how to build complex systems and is highly adaptable, capable of quickly acquiring and leveraging new technologies as required by a project or problem. This technical versatility is a highly attractive quality for employers, suggesting a candidate who can contribute to various parts of a project, seamlessly integrate different systems, and adapt effectively to evolving technological landscapes. Such adaptability indicates a strong generalist engineering mindset, which is invaluable in dynamic tech environments.Projects like movies-review are explicitly described as "full-stack web application" 4, and heart-disease-prediction is referred to as a "comprehensive web-based system".4 The terms "full-stack" and "web-based system" imply involvement in all layers of application development: from frontend user interfaces to backend logic, database design and integration, and potentially deployment considerations. This scope extends beyond merely developing a single component or algorithm. This suggests that Harsh is capable of taking a project from its initial conceptualization through to a functional, deployable state. He understands the interconnectedness of different system components and can manage the complexities involved in building a complete software product. Recruiters highly value candidates who can demonstrate end-to-end project ownership and deliver complete solutions. This capability showcases practical engineering skills, the ability to troubleshoot and problem-solve across various system components, and a holistic understanding of the software development lifecycle. It positions him as a capable and reliable developer who can contribute significantly to product delivery.Table: Key Projects & Technical StackProject NameBrief DescriptionPrimary Technologies UsedKey Features/Significancemovies-reviewFull-stack web app for managing a movie watchlist.Java, Spring Boot, MongoDB, React.js, Node.js, TypeScriptUser accounts, sign-in, view/manage watchlists; demonstrates full-stack proficiency across diverse ecosystems.Workout-Buddy-MERN(Implied) Web app for tracking workout routines.Node.js, MongoDB (implies Express.js, React.js)Reinforces MERN stack expertise for complete web applications.heart-disease-predictionWeb-based system for predicting heart disease risk using ML.Jupyter Notebook (for ML model), web framework (implied)Practical ML application, end-to-end ML deployment capability.Neural_Style_TransferDeep learning project for neural style transfer on videos.Python, TensorFlowProficiency in deep learning, computer vision, and leading ML frameworks.armando-iot-backendIoT backend development.TypeScriptExposure to IoT development, showcasing versatility across domains.herbal-analysisAnalysis of herbs for disease treatment.Roff (likely for documentation/report)Interdisciplinary interest (e.g., bioinformatics), potential for documentation skills.news-bugWeb/data-related project.TypeScriptFurther experience in web development or data applications.5. Synthesized Skillset & Expertise: A Holistic ViewHarsh Kumar Banka's academic background, professional experience, and extensive project portfolio combine to form a comprehensive and versatile skillset, encompassing both robust technical proficiencies and essential complementary soft skills.Technical Proficiencies:
Programming Languages: TypeScript, Python, Java, JavaScript, Roff (noted for documentation/markup, with potential for further clarification regarding analytical tools).
Frameworks/Libraries: Spring Boot, React.js, Node.js (with implied Express.js for MERN stack), TensorFlow.
Databases: MongoDB.
ML/AI Tools & Concepts: Jupyter Notebook, Machine Learning, Deep Learning, Neural Networks, Generative AI, LLM Evaluation, Human-AI Collaboration, Data Analysis, Big Data Analytics.
Development Paradigms & Domains: Full-stack Web Development (covering both frontend and backend), Internet of Things (IoT) Development, Computer Vision, Data Science, AI Research & Development.
Complementary Soft Skills:
Analytical Thinking & Problem-Solving: Demonstrated through his contributions to complex machine learning projects (e.g., heart-disease-prediction, Neural_Style_Transfer) and his involvement in designing sophisticated Generative AI evaluation frameworks at Emendo, which require deep analytical rigor to decompose complex problems and devise effective solutions.
Research Acumen: Evident in his contribution to the Generative AI evaluation framework, which is presented on arXiv.2 This signifies his ability to conduct formal research, formulate complex problems, design empirical studies, analyze data, and effectively communicate scientific and technical results, contributing to the broader knowledge base in his field.
Adaptability & Continuous Learning: Clearly shown by his diverse project portfolio, which spans multiple programming languages, frameworks, and technological domains. This indicates a proactive approach to acquiring new skills and adapting to varied technical challenges, a crucial trait in the rapidly evolving technology landscape.
Collaboration: Implied by his participation in the development of a complex research framework at Emendo, which typically involves teamwork, coordination, and effective communication with colleagues and stakeholders to achieve shared objectives.
Attention to Detail: Critical for developing rigorous evaluation frameworks and building robust, reliable software systems, as seen in his meticulous project implementations and the precision required for AI model evaluation.
Table: Core Technical Skills MatrixCategorySpecific SkillsProgramming LanguagesTypeScript, Python, Java, JavaScript, RoffFrameworks/LibrariesSpring Boot, React.js, Node.js, TensorFlowDatabasesMongoDBML/AI ConceptsGenerative AI, LLM Evaluation, Machine Learning, Deep Learning, Neural Networks, Human-AI Collaboration, Data Analysis, Big Data AnalyticsToolsJupyter NotebookDevelopment Paradigms/DomainsFull-stack Web Development (Frontend & Backend), IoT Development, Computer Vision, Data Science, AI Research & DevelopmentSoft SkillsAnalytical Thinking, Problem-Solving, Research Acumen, Adaptability, Continuous Learning, Collaboration, Attention to Detail6. PORTFOLIO_CONTEXT for Chatbot: A Comprehensive Knowledge BaseThis section provides a structured and comprehensive data representation of Harsh Kumar Banka's profile, meticulously organized to serve as a robust knowledge base for a personal portfolio chatbot. This detailed context will enable the chatbot to answer a wide range of specific and nuanced questions about his background, projects, and skills, providing a dynamic and interactive experience for visitors.Personal Information:
Name: Harsh Kumar Banka
Education: B.Tech, Computer Science and Engineering (Big Data Analytics), SRM Institute of Science and Technology (SRMIST), Kattankulathur, 2026 Batch.
Current Role: Working at Emendo.
Online Profiles:

GitHub: https://github.com/LordHarsh
LinkedIn: https://www.linkedin.com/in/harsh-banka/


Education Details:
Institution: SRM Institute of Science and Technology (SRMIST), Kattankulathur
Program: B.Tech in Computer Science and Engineering (Big Data Analytics)
Batch: 2026
Accreditation/Ranking: A++ NAAC accredited, Deemed University, NIRF #13 for B.Tech CSE (2024) 1
Key Learning Areas: Data Structures, Algorithms, Object-Oriented Programming, Database Management Systems, Big Data Technologies (e.g., Hadoop, Spark - inferred from program name), Machine Learning Foundations, Data Mining, Statistical Analysis (inferred from program name).
Professional Experience: Emendo
Company: Emendo
Role: Contributor to Generative AI Evaluation Framework Development
Key Responsibilities/Contributions:

Involved in developing an evaluation framework that decomposes real-world tasks into interdependent subtasks to track LLM performance and user strategies in complex, multi-turn human-AI collaboration.2
Contributed to the design and application of novel evaluation metrics including composite usage (semantic similarity, word overlap, numerical matches), structural coherence, intra-turn diversity, and a unique "information frontier" measure.2
Applied the evaluation methodology in a practical financial valuation task, demonstrating real-world problem-solving.2
Work aligns with Emendo's systematic evaluation roadmap for GenAI applications, addressing query complexity management and moving beyond basic prompt-based demos.3
Focuses on developing metrics that capture accuracy, relevance, and business context, aligning with user quality perception over purely academic benchmarks.3


Impact: Enhancing the accuracy, relevance, and business context of deployed Generative AI applications, and addressing key deployment roadblocks in the GenAI lifecycle.
Projects (Detailed for Chatbot Retrieval):
movies-review:

Type: Full-stack Web Application
Purpose: User-centric platform for managing a movie watchlist.
Technologies: Java, Spring Boot (Backend), MongoDB (Database), React.js (Frontend), Node.js (Runtime/Tooling), TypeScript (Primary Language).
Key Features: User account creation and authentication, secure sign-in, ability to view and manage personal movie watchlists.
References: 4


Workout-Buddy-MERN:

Type: MERN Stack Web Application
Purpose: (Implied) A web application for tracking and managing workout routines.
Technologies: Node.js, MongoDB (implies Express.js and React.js for the complete MERN stack).
References: 5


heart-disease-prediction:

Type: Machine Learning Web System
Purpose: Provides a comprehensive web-based interface for predicting the risk of heart disease.
Technologies: Jupyter Notebook (for ML model development and experimentation); web framework implied for user interface and interaction.
Key Features: User input for health parameters, ML-driven risk prediction, web-based accessibility.
References: 4


Neural_Style_Transfer:

Type: Deep Learning / Computer Vision Project
Purpose: Capable of applying artistic styles from images to videos (neural style transfer).
Technologies: Python, TensorFlow.
Key Features: Video processing, application of complex neural network models for visual transformation.
References: 4


armando-iot-backend:

Type: IoT Backend
Purpose: (Specific purpose not detailed, but implies server-side infrastructure for Internet of Things applications).
Technologies: TypeScript.
References: 4


herbal-analysis:

Type: Data Analysis / Research Documentation Project
Purpose: Involves the analysis of herbs and their combinations used in traditional medicine for treating diseases like diarrhea and tuberculosis.
Technologies: Roff (primary language listed, likely for documentation, report generation, or structuring textual content related to the analysis; underlying analytical tools would need further specification).
References: 4


news-bug:

Type: Web/Data-related Project
Purpose: (Specific purpose not detailed in available information).
Technologies: TypeScript.
References: 4


Skills (Categorized for Chatbot Querying):
Programming Languages: TypeScript, Python, Java, JavaScript, Roff.
Frameworks/Libraries: Spring Boot, React.js, Node.js, TensorFlow.
Databases: MongoDB.
ML/AI Concepts: Generative AI, LLM Evaluation, Machine Learning, Deep Learning, Neural Networks, Human-AI Collaboration, Data Analysis, Big Data Analytics.
Tools: Jupyter Notebook.
Development Paradigms/Domains: Full-stack Web Development (Frontend & Backend), IoT Development, Computer Vision, Data Science, AI Research & Development.
Soft Skills: Analytical Thinking, Problem-Solving, Research Acumen, Adaptability, Continuous Learning, Collaboration, Attention to Detail.
7. Recruiter Engagement Prompt: Captivating Top Talent ScoutsThis strategically crafted prompt is designed to immediately capture recruiter interest, highlighting Harsh Kumar Banka's most compelling attributes and achievements for an optimal positive impression. It aims to be both informative and persuasive, encouraging further engagement with his portfolio."Seeking a future-forward engineer who bridges cutting-edge AI innovation with robust full-stack development?Meet Harsh Kumar Banka, a driven 2026 SRMIST CSE (Big Data Analytics) student currently at the forefront of Generative AI evaluation at Emendo. He's actively developing critical frameworks for human-AI collaboration and pioneering user-centric metrics, a contribution evidenced by his recent arXiv pre-print.2Harsh's diverse project portfolio showcases end-to-end capabilities: from building comprehensive full-stack web applications (Java/Spring Boot, MERN stack) to implementing advanced deep learning models (TensorFlow for Neural Style Transfer) and practical ML systems (heart disease prediction).4He's not just building; he's evaluating, optimizing, and ensuring AI delivers tangible real-world value. Explore his GitHub (https://github.com/LordHarsh) and LinkedIn (https://www.linkedin.com/in/harsh-banka/) to see how his analytical rigor, research aptitude, and versatile engineering skills translate into impactful solutions.Connect with Harsh to discuss how his unique blend of cutting-edge AI research and hands-on development expertise can elevate your team."
`;

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
            model: 'gemini-2.0-flash-lite',
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