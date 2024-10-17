/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     // domains: ['https://www.vin.handworknepal.com'],
    //     protocol: 'https',
    //     hostname: 'www.vin.handworknepal.com',
    // }


    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.vin.handworknepal.com',
            port: '',
            // pathname: '/your-account/**',
          },
        ],
      },
};

export default nextConfig;
