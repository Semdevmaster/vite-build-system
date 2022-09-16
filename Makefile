include .env
install-laravel:
	docker compose run --rm php-cli composer create-project --prefer-dist laravel/laravel $(APP_CODE_PATH_CONTAINER)

install-modx:
	docker compose run --rm php-cli composer create-project modx/revolution $(APP_CODE_PATH_CONTAINER)

mysql-backup:
	docker compose exec mysql /usr/bin/mysqldump -u root --password=$(MYSQL_ROOT_PASSWORD) $(APP_BD_NAME) \
	| gzip > ~/backups/$(APP_BD_NAME)_backup-`date +\%d.\%m.\%Y`.sql.gz

generate-ssl:
	cd server/nginx/ssl \
 	&& mkcert -cert-file $(APP_HOST).pem -key-file $(APP_HOST)-key.pem $(APP_HOST) *.$(APP_HOST)
