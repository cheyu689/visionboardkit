'use client';

import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

type Template = 'grid' | 'freeform';
type Layout = 'classic' | 'modern' | 'collage';

interface ImageItem {
  id: string;
  url: string;
  file: File;
}

interface Affirmation {
  id: string;
  text: string;
}

export default function BuilderClient() {
  const [template, setTemplate] = useState<Template>('grid');
  const [layout, setLayout] = useState<Layout>('classic');
  const [images, setImages] = useState<ImageItem[]>([]);
  const [affirmations, setAffirmations] = useState<Affirmation[]>([
    { id: '1', text: 'I am capable of achieving my goals' },
    { id: '2', text: 'I embrace new opportunities with confidence' },
    { id: '3', text: 'My vision is becoming my reality' },
  ]);
  const [title, setTitle] = useState('My Vision Board 2025');
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setImages((prev) => [...prev, { id: Date.now().toString() + Math.random(), url, file }]);
      }
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.url);
      return prev.filter((i) => i.id !== id);
    });
  };

  const addAffirmation = () => {
    setAffirmations((prev) => [
      ...prev,
      { id: Date.now().toString() + Math.random(), text: '' },
    ]);
  };

  const updateAffirmation = (id: string, text: string) => {
    setAffirmations((prev) => prev.map((a) => (a.id === id ? { ...a, text } : a)));
  };

  const removeAffirmation = (id: string) => {
    setAffirmations((prev) => prev.filter((a) => a.id !== id));
  };

  const handleExport = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1200,
        height: 1600,
        pixelRatio: 2,
        quality: 1,
      });

      const link = document.createElement('a');
      link.download = `vision-board-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Vision Board Builder</h1>
          <p className="text-gray-600 mt-2">Create your custom vision board in minutes</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:w-96 flex-shrink-0 space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Choose Template</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTemplate('grid')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    template === 'grid'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Grid Layout</div>
                  <div className="text-xs text-gray-500 mt-1">Organized sections</div>
                </button>
                <button
                  onClick={() => setTemplate('freeform')}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    template === 'freeform'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">Freeform</div>
                  <div className="text-xs text-gray-500 mt-1">Creative collage</div>
                </button>
              </div>

              {/* Layout Options */}
              {template === 'grid' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Layout Style</label>
                  <select
                    value={layout}
                    onChange={(e) => setLayout(e.target.value as Layout)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="classic">Classic Grid</option>
                    <option value="modern">Modern Minimal</option>
                    <option value="collage">Collage Style</option>
                  </select>
                </div>
              )}
            </div>

            {/* Board Title */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Board Title</h3>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Vision Board 2025"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Images</h3>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Choose Images
              </button>
              <p className="text-xs text-gray-600 mt-2">Supports JPG, PNG, WebP</p>

              {/* Image List */}
              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.url}
                        alt="Upload"
                        className="w-full aspect-square object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 text-center text-sm text-gray-600">
                  No images yet. Upload some to get started!
                </div>
              )}
            </div>

            {/* Affirmations */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Affirmations</h3>
                <button
                  onClick={addAffirmation}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  + Add
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {affirmations.map((aff) => (
                  <div key={aff.id} className="flex gap-2">
                    <input
                      type="text"
                      value={aff.text}
                      onChange={(e) => updateAffirmation(aff.id, e.target.value)}
                      placeholder="I am..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    {affirmations.length > 1 && (
                      <button
                        onClick={() => removeAffirmation(aff.id)}
                        className="text-gray-400 hover:text-red-500 px-2"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <button
              onClick={handleExport}
              disabled={isExporting || images.length === 0}
              className="w-full px-6 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center"
            >
              {isExporting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PNG
                </>
              )}
            </button>
            {images.length === 0 && (
              <p className="text-center text-sm text-gray-600 -mt-2">Add at least one image to export</p>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Preview</h3>
                <span className="text-sm text-gray-500">1200 × 1600px</span>
              </div>

              {/* Preview Area - Fixed Aspect Ratio Container */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <div
                  ref={previewRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ transformOrigin: 'top left', transform: 'scale(1)' }}
                >
                  {template === 'grid' ? (
                    <GridPreview layout={layout} title={title} images={images} affirmations={affirmations} />
                  ) : (
                    <FreeformPreview title={title} images={images} affirmations={affirmations} />
                  )}
                </div>

                {/* Empty State - Inside the container so it positions correctly */}
                {images.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50/95 z-10">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l4.586-4.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600 font-medium">Upload images to see your vision board</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid Template Preview Component
function GridPreview({
  layout,
  title,
  images,
  affirmations,
}: {
  layout: Layout;
  title: string;
  images: ImageItem[];
  affirmations: Affirmation[];
}) {
  const bgColor = layout === 'modern' ? '#fafafa' : '#fff9f0';
  const cardStyle = layout === 'collage' ? 'rotate-1' : 'rotate-0';

  return (
    <div
      className="w-full h-full p-8"
      style={{
        background: `linear-gradient(135deg, ${bgColor} 0%, #fff 50%, ${bgColor} 100%)`,
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Title */}
      <h1
        className="text-center mb-6"
        style={{
          fontSize: '2.5em',
          fontWeight: 'bold',
          color: '#1e3a5f',
          textShadow: '2px 2px 0 rgba(0,0,0,0.05)',
        }}
      >
        {title}
      </h1>

      {/* Images Grid */}
      <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {images.slice(0, 9).map((img) => (
          <div
            key={img.id}
            className="overflow-hidden rounded-lg shadow-md"
            style={{ transform: cardStyle, transition: 'transform 0.3s' }}
          >
            <img src={img.url} alt="" className="w-full h-full object-cover" style={{ aspectRatio: '1' }} />
          </div>
        ))}
        {/* Fill empty slots */}
        {Array.from({ length: Math.max(0, 9 - images.length) }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="rounded-lg border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: '#d1d5db', aspectRatio: '1', background: 'rgba(0,0,0,0.02)' }}
          >
            <span className="text-gray-400 text-4xl">{images.length === 0 ? '+' : ''}</span>
          </div>
        ))}
      </div>

      {/* Affirmations */}
      <div className="space-y-2">
        {affirmations.map((aff, index) => (
          <p
            key={aff.id}
            className="text-lg font-medium italic px-4 py-2 rounded-lg"
            style={{
              color: '#1f2937',
              background: index % 2 === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(236, 72, 153, 0.1)',
            }}
          >
            "{aff.text || 'Your affirmation here'}"
          </p>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-6" style={{ color: '#6b7280', fontSize: '0.9em' }}>
        Created with Vision Board Kit
      </div>
    </div>
  );
}

// Freeform Template Preview Component
function FreeformPreview({
  title,
  images,
  affirmations,
}: {
  title: string;
  images: ImageItem[];
  affirmations: Affirmation[];
}) {
  return (
    <div
      className="w-full h-full p-8 relative"
      style={{
        background: 'linear-gradient(to bottom, #fef3c7, #fde68a)',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 text-6xl opacity-20">✨</div>
      <div className="absolute bottom-4 left-4 text-6xl opacity-20">💫</div>

      {/* Title */}
      <h1
        className="text-center mb-6 relative z-10"
        style={{
          fontSize: '3em',
          fontWeight: 'bold',
          color: '#78350f',
          textShadow: '2px 2px 0 rgba(255,255,255,0.5)',
        }}
      >
        {title}
      </h1>

      {/* Images - Collage Style */}
      <div className="relative h-[calc(100%-180px)]">
        {images.map((img, index) => {
          const rotations = ['-3deg', '2deg', '-1deg', '3deg', '-2deg', '1deg'];
          const positions = [
            { top: '5%', left: '5%', width: '40%' },
            { top: '10%', right: '5%', width: '35%' },
            { bottom: '30%', left: '10%', width: '38%' },
            { bottom: '20%', right: '8%', width: '42%' },
            { top: '40%', left: '48%', width: '30%' },
            { top: '60%', left: '20%', width: '25%' },
          ];
          const pos = positions[index] || { top: '20%', left: '30%', width: '30%' };

          return (
            <div
              key={img.id}
              className="absolute overflow-hidden rounded-xl shadow-2xl border-4 border-white"
              style={{
                ...pos,
                transform: `rotate(${rotations[index] || '0deg'})`,
                aspectRatio: '1',
              }}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </div>
          );
        })}

        {/* Affirmations */}
        {affirmations.map((aff, index) => (
          <div
            key={aff.id}
            className="absolute z-10 px-4 py-2 rounded-lg shadow-lg"
            style={{
              top: `${20 + index * 12}%`,
              left: index % 2 === 0 ? 'auto' : '5%',
              right: index % 2 === 0 ? '5%' : 'auto',
              background: 'rgba(255,255,255,0.98)',
              color: '#78350f',
              fontSize: '1.1em',
              fontWeight: '500',
              maxWidth: '200px',
            }}
          >
            {aff.text || 'Your affirmation'}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center relative z-10" style={{ color: '#92400e', fontSize: '0.9em' }}>
        ✨ Your dreams await ✨
      </div>
    </div>
  );
}
