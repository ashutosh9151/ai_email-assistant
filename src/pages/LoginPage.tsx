import { Mail, Shield, Zap, Brain } from 'lucide-react'
import { User, EmailProvider } from '../types'

interface Props {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: Props) {
  const handleProviderLogin = (provider: EmailProvider) => {
    // Simulated OAuth login – in production this would redirect to Google/Microsoft OAuth
    const mockUsers: Record<string, User> = {
      gmail: {
        name: 'Alex Johnson',
        email: 'alex.johnson@gmail.com',
        provider: 'gmail',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      },
      outlook: {
        name: 'Alex Johnson',
        email: 'alex.johnson@outlook.com',
        provider: 'outlook',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      },
    }

    if (provider && mockUsers[provider]) {
      onLogin(mockUsers[provider])
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-dark-950 via-dark-900 to-primary-950">
      <div className="max-w-md w-full">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-500/30 mb-4">
            <Brain className="w-8 h-8 text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Email Assistant</h1>
          <p className="text-slate-400">
            Smart organization, replies, summaries & protection for your inbox
          </p>
        </div>

        {/* Login Card */}
        <div className="card p-8 space-y-4">
          <button
            onClick={() => handleProviderLogin('gmail')}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-medium py-3 px-4 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
              <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleProviderLogin('outlook')}
            className="w-full flex items-center justify-center gap-3 bg-[#0078D4] hover:bg-[#106EBE] text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 7.387v10.478c0 .23-.08.424-.238.576a.79.79 0 0 1-.578.238h-8.254v-6.37l1.332 1.002a.54.54 0 0 0 .318.1.52.52 0 0 0 .317-.1l6.37-4.78a.43.43 0 0 0 .19-.36.42.42 0 0 0-.19-.36l-6.37-4.78a.52.52 0 0 0-.317-.1.54.54 0 0 0-.318.1L14.93 5.87V1.5h8.254c.23 0 .424.08.578.238a.79.79 0 0 1 .238.576v5.073zM0 1.5v21h12.93V1.5H0zm6.465 16.5H3.5v-3h2.965v3zm0-4.5H3.5v-3h2.965v3zm0-4.5H3.5v-3h2.965v3zm5.465 9H7.5v-3h4.43v3zm0-4.5H7.5v-3h4.43v3zm0-4.5H7.5v-3h4.43v3z"/>
            </svg>
            Continue with Outlook
          </button>

          <p className="text-center text-xs text-slate-500 pt-2">
            Demo mode – no real OAuth. Click either button to enter the app.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2 text-slate-400">
            <Zap className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
            <span>Smart replies & composition</span>
          </div>
          <div className="flex items-start gap-2 text-slate-400">
            <Mail className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
            <span>Auto categorization</span>
          </div>
          <div className="flex items-start gap-2 text-slate-400">
            <Shield className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
            <span>Spam & phishing detection</span>
          </div>
          <div className="flex items-start gap-2 text-slate-400">
            <Brain className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
            <span>AI summaries & translation</span>
          </div>
        </div>
      </div>
    </div>
  )
}
