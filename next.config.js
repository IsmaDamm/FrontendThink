/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  async rewrites() {
      return [
        {
          source: 'http://localhost:3000/',
          destination: 'http://127.0.0.1:8000/api/file',
        },
      ]
    },
};

module.exports = nextConfig
