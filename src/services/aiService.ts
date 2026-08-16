import { Email, AIResponse, Category, Priority } from '../types';

/**
 * Simulated AI service.
 * In a real application these would call an LLM (OpenAI, Grok, Claude, etc.)
 * and/or specialized models for classification & phishing detection.
 */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function summarizeEmail(email: Email): Promise<string> {
  await delay(800 + Math.random() * 600);

  if (email.isPhishing) {
    return '⚠️ This email appears to be a phishing attempt. It uses urgency tactics and requests you click a suspicious link. Do not interact with any links or provide credentials.';
  }

  const summaries: Record<string, string> = {
    '1': 'Sarah is requesting review of the Q3 product roadmap before Thursday’s 2 PM meeting. Key discussion points: dashboard features, mobile app v2 timeline, and resource allocation.',
    '2': 'LinkedIn notification: 3 new connection requests from John Doe (Google), Priya Sharma (Figma), and Alex Rivera (Stripe).',
    '3': 'Amazon order #112-3847291 has shipped. Expected delivery August 12. Tracking number provided.',
    '5': 'Dr. Emily Watson (University) proposes a research collaboration after reading your distributed systems paper. She requests a short call next week.',
    '6': 'Weekly AI newsletter covering GPT-5 rumors, new open-source models, cloud pricing changes, and ICML research highlights.',
    '7': 'HR reminder: complete mandatory annual compliance training (Data Privacy, Code of Conduct, InfoSec) by August 15.',
    '8': 'Carlos Rivera is following up on a partnership discussion from last week and has attached a one-pager.',
  };

  return summaries[email.id] || `Summary: ${email.subject}. From ${email.from}. ${email.preview}`;
}

export async function generateSmartReply(email: Email): Promise<string> {
  await delay(900 + Math.random() * 700);

  if (email.isPhishing) {
    return 'I recommend not replying to this email. It has been flagged as a potential phishing attempt.';
  }

  const replies: Record<string, string> = {
    '1': `Hi Sarah,\n\nThanks for sharing the Q3 roadmap. I’ve reviewed the key points and will come prepared for Thursday’s meeting with feedback on prioritization and resourcing.\n\nLooking forward to the discussion.\n\nBest regards`,
    '5': `Dear Dr. Watson,\n\nThank you for reaching out and for your kind words about the paper. I would be very interested in exploring a collaboration.\n\nI’m available next week on Tuesday or Thursday afternoon. Please let me know what works best for you.\n\nBest regards`,
    '8': `Hi Carlos,\n\nThanks for following up and for sharing the one-pager. I’ve reviewed it and overall the opportunity looks promising.\n\nI’ll get back to you by end of week with more detailed thoughts.\n\nBest,\n`,
    '7': `Hi HR Team,\n\nThank you for the reminder. I will complete the remaining compliance modules this week.\n\nBest regards`,
  };

  return replies[email.id] || `Hi ${email.from.split(' ')[0]},\n\nThank you for your email regarding "${email.subject}". I’ll review this and get back to you shortly.\n\nBest regards`;
}

export async function composeEmail(prompt: string): Promise<string> {
  await delay(1000 + Math.random() * 800);

  return `Subject: ${prompt.slice(0, 60)}${prompt.length > 60 ? '...' : ''}

Dear Recipient,

${prompt}

I look forward to your response.

Best regards,
[Your Name]`;
}

export async function translateEmail(text: string, targetLang: string = 'Spanish'): Promise<string> {
  await delay(700 + Math.random() * 500);

  // Simulated translations for demo
  if (targetLang === 'Spanish') {
    return `[Translated to Spanish]\n\n${text}\n\n---\n(Nota: Esta es una traducción simulada para demostración. En producción se usaría un servicio real de traducción o un LLM.)`;
  }
  return `[Translated to ${targetLang}]\n\n${text}\n\n---\n(Simulated translation for demo purposes.)`;
}

export async function categorizeEmail(email: Email): Promise<Category> {
  await delay(400);
  return email.category;
}

export async function detectPriority(email: Email): Promise<Priority> {
  await delay(400);
  return email.priority;
}

export async function detectSpamAndPhishing(email: Email): Promise<{ isSpam: boolean; isPhishing: boolean; reason: string }> {
  await delay(500);

  if (email.isPhishing) {
    return {
      isSpam: true,
      isPhishing: true,
      reason: 'Contains urgency language, suspicious domain, and requests credential verification via external link.',
    };
  }
  if (email.isSpam) {
    return {
      isSpam: true,
      isPhishing: false,
      reason: 'Classified as promotional/spam content.',
    };
  }
  return {
    isSpam: false,
    isPhishing: false,
    reason: 'No spam or phishing indicators detected.',
  };
}

export async function fullAIAnalysis(email: Email): Promise<AIResponse> {
  const [summary, reply, spamCheck] = await Promise.all([
    summarizeEmail(email),
    generateSmartReply(email),
    detectSpamAndPhishing(email),
  ]);

  return {
    summary,
    reply,
    category: email.category,
    priority: email.priority,
    isSpam: spamCheck.isSpam,
    isPhishing: spamCheck.isPhishing,
  };
}
