import { useState } from 'react'
import { X, Sparkles, Loader2, Send } from 'lucide-react'
import { composeEmail } from '../services/aiService'

interface Props {
  onClose: () => void
}

export default function Composer({ onClose }: Props) {
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [aiPrompt, setAiPrompt] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAICompose = async () => {
    if (!aiPrompt.trim()) return
    setLoading(true)
    try {
      const result = await composeEmail(aiPrompt)
      // Extract subject if present
      const subjectMatch = result.match(/Subject: (.+)/)
      if (subjectMatch) {
        setSubject(subjectMatch[1])
        setBody(result.replace(/Subject: .+\n\n/, ''))
      } else {
        setBody(result)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="card w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700">
          <h2 className="font-semibold text-white">New Message</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-700 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          <input
            type="email"
            placeholder="To"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="w-full bg-transparent border-b border-slate-700 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full bg-transparent border-b border-slate-700 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
          />

          {/* AI Compose helper */}
          <div className="bg-primary-600/10 border border-primary-500/20 rounded-lg p-3">
            <p className="text-xs text-primary-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Compose
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Describe what you want to write..."
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                className="flex-1 bg-dark-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
              />
              <button
                onClick={handleAICompose}
                disabled={loading || !aiPrompt.trim()}
                className="btn-primary text-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Generate
              </button>
            </div>
          </div>

          <textarea
            placeholder="Write your message..."
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={10}
            className="w-full bg-dark-900 border border-slate-700 rounded-lg px-3 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 resize-none"
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-700 flex items-center justify-between">
          <p className="text-xs text-slate-500">Demo mode – emails are not actually sent</p>
          <button
            onClick={onClose}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
