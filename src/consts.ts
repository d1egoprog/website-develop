// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_URL = 'https://www.d1egoprog.co/';
export const PERSON_NAME = 'Diego Rincon-Yanez';
export const SITE_TITLE = PERSON_NAME;
export const HOME_TITLE = `${PERSON_NAME} | Knowledge Graphs & Neuro-Symbolic AI`;
export const SITE_DESCRIPTION =
	'Diego Rincon-Yanez researches Knowledge Graphs and Neuro-Symbolic AI. Explore his publications, research projects, and academic experience.';
export const BASE_URL = SITE_URL;

export const PERSON = {
	'@type': 'Person',
	'@id': `${SITE_URL}#person`,
	name: PERSON_NAME,
	alternateName: 'd1egoprog',
	url: SITE_URL,
	image: new URL('img/avatars/casual.jpg', SITE_URL).href,
	description: 'Computer science researcher focused on Knowledge Graphs and Neuro-Symbolic AI.',
	knowsAbout: ['Knowledge Graphs', 'Neuro-Symbolic AI', 'Semantic Web'],
	sameAs: [
		'https://orcid.org/0000-0002-8982-1678',
		'https://www.wikidata.org/wiki/Q112191114',
		'https://scholar.google.com/citations?user=USbw71sAAAAJ',
		'https://dblp.org/pid/282/8477.html',
		'https://www.semanticscholar.org/author/Diego-Rincon-Yanez/2045763968',
		'https://www.linkedin.com/in/d1egoprog/',
		'https://x.com/d1egoprog',
		'https://github.com/d1egoprog',
	],
};
