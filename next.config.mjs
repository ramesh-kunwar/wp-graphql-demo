/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.vin.handworknepal.com",
        port: "",
      },
      // {
      //   protocol: "https",
      //   hostname: "cdn.example.com",  // Example additional hostname
      //   port: "",
      // },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",  // Add secure.gravatar.com
        port: "",
        // You can also specify pathname patterns like '/avatar/**' if needed
      },
    ],
  },
};

export default nextConfig;
