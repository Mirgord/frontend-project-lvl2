install:
	npm install
gendiff:
	node bin/gendiff.js
test-coverage:
	npm test -- --coverage --coverageProvider=v8
test:
	npx -n --experimental-vm-modules jest --watch
lint:
	npx eslint .
publishing:
	npm publish --dry-run