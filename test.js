import test from 'ava';
import Sitemap from '.';

test('#constructor() - without urls or options', t => {
	t.deepEqual(new Sitemap().urls, []);
	t.deepEqual(new Sitemap().base, '');
});

test('#constructor() - with urls', t => {
	t.deepEqual(new Sitemap([{loc: 'foo'}]).urls, [{loc: 'foo'}]);
});

test('#constructor() - with urls and base option', t => {
	const urls = [{loc: 'foo'}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	t.deepEqual(sitemap.urls, [{loc: 'foo'}]);
	t.is(sitemap.base, 'https://example.com');
});

// ---
// toObject
// ---

test('#toObject() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.deepEqual(sitemap.toObject(), {
		urlset: {
			url: []
		}
	});
});

test('#toObject() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.deepEqual(sitemap.toObject(), {
		urlset: {
			url: [{loc: 'foo'}, {loc: 'bar'}]
		}
	});
});

test('#toObject() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar'}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	sitemap.base = 'https://example.com';
	t.deepEqual(sitemap.toObject(), {
		urlset: {
			url: [
				{loc: 'https://example.com'},
				{loc: 'https://example.com/'},
				{loc: 'https://example.com/foo'},
				{loc: 'https://example.com/bar'}
			]
		}
	});
});

// ---
// toJson
// ---

test('#toJson() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.is(
		sitemap.toJson(),
		'{"urlset":{"url":[]}}'
	);
});

test('#toJson() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.is(
		sitemap.toJson(),
		'{"urlset":{"url":[{"loc":"foo"},{"loc":"bar"}]}}'
	);
});

test('#toJson() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar'}];
	const options = {base: 'https://example.com'};
	const sitemap = new Sitemap(urls, options);
	sitemap.base = 'https://example.com';
	t.is(
		sitemap.toJson(),
		'{"urlset":{"url":[{"loc":"https://example.com"},{"loc":"https://example.com/"},{"loc":"https://example.com/foo"},{"loc":"https://example.com/bar"}]}}'
	);
});

// ---
// toXml
// ---

test('#toXml() - without urls or options', t => {
	const sitemap = new Sitemap();
	t.is(
		sitemap.toXml(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'
	);
});

test('#toXml() - with urls', t => {
	const sitemap = new Sitemap([{loc: 'foo'}, {loc: 'bar'}]);
	t.is(
		sitemap.toXml(),
		'<?xml version="1.0" encoding="UTF-8"?>' +
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
		'<url><loc>foo</loc></url><url><loc>bar</loc></url></urlset>'
	);
});

test('#toXml() - with urls and base', t => {
	const urls = [{loc: ''}, {loc: '/'}, {loc: 'foo'}, {loc: 'bar'}];
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
		'<url><loc>https://example.com/bar</loc></url>' +
		'</urlset>'
	);
});
