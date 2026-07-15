import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Produces a minimal ./.next/standalone folder with only the files needed
  // to run `node server.js` — this is what the Dockerfile copies into the
  // final image instead of the whole node_modules tree.
  output: 'standalone',
  i18n: {
    locales: ['es', 'en', 'pt', 'it'],
    defaultLocale: 'es',
  },
  images: {
    remotePatterns: [
      {
        // Matches casa-carreras.es and any subdomain (e.g. www.casa-carreras.es)
        protocol: 'https',
        hostname: '**.casa-carreras.es',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'casa-carreras.es',
        pathname: '**',
      },
      {
        // Matches casa-carreras.com and any subdomain (e.g. www.casa-carreras.com)
        protocol: 'https',
        hostname: '**.casa-carreras.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'casa-carreras.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'swewoocommerce.dfweb.no',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '**',
      },
      {
        // Google reviewer profile photos
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
