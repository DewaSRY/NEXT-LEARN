/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   images: {
  //     unoptimized: true,
  //   },
  // },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "akamai",
    path: "",
    domains: ["images.unsplash.com", "res.cloudinary.com"],

    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    // ],
  },
};

module.exports = nextConfig;
