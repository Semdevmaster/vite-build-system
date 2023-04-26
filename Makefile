include .env
server-start:
	docker compose up -d nginx php mysql

server-stop:
	docker compose stop

laravel-install:
	docker compose run --rm php-cli composer create-project --prefer-dist laravel/laravel $(APP_CODE_PATH_CONTAINER)

modx-install:
	docker compose run --rm php-cli composer create-project modx/revolution $(APP_CODE_PATH_CONTAINER)

mysql-backup:
	docker compose exec mysql /usr/bin/mysqldump -u root --password=$(MYSQL_ROOT_PASSWORD) $(APP_BD_NAME) \
	| gzip > ~/backups/$(APP_BD_NAME)_backup-`date +\%d.\%m.\%Y`.sql.gz

generate-ssl:
	cd server/certs \
 	&& mkcert -cert-file $(APP_HOST).pem -key-file $(APP_HOST)-key.pem $(APP_HOST) *.$(APP_HOST)

xdebug-enable:
	docker compose up -d php;
	docker compose exec -u root php \
	mv /usr/local/etc/php/disabled/docker-php-ext-xdebug.ini /usr/local/etc/php/conf.d/ || echo "\033[32mXdebug already enabled\033[m" ; \
	exit;
	sleep 1;
	docker compose stop php;

xdebug-disable:
	docker compose up -d php;
	docker compose exec -u root php \
	mv /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini /usr/local/etc/php/disabled/ || echo "\033[32mXdebug already disabled\033[m" ; \
	exit;
	sleep 1;
	docker compose stop php;
