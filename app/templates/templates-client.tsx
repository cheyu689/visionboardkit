'use client';

import { useSearchParams } from 'next/navigation';
import { templates, themes, styles, formats, type Theme, type Style, type Format } from '@/content/content';
import TemplateCard from '@/components/TemplateCard';
import FilterPanel from '@/components/FilterPanel';

const VALID_THEMES: Theme[] = ['career', 'money', 'health', 'relationship', 'study', 'travel'];
const VALID_STYLES: Style[] = ['minimalist', 'aesthetic', 'bold', 'pastel', 'dark'];
const VALID_FORMATS: Format[] = ['printable', 'digital', 'notion'];

function getValidTheme(value: string | null): Theme | null {
  if (!value) return null;
  return VALID_THEMES.includes(value as Theme) ? (value as Theme) : null;
}

function getValidStyle(value: string | null): Style | null {
  if (!value) return null;
  return VALID_STYLES.includes(value as Style) ? (value as Style) : null;
}

function getValidFormat(value: string | null): Format | null {
  if (!value) return null;
  return VALID_FORMATS.includes(value as Format) ? (value as Format) : null;
}

export default function TemplatesClient() {
  const searchParams = useSearchParams();
  const selectedTheme = getValidTheme(searchParams.get('theme'));
  const selectedStyle = getValidStyle(searchParams.get('style'));
  const selectedFormat = getValidFormat(searchParams.get('format'));

  // 过滤模板
  const filteredTemplates = templates.filter((template) => {
    if (selectedTheme && template.theme !== selectedTheme) return false;
    if (selectedStyle && template.style !== selectedStyle) return false;
    if (selectedFormat && template.format !== selectedFormat) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Vision Board Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Choose from our collection of beautifully designed templates. Filter by theme, style, or format to find the perfect match.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterPanel
              themes={themes}
              styles={styles}
              formats={formats}
              selectedTheme={selectedTheme}
              selectedStyle={selectedStyle}
              selectedFormat={selectedFormat}
            />
          </aside>

          {/* Templates Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{filteredTemplates.length}</span> template{filteredTemplates.length !== 1 ? 's' : ''}
              </p>
              {(selectedTheme || selectedStyle || selectedFormat) && (
                <a
                  href="/templates"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear all filters
                </a>
              )}
            </div>

            {/* Grid */}
            {filteredTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 mb-4">No templates match your filters.</p>
                <a href="/templates" className="text-blue-600 hover:text-blue-700">
                  Clear filters
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
