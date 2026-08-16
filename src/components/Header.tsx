import { Search, PenSquare, LogOut, Bell } from 'lucide-react'
import { User } from '../types'

interface Props {
  user: User
  onLogout: () => void
  searchQuery: string
  onSearchChange: (q: string) => void
  onCompose: () => void
}

export default function Header({ user, onLogout, searchQuery, onSearchChange, onCompose }: Props) {
  return (
    <header className="h-14 border-b border-slate-800 bg-dark-900/80 backdrop-blur flex items-center px-4 gap-4 shrink-0">
      <div className="flex items-center gap-2 min-w-[180px]">
        <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">AI</span>
        </div>
        <span className="font-semibold text-white hidden sm:block">Email Assistant</span>
      </div>

      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search emails..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full bg-dark-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-500"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onCompose}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <PenSquare className="w-4 h-4" />
          <span className="hidden sm:inline">Compose</span>
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
          <img
            src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
            alt={user.name}
            className="w-8 h-8 rounded-full bg-slate-700"
          />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white leading-tight">{user.name}</p>
            <p className="text-xs text-slate-500">{user.provider}</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
