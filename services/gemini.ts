import { GoogleGenAI } from "@google/genai";

// HARDCODED DEMO KEY
const DEFAULT_API_KEY = "AIzaSyAcYOodwXwiaNYbTXLTh2h0-EUCPZltYUI";

let aiClient: GoogleGenAI | null = null;

export const initGemini = (apiKey: string = DEFAULT_API_KEY) => {
  try {
    aiClient = new GoogleGenAI({ apiKey });
    console.log("Aura AI: Initialized with system key.");
  } catch (e) {
    console.error("Aura AI: Initialization failed", e);
  }
};

// Auto-initialize immediately
initGemini();

// 1. Invisible Mental Health: Journal Sentiment Analysis
export const analyzeJournalEntry = async (text: string) => {
  if (!aiClient) initGemini(); // Retry init if null
  if (!aiClient) return { sentiment: 'neutral', response: "AI Offline. Good job writing!" };

  const prompt = `
    You are Aura, an empathetic, non-clinical student companion.
    User Entry: "${text.substring(0, 1000)}"
    
    Task:
    1. Analyze sentiment (positive, neutral, negative, critical).
    2. Provide a 2-sentence supportive response. NOT advice. Just validation.
    
    JSON Output: { "sentiment": "string", "response": "string" }
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("AI Analysis Failed", e);
    return { sentiment: 'neutral', response: "Thanks for sharing. Writing is a great step." };
  }
};

// 2. Peer Safety: Real-time Chat Moderation
export const moderateMessage = async (text: string) => {
    if (!aiClient) initGemini();
    if (!aiClient) return { flagged: false };

    const prompt = `
      Task: Moderate this student chat message for bullying, self-harm, or toxicity.
      Message: "${text}"
      JSON Output: { "flagged": boolean, "reason": "string or null" }
    `;

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) {
        return { flagged: false };
    }
};

// 3. Peer Wisdom: Collective Intelligence Extraction
export const generateWisdomInsights = async (messages: string[]) => {
  if (!aiClient) initGemini();
  if (!aiClient) return { 
    themes: ['Academic Pressure', 'Sleep Deprivation', 'Future Anxiety'], 
    sentiment: 0.35, 
    recommendation: "Initiate a group study planner session and share sleep hygiene tips." 
  };

  const recentMessages = messages.join("\n").substring(0, 5000); // Safety cap

  const prompt = `
    You are the "Peer Wisdom Extraction Engine".
    Analyze these anonymous student chat messages to extract collective intelligence for a Peer Mentor.
    
    Messages: "${recentMessages}"
    
    Task:
    1. Identify 3 dominant emerging themes (e.g., "Fear of Failure", "Imposter Syndrome").
    2. Calculate collective sentiment score (0.0 = Crisis, 1.0 = Thriving).
    3. Generate ONE high-impact, non-clinical intervention strategy for the mentor.
    
    Constraint: DO NOT reveal specific user data. Summarize patterns only.
    
    JSON Output: { "themes": ["string"], "sentiment": number, "recommendation": "string" }
  `;

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text || '{}');
  } catch (e) {
    console.error("Wisdom Extraction Failed", e);
    return { themes: ['Data Unavailable'], sentiment: 0.5, recommendation: "Check connection." };
  }
};

// 4. Future-Self Simulator (Enhanced)
export const generateFutureSelf = async (data: { major: string, goal: string, obstacle: string }) => {
    if (!aiClient) initGemini();
    // Better mock data for demo purposes when AI is offline
    if (!aiClient) return [
        { 
            type: 'stable',
            title: "The Persistent Path", 
            narrative: "By consistently tackling small tasks, you pass your exams and graduate with a solid GPA. You find a junior role that offers mentorship.", 
            confidenceScore: 85,
            keyMilestone: "Passing the hardest semester"
        },
        { 
            type: 'growth',
            title: "The Network Effect", 
            narrative: "You turn your struggle into a conversation starter. You find a study group that eventually becomes your startup co-founders.", 
            confidenceScore: 72,
            keyMilestone: "Leading a student project"
        },
        { 
            type: 'moonshot',
            title: "The Breakthrough", 
            narrative: "The specific problem you're stuck on becomes your thesis topic. You develop a novel solution that gets published.", 
            confidenceScore: 45,
            keyMilestone: "First Research Publication"
        }
    ];

    const prompt = `
      Context: A student studying ${data.major} who wants to become a ${data.goal} is currently worried about: "${data.obstacle}".
      
      Task: Generate 3 DISTINCT future trajectories based on this anxiety:
      1. "Stable": Realistic, steady progress overcoming the obstacle.
      2. "Growth": Using the obstacle as a learning pivot to something better.
      3. "Moonshot": A high-risk, high-reward outcome where they master this obstacle completely.
      
      JSON Output: [ 
        { 
            "type": "stable" | "growth" | "moonshot",
            "title": "Short catchy title",
            "narrative": "2 sentences describing the outcome in the second person (You...)", 
            "confidenceScore": number (0-100),
            "keyMilestone": "Short string"
        } 
      ]
    `;

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        return JSON.parse(response.text || '[]');
    } catch (e) {
        console.error("Future Self Gen Failed", e);
        return [];
    }
};

// 5. Sleep Pattern Analysis (Predictive)
export const analyzeSleepPatterns = async (logs: any[]) => {
    if (!aiClient) initGemini();
    if (!aiClient) return null;

    const recentLogs = logs.slice(-7).map(l => ({ hours: l.hours, quality: l.quality, date: l.date }));
    
    const prompt = `
      Analyze these sleep logs (last 7 days): ${JSON.stringify(recentLogs)}.
      Ideal sleep is 8 hours.
      
      Task:
      1. Calculate sleep debt (assuming 8h/night ideal).
      2. Predict stress level for the next 24h (Low/Medium/High/Critical).
      3. Provide a short, predictive alert about cognitive performance.
      
      JSON Output: { "debt": number, "stressLevel": "string", "alert": "string" }
    `;

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        return JSON.parse(response.text || '{}');
    } catch (e) {
        console.error("Sleep Analysis Failed", e);
        return null;
    }
};

// 6. Mentor Impact Audit (NEW)
export const generateMentorImpactReport = async (interactions: string[]) => {
  if (!aiClient) initGemini();
  // Fallback demo data
  if (!aiClient) return {
    score: 85,
    level: "Guardian",
    strengths: ["Active Listening", "Crisis De-escalation"],
    improvements: ["Try to ask more open-ended questions", "Avoid offering solutions too quickly"],
    burnoutWarning: false
  };

  const logs = interactions.join("\n").substring(0, 8000);

  const prompt = `
    Role: Supervisor for Student Peer Mentors.
    Data: The following are recent chat messages sent by a Peer Mentor to students.
    "${logs}"

    Task: Evaluate the mentor's effectiveness based on 3 criteria: Empathy, Clarity, and Safety (knowing when to escalate).
    
    1. Assign an 'Impact Score' (0-100).
    2. Determine Level: 'Novice' (<60), 'Guardian' (60-85), or 'Architect' (>85).
    3. Identify 2 key strengths.
    4. Provide 2 specific, actionable improvements for their communication style.
    5. Detect if the mentor sounds fatigued/cynical (Burnout Warning).

    JSON Output: { 
      "score": number, 
      "level": "string", 
      "strengths": ["string"], 
      "improvements": ["string"],
      "burnoutWarning": boolean
    }
  `;

  try {
      // Changed to gemini-2.0-flash to avoid 404 on Pro model if not available
      const response = await aiClient.models.generateContent({
          model: 'gemini-2.0-flash', 
          contents: prompt,
          config: { responseMimeType: 'application/json' }
      });
      return JSON.parse(response.text || '{}');
  } catch (e) {
      console.error("Mentor Impact Analysis Failed", e);
      return {
        score: 0,
        level: "Novice",
        strengths: ["N/A"],
        improvements: ["Analysis failed due to connection."],
        burnoutWarning: false
      };
  }
};

// 7. AI Companion: Multilingual Chat
export const generateChatResponse = async (history: {role: 'user'|'model', parts: {text: string}[]}[], newMessage: string) => {
    if (!aiClient) initGemini();
    if (!aiClient) return "Connection weak. Bolo, kya haal hai?";

    const systemInstruction = `
      You are Aura, a supportive, cool, and intelligent student companion.
      
      CORE LINGUISTIC RULES (STRICT):
      1. **Match the User's Language & Script Exactly**:
         - If user speaks English -> Reply English.
         - If user speaks Hindi (Devanagari) -> Reply Hindi (Devanagari).
         - **If user speaks HINGLISH (Hindi in Latin script) -> YOU MUST REPLY IN HINGLISH.**
         
      2. **Hinglish Specifics**:
         - Input: "Sun nah yr" -> Output: "Haan bol, kya hua?" (Casual, friendly).
         - Input: "Assignment complete nahi ho raha" -> Output: "Tension mat le, saath mein break down karte hain."
         - Do NOT translate Hinglish to formal English. Keep the 'vibe' same.
         - Use words like: 'yaar', 'tension', 'chill', 'scene', 'pakka', 'matlab'.

      PERSONA:
      - You are a peer/friend, not a robot or professor.
      - Be empathetic but chill.
      - Keep responses concise (under 3 sentences usually).
      
      SAFETY:
      - If a user mentions self-harm, gently guide them to professional help but stay supportive.
    `;

    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [...history, { role: 'user', parts: [{ text: newMessage }] }],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.9, // Higher temperature for more natural/casual speech
            }
        });
        return response.text;
    } catch (e) {
        console.error("Chat Response Failed", e);
        return "Network issue hai yaar. Ek baar refresh karke try kar.";
    }
};

// 8. AI Chat Title Generator
export const generateChatTitle = async (firstMessage: string) => {
    if (!aiClient) initGemini();
    try {
        const response = await aiClient.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `Generate a very short title (max 4 words) for a conversation starting with: "${firstMessage}". No quotes. Keep it mixed language if input is Hinglish.`,
        });
        return response.text.trim();
    } catch {
        return "New Conversation";
    }
};