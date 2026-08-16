import { useState } from 'react'
import {
  X,
  Star,
  Reply,
  Forward,
  Trash2,
  Sparkles,
  Languages,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Loader2,
} from 'lucide-react'
import { Email } from '../types'
import {
  summarizeEmail,
  generateSmartReply,
  translateEmail,
  detectSpamAndPhishing,
} from '../services/aiService'

interface Props {
  email: Email | null
  onClose: () => void
}

export default function EmailDetail({ email, onClose }: Props) {
  const [summary, setSummary] = useState<string | null>(null)
  const [smartReply, setSmartReply] = useState<string | null>(null)
  const [translation, setTranslation] = useState<string | null>(null)
  const [spamInfo, setSpamInfo] = useState<{ isSpam: boolean; isPhishing: boolean; reason: string } | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        <div className="text-center">
          <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>Select an email to view details & AI tools</p>
        </div>
      </div>
    )
  }

  const runAI = async (action: string) => {
    setLoading(action)
    try {
      if (action === 'summary') {
        const result = await summarizeEmail(email)
        setSummary(result)
      } else if (action === 'reply') {
        const result = await generateSmartReply(email)
        setSmartReply(result)
      } else if (action === 'translate') {
        const result = await translateEmail(email.body, 'Spanish')
        setTranslation(result)
      } else if (action === 'security') {
        const result = await detectSpamAndPhishing(email)
        setSpamInfo(result)
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="h-12 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0">
        <button onClick={onClose} className="p-1.5 rounded hover:bg-slate-800 text-slate-400 lg:hidden">
          <X className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-slate-800 text-slate-400" title="Reply">
          <Reply className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-slate-800 text-slate-400" title="Forward">
          <Forward className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded hover:bg-slate-800 text-slate-400" title="Delete">
          <Trash2 className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <Star className={`w-4 h-4 ${email.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {/* Subject & meta */}
          <h1 className="text-xl font-semibold text-white mb-3">{email.subject}</h1>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary-600/30 flex items-center justify-center text-primary-300 font-medium">
              {email.from.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {email.from}{' '}
                <span className="text-slate-500 font-normal">&lt;{email.fromEmail}&gt;</span>
              </p>
              <p className="text-xs text-slate-500">
                {new Date(email.date).toLocaleString()} · {email.category}
                {email.priority === 'high' && (
                  <span className="ml-2 text-red-400">· High Priority</span>
                )}
              </p>
            </div>
          </div>

          {/* Security badges */}
          {(email.isPhishing || email.isSpam) && (
            <div className={`mb-4 p-3 rounded-lg flex items-start gap-2 ${
              email.isPhishing ? 'bg-red-500/10 border border-red-500/30' : 'bg-amber-500/10 border border-amber-500/30'
            }`}>
              {email.isPhishing ? (
                <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <p className={`text-sm font-medium ${email.isPhishing ? 'text-red-400' : 'text-amber-400'}`}>
                  {email.isPhishing ? 'Phishing Detected' : 'Marked as Spam'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {email.isPhishing
                    ? 'This email uses urgent language and a suspicious domain. Do not click links or share credentials.'
                    : 'This message has been classified as spam.'}
                </p>
              </div>
            </div>
          )}

          {/* Email body */}
          <div className="prose prose-invert prose-sm max-w-none mb-8">
            <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed">
              {email.body}
            </pre>
          </div>

          {/* AI Tools */}
          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-400" />
              AI Tools
            </h3>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => runAI('summary')}
                disabled={!!loading}
                className="btn-secondary text-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'summary' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Summarize
              </button>
              <button
                onClick={() => runAI('reply')}
                disabled={!!loading}
                className="btn-secondary text-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'reply' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Reply className="w-3.5 h-3.5" />}
                Smart Reply
              </button>
              <button
                onClick={() => runAI('translate')}
                disabled={!!loading}
                className="btn-secondary text-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'translate' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Languages className="w-3.5 h-3.5" />}
                Translate
              </button>
              <button
                onClick={() => runAI('security')}
                disabled={!!loading}
                className="btn-secondary text-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading === 'security' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ShieldAlert className="w-3.5 h-3.5" />}
                Security Check
              </button>
            </div>

            {/* AI Results */}
            {summary && (
              <div className="card p-4 mb-3">
                <p className="text-xs font-medium text-primary-400 mb-1">AI Summary</p>
                <p className="text-sm text-slate-300">{summary}</p>
              </div>
            )}

            {smartReply && (
              <div className="card p-4 mb-3">
                <p className="text-xs font-medium text-primary-400 mb-1">Suggested Reply</p>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{smartReply}</pre>
                <button className="mt-3 btn-primary text-xs">Use this reply</button>
              </div>
            )}

            {translation && (
              <div className="card p-4 mb-3">
                <p className="text-xs font-medium text-primary-400 mb-1">Translation (Spanish)</p>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-sans">{translation}</pre>
              </div>
            )}

            {spamInfo && (
              <div className={`card p-4 mb-3 ${spamInfo.isPhishing ? 'border-red-500/40' : ''}`}>
                <p className="text-xs font-medium text-primary-400 mb-1">Security Analysis</p>
                <p className="text-sm text-slate-300">
                  Spam: {spamInfo.isSpam ? 'Yes' : 'No'} · Phishing: {spamInfo.isPhishing ? 'Yes' : 'No'}
                </p>
                <p className="text-xs text-slate-500 mt-1">{spamInfo.reason}</p>
              </div>
            )}
          </div>

          {/* Future features teaser */}
          <div className="mt-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Coming soon: Schedule send · Auto follow-up reminders · Multi-language reply
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
