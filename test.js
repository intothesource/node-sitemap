import test from 'ava';
import Sitemap from '.';

test('#createUrl()', t => {
	t.is(new Sitemap().createUrl('foo'), 'foo');
});

test('#createUrl() with base from constructor', t => {
	t.is(
		new Sitemap({base: 'https://example.com'}).createUrl('foo'),
		'https://example.com/foo'
	);
	t.is(new Sitemap({base: '💩'}).createUrl('foo'), 	'💩/foo');
	t.is(new Sitemap({base: '💩'}).createUrl(''), 		'💩');
});

test('#createUrl() with base from from args', t => {
	t.is(
		new Sitemap().createUrl('foo', 'https://example.com'),
		'https://example.com/foo'
	);
	t.is(new Sitemap().createUrl('foo', '💩'),	'💩/foo');
	t.is(new Sitemap().createUrl('', '💩'),		'💩');
});

test('#generate()', t => {
	const urls = [
		{loc: ''},
		{loc: 'foo'},
		{loc: 'bar'}
	];

	const sitemap = new Sitemap().generate(urls);

	t.deepEqual(sitemap.urlset.url[0], {loc: ''});
	t.deepEqual(sitemap.urlset.url[1], {loc: 'foo'});
	t.deepEqual(sitemap.urlset.url[2], {loc: 'bar'});
});

test('#generate() - with undefined', t => {
	const sitemap = new Sitemap().generate();

	t.truthy(sitemap);
	t.truthy(sitemap.urlset);
});
