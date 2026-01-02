import TemplatesClient from './templates-client';

export const metadata = {
  title: 'Vision Board Templates - Printable & Digital',
  description: 'Browse our collection of free vision board templates. Choose from printable or digital formats, multiple styles, and themes.',
  openGraph: {
    title: 'Vision Board Templates - Printable & Digital',
    description: 'Browse our collection of free vision board templates.',
    type: 'website',
  },
};

export default function TemplatesPage() {
  return <TemplatesClient />;
}
