/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // allow cors to this endpoints and origin
  async rewrites(){
    return [
      {
        source: '/api/v1/survey/:path*',
        destination: 'https://publisher.cpx-research.com/:path*'
      },
    ]
  },
}

module.exports = nextConfig
