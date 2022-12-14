# Система разработки PHP приложений в Docker окружении со сборщиком Vite.js

++++++++++ Внимание! ++++++++++  
Данная сборка рассчитана на использование Docker образов из этого проекта - https://github.com/Semdevmaster/docker-server-images  
То есть ставим Docker в систему, клонируем проект с докер образами и запускаем сборку нужных. Таким образом они появятся в локальном репозитории Docker-a у Вас в системе и на основе этих образов можно будет запускать уже контейнеры для любых проектов.  
+++++++++++++++++++++++++++++++

## Шаг 1
- Переименовываем, лежащий в корне файл .env.example в .env  
- Заполняем его согласно комментариям в этом же файле

Находясь в терминале, в корне проекта

```
mv .env.example .env
```

## Шаг 2
Следом необходимо сгенерировать самоподписанный ssl сертификат, чтобы весь процесс разработки шел исключительно по https  
Для генерации сертификатов используется кроссплатформенная утилита [mkcert](https://github.com/FiloSottile/mkcert) 

### Сгенерировать SSL сертификат

Находясь в терминале, в корне проекта

```
make ssl-generate
```
В результате этой команды в папке server/certs/ будут лежать 2 файла с открытым ключом (сам сертификат) и закрытым.  
Эти файлы будут использоваться веб-сервером nginx, а также локальным сервером для разработки vite

## Шаг 3
Выбираем, на какой платформе будем разрабатывать проект (Laravel или MODX Revolution) и запускаем одну из следующих команд  
Перед запуском следующих команд, нужно удалить из папки app файл .gitkeep

### Установка Laravel

Находясь в терминале, в корне проекта

```
make laravel-install
```

### Установка MODX

Находясь в терминале, в корне проекта

```
make modx-install
```

## Шаг 4

Запускаем сервер для backend-а

### Запуск сервера

Находясь в терминале, в корне проекта

```
make server-start
```
Данная команда запустит следующее ПО: nginx, php, mysql

### Остановка сервера

Находясь в терминале, в корне проекта

```
make server-stop
```
Данная команда завершит работу следующего ПО: nginx, php, mysql

## Шаг 5

Перед дальнейшими действиями, в случае выбора MODX, нужно произвести установку CMS стандартным образом.  
Устанавливаем все зависимости из package.json и запускаем frontend-сервер для разработки  
Находясь в терминале, в папке src

```
npm install
npm run dev
```

## Шаг 6

Теперь можно заниматься разработкой, но дальнейшие действия зависят от выбранной платформы  
Основная суть в том, что нужно подключить в скрипты модуль vite.js который устанавливает websocket-соединение
с frontend-сервером, это позволит автоматом перезагружать страницы при изменении кода.

## Другие полезные команды

### Сделать бэкап MySQL

Находясь в терминале, в корне проекта

```
make mysql-backup
```

### Сгенерировать WOFF2 шрифт

Находясь в терминале, в папке со шрифтом ttf  
Могут понадобиться зависимости:
Fonttools - pip install fonttools  
Brotli - pip install brotli

```
python 3
>>> from fontTools.ttLib.woff2 import compress
>>> compress('filename.ttf','filename.woff2')
```
