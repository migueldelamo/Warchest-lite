# warchest-lite

The goal of this application is to develop a lite version or Warchest board game for two users.
The goal of this application is to provide a unified way to manage job offers and their leads from infojobs.

The project is divided into two modules: offers and leads. Offers module provides features to list, create and validate offers. Leads module provides a list to manage leads from each offer. You could also perform actions over a lead, like adding comments, modify its tags in the vacancy, etc.

## Table of contents

- [warchest-lite](#infojobs-front)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Dependencies](#dependencies)
  - [Development](#development)
    - [Project structure](#project-structure)
    - [Running tests](#running-tests)
    - [CI](#ci)
  - [Release](#release)
    - [Releasing new changes](#releasing-new-changes)
      - [Development](#development-1)

## Getting Started

1. Clone the repository
2. Install dependencies using:

```bash
npm install
```

3. Run the game to play using:

```bash
npm start
```

## Dependencies

- eslint
- jest
- node-json-db
- prompt

## Development

Before submitting a patch, please make sure:

- the test suite passes.
- the compiler does not emit any warnings (make compile).

### Project structure

- `/src` - is a place where the core code is located:
  - `/db` - the internal database to store user history
  - `/types` - types we've defined for entities, for example: position, workplace, etc
  - `/utils` - helper functions for the game functionality are placed here

### Running tests

We write unit tests for helpers and other functions with `jest`.

To run the tests, please execute this command:

```
yarn test
```

For further documentation: [jest](https://jestjs.io/)

## Release

### Releasing new changes

#### Development

- Create a local branch where you'll make your changes. When they're ready push them.
- Before creating a PR, run the tests and check if build shows any errors.
- Create a PR.
- After the PR is approved, merge your changes into `main` branch and delete the local branch if it's not needed anymore.
