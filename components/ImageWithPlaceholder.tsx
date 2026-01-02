'use client';

import { useState } from 'react';
import Image from 'next/image';
import { themes, type Theme } from '@/content/content';

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  theme?: Theme;
  className?: string;
}

// UTF-8 安全的 base64 编码（兼容服务端和浏览器）
function toBase64(str: string): string {
  if (typeof window === 'undefined') {
    // 服务端：使用 Node.js Buffer
    return Buffer.from(str, 'utf-8').toString('base64');
  } else {
    // 浏览器端：使用 btoa + URI 编码处理 UTF-8
    return btoa(unescape(encodeURIComponent(str)));
  }
}

// 生成 SVG 占位图
function generatePlaceholderSVG(theme: Theme): string {
  const themeInfo = themes[theme];
  const color = themeInfo.color;

  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad)"/>
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="${color}" opacity="0.8">${themeInfo.icon}</text>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="${color}" font-weight="bold">${themeInfo.name} Vision Board</text>
      <text x="50%" y="75%" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="${color}" opacity="0.7">Template Preview</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

// 通用占位图（无主题）
function generateGenericPlaceholder(): string {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f3f4f6"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#9ca3af">Vision Board</text>
      <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#9ca3af">Image coming soon</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export default function ImageWithPlaceholder({ src, alt, theme = 'career', className = '' }: ImageWithPlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const placeholder = theme ? generatePlaceholderSVG(theme) : generateGenericPlaceholder();

  if (imageError || !src) {
    return (
      <img
        src={placeholder}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      width={400}
      height={300}
      onError={() => setImageError(true)}
    />
  );
}
