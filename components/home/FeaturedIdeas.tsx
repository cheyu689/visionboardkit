import Link from 'next/link';
import ImageWithPlaceholder from '@/components/ImageWithPlaceholder';
import { ideas, themes } from '@/content/content';

// 获取精选灵感 (首页展示 4 个)
const featuredIdeas = ideas.filter((i) => i.featured).slice(0, 4);

export default function FeaturedIdeas() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Inspiration Gallery
          </h2>
          <p className="text-gray-600 mb-6">
            Get inspired by vision boards created by others
          </p>
          <Link
            href="/ideas"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Explore All Ideas
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredIdeas.map((idea) => {
            const themeInfo = themes[idea.theme];
            return (
              <Link
                key={idea.id}
                href={`/ideas?theme=${idea.theme}&style=${idea.style}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <ImageWithPlaceholder
                      src={idea.previewImage}
                      alt={idea.title}
                      theme={idea.theme}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{themeInfo.icon}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                        {idea.style}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{idea.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Filter Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/ideas?theme=career"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            💼 Career
          </Link>
          <Link
            href="/ideas?theme=health"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            ❤️ Health
          </Link>
          <Link
            href="/ideas?theme=money"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            💰 Money
          </Link>
          <Link
            href="/ideas?theme=travel"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            ✈️ Travel
          </Link>
        </div>
      </div>
    </section>
  );
}
