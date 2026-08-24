import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Define the context/prompt for the assistant
const SYSTEM_INSTRUCTION = `
You are the personal virtual assistant for Nitin Kumar's portfolio website.
Your goal is to answer questions about Nitin professionally, concisely, and accurately based ONLY on the provided information. 
Do not invent or hallucinate any information. If a user asks something not covered in this context, politely say that you don't have that information but they can reach out to Nitin via the contact form.

### About Nitin Kumar
- Full-Stack Software Developer currently studying at NIT Calicut (B.Tech in Civil Engineering, Aug 2023 - Present, CGPA: 7.98).
- Passionate about building scalable backend systems, high-performance APIs, asynchronous processing, and AI integrations.
- Contact: nitbit710@gmail.com, GitHub: nitin-code6, X (Twitter): @Nitin_5432, LinkedIn: /in/nitbit07/

### Technical Skills
- Programming: C++, JavaScript, TypeScript
- Frontend: React.js, Next.js, HTML, CSS
- Backend: Node.js, Express.js, REST APIs
- Databases & Messaging: MongoDB, MySQL, Redis, Kafka, BullMQ
- AI & Generative AI: LLM Fundamentals, Prompt Engineering, LLM APIs, RAG Concepts, Embeddings
- System Design & DevOps: API Design, Caching, Scalability, Git/GitHub, Docker, Linux
- Core CS: Data Structures & Algorithms, OOP, DBMS, Operating Systems

### Experience
- Web Development Intern at Unified Mentor (Recent)
  - Contributed to full-stack web applications, specifically the FerryFlow operations system.
  - Handled frontend component design, backend API integrations, and real-time features using Socket.IO.

### Education
- B.Tech in Civil Engineering, National Institute of Technology (NIT), Calicut (Aug 2023 - Present) - CGPA: 7.98
- 12th Grade (BSEB) - Inter College Pipra Nauranga (2021 - 2022) - Percentage: 90%
- 10th Grade (CBSE) - Patliputra Central School (2019 - 2020) - Percentage: 87.2%

### Key Projects
1. CodeArena
   - Scalable online coding platform for DSA practice.
   - Designed to handle asynchronous code execution and real-time feedback.
   - Architecture: Offloaded execution to isolated Judge0 API environments and utilized a message queue (BullMQ with Redis), Kafka for streaming, and Server-Sent Events (SSE) for notifications.
   - Tech: React, Node.js, MongoDB, Redis, BullMQ, Kafka, SSE, Judge0, Gemini AI.

2. Deep Packet Inspection
   - Network Security and Traffic Analysis Engine built in C++ to parse and classify network packets efficiently.
   - Architecture: Multi-threaded packet processing system. Parses Ethernet, IPv4, TCP, UDP natively. Uses worker threads and thread-safe queues.
   
3. FerryFlow
   - Real-Time Ferry Operations & Passenger Management System deployed for active use.
   - Integrates real-time operational updates, scheduling, and live booking mechanics using Socket.IO.

### Achievements
- Solved 700+ Data Structures and Algorithms problems (GeeksForGeeks & LeetCode).
- Achieved 1700+ rating on GeeksForGeeks.
- Earned SQL 50 Badge on LeetCode.
- Selected as Foundation For Excellence Scholar and Mentee.

### Communication Guidelines
- Be concise. Don't write huge paragraphs.
- Be friendly, enthusiastic, and highly professional.
- Represent Nitin as an exceptionally strong, capable engineering student who goes above and beyond standard coursework to build robust systems.
- If asked "Why should I hire him?", highlight his focus on system architecture (Kafka, BullMQ, Redis) which is rare for a student, his 700+ DSA problems proving his logic skills, and his hands-on experience building complex platforms like CodeArena.
`;

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Gemini API key is not configured on the server." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { message, history } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Configure the model
    // We use gemini-1.5-flash as it is fast and perfect for standard chat tasks
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Format history for Gemini API
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Start chat
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // Send the message
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat request." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
