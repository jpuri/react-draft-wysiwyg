module.exports = {
	"$schema": "http://json-schema.org/draft-04/schema#",
	"type": "object",
	"additionalProperties": false,
	"properties": {
		"allChunks": { "type": "boolean"},
		"disable": { "type": "boolean" },
		"omit": { "type": "boolean" },
		"remove": { "type": "boolean" },
		"fallback": { "type": ["string", "array", "object"] },
		"filename": { "type": "string" },
		"use": { "type": ["string", "array", "object"] },
		"publicPath": { "type": "string" },

		// deprecated
		"fallbackLoader": { "type": ["string", "array", "object"] },
		"loader": { "type": ["string", "array", "object"] }
	}
};
