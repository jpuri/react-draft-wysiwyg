var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});

module.exports = function validate(schema, data) {
	var ajv = new Ajv({
		errorDataPath: 'property'
	});
	var isValid = ajv.validate(schema, data);

	if(!isValid) {
		throw new Error(ajv.errorsText());
	}
}
