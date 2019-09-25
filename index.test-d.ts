import {expectType, expectError} from 'tsd';
import {Sitemap, SitemapIndex} from '.';

expectType<string>(new Sitemap().toString());
expectType<string>(new SitemapIndex().toString());

new Sitemap([{loc:'foo'}]).toString()
new Sitemap([{loc:'foo'}],{base:'https://example.com'}).toString()
new Sitemap([{loc:['foo','bar']}],{base:'https://example.com'}).toString()
new SitemapIndex([{loc:'foo'}]).toString()
new SitemapIndex([{loc:'foo'}],{base:'https://example.com'}).toString()
new SitemapIndex([{loc:['foo','bar']}],{base:'https://example.com'}).toString()
