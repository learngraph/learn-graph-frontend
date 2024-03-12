# Learngraph Frontend

See

- [learngraph.org](https://learngraph.org/),
- [about us](https://learngraph.org/about).

## Contributing

### How to Contribute?

- Commit messages should follow the [conventional commits guideline](https://www.conventionalcommits.org/en/v1.0.0/),
- Create a PR & wait for review,
- PRs should be "squashed & merged"

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

### Simple setup guide for beginner devs

Install git, docker, docker-compose and npm.

To install all dependencies run

```sh
npm install
```

For the setup of docker run

```sh
sudo gpasswd -a $USER docker
sudo usermod --append --groups docker $USER
```

To add your user to the docker group and

```sh
docker network create learngraphnet
```

To let frontend and backend talk to each other in docker.

Finally run `docker-compose up` parallel in both frontend and backend.

You can look at the current instance of the app in your Browser under
`localhost:3000`
