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
	readonly base:string;
	readonly urls:any[];
	constructor(urls?:any[], options?: Sitemap.ConstructorOptions)
	private generate(): Sitemap.Sitemap;
	public toObject(): Sitemap.Sitemap;
	public toJson(options?:{indent:boolean}): string;
	public toXml(options?:{indent:boolean}): string;
}

export = Sitemap;
