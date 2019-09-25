'use strict';

const xml = require('xml');
const createUrl = require('./lib/util/create-url');

const isString = str =>
	typeof str === 'string';

const withUrl = key =>
	base =>
		loc => isString(loc) && {[key]: createUrl(loc, base)};

const withString = key =>
	str => str && {[key]: str};

const withFloat = key =>
	num => num && {[key]: num.toFixed(1)};

class Sitemap {
	constructor(urls, options = {}) {
		this.urls = urls || [];
		this.base = options.base || '';

		const model = [{
			urlset: [
				{_attr: {xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}},
				...(this.urls.length > 0) ?
					this.urls.map(({loc, lastmod, changefreq, priority}) => ({
						url: [
							withUrl('loc')(this.base)(loc),
							withString('lastmod')(lastmod),
							withString('changefreq')(changefreq),
							withFloat('priority')(priority)
						].filter(Boolean)
					})) :
					[]
			]
		}];

		this.model = model;
	}

	toString({indent = false} = {}) {
		return xml(this.model, {indent, declaration: {encoding: 'UTF-8'}});
	}
}

class SitemapIndex {
	constructor(urls, options = {}) {
		this.urls = urls || [];
		this.base = options.base || '';

		const model = [{
			sitemapindex: [
				{_attr: {xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'}},
				...(this.urls.length > 0) ?
					this.urls.map(({loc, lastmod}) => ({
						sitemap: [
							withUrl('loc')(this.base)(loc),
							withString('lastmod')(lastmod)
						].filter(Boolean)
					})) :
					[]
			]
		}];

		this.model = model;
	}

	toString({indent = false} = {}) {
		return xml(this.model, {indent, declaration: {encoding: 'UTF-8'}});
	}
}

module.exports = {Sitemap, SitemapIndex};
