install:
	npm install
gendiff:
	node bin/gendiff.js
test:
	npx -n --experimental-vm-modules jest --watch
lint:
	npx eslint .
publishing:
	npm publish --dry-run