/// <reference types="node"/>

declare namespace Sitemap {

	class Sitemap {
		urlset: UrlSet;
	}

	class UrlSet {
		public _xmlns?: 'http://www.sitemaps.org/schemas/sitemap/0.9';
		url: Url[];
	}

	class Url {
		loc?: string;
		lastmod?: string;
		changefreq?: 'daily' | 'weekly' | 'monthly';
		priority?: number;
	}
}

declare class Sitemap {
	generate(): Sitemap;
}

export = Sitemap;
