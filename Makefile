setup:
	npm ci
	npm link
gendiff:
	bin/gendiff.js
test-coverage:
	npm test -- --coverage --coverageProvider=v8
test-watch:
	npx -n --experimental-vm-modules jest --watch
lint:
	npx eslint .
publish:
	npm publish --dry-run