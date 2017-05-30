
node_modules: package.json
	@npm install

test: node_modules
	@node_modules/.bin/mocha test/parse test/convert --reporter spec --bail

.PHONY: test