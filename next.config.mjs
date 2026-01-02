/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Fix for Windows symlink issues
    if (!isServer) {
      config.resolve.symlinks = false;
    }
    return config;
  },
};

export default nextConfig;
