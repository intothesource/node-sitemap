import {expectType, expectError} from 'tsd';
import Sitemap = require('.');

expectType<Sitemap.Sitemap>(new Sitemap().generate())

const url = new Sitemap().createUrl('foo');
console.log(url);

expectError(
	new Sitemap().createUrl()
);

const sitemap = new Sitemap().generate();
console.log(sitemap);


expectError(
	new Sitemap().generate({})
);
