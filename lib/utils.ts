import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 解析 URL 搜索参数
export function parseSearchParams(searchParams: URLSearchParams) {
  return {
    theme: searchParams.get('theme'),
    style: searchParams.get('style'),
    format: searchParams.get('format'),
  };
}
