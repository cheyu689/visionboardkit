import Hero from '@/components/home/Hero';
import Checklist from '@/components/home/Checklist';
import FeaturedTemplates from '@/components/home/FeaturedTemplates';
import FeaturedIdeas from '@/components/home/FeaturedIdeas';
import WhatToPutSection from '@/components/home/WhatToPutSection';
import ThemedTemplates from '@/components/home/ThemedTemplates';
import FAQSection from '@/components/home/FAQSection';
import ResourceSignup from '@/components/home/ResourceSignup';
import RelatedLinks from '@/components/home/RelatedLinks';
import { faqs } from '@/content/content';

// JSON-LD 结构化数据
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Checklist />
      <FeaturedTemplates />
      <FeaturedIdeas />
      <WhatToPutSection />
      <ThemedTemplates />
      <FAQSection />
      <ResourceSignup />
      <RelatedLinks />
    </>
  );
}
