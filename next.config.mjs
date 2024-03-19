import bundle from "@next/bundle-analyzer"

const withBundleAnalyzer = bundle({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withBundleAnalyzer(nextConfig)
