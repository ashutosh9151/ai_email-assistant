export type EmailProvider = 'gmail' | 'outlook' | null;

export type Category = 'primary' | 'social' | 'promotions' | 'updates' | 'forums' | 'spam';

export type Priority = 'high' | 'medium' | 'low';

export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  category: Category;
  priority: Priority;
  isSpam: boolean;
  isPhishing: boolean;
  labels: string[];
}

export interface User {
  name: string;
  email: string;
  provider: EmailProvider;
  avatar?: string;
}

export interface AIResponse {
  summary?: string;
  reply?: string;
  composed?: string;
  translation?: string;
  category?: Category;
  priority?: Priority;
  isSpam?: boolean;
  isPhishing?: boolean;
}
