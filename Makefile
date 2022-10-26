fmt-caddy:
	docker run --rm -v $$PWD/:/srv caddy:latest caddy fmt --overwrite Caddyfile
.PHONY: fmt-caddy

dc-caddy:
	FRONTEND_DN=localhost docker-compose -f ./docker-compose-caddy.yml up
.PHONY: dc-caddy

build-and-push:
	docker build . -t xsbzgtoi/learn-graph-frontend:latest
	docker push xsbzgtoi/learn-graph-frontend:latest
.PHONY: build-and-push
