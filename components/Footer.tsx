import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">✨</span>
              <span className="font-bold text-lg text-gray-900">Vision Board Kit</span>
            </div>
            <p className="text-gray-600 text-sm">
              Create your perfect vision board in just 30 minutes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="text-gray-600 hover:text-gray-900 text-sm">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/ideas" className="text-gray-600 hover:text-gray-900 text-sm">
                  Ideas Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Themes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Popular Themes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/templates?theme=career" className="text-gray-600 hover:text-gray-900 text-sm">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/templates?theme=health" className="text-gray-600 hover:text-gray-900 text-sm">
                  Health
                </Link>
              </li>
              <li>
                <Link href="/templates?theme=money" className="text-gray-600 hover:text-gray-900 text-sm">
                  Money
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vision Board Kit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
