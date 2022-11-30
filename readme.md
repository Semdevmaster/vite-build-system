# Быстрые команды

## Запуск сервера

Находясь в терминале, в корне проекта

```
make server-start
```

## Остановка сервера

Находясь в терминале, в корне проекта

```
make server-stop
```

## Установка Laravel

Находясь в терминале, в корне проекта

```
make laravel-install
```

## Установка MODX

Находясь в терминале, в корне проекта

```
make modx-install
```

## Сделать бэкап MySQL

Находясь в терминале, в корне проекта

```
make mysql-backup
```

## Сгенерировать SSL сертификат

Находясь в терминале, в корне проекта

```
make ssl-generate
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
