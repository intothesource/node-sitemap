import {expectType, expectError} from 'tsd';
import Sitemap = require('.');

expectType<Sitemap.Sitemap>(new Sitemap().generate())

const url = new Sitemap().createUrl('foo');

expectError(
	new Sitemap().createUrl()
);

const sitemap = new Sitemap().generate();

expectError(
	new Sitemap().generate({})
);
