import {
  Inbox,
  Star,
  AlertTriangle,
  Users,
  Tag,
  Megaphone,
  MessageSquare,
  Settings,
} from 'lucide-react'

interface Props {
  activeFolder: string
  onFolderChange: (folder: string) => void
  emailCounts: {
    inbox: number
    starred: number
    spam: number
  }
}

const folders = [
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'starred', label: 'Starred', icon: Star },
  { id: 'primary', label: 'Primary', icon: MessageSquare },
  { id: 'social', label: 'Social', icon: Users },
  { id: 'promotions', label: 'Promotions', icon: Megaphone },
  { id: 'updates', label: 'Updates', icon: Tag },
  { id: 'spam', label: 'Spam & Phishing', icon: AlertTriangle },
]

export default function Sidebar({ activeFolder, onFolderChange, emailCounts }: Props) {
  const getCount = (id: string) => {
    if (id === 'inbox') return emailCounts.inbox
    if (id === 'starred') return emailCounts.starred
    if (id === 'spam') return emailCounts.spam
    return null
  }

  return (
    <aside className="w-56 border-r border-slate-800 bg-dark-900/50 flex flex-col shrink-0">
      <nav className="flex-1 p-3 space-y-1">
        {folders.map(folder => {
          const Icon = folder.icon
          const isActive = activeFolder === folder.id
          const count = getCount(folder.id)

          return (
            <button
              key={folder.id}
              onClick={() => onFolderChange(folder.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-primary-600/20 text-primary-400 font-medium'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{folder.label}</span>
              {count !== null && count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-primary-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="p-3 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </aside>
  )
}
