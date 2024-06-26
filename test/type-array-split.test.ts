import convert from '../src';

it('splits type arrays correctly', async ({ expect }) => {
	const schema = {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			emptyArray: {
				type: [],
			},
			arrayWithNull: {
				type: ['null'],
			},
			arrayWithSingleType: {
				type: ['string'],
			},
			arrayWithNullAndSingleType: {
				type: ['null', 'string'],
			},
			arrayWithNullAndMultipleTypes: {
				type: ['null', 'string', 'number'],
			},
			arrayWithMultipleTypes: {
				type: ['string', 'number'],
			},
		},
	};

	const result = await convert(schema);

	const expected = {
		type: 'object',
		properties: {
			emptyArray: {},
			arrayWithNull: {
				nullable: true,
			},
			arrayWithSingleType: {
				type: 'string',
			},
			arrayWithNullAndSingleType: {
				nullable: true,
				type: 'string',
			},
			arrayWithNullAndMultipleTypes: {
				nullable: true,
				anyOf: [{ type: 'string' }, { type: 'number' }],
			},
			arrayWithMultipleTypes: {
				anyOf: [{ type: 'string' }, { type: 'number' }],
			},
		},
	};

	expect(result).toEqual(expected);
});
