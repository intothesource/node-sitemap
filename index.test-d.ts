import {expectType, expectError} from 'tsd';
import Sitemap = require('.');

expectType<Sitemap.Sitemap>(new Sitemap().toObject())
