# React Force Graph

See

- [learngraph.org](https://learngraph.org/),
- [about us](https://learngraph.org/about).

## Development

### Development Envorinment

We develop on linux. Windows with WSL is possible but we will not offer support
with WSL problems & project setup.

First setup a pre-commit hook via

```sh
yarn init-git
```

This will run tests, linter and auto-formatter before every commit.

### Running the Application

Start the frontend as standalone app

```sh
npm run dev
```

Or run it in a docker container

```sh
docker-compose up
```

If the backend is started in the same way, communication is possible without
additional configuration.

### Architecture

We use [Vite](https://vitejs.dev/).

### Testing

Run the tests via

```sh
yarn test
# or
yarn test-watch
```

Framework: We use jest, and @testing-library/react.

Approach: All logic should be tested, including null-coalescing with
"??"-operator. If inline logic is written inside a component, that component
should be rendered in a test.

### Production

Compilation via 2 stage [Dockerfile](./Dockerfile).
Image is build and pushed to hub.docker.com via [github action](.github/workflows/release.yml).
