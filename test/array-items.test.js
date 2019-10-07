'use strict';

const convert = require('../');
const should = require('should');

it('array-items', async () => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'array',
	};

	const result = await convert(schema);

	const expected = {
		type: 'array',
		items: {
		}
	};

	should(result).deepEqual(expected, 'converted');
});
