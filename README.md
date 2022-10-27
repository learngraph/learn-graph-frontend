# React Force Graph

## Development

### Design Decisions

We want to keep the CRA (-- Create React App), i.e. we don't want to eject,
unless absolutely necessary.

### Running the Application

Start the frontend as standalone app

```sh
yarn start
```

Or run it in a docker container

```sh
docker-compose -f ./docker-compose-dev.yml up
```

If the backend is started in the same way, communication is possible.

### Testing

Run the tests via

```sh
yarn test
# or
yarn test-watch
```

Note: currently broken, use `yarn test-react`!

Framework: We use jest, and @testing-library/react.

Approach: All logic should be tested, including null-coalescing with
"??"-operator. If inline logic is written inside a component, that component
should be rendered in a test.

Implementation: We're using the [default jest config](./scripts/config/jest),
copied from CRA.

## Production

Compilation via 2 stage [Dockerfile](./Dockerfile).
Image is build and pushed to hub.docker.com via [github action](.github/workflows/release.yml).
