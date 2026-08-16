import { useState } from 'react'
import { User, Email } from '../types'
import { mockEmails } from '../data/mockEmails'
import Sidebar from '../components/Sidebar'
import EmailList from '../components/EmailList'
import EmailDetail from '../components/EmailDetail'
import Composer from '../components/Composer'
import Header from '../components/Header'

interface Props {
  user: User
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: Props) {
  const [emails, setEmails] = useState<Email[]>(mockEmails)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeFolder, setActiveFolder] = useState('inbox')
  const [showComposer, setShowComposer] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const selectedEmail = emails.find(e => e.id === selectedId) || null

  const filteredEmails = emails.filter(email => {
    // Folder filter
    if (activeFolder === 'starred' && !email.starred) return false
    if (activeFolder === 'spam' && !email.isSpam) return false
    if (activeFolder === 'inbox' && email.isSpam) return false
    if (activeFolder !== 'inbox' && activeFolder !== 'starred' && activeFolder !== 'spam') {
      if (email.category !== activeFolder) return false
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        email.subject.toLowerCase().includes(q) ||
        email.from.toLowerCase().includes(q) ||
        email.preview.toLowerCase().includes(q)
      )
    }
    return true
  })

  const handleSelectEmail = (id: string) => {
    setSelectedId(id)
    setEmails(prev =>
      prev.map(e => (e.id === id ? { ...e, read: true } : e))
    )
  }

  const toggleStar = (id: string) => {
    setEmails(prev =>
      prev.map(e => (e.id === id ? { ...e, starred: !e.starred } : e))
    )
  }

  return (
    <div className="h-screen flex flex-col bg-dark-950">
      <Header
        user={user}
        onLogout={onLogout}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCompose={() => setShowComposer(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeFolder={activeFolder}
          onFolderChange={setActiveFolder}
          emailCounts={{
            inbox: emails.filter(e => !e.isSpam).length,
            starred: emails.filter(e => e.starred).length,
            spam: emails.filter(e => e.isSpam).length,
          }}
        />

        <div className="flex flex-1 overflow-hidden">
          <EmailList
            emails={filteredEmails}
            selectedId={selectedId}
            onSelect={handleSelectEmail}
            onToggleStar={toggleStar}
          />

          <EmailDetail
            email={selectedEmail}
            onClose={() => setSelectedId(null)}
          />
        </div>
      </div>

      {showComposer && (
        <Composer onClose={() => setShowComposer(false)} />
      )}
    </div>
  )
}
