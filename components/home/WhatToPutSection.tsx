'use client';

import { useState } from 'react';
import { keywordCollections, resources } from '@/content/content';

export default function WhatToPutSection() {
  const [selectedTheme, setSelectedTheme] = useState<string>('career');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const currentCollection = keywordCollections.find((c) => c.theme === selectedTheme);

  const copyKeyword = (keyword: string) => {
    navigator.clipboard.writeText(keyword);
    setCopiedKeyword(keyword);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(prompt);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What to Put on Your Vision Board
          </h2>
          <p className="text-gray-600">
            Use these keywords and AI prompts to create powerful vision content
          </p>
        </div>

        {/* Theme Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {keywordCollections.map((collection) => (
            <button
              key={collection.theme}
              onClick={() => setSelectedTheme(collection.theme)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTheme === collection.theme
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {collection.theme.charAt(0).toUpperCase() + collection.theme.slice(1)}
            </button>
          ))}
        </div>

        {currentCollection && (
          <div className="space-y-8">
            {/* Keywords Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Keywords for {currentCollection.theme.charAt(0).toUpperCase() + currentCollection.theme.slice(1)} Vision Board
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentCollection.keywords.map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => copyKeyword(keyword)}
                    className="group relative px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    {keyword}
                    <svg className="w-4 h-4 ml-2 inline opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copiedKeyword === keyword && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                        Copied!
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Prompts Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                AI Image Prompts
              </h3>
              <div className="space-y-3">
                {currentCollection.aiPrompts.map((prompt) => (
                  <div
                    key={prompt}
                    className="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <p className="text-gray-700 flex-1 pr-4">{prompt}</p>
                    <button
                      onClick={() => copyPrompt(prompt)}
                      className="flex-shrink-0 p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      aria-label="Copy prompt"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    {copiedPrompt === prompt && (
                      <span className="text-sm text-green-600 flex-shrink-0">Copied!</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resource Download Section */}
        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Download Complete Resource Pack
          </h3>
          <p className="text-gray-600 mb-6">
            Get all checklists, prompts, and guides in one convenient download
          </p>
          <div className="flex flex-wrap gap-4">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.file}
                download
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {resource.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
