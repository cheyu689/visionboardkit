'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Create Your New Year Vision Board in Just 30 Minutes
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Visualize your dreams, set clear intentions, and start the new year with purpose.
          Choose your format and let&apos;s get started.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/templates?format=printable"
            className="inline-flex flex-col items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl group"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Printable Templates</span>
            </div>
            <span className="text-xs text-blue-100 mt-1 opacity-80 group-hover:opacity-100">
              Download & print at home
            </span>
          </Link>
          <Link
            href="/ideas"
            className="inline-flex flex-col items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>Ideas Gallery</span>
            </div>
            <span className="text-xs text-gray-500 mt-1 group-hover:text-blue-600">
              Get inspired first
            </span>
          </Link>
        </div>

        {/* Alternate CTAs for Digital */}
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <span className="text-gray-500">Or jump directly to:</span>
          <Link
            href="/templates?format=digital"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Digital Templates →
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/templates"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            All Templates →
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            100% Free
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No Sign-up Required
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Instant Download
          </div>
        </div>
      </div>
    </section>
  );
}
