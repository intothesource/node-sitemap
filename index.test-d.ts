import {expectType, expectError} from 'tsd';
import Sitemap = require('.');

expectType<Sitemap.Sitemap>(new Sitemap().generate())

const sitemap = new Sitemap().generate();
console.log(sitemap);

expectError(
	new Sitemap().generate({})
);
