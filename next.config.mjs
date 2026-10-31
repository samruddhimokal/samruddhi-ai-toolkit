/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The planner was first published as "Choose your stack".
    return [{ source: "/choose-your-stack", destination: "/tool-planner", permanent: true }];
  },
};

export default nextConfig;
