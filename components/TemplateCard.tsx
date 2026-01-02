'use client';

import { useState } from 'react';
import ImageWithPlaceholder from '@/components/ImageWithPlaceholder';
import { Template, themes } from '@/content/content';

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const themeInfo = themes[template.theme];

  const handleDownload = (fileType: 'svg' | 'png' | 'pdf') => {
    const file = template.downloadFiles.find((f) => f.type === fileType);
    if (!file) return;

    setIsDownloading(true);
    // 模拟下载延迟
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.url.split('/').pop() || `${template.id}.${fileType}`;
      link.click();
      setIsDownloading(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Preview Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        <ImageWithPlaceholder
          src={template.previewImage}
          alt={template.title}
          theme={template.theme}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-xs px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 font-medium">
            {template.format}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{themeInfo.icon}</span>
            <span className="text-sm text-gray-600 capitalize">{themeInfo.name}</span>
          </div>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
            {template.style}
          </span>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {template.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Download Dropdown */}
          <div className="relative group">
            <button
              disabled={isDownloading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </>
              )}
            </button>

            {/* File Type Dropdown */}
            {template.downloadFiles.length > 1 && (
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-10">
                {template.downloadFiles.map((file) => (
                  <button
                    key={file.type}
                    onClick={() => handleDownload(file.type)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <span className="font-semibold mr-2">{file.type.toUpperCase()}</span>
                    <span className="text-gray-500">file</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Print Button (only for printable templates) */}
          {template.format === 'printable' && (
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              title="Print this template"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
