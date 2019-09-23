function castArray(val) {
	return Array.isArray(val) ? val : [val];
}

module.exports = castArray;
