fmt-caddy:
	docker run --rm -v $PWD/:/srv caddy:latest caddy fmt --overwrite Caddyfile
.PHONY: fmt-caddy
