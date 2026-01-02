'use client';

import { useSearchParams } from 'next/navigation';
import { ideas, categories, type Category } from '@/content/ideas';
import Image from 'next/image';

function getValidCategory(value: string | null): Category | null {
  if (!value) return null;
  return categories.includes(value as Category) ? (value as Category) : null;
}

export default function IdeasClient() {
  const searchParams = useSearchParams();
  const selectedCategory = getValidCategory(searchParams.get('category'));

  // Filter ideas by category
  const filteredIdeas = ideas.filter((idea) => {
    if (selectedCategory === 'All' || !selectedCategory) return true;
    return idea.category === selectedCategory;
  });

  // Get category colors for badges
  const categoryColors: Record<string, string> = {
    'Career': 'bg-blue-100 text-blue-800',
    'Money': 'bg-green-100 text-green-800',
    'Health': 'bg-red-100 text-red-800',
    'Relationships': 'bg-pink-100 text-pink-800',
    'Study': 'bg-purple-100 text-purple-800',
    'Travel': 'bg-amber-100 text-amber-800',
    'General': 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vision Board Ideas Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Get inspired by our collection of vision board examples. Browse by category to find ideas that resonate with you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter Bar */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={category === 'All' ? '/ideas' : `/ideas?category=${encodeURIComponent(category)}`}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category || (!selectedCategory && category === 'All')
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </a>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredIdeas.length}</span> idea{filteredIdeas.length !== 1 ? 's' : ''}
          </p>
          {selectedCategory && selectedCategory !== 'All' && (
            <a
              href="/ideas"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear filter
            </a>
          )}
        </div>

        {/* Ideas Grid */}
        {filteredIdeas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIdeas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={idea.src}
                    alt={idea.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Category Badge */}
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded mb-2 ${categoryColors[idea.category] || categoryColors['General']}`}>
                    {idea.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {idea.title}
                  </h3>

                  {/* Tags */}
                  {idea.tags && idea.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-gray-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-500 mb-2">No ideas found.</p>
            <p className="text-sm text-gray-400 mb-4">
              Add images to <code className="bg-gray-100 px-2 py-1 rounded">_inbox/ideas/</code> and run <code className="bg-gray-100 px-2 py-1 rounded">npm run ideas:sync</code>
            </p>
            {selectedCategory && selectedCategory !== 'All' && (
              <a href="/ideas" className="text-blue-600 hover:text-blue-700">
                Clear filter
              </a>
            )}
          </div>
        )}

        {/* Empty State for No Ideas */}
        {ideas.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">📸</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Ideas Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Get started by adding inspiration images to your Ideas Gallery.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 max-w-lg mx-auto text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Start:</h3>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Download or create vision board images</li>
                <li>Add them to <code className="bg-white px-2 py-1 rounded text-xs">_inbox/ideas/</code></li>
                <li>Run <code className="bg-white px-2 py-1 rounded text-xs">npm run ideas:sync</code></li>
                <li>Refresh this page!</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
