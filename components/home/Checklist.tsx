'use client';

import { useState } from 'react';
import Link from 'next/link';
import { checklist, themes, formats, type Theme, type Format } from '@/content/content';

// 步骤内容配置
const STEP_CONTENTS: Record<string, { title: string; content: string }> = {
  '1': {
    title: 'Choose Your Theme and Format',
    content: 'Select a theme that resonates with your goals and choose between printable or digital format.',
  },
  '3': {
    title: 'Gather Your Images and Quotes',
    content: 'Collect photos, magazine cutouts, printed quotes, and any visual elements that inspire you. You can also browse our Ideas Gallery for inspiration.',
  },
  '4': {
    title: 'Arrange and Paste Your Vision Elements',
    content: 'Lay out your selected template and start arranging your images and quotes. Trust your intuition and place items where they feel right.',
  },
  '5': {
    title: 'Add Final Touches and Affirmations',
    content: 'Add empowering words, affirmations, or decorative elements. Display your vision board where you\'ll see it daily.',
  },
};

export default function Checklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedTheme, setSelectedTheme] = useState<Theme>('career');
  const [selectedFormat, setSelectedFormat] = useState<Format>('printable');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const progress = (checkedItems.size / checklist.length) * 100;

  // 步骤 2 跳转到 /templates（带已选参数）
  const getTemplatesUrl = () => {
    const params = new URLSearchParams();
    if (selectedFormat) params.set('format', selectedFormat);
    if (selectedTheme) params.set('theme', selectedTheme);
    return `/templates?${params.toString()}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Create Your Vision Board in 30 Minutes
          </h2>
          <p className="text-gray-600">
            Follow this simple checklist to manifest your dreams
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-3">
          {checklist.map((item) => {
            const isStep2 = item.id === '2';
            const isExpandable = ['1', '3', '4', '5'].includes(item.id);
            const isExpanded = expandedStep === item.id;
            const stepContent = (
              <>
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-4 flex-1 text-gray-900">{item.text}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {item.time}
                </span>
                {isStep2 ? (
                  <svg className="w-5 h-5 ml-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                ) : isExpandable ? (
                  <svg
                    className={`w-5 h-5 ml-2 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                ) : null}
              </>
            );

            return (
              <div key={item.id}>
                {isStep2 ? (
                  // 步骤 2：使用 Link 组件跳转到 /templates
                  <Link
                    href={getTemplatesUrl()}
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all block ${
                      checkedItems.has(item.id)
                        ? 'bg-green-50 border-green-300'
                        : 'bg-blue-50 border-blue-300 hover:border-blue-400 hover:bg-blue-100'
                    }`}
                  >
                    {stepContent}
                  </Link>
                ) : (
                  // 其他步骤：可展开的 div
                  <div
                    className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      checkedItems.has(item.id)
                        ? 'bg-green-50 border-green-300'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      if (isExpandable) {
                        setExpandedStep(isExpanded ? null : item.id);
                      }
                      toggleItem(item.id);
                    }}
                  >
                    {stepContent}
                  </div>
                )}

                {/* 步骤 1：展开主题和格式选择 */}
                {isExpanded && item.id === '1' && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">{STEP_CONTENTS['1'].title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{STEP_CONTENTS['1'].content}</p>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Theme:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {Object.entries(themes).map(([key, { name, icon }]) => (
                          <button
                            key={key}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTheme(key as Theme);
                            }}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedTheme === key
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-xl">{icon}</span>
                            <span className="block text-sm mt-1">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Format:</label>
                      <div className="flex gap-2">
                        {Object.entries(formats).map(([key, { name, icon }]) => (
                          <button
                            key={key}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFormat(key as Format);
                            }}
                            className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                              selectedFormat === key
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="text-xl">{icon}</span>
                            <span className="block text-sm mt-1">{name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 步骤 3：展开资源说明 */}
                {isExpanded && item.id === '3' && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{STEP_CONTENTS['3'].title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{STEP_CONTENTS['3'].content}</p>
                    <Link
                      href="/ideas"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Browse Ideas Gallery for inspiration
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                )}

                {/* 步骤 4：展开操作说明 */}
                {isExpanded && item.id === '4' && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{STEP_CONTENTS['4'].title}</h4>
                    <p className="text-sm text-gray-600">{STEP_CONTENTS['4'].content}</p>
                  </div>
                )}

                {/* 步骤 5：展开完成说明 + Builder CTA */}
                {isExpanded && item.id === '5' && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{STEP_CONTENTS['5'].title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{STEP_CONTENTS['5'].content}</p>
                    <Link
                      href="/builder"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Generate & Download Vision Board
                    </Link>
                  </div>
                )}

                {/* 步骤 2：高亮显示并说明跳转 */}
                {item.id === '2' && (
                  <div className="mt-2 text-sm text-blue-600">
                    👆 Click to browse templates with your selected theme and format
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href={getTemplatesUrl()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Browse Templates
          </Link>
          <Link
            href="/ideas"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Get Inspired
          </Link>
        </div>
      </div>
    </section>
  );
}
