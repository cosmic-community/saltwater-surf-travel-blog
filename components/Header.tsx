import Link from 'next/link'
import MobileMenu from '@/components/MobileMenu'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Stories' },
  { href: '/spots', label: 'Spots' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🌊</span>
          <span className="text-lg font-bold tracking-tight text-gray-900">Saltwater</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        <MobileMenu links={navLinks} />
      </div>
    </header>
  )
}