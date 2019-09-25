const join = require('url-join');
const castArray = require('./cast-array');

function createUrl(parts, base = '') {
	return parts.length > 0 ? join(base, ...castArray(parts)) : base;
}

module.exports = createUrl;
