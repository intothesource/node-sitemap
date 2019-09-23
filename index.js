'use strict';

const join = require('url-join');

class Sitemap {
	constructor({base = ''} = {}) {
		this.base = base;
	}

	createUrl(str, base = this.base) {
		return str ? join(base, str) : base;
	}

	generate(urls = []) {
		const sitemap = {
			urlset: {
				_xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
				url: []
			}
		};

		urls.forEach(({loc}) => {
			sitemap.urlset.url.push({
				loc: this.createUrl(loc)
			});
		});

		return sitemap;
	}
}

module.exports = Sitemap;
