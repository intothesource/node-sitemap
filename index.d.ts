/// <reference types="node"/>

declare namespace Sitemap {

	class ConstructorOptions {
		base?: string
	}

	class Sitemap {
		urlset: UrlSet;
	}

	class UrlSet {
		_attr?: {
			xmlns?: 'http://www.sitemaps.org/schemas/sitemap/0.9';
		};
		url: Url[];
	}

	class Url {
		loc?: string;
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
}

declare class Sitemap {
	base:string;
	urls:any[];
	constructor(urls?:any[], options?: Sitemap.ConstructorOptions)
	createUrl(input: string, base?: Sitemap.ConstructorOptions['base']): string;
	generate(): Sitemap.Sitemap;
	toObject(): Sitemap.Sitemap;
	toJson(options?:{indent:boolean}): string;
	toXml(options?:{indent:boolean}): string;
}

export = Sitemap;
