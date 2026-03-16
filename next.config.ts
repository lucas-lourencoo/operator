import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	cacheLife: {
		leaderboard: {
			stale: 3600, // 1 hour
			revalidate: 3600, // 1 hour
			expire: 86400, // 1 day
		},
	},
};

export default nextConfig;
