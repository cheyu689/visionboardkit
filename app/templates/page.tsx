import { Suspense } from 'react';
import TemplatesClient from './templates-client';

export const metadata = {
  title: 'Vision Board Templates - Printable & Digital',
  description: 'Browse our collection of free vision board templates. Choose from printable or digital formats, multiple styles, and themes.',
  openGraph: {
    title: 'Vision Board Templates - Printable & Digital',
    description: 'Browse our collection of free vision board templates.',
    type: 'website',
  },
};

export default function TemplatesPage() {
  return (
    <Suspense fallback={<TemplatesLoading />}>
      <TemplatesClient />
    </Suspense>
  );
}

function TemplatesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="h-10 bg-gray-200 rounded w-80 mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter Skeleton */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
              <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-10 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </aside>

          {/* Templates Grid Skeleton */}
          <div className="flex-1">
            <div className="mb-6 h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded flex-1 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
