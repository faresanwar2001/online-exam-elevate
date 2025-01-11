/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'exam.elevateegy.com',
          },
        ],
      },
};

export default nextConfig;
