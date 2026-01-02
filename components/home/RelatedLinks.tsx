import Link from 'next/link';

export default function RelatedLinks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore More
          </h2>
          <p className="text-gray-600">
            Dive deeper into vision boarding resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/templates"
            className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              Browse All Templates
            </h3>
            <p className="text-gray-600">
              Explore our complete collection of vision board templates
            </p>
          </Link>

          <Link
            href="/ideas"
            className="group p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              Get Inspired
            </h3>
            <p className="text-gray-600">
              Browse our gallery of vision board ideas and examples
            </p>
          </Link>

          <div className="group p-6 bg-gray-50 rounded-lg opacity-60 cursor-not-allowed">
            <div className="text-3xl mb-3">📖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Complete Guide
            </h3>
            <p className="text-gray-600">
              Coming soon: A comprehensive guide to creating vision boards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
