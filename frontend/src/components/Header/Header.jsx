import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Forms', href: '/forms' },
]

export const Header = ({ connectionStatus = 'connected' }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-line bg-bg sticky top-0 z-20">
      {/* FIX: Swapped `max-w-[1180px] mx-auto` for `w-full px-4 md:px-6`
        so the header stretches naturally across the screen. 
      */}
      <div className="w-full px-4 md:px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoMark />
          <span className="text-[17px] font-semibold tracking-tight text-text">
            Instant<span className="text-accent">Submissions</span>
          </span>
        </a>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-text-dim hover:text-text px-3 py-1.5 rounded-md hover:bg-panel-2 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side: connection state + mobile toggle */}
        <div className="flex items-center gap-3">
          <ConnectionPill status={connectionStatus} />

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-text-dim hover:text-text p-1.5 rounded-md hover:bg-panel-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Nav — mobile */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-line px-6 py-2 flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-text-dim hover:text-text py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

export const ConnectionPill = ({ status }) => {
  const isLive = status === 'connected'
  return (
    <div className="flex items-center gap-2 text-xs text-text-dim panel rounded-pill px-3 py-1.5">
      <span className={isLive ? 'status-dot' : 'w-1.5 h-1.5 rounded-full bg-warn'} />
      <span className="hidden sm:inline">{isLive ? 'connected' : 'reconnecting'}</span>
    </div>
  )
}

export const LogoMark = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="11" width="4" height="7" rx="1" fill="#5C6660" />
    <rect x="8" y="7" width="4" height="11" rx="1" fill="#8A9690" />
    <rect x="14" y="2" width="4" height="16" rx="1" fill="#6FA383" />
  </svg>
)