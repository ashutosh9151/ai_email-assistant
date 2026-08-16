# AI Email Assistant

A modern, AI-powered email assistant that helps you organize, summarize, reply to, and protect your inbox.  
Built as a portfolio-ready demo with a polished UI and simulated AI features.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)

## Features

| Feature | Status | Description |
|---------|--------|-------------|
| Google & Outlook Login | Demo | Simulated OAuth login flow |
| AI Email Summarization | ✅ | One-click summary of any email |
| Smart Reply Generator | ✅ | Context-aware suggested replies |
| AI Email Composer | ✅ | Generate full emails from a short prompt |
| Inbox Categorization | ✅ | Primary, Social, Promotions, Updates, etc. |
| Spam & Phishing Detection | ✅ | Highlights dangerous emails with reasons |
| Priority Detection | ✅ | High / Medium / Low priority badges |
| Email Translation | ✅ | Translate email body (demo: Spanish) |
| Schedule Emails | Coming soon | UI placeholder ready |
| Auto Follow-up Reminders | Coming soon | UI placeholder ready |

> **Note**: This is a frontend demo. AI responses are simulated with realistic delays and content. Real Gmail/Outlook OAuth and LLM APIs can be plugged into the service layer.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State**: React hooks + localStorage (demo auth)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/ai-email-assistant.git
cd ai-email-assistant

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Framework Preset: **Vite**
4. Deploy

### Netlify

1. Connect the GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages

A workflow file is included. Enable GitHub Pages → Source: GitHub Actions.

## Project Structure

```
ai-email-assistant/
├── public/
├── src/
│   ├── components/     # UI components (Header, Sidebar, EmailList, etc.)
│   ├── data/           # Mock email data
│   ├── pages/          # Login & Dashboard
│   ├── services/       # AI service layer (easy to replace with real APIs)
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Extending to Real Integrations

The `src/services/aiService.ts` file is intentionally isolated. To go to production:

1. **Auth**: Replace mock login with Google Identity Services / Microsoft Authentication Library (MSAL)
2. **Email data**: Use Gmail API or Microsoft Graph API
3. **AI**: Call OpenAI, Grok, Claude, or any LLM for summarization, replies, and classification
4. **Backend**: Add a small serverless layer (Vercel Functions / Cloudflare Workers) to keep API keys secure

## License

MIT

---

Built for portfolio demonstration · Feels production-ready · Easy to extend
