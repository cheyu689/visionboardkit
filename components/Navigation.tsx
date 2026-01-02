import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">✨</span>
            <span className="font-bold text-xl text-gray-900">Vision Board Kit</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/templates"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/ideas"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ideas Gallery
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" aria-label="Open menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
