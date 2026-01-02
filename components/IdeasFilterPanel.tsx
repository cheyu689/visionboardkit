import { type Theme, type Style } from '@/content/content';

interface IdeasFilterPanelProps {
  themes: Record<string, { name: string; color: string; icon: string }>;
  styles: Record<Style, { name: string; description: string }>;
  selectedTheme: Theme | null;
  selectedStyle: Style | null;
}

export default function IdeasFilterPanel({
  themes,
  styles,
  selectedTheme,
  selectedStyle,
}: IdeasFilterPanelProps) {
  return (
    <div className="bg-white rounded-lg p-6 sticky top-24">
      <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>

      {/* Theme Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
        <div className="space-y-1">
          <a
            href="/ideas"
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedTheme
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Themes
          </a>
          {Object.entries(themes).map(([key, { name, icon }]) => (
            <a
              key={key}
              href={`/ideas?theme=${key}${selectedStyle ? `&style=${selectedStyle}` : ''}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedTheme === key
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {icon} {name}
            </a>
          ))}
        </div>
      </div>

      {/* Style Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Style</h3>
        <div className="space-y-1">
          <a
            href={`/ideas${selectedTheme ? `?theme=${selectedTheme}` : ''}`}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedStyle
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Styles
          </a>
          {Object.entries(styles).map(([key, { name }]) => (
            <a
              key={key}
              href={`/ideas?style=${key}${selectedTheme ? `&theme=${selectedTheme}` : ''}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors capitalize ${
                selectedStyle === key
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
