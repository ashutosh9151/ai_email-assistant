import { Email } from '../types';

export const mockEmails: Email[] = [
  {
    id: '1',
    from: 'Sarah Chen',
    fromEmail: 'sarah.chen@techcorp.com',
    subject: 'Q3 Product Roadmap Review – Action Required',
    preview: 'Hi team, please review the attached roadmap before our meeting on Thursday...',
    body: `Hi team,

Please review the attached Q3 product roadmap before our meeting on Thursday at 2 PM.

Key points to discuss:
1. Feature prioritization for the new dashboard
2. Timeline for mobile app v2
3. Resource allocation across teams

Let me know if you have any blockers.

Best regards,
Sarah Chen
Product Manager`,
    date: '2026-08-10T09:15:00',
    read: false,
    starred: true,
    category: 'primary',
    priority: 'high',
    isSpam: false,
    isPhishing: false,
    labels: ['work', 'urgent'],
  },
  {
    id: '2',
    from: 'LinkedIn',
    fromEmail: 'messages-noreply@linkedin.com',
    subject: 'You have 3 new connection requests',
    preview: 'John Doe, Priya Sharma and 1 other want to connect with you...',
    body: `You have 3 new connection requests waiting for you on LinkedIn.

John Doe – Senior Software Engineer at Google
Priya Sharma – Product Designer at Figma
Alex Rivera – Engineering Manager at Stripe

View and respond to these requests.`,
    date: '2026-08-10T08:42:00',
    read: true,
    starred: false,
    category: 'social',
    priority: 'low',
    isSpam: false,
    isPhishing: false,
    labels: [],
  },
  {
    id: '3',
    from: 'Amazon',
    fromEmail: 'order-update@amazon.com',
    subject: 'Your order #112-3847291 has shipped',
    preview: 'Good news! Your package is on the way. Expected delivery: Aug 12...',
    body: `Hello,

Your order #112-3847291 has shipped and is on its way.

Expected delivery date: August 12, 2026
Tracking number: 1Z999AA10123456784

Thank you for shopping with us.`,
    date: '2026-08-09T16:30:00',
    read: true,
    starred: false,
    category: 'updates',
    priority: 'medium',
    isSpam: false,
    isPhishing: false,
    labels: ['shopping'],
  },
  {
    id: '4',
    from: 'Security Alert',
    fromEmail: 'security@suspicious-domain.xyz',
    subject: 'URGENT: Your account will be suspended in 24 hours',
    preview: 'We detected unusual activity. Click here immediately to verify your identity...',
    body: `Dear User,

We have detected unusual login activity on your account from an unrecognized device.

Your account will be SUSPENDED within 24 hours unless you verify your identity by clicking the link below:

http://verify-account-now.suspicious-domain.xyz/login

Failure to act will result in permanent account deletion.

Security Team`,
    date: '2026-08-09T14:05:00',
    read: false,
    starred: false,
    category: 'spam',
    priority: 'high',
    isSpam: true,
    isPhishing: true,
    labels: ['phishing'],
  },
  {
    id: '5',
    from: 'Dr. Emily Watson',
    fromEmail: 'emily.watson@university.edu',
    subject: 'Research collaboration proposal',
    preview: 'I came across your recent paper on distributed systems and would love to discuss a potential collaboration...',
    body: `Dear Colleague,

I recently read your paper on distributed systems optimization and found it highly insightful.

I am leading a research group focused on similar problems and believe there could be strong synergies between our work.

Would you be available for a short call next week to explore a potential collaboration?

Best regards,
Dr. Emily Watson
Associate Professor
Department of Computer Science`,
    date: '2026-08-08T11:20:00',
    read: false,
    starred: true,
    category: 'primary',
    priority: 'high',
    isSpam: false,
    isPhishing: false,
    labels: ['research', 'opportunity'],
  },
  {
    id: '6',
    from: 'Newsletter Weekly',
    fromEmail: 'digest@techweekly.io',
    subject: 'This Week in AI: GPT-5 rumors, new open-source models & more',
    preview: 'The latest developments in artificial intelligence you need to know...',
    body: `This Week in AI

1. Rumors of GPT-5 training completion
2. New open-source multimodal model released
3. Major cloud providers drop inference prices
4. Research highlights from ICML

Read the full digest on our website.`,
    date: '2026-08-08T07:00:00',
    read: true,
    starred: false,
    category: 'promotions',
    priority: 'low',
    isSpam: false,
    isPhishing: false,
    labels: ['newsletter'],
  },
  {
    id: '7',
    from: 'HR Department',
    fromEmail: 'hr@company.com',
    subject: 'Reminder: Complete your annual compliance training',
    preview: 'Please complete the mandatory compliance modules by August 15...',
    body: `Hello,

This is a friendly reminder that the annual compliance training must be completed by August 15, 2026.

Modules remaining:
- Data Privacy
- Code of Conduct
- Information Security

Please log into the learning portal to finish them.

Thank you,
HR Team`,
    date: '2026-08-07T10:45:00',
    read: true,
    starred: false,
    category: 'updates',
    priority: 'medium',
    isSpam: false,
    isPhishing: false,
    labels: ['hr'],
  },
  {
    id: '8',
    from: 'Carlos Rivera',
    fromEmail: 'carlos.r@startup.io',
    subject: 'Follow-up on our conversation last week',
    preview: 'Just wanted to check in regarding the partnership discussion we had...',
    body: `Hi,

Just following up on our conversation from last week about a potential partnership.

I’ve attached a short one-pager outlining the mutual benefits we discussed.

Looking forward to your thoughts.

Best,
Carlos`,
    date: '2026-08-06T15:10:00',
    read: false,
    starred: false,
    category: 'primary',
    priority: 'medium',
    isSpam: false,
    isPhishing: false,
    labels: ['partnership'],
  },
];
