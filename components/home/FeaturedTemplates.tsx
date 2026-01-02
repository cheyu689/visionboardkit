import Link from 'next/link';
import ImageWithPlaceholder from '@/components/ImageWithPlaceholder';
import { templates, themes } from '@/content/content';

// 获取精选模板 (首页展示 4 个)
const featuredTemplates = templates.filter((t) => t.featured).slice(0, 4);

export default function FeaturedTemplates() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Templates
          </h2>
          <p className="text-gray-600 mb-6">
            Start with our most loved vision board templates
          </p>
          <Link
            href="/templates"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All Templates
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTemplates.map((template) => {
            const themeInfo = themes[template.theme];
            return (
              <Link
                key={template.id}
                href={`/templates?theme=${template.theme}&format=${template.format}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <ImageWithPlaceholder
                      src={template.previewImage}
                      alt={template.title}
                      theme={template.theme}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg">{themeInfo.icon}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        {template.format}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {template.title}
                    </h3>
                    <p className="text-sm text-gray-500">{themeInfo.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Filter Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/templates?format=printable"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            🖨️ Printable
          </Link>
          <Link
            href="/templates?format=digital"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            💻 Digital
          </Link>
          <Link
            href="/templates?style=minimalist"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Minimalist
          </Link>
          <Link
            href="/templates?style=aesthetic"
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Aesthetic
          </Link>
        </div>
      </div>
    </section>
  );
}
