import BuilderClient from './builder-client';

export const metadata = {
  title: 'Vision Board Builder - Create Your Vision Board',
  description: 'Create your custom vision board in minutes. Upload images, add affirmations, and download as PNG.',
  openGraph: {
    title: 'Vision Board Builder - Create Your Vision Board',
    description: 'Create your custom vision board in minutes.',
    type: 'website',
  },
};

export default function BuilderPage() {
  return <BuilderClient />;
}
