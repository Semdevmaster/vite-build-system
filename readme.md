# Быстрые команды

## Установка Laravel

Находясь в терминале, в корне проекта

```
make install-laravel
```

## Установка MODX

Находясь в терминале, в корне проекта

```
make install-modx
```

## Сделать бэкап MySQL

Находясь в терминале, в корне проекта

```
make mysql-backup
```

## Сгенерировать SSL сертификат

Находясь в терминале, в корне проекта

```
make generate-ssl
```

## Сгенерировать WOFF2 шрифт

Находясь в терминале, в папке со шрифтом ttf
Могут понадобиться зависимости:
Fonttools - pip install fonttools
Brotli - pip install brotli

```
python 3
>>> from fontTools.ttLib.woff2 import compress
>>> compress('filename.ttf','filename.woff2')
```
