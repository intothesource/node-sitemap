import test from 'ava';
import castArray from './lib/util/cast-array';
import createUrl from './lib/util/create-url';
import {Sitemap, SitemapIndex} from '.';

// ---
// lib/util/cast-array
// ---

test('lib/util/cast-array - with some value', t => {
	t.deepEqual(castArray(1), [1]);
	t.deepEqual(castArray('2'), ['2']);
	t.deepEqual(castArray(1 + '2'), ['12']);
	t.deepEqual(castArray(null), [null]);
	t.deepEqual(castArray({}), [{}]);
});

test('lib/util/cast-array - with empty array', t => {
	t.deepEqual(castArray([]), []);
});

test('lib/util/cast-array - with non-empty array', t => {
	t.deepEqual(castArray([1, '2', [3]]), [1, '2', [3]]);
});

test('lib/util/cast-array - no args should cast array with undefined', t => {
	t.deepEqual(castArray(), [undefined]);
});

// ---
// lib/util/create-url
// ---

test('lib/util/create-url - string', t => {
	const url = 'foo';
	t.is(createUrl(url), 'foo');
});

test('lib/util/create-url - string with base', t => {
	const url = 'foo';
	t.is(createUrl(url, 'http://example.com'), 'http://example.com/foo');
});

test('lib/util/create-url - as array of strings', t => {
	const url = ['foo', 'bar'];
	t.is(createUrl(url), 'foo/bar');
});

test('lib/util/create-url - as array of strings with base', t => {
	const url = ['foo', 'bar'];
	t.is(createUrl(url, 'http://example.com'), 'http://example.com/foo/bar');
});

// ---
// Sitemap#constructor
// ---

test('Sitemap#constructor() - without urls or options', t => {
	t.deepEqual(new Sitemap().urls, []);
	t.deepEqual(new Sitemap().base, '');
});

test('Sitemap#constructor() - with urls', t => {
	t.deepEqual(new Sitemap([{loc: 'foo'}]).urls, [{loc: 'foo'}]);
});

test('Sitemap#constructor() - with urls and base option', t => {
	const urls = [{loc: 'foo'}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	t.deepEqual(sitemap.urls, [{loc: 'foo'}]);
	t.is(sitemap.base, 'https://example.com');
});

// ---
// toString
// ---

test('Sitemap#toString() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
	);
});

test('Sitemap#toString() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<url><loc>foo</loc></url><url><loc>bar</loc></url></urlset>'
	);
});

test('Sitemap#toString() - with urls as array', t => {
	const sitemap = new Sitemap([{loc: ['foo', '/']}, {loc: ['foo', 'bar', '/']}]);
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<url><loc>foo/</loc></url><url><loc>foo/bar/</loc></url></urlset>'
	);
});

test('Sitemap#toString() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar', priority: 0.5}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<url><loc>https://example.com</loc></url>' +
		'<url><loc>https://example.com/</loc></url>' +
		'<url><loc>https://example.com/foo</loc></url>' +
		'<url><loc>https://example.com/bar</loc><priority>0.5</priority></url>' +
		'</urlset>'
	);
});

// ---
// Sitemap#constructor
// ---

test('SitemapIndex#constructor() - without urls or options', t => {
	t.deepEqual(new SitemapIndex().sitemaps, []);
	t.deepEqual(new SitemapIndex().base, '');
});

test('SitemapIndex#constructor() - with sitemaps', t => {
	t.deepEqual(new SitemapIndex([{loc: 'foo'}]).sitemaps, [{loc: 'foo'}]);
});

test('SitemapIndex#constructor() - with sitemaps and base option', t => {
	const sitemaps = [{loc: 'foo'}];
	const options = {base: 'https://example.com'};
	const sitemap = new SitemapIndex(sitemaps, options);
	t.deepEqual(sitemap.sitemaps, [{loc: 'foo'}]);
	t.is(sitemap.base, 'https://example.com');
});

// ---
// toString
// ---

test('SitemapIndex#toString() - without sitemaps or options', t => {
	const sitemap = new SitemapIndex();
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>'
	);
});

test('SitemapIndex#toString() - with sitemaps', t => {
	const sitemap = new SitemapIndex([{loc: 'foo'}, {loc: 'bar'}]);
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<sitemap><loc>foo</loc></sitemap><sitemap><loc>bar</loc></sitemap></sitemapindex>'
	);
});

test('SitemapIndex#toString() - with sitemap urls as array', t => {
	const sitemap = new SitemapIndex([{loc: ['foo', '/']}, {loc: ['foo', 'bar', '/']}]);
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<sitemap><loc>foo/</loc></sitemap><sitemap><loc>foo/bar/</loc></sitemap></sitemapindex>'
	);
});

test('SitemapIndex#toString() - with sitemaps and base', t => {
	const sitemaps = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar', lastmod: '1985-10-25'}];
	const options = {base: 'https://example.com'};
	const sitemap = new SitemapIndex(sitemaps, options);
	t.is(
		sitemap.toString(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<sitemap><loc>https://example.com</loc></sitemap>' +
		'<sitemap><loc>https://example.com/</loc></sitemap>' +
		'<sitemap><loc>https://example.com/foo</loc></sitemap>' +
		'<sitemap><loc>https://example.com/bar</loc><lastmod>1985-10-25</lastmod></sitemap>' +
		'</sitemapindex>'
	);
});
