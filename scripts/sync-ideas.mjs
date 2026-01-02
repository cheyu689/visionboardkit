#!/usr/bin/env node

/**
 * Sync Ideas Script
 *
 * This script copies images from _inbox/ideas/ to public/ideas/,
 * normalizes filenames, avoids duplicates, and generates content/ideas.ts
 *
 * Usage: node scripts/sync-ideas.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const INBOX_DIR = path.join(ROOT_DIR, '_inbox', 'ideas');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public', 'ideas');
const CONTENT_FILE = path.join(ROOT_DIR, 'content', 'ideas.ts');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Category mapping from filename prefixes
const CATEGORY_MAP = {
  'career': 'Career',
  'money': 'Money',
  'health': 'Health',
  'relationship': 'Relationships',
  'study': 'Study',
  'travel': 'Travel',
};

/**
 * Normalize filename: lowercase, replace spaces with hyphens, remove special chars
 * @param {string} filename - Original filename
 * @returns {string} Normalized filename
 */
function normalizeFilename(filename) {
  const ext = path.extname(filename).toLowerCase();
  const name = path.basename(filename, ext);

  // Remove special chars, replace spaces/hyphens/underscores with single hyphen
  let normalized = name
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fa5-]/g, '') // Keep alphanumeric, Chinese, hyphens
    .replace(/[\s_]+/g, '-') // Spaces and underscores to hyphens
    .replace(/-+/g, '-') // Multiple hyphens to single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // If result is empty, use timestamp
  if (!normalized) {
    normalized = `idea-${Date.now()}`;
  }

  return `${normalized}${ext}`;
}

/**
 * Get category from filename
 * @param {string} filename - Normalized filename
 * @returns {string} Category name
 */
function getCategoryFromFilename(filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename)).toLowerCase();

  for (const [prefix, category] of Object.entries(CATEGORY_MAP)) {
    if (nameWithoutExt.startsWith(prefix)) {
      return category;
    }
  }

  return 'General';
}

/**
 * Generate title from filename
 * @param {string} filename - Normalized filename (with category prefix removed)
 * @returns {string} Human-readable title
 */
function generateTitle(filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));

  // Remove category prefix if present
  let title = nameWithoutExt;
  for (const prefix of Object.keys(CATEGORY_MAP)) {
    if (title.toLowerCase().startsWith(prefix)) {
      title = title.substring(prefix.length);
      break;
    }
  }

  // Remove leading hyphen and convert to title case
  title = title
    .replace(/^-/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // If empty, use default
  if (!title) {
    title = 'Vision Board Idea';
  }

  return title;
}

/**
 * Generate a unique filename to avoid overwrites
 * @param {string} destDir - Destination directory
 * @param {string} filename - Desired filename
 * @returns {string} Unique filename
 */
function getUniqueFilename(destDir, filename) {
  const ext = path.extname(filename);
  const name = path.basename(filename, ext);
  let counter = 1;
  let uniqueFilename = filename;

  while (fs.existsSync(path.join(destDir, uniqueFilename))) {
    uniqueFilename = `${name}-${counter}${ext}`;
    counter++;
  }

  return uniqueFilename;
}

/**
 * Copy file from source to destination
 * @param {string} src - Source file path
 * @param {string} dest - Destination file path
 * @returns {Promise<void>}
 */
function copyFile(src, dest) {
  return new Promise((resolve, reject) => {
    const reader = fs.createReadStream(src);
    const writer = fs.createWriteStream(dest);

    reader.on('error', reject);
    writer.on('error', reject);
    writer.on('finish', resolve);

    reader.pipe(writer);
  });
}

/**
 * Main sync function
 */
async function syncIdeas() {
  console.log('🚀 Starting Ideas sync...\n');

  // Ensure directories exist
  if (!fs.existsSync(INBOX_DIR)) {
    fs.mkdirSync(INBOX_DIR, { recursive: true });
    console.log('📁 Created _inbox/ideas/');
  }

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    console.log('📁 Created public/ideas/');
  }

  // Get all files from inbox
  const inboxFiles = fs.readdirSync(INBOX_DIR);
  const imageFiles = inboxFiles.filter(file =>
    IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log('📭 No images found in _inbox/ideas/');
    console.log('💡 Add some images to _inbox/ideas/ and run this script again.\n');
    return;
  }

  console.log(`📸 Found ${imageFiles.length} image(s) in inbox\n`);

  // Process each image
  const syncedIdeas = [];
  let successCount = 0;
  let skipCount = 0;

  for (const originalFilename of imageFiles) {
    const srcPath = path.join(INBOX_DIR, originalFilename);
    const normalizedFilename = normalizeFilename(originalFilename);
    const uniqueFilename = getUniqueFilename(PUBLIC_DIR, normalizedFilename);
    const destPath = path.join(PUBLIC_DIR, uniqueFilename);

    try {
      // Check if file was already synced (same content)
      if (fs.existsSync(destPath)) {
        const srcStats = fs.statSync(srcPath);
        const destStats = fs.statSync(destPath);

        if (srcStats.size === destStats.size && srcStats.mtime <= destStats.mtime) {
          console.log(`⏭️  Skipped (already synced): ${originalFilename}`);
          skipCount++;
        } else {
          await copyFile(srcPath, destPath);
          console.log(`✅ Copied: ${originalFilename} → ${uniqueFilename}`);
          successCount++;
        }
      } else {
        await copyFile(srcPath, destPath);
        console.log(`✅ Copied: ${originalFilename} → ${uniqueFilename}`);
        successCount++;
      }

      // Extract metadata for ideas.ts
      const category = getCategoryFromFilename(uniqueFilename);
      const title = generateTitle(uniqueFilename);

      // Generate tags based on category and filename
      const tags = [category];
      const nameWithoutExt = path.basename(uniqueFilename, path.extname(uniqueFilename)).toLowerCase();

      // Add additional tags based on keywords in filename
      const keywords = [
        { words: ['goal', 'dream', 'vision'], tag: 'Goals' },
        { words: ['motivation', 'inspire', 'quote'], tag: 'Motivation' },
        { words: ['fitness', 'exercise', 'yoga'], tag: 'Fitness' },
        { words: ['travel', 'adventure', 'beach'], tag: 'Travel' },
        { words: ['career', 'business', 'office'], tag: 'Career' },
        { words: ['money', 'finance', 'wealth'], tag: 'Finance' },
        { words: ['family', 'love', 'relationship'], tag: 'Relationships' },
        { words: ['study', 'learn', 'book', 'education'], tag: 'Learning' },
      ];

      for (const { words, tag } of keywords) {
        if (words.some(word => nameWithoutExt.includes(word)) && !tags.includes(tag)) {
          tags.push(tag);
        }
      }

      syncedIdeas.push({
        id: `idea-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        category,
        tags: tags.length > 1 ? tags : [category],
        src: `/ideas/${uniqueFilename}`,
      });

    } catch (error) {
      console.error(`❌ Failed to copy ${originalFilename}:`, error.message);
    }
  }

  console.log(`\n📊 Summary: ${successCount} copied, ${skipCount} skipped\n`);

  // Generate content/ideas.ts
  if (syncedIdeas.length > 0) {
    console.log('📝 Generating content/ideas.ts...');

    // Ensure content directory exists
    const contentDir = path.dirname(CONTENT_FILE);
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    // Read existing ideas.ts if it exists
    let existingIdeas = [];
    if (fs.existsSync(CONTENT_FILE)) {
      try {
        const content = fs.readFileSync(CONTENT_FILE, 'utf-8');
        // Try to extract existing ideas array (simple regex)
        const match = content.match(/export\s+(?:const|let|var)\s+ideas\s*=\s*(\[[\s\S]*?\]);/);
        if (match) {
          // We'll preserve the file structure but update the array
          console.log('📄 Found existing content/ideas.ts');
        }
      } catch (error) {
        console.log('⚠️  Could not read existing ideas.ts, creating new one');
      }
    }

    // Generate TypeScript content
    const tsContent = `/**
 * Ideas Gallery Data
 *
 * Auto-generated by scripts/sync-ideas.mjs
 * DO NOT EDIT MANUALLY - Run "npm run ideas:sync" to update
 *
 * Last updated: ${new Date().toISOString()}
 */

export interface Idea {
  id: string;
  title: string;
  category: string;
  tags: string[];
  src: string;
}

export const ideas: Idea[] = [
${syncedIdeas.map(idea => `  {
    id: '${idea.id}',
    title: '${idea.title.replace(/'/g, "\\'")}',
    category: '${idea.category}',
    tags: [${idea.tags.map(t => `'${t}'`).join(', ')}],
    src: '${idea.src}',
  }`).join(',\n')}
];

// Export categories for filtering
export const categories = [
  'All',
  'Career',
  'Money',
  'Health',
  'Relationships',
  'Study',
  'Travel',
  'General',
] as const;

export type Category = typeof categories[number];
`;

    fs.writeFileSync(CONTENT_FILE, tsContent, 'utf-8');
    console.log(`✅ Generated content/ideas.ts with ${syncedIdeas.length} idea(s)\n`);
  }

  console.log('✨ Ideas sync complete!\n');
  console.log('💡 Next steps:');
  console.log('   1. Run "npm run dev" to start the dev server');
  console.log('   2. Visit http://localhost:3000/ideas to see your Ideas Gallery');
  console.log('   3. Add more images to _inbox/ideas/ and run "npm run ideas:sync" again\n');
}

// Run the sync
syncIdeas().catch(error => {
  console.error('❌ Sync failed:', error);
  process.exit(1);
});
