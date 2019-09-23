const join = require('url-join');
const castArray = require('./cast-array');

function createUrl(parts, base = this.base || '') {
	return parts ? join(base, ...castArray(parts)) : base;
}

module.exports = createUrl;
