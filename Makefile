install:
	npm install
gendiff:
	node bin/gendiff.js
test:
	npm test
lint:
	npx eslint .
publishing:
	npm publish --dry-run