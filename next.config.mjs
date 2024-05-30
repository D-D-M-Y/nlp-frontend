import { createRequire } from 'module';
const require = createRequire(import.meta.url);
/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')()
const nextConfig = {
    reactStrictMode: false,
    pageExtensions: ['ts', 'tsx', 'mdx']
};

export default withMDX(nextConfig);
