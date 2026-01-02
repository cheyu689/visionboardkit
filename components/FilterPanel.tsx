import { type Theme, type Style, type Format } from '@/content/content';

interface FilterPanelProps {
  themes: Record<string, { name: string; color: string; icon: string }>;
  styles: Record<Style, { name: string; description: string }>;
  formats: Record<Format, { name: string; icon: string }>;
  selectedTheme: Theme | null;
  selectedStyle: Style | null;
  selectedFormat: Format | null;
}

export default function FilterPanel({
  themes,
  styles,
  formats,
  selectedTheme,
  selectedStyle,
  selectedFormat,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg p-6 sticky top-24">
      <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>

      {/* Theme Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
        <div className="space-y-1">
          <a
            href="/templates"
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
              href={`/templates?theme=${key}${selectedStyle ? `&style=${selectedStyle}` : ''}${selectedFormat ? `&format=${selectedFormat}` : ''}`}
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
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Style</h3>
        <div className="space-y-1">
          <a
            href={`/templates${selectedTheme ? `?theme=${selectedTheme}` : ''}${selectedFormat ? `${selectedTheme ? '&' : '?'}format=${selectedFormat}` : ''}`}
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
              href={`/templates?style=${key}${selectedTheme ? `&theme=${selectedTheme}` : ''}${selectedFormat ? `&format=${selectedFormat}` : ''}`}
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

      {/* Format Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Format</h3>
        <div className="space-y-1">
          <a
            href={`/templates${selectedTheme ? `?theme=${selectedTheme}` : ''}${selectedStyle ? `${selectedTheme ? '&' : '?'}style=${selectedStyle}` : ''}`}
            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
              !selectedFormat
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Formats
          </a>
          {Object.entries(formats).map(([key, { name, icon }]) => (
            <a
              key={key}
              href={`/templates?format=${key}${selectedTheme ? `&theme=${selectedTheme}` : ''}${selectedStyle ? `&style=${selectedStyle}` : ''}`}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedFormat === key
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {icon} {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
