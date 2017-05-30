var postcss = require('postcss');

// list of all plugins
var processors = [
	{
		plugin:    require('postcss-partial-import'),
		namespace: 'import',
		defaults:  {}
	},
	{
		plugin:    require('postcss-mixins'),
		namespace: 'mixins',
		defaults:  {}
	},
	{
		plugin:    require('postcss-advanced-variables'),
		namespace: 'variables',
		defaults:  {}
	},
	{
		plugin:    require('postcss-custom-media'),
		namespace: 'media',
		defaults:  {}
	},
	{
		plugin:    require('postcss-custom-properties'),
		namespace: 'properties',
		defaults:  {}
	},
	{
		plugin:    require('postcss-media-minmax'),
		namespace: 'minmax',
		defaults:  {}
	},
	{
		plugin:    require('postcss-color-function'),
		namespace: 'color',
		defaults:  {}
	},
	{
		plugin:    require('postcss-nesting'),
		namespace: 'nesting',
		defaults:  {}
	},
	{
		plugin:    require('postcss-nested'),
		namespace: 'nested',
		defaults:  {}
	},
	{
		plugin:    require('postcss-custom-selectors'),
		namespace: 'selectors',
		defaults:  {}
	},
	{
		plugin:    require('postcss-atroot'),
		namespace: 'atroot',
		defaults:  {}
	},
	{
		plugin:    require('postcss-property-lookup'),
		namespace: 'lookup',
		defaults:  {
			logLevel: 'warn'
		}
	},
	{
		plugin:    require('postcss-extend'),
		namespace: 'extend',
		defaults:  {}
	},
	{
		plugin:    require('postcss-selector-matches'),
		namespace: 'matches',
		defaults:  {}
	},
	{
		plugin:    require('postcss-selector-not'),
		namespace: 'not',
		defaults:  {}
	}
];

// load all plugins
module.exports = postcss.plugin('precss', function (options) {
	options = options || {};

	var instance = postcss();

	// for each plugin
	processors.forEach(function (processor) {
		var namespaceOptions = processor.namespace in options ? options[processor.namespace] : options;
		var processorOptions = {};

		Object.keys(processor.defaults).forEach(function (key) {
			processorOptions[key] = processor.defaults[key];
		});

		Object.keys(namespaceOptions).forEach(function (key) {
			processorOptions[key] = namespaceOptions[key];
		});

		if (namespaceOptions && !processorOptions.disable) {
			instance.use(processor.plugin(processorOptions));
		}
	});

	return instance;
});
