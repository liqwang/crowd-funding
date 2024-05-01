/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { // https://nextjs.org/docs/messages/next-image-unconfigured-host
        protocol: 'https',
        hostname: 'img2.imgtp.com',
        port: '', // shouldn't be set to '443', which causes error in http://localhost:3000
        pathname: '/**'
      }
    ]
  },
  // https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

export default nextConfig
