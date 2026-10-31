/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Earlier names of Build Your AI Team, kept so shared links still work.
    return [
      { source: "/choose-your-stack", destination: "/build-your-ai-team", permanent: true },
      { source: "/tool-planner", destination: "/build-your-ai-team", permanent: true },
    ];
  },
};

export default nextConfig;
