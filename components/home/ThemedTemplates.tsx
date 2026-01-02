import Link from 'next/link';
import { templates, themes, type Theme } from '@/content/content';

export default function ThemedTemplates() {
  // 按主题分组模板，每个主题展示 1 个
  const themesToShow: Theme[] = ['career', 'money', 'health', 'relationship', 'study', 'travel'];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vision Boards for Every Goal
          </h2>
          <p className="text-gray-600">
            Choose a theme that resonates with your aspirations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {themesToShow.map((theme) => {
            const themeInfo = themes[theme];
            // 获取该主题的第一个模板
            const themeTemplate = templates.find((t) => t.theme === theme);

            return (
              <Link
                key={theme}
                href={`/templates?theme=${theme}`}
                className="group"
              >
                <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div
                    className="aspect-video relative overflow-hidden"
                    style={{ backgroundColor: `${themeInfo.color}20` }}
                  >
                    {themeTemplate && (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                        {themeInfo.icon}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {themeInfo.name} Vision Board
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Create a powerful vision for your {themeInfo.name.toLowerCase()} goals
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      Explore Templates
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
