/// <reference types="node"/>

declare namespace Sitemap {

	class ConstructorOptions {
		base?: string
	}

	class SitemapModel {
		loc?: string|string[];
		lastmod?: string;
	}

	type Sitemaps = SitemapModel[]

	class UrlModel {
		loc?: string|string[];
		lastmod?: string;
		changefreq?:
			'always'|
			'hourly'|
			'daily'|
			'weekly'|
			'monthly'|
			'yearly'|
			'never';
		priority?: number;
	}

	type Urls = UrlModel[]

	class Sitemap {
		readonly base:string;
		readonly urls:Sitemap.Urls;
		constructor(urls?:Sitemap.Urls, options?: Sitemap.ConstructorOptions)
		public toString(options?:{indent:boolean}): string;
	}

	class SitemapIndex {
		readonly base:string;
		readonly sitemaps:Sitemaps;
		constructor(sitemaps?:Sitemaps, options?: Sitemap.ConstructorOptions)
		public toString(options?:{indent:boolean}): string;
	}
}


export = Sitemap;
