import ImageWithPlaceholder from '@/components/ImageWithPlaceholder';
import { Idea, themes } from '@/content/content';

interface IdeaCardProps {
  idea: Idea;
}

export default function IdeaCard({ idea }: IdeaCardProps) {
  const themeInfo = themes[idea.theme];

  return (
    <a
      href={`/templates?theme=${idea.theme}&style=${idea.style}`}
      className="block group"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Preview Image */}
        <div className="aspect-square overflow-hidden bg-gray-100 relative">
          <ImageWithPlaceholder
            src={idea.previewImage}
            alt={idea.title}
            theme={idea.theme}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="text-xs px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 font-medium capitalize">
              {idea.style}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{themeInfo.icon}</span>
            <span className="text-sm text-gray-600 capitalize">{themeInfo.name}</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {idea.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-3">
            {idea.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {idea.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center text-sm text-blue-600 font-medium group-hover:text-blue-700">
            Find similar templates
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
