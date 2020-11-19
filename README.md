# Scrumboard

## Start development server

Run the following commands to start the development server:

```bash
docker run --rm --name postgres -e POSTGRES_PASSWORD=scrumboard -e POSTGRES_USER=scrumboard -p 5432:5432 -d postgres

yarn install
yarn run dev
```

Note: To create the database schema call the `/api` once.

## Start production server

Run the following commands to start the production server:

```bash
docker run --rm --name postgres -e POSTGRES_PASSWORD=scrumboard -e POSTGRES_USER=scrumboard -p 5432:5432 -d postgres

yarn install
yarn build
yarn start
```

Note: To create the database schema call the `/api` once.

## Dev tools used:

- [Typescript](https://www.typescriptlang.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro)
