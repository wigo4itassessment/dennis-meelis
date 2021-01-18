# Welcome to the YakShop!

Welcome to the repository of the YakShop, here you will find the source code of the api and SPA applications that make up the YakShop application. The project is created with Nx to manage the monorepo, see the [nx.dev site](https://nx.dev/) for more information.

For any questions you may have please contact me by e-mail: Dennis Meelis (dmeelis@xebia.com)

## Getting started

---

### Prerequisites

In order to build and run the YakShop applications you will need to have Node.js installed. It is tested with version 14.15.3, to install the required Node.js package dependencies run the following command in a terminal in the project root:

```
npm install
```

The API requires a [MongoDB](https://www.mongodb.com/) database to store the state of the herd and the order data. You can run it locally, with Docker or use a cloud based instance. To configure the database for development create a file called `.env` in `/apps/api` and fill it with the following data:

```
MONGODB_URL=[URL to your MongoDB instance]
MONGODB_DATABASE=[Name of the MongoDB database]
```

### API

The REST API is made with [NestJS](https://nestjs.com/) to provide a scalable base for the future!

To serve the API type the following command in a terminal in the project root:

```
npx nx serve api
```

### Frontend

The SPA frontend is made with [Angular](https://angular.io/).

To serve the frontend type the following command in a terminal in the project root:

```
npx nx serve yakshop
```

## Quality assurance

The project is setup with linting, unit testing and end-to-end testing to make continuous delivery possible and it keeps the codebase maintainable.

Checking code formatting:

```
nx format:check
```

Running the linting rules:

```
nx affected:lint --all
```

Running the unit tests:

```
nx affected:test --all
```

Running the end-to-end tests:

```
nx affected:e2e --all
```
