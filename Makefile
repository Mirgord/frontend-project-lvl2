install:
	npm install
test-coverage:
    npm test -- --coverage --coverageProvider=v8
gendiff:
	node bin/gendiff.js
test:
	npm test
lint:
	npx eslint .
publishing:
	npm publish --dry-run