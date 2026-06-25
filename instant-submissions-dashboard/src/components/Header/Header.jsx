import { useState } from 'react'

/**
 * Header — InstantSubmissions
 *
 * Built nav-ready: `navItems` below is the single place to add routes as
 * the project grows. Swap the <a> tags for react-router's <Link> once
 * routing is wired up (see note at the bottom of this file).
 */

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Forms', href: '/forms' },
]

export const Header = ({ connectionStatus = 'connected' }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="border-b border-line bg-bg sticky top-0 z-20">
      <div className="max-w-[1180px] mx-auto h-14 flex items-center justify-between">

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
            <MenuIcon open={mobileOpen} />
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

const ConnectionPill = ({ status }) => {
  const isLive = status === 'connected'
  return (
    <div className="flex items-center gap-2 text-xs text-text-dim panel rounded-pill px-3 py-1.5">
      <span className={isLive ? 'status-dot' : 'w-1.5 h-1.5 rounded-full bg-warn'} />
      <span className="hidden sm:inline">{isLive ? 'connected' : 'reconnecting'}</span>
    </div>
  )
}

// Small mark echoing the "table gaining a column" idea from the dashboard —
// three bars of increasing height, the last one in the accent color, as if
// a new field just landed.
const LogoMark = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="11" width="4" height="7" rx="1" fill="#5C6660" />
    <rect x="8" y="7" width="4" height="11" rx="1" fill="#8A9690" />
    <rect x="14" y="2" width="4" height="16" rx="1" fill="#6FA383" />
  </svg>
)

const MenuIcon = ({ open }) => {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}



/*
  Wiring up react-router later:

  1. npm install react-router-dom
  2. Replace the <a href> tags above with <Link to>
  3. navItems already matches the shape react-router wants —
     { label, href } -> { label, to }, just rename the key.
*/