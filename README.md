# Вычислитель отличий
[![Maintainability](https://api.codeclimate.com/v1/badges/e1f0a06ccc562f77c440/maintainability)](https://codeclimate.com/github/Mirgord/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e1f0a06ccc562f77c440/test_coverage)](https://codeclimate.com/github/Mirgord/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/Mirgord/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Mirgord/frontend-project-lvl2/actions)

### Вычислитель отличий – программа определяющая разницу между двумя структурами данных.
#### Возможности утилиты:
#### Поддержка разных входных форматов: yaml, json, а так же абсолютных и относительных путей.
#### Генерация отчета в виде plain text, stylish и json.

## Настройки
```sh
$ gendiff -h

Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```
## Запуск программы
### Сравнение плоских файлов:

```sh
$ gendiff filepath1.json filepath2.json
```
[![asciicast](https://asciinema.org/a/361509.svg)](https://asciinema.org/a/361509)

```sh
$ gendiff filepath1.yml filepath2.yml
```
[![asciicast](https://asciinema.org/a/362624.svg)](https://asciinema.org/a/362624)

### Сравнение файлов, имеющих вложенные структуры:

```sh
$ gendiff file1.json file2.json
$ gendiff --format stylish file1.json file2.json
```
[![asciicast](https://asciinema.org/a/367707.svg)](https://asciinema.org/a/367707)

```sh
$ gendiff --format plain file1.json file2.json 
```
[![asciicast](https://asciinema.org/a/368425.svg)](https://asciinema.org/a/368425)

```sh
$ gendiff --format json file1.json file2.json  
```
[![asciicast](https://asciinema.org/a/369128.svg)](https://asciinema.org/a/369128)
