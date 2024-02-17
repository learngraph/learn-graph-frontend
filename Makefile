build-and-push:
	docker build . -t xsbzgtoi/learn-graph-frontend:latest
	docker push xsbzgtoi/learn-graph-frontend:latest
.PHONY: build-and-push
