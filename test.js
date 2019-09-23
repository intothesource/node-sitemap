import test from 'ava';
import castArray from './lib/util/cast-array';
import createUrl from './lib/util/create-url';
import Sitemap from '.';

// ---
// lib/castArray
// ---

test('#castArray() - with some value', t => {
	t.deepEqual(castArray(1), [1]);
	t.deepEqual(castArray('2'), ['2']);
	t.deepEqual(castArray(1 + '2'), ['12']);
	t.deepEqual(castArray(null), [null]);
	t.deepEqual(castArray({}), [{}]);
});

test('#castArray() - with empty array', t => {
	t.deepEqual(castArray([]), []);
});

test('#castArray() - with non-empty array', t => {
	t.deepEqual(castArray([1, '2', [3]]), [1, '2', [3]]);
});

test('#castArray() - no args should cast array with undefined', t => {
	t.deepEqual(castArray(), [undefined]);
});

// ---
// lib/createUrl
// ---

test('#createUrl() - string', t => {
	const url = 'foo';
	t.is(createUrl(url), 'foo');
});

test('#createUrl() - string with base', t => {
	const url = 'foo';
	t.is(createUrl(url, 'http://example.com'), 'http://example.com/foo');
});

test('#createUrl() - as array of strings', t => {
	const url = ['foo', 'bar'];
	t.is(createUrl(url), 'foo/bar');
});

test('#createUrl() - as array of strings with base', t => {
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
// toObject
// ---

test('Sitemap#toObject() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.deepEqual(sitemap.toObject(), {
		urlset: {
			url: []
		}
	});
});

test('Sitemap#toObject() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.deepEqual(sitemap.toObject(), {
		urlset: {
			url: [{loc: 'foo'}, {loc: 'bar'}]
		}
	});
});

test('Sitemap#toObject() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar', priority: 1.0}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	sitemap.base = 'https://example.com';
	t.deepEqual(sitemap.toObject(), {
		urlset: {
			url: [
				{loc: 'https://example.com'},
				{loc: 'https://example.com/'},
				{loc: 'https://example.com/foo'},
				{loc: 'https://example.com/bar', priority: 1.0}
			]
		}
	});
});

// ---
// toJson
// ---

test('Sitemap#toJson() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.is(
		sitemap.toJson(),
		'{"urlset":{"url":[]}}'
	);
});

test('Sitemap#toJson() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.is(
		sitemap.toJson(),
		'{"urlset":{"url":[{"loc":"foo"},{"loc":"bar"}]}}'
	);
});

test('Sitemap#toJson() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar', priority: 0.5}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	sitemap.base = 'https://example.com';
	t.is(
		sitemap.toJson(),
		'{"urlset":{"url":[' +
		'{"loc":"https://example.com"},' +
		'{"loc":"https://example.com/"},' +
		'{"loc":"https://example.com/foo"},' +
		'{"loc":"https://example.com/bar","priority":0.5}' +
		']}}'
	);
});

// ---
// toXml
// ---

test('Sitemap#toXml() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.is(
		sitemap.toXml(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
	);
});

test('Sitemap#toXml() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.is(
		sitemap.toXml(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<url><loc>foo</loc></url><url><loc>bar</loc></url></urlset>'
	);
});

test('Sitemap#toXml() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar', priority: 0.5}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	sitemap.base = 'https://example.com';
	t.is(
		sitemap.toXml(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<url><loc>https://example.com</loc></url>' +
		'<url><loc>https://example.com/</loc></url>' +
		'<url><loc>https://example.com/foo</loc></url>' +
		'<url><loc>https://example.com/bar</loc><priority>0.5</priority></url>' +
		'</urlset>'
	);
});
