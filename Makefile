install:
	npm install
gendiff:
	node bin/gendiff.js
publishing:
	npm publish --dry-run