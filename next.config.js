/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: 'anonymous',
    compress: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['encrypted-tbn0.gstatic.com'],
    },
}

module.exports = nextConfig
