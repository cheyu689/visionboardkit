import IdeasClient from './ideas-client';

export const metadata = {
  title: 'Vision Board Ideas Gallery - Get Inspired',
  description: 'Browse our gallery of vision board ideas and examples. Get inspired by real vision boards across different themes and styles.',
  openGraph: {
    title: 'Vision Board Ideas Gallery - Get Inspired',
    description: 'Browse our gallery of vision board ideas and examples.',
    type: 'website',
  },
};

export default function IdeasPage() {
  return <IdeasClient />;
}
