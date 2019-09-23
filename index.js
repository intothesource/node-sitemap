'use strict';

const join = require('url-join');
const xml = require('xml');

class Sitemap {
	constructor(urls = [], {base = ''} = {}) {
		this.urls = urls;
		this.base = base;
	}

	createUrl(str, base = this.base || '') {
		return str ? join(base, str) : base;
	}

	generate(urls = this.urls || [], base = this.base || '') {
		const sitemap = {
			urlset: {
				url: []
			}
		};

		urls.forEach(({loc, lastmod, changefreq, priority}) => {
			const obj = {loc: this.createUrl(loc, base)};

			if (lastmod) {
				Object.assign(obj, {lastmod});
			}

			if (changefreq) {
				Object.assign(obj, {changefreq});
			}

			if (priority) {
				Object.assign(obj, {priority});
			}

			sitemap.urlset.url.push(obj);
		});

		return sitemap;
	}

	toObject() {
		return this.generate(this.urls, this.base);
	}

	toJson() {
		return JSON.stringify(this.toObject());
	}

	toXml({indent = false} = {}) {
		const {urlset} = this.toObject();
		const {url} = urlset;
		const xmlObj = [{
			urlset: [
				{_attr: {xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}},
				...(url.length > 0 ?
					url.map(({loc, lastmod, changefreq, priority}) => {
						return {
							url: [
								loc 		&& {loc},
								lastmod 	&& {lastmod},
								changefreq 	&& {changefreq},
								priority 	&& {priority}
							].filter(Boolean)
						};
					}) :
					[])
			]
		}];
		console.dir({xmlObj});
		return xml(xmlObj, {indent, declaration: {encoding: 'UTF-8'}});
	}
}

module.exports = Sitemap;
