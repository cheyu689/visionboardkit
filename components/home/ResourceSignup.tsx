'use client';

import { useState } from 'react';
import { resources } from '@/content/content';

export default function ResourceSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    // 模拟 API 调用，实际保存到 localStorage
    setTimeout(() => {
      const subscriptions = JSON.parse(localStorage.getItem('resource_subscriptions') || '[]');
      subscriptions.push({
        email,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('resource_subscriptions', JSON.stringify(subscriptions));

      setIsSubmitted(true);
      setIsLoading(false);
    }, 500);
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            You&apos;re In!
          </h2>
          <p className="text-blue-100 mb-8">
            Your free resource pack is ready. Download each resource below and start creating your vision board!
          </p>

          {/* 4 个独立下载按钮 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.file}
                download
                className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-900 rounded-lg hover:bg-blue-50 transition-colors shadow-lg group"
              >
                <div className="text-2xl">
                  {resource.type === 'checklist' && '✅'}
                  {resource.type === 'prompts' && '🤖'}
                  {resource.type === 'guide' && '📖'}
                  {resource.type === 'keywords' && '🔑'}
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold group-hover:text-blue-600">
                    {resource.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {resource.description}
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Get the Free Resource Pack
        </h2>
        <p className="text-blue-100 mb-8">
          Includes checklists, AI prompts, keyword collections, and a complete guide to creating your vision board
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {isLoading ? 'Processing...' : 'Get Free Pack'}
          </button>
        </form>

        <p className="text-blue-200 text-sm mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
