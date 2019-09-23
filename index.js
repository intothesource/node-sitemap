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

		urls.forEach(({loc}) => {
			sitemap.urlset.url.push({
				loc: this.createUrl(loc, base)
			});
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
				...(url.length > 0 ? url.map(p => ({url: [{...p}]})) : [])
			]
		}];
		return xml(xmlObj, {indent, declaration: {encoding: 'UTF-8'}});
	}
}

module.exports = Sitemap;
