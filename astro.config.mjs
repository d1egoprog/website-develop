// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { SITE_URL } from './src/consts.ts';

const deploymentBase = process.env.ASTRO_BASE_PATH || "/";

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	base: deploymentBase,
	trailingSlash: "always",
	redirects: { "/projects": `${deploymentBase.replace(/\/$/, "")}/artifacts/` },
    // Development copies are noindex; publish sitemaps only for the root production build.
    integrations: [mdx(), ...(deploymentBase === "/" ? [sitemap()] : [])],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif']
		},
	],
});
