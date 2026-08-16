import { Star, AlertTriangle, ShieldAlert } from 'lucide-react'
import { Email } from '../types'

interface Props {
  emails: Email[]
  selectedId: string | null
  onSelect: (id: string) => void
  onToggleStar: (id: string) => void
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export default function EmailList({ emails, selectedId, onSelect, onToggleStar }: Props) {
  if (emails.length === 0) {
    return (
      <div className="w-80 border-r border-slate-800 flex items-center justify-center text-slate-500 text-sm">
        No emails in this folder
      </div>
    )
  }

  return (
    <div className="w-80 border-r border-slate-800 overflow-y-auto shrink-0">
      {emails.map(email => {
        const isSelected = selectedId === email.id
        return (
          <div
            key={email.id}
            onClick={() => onSelect(email.id)}
            className={`px-4 py-3 border-b border-slate-800/70 cursor-pointer transition-colors ${
              isSelected
                ? 'bg-primary-600/15 border-l-2 border-l-primary-500'
                : 'hover:bg-slate-800/50 border-l-2 border-l-transparent'
            } ${!email.read ? 'bg-slate-800/30' : ''}`}
          >
            <div className="flex items-start gap-2">
              <button
                onClick={e => {
                  e.stopPropagation()
                  onToggleStar(email.id)
                }}
                className="mt-0.5 shrink-0"
              >
                <Star
                  className={`w-4 h-4 ${
                    email.starred
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600 hover:text-slate-400'
                  }`}
                />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span
                    className={`text-sm truncate ${
                      !email.read ? 'font-semibold text-white' : 'text-slate-300'
                    }`}
                  >
                    {email.from}
                  </span>
                  <span className="text-xs text-slate-500 shrink-0">
                    {formatDate(email.date)}
                  </span>
                </div>

                <p
                  className={`text-sm truncate mb-0.5 ${
                    !email.read ? 'text-slate-200' : 'text-slate-400'
                  }`}
                >
                  {email.subject}
                </p>

                <p className="text-xs text-slate-500 truncate">{email.preview}</p>

                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  {email.priority === 'high' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                      High Priority
                    </span>
                  )}
                  {email.isPhishing && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 flex items-center gap-0.5">
                      <ShieldAlert className="w-3 h-3" /> Phishing
                    </span>
                  )}
                  {email.isSpam && !email.isPhishing && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> Spam
                    </span>
                  )}
                  {email.category !== 'primary' && !email.isSpam && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 capitalize">
                      {email.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
