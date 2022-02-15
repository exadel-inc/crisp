# Crisp Core Backend

## Table of contents

- [Crisp Core Backend](#crisp-core-backend)
  - [Table of contents](#table-of-contents)
    - [Other topics](#other-topics)
  - [Getting started](#getting-started)
  - [Technological stack](#technological-stack)
  - [Development](#development)
    - [Setting up your environment](#setting-up-your-environment)
    - [Common conventions](#common-conventions)
    - [Code style](#code-style)
    - [Scripts](#scripts)
    - [Git conventions](#git-conventions)
    - [Documentation](#documentation)
  - [Project structure](#project-structure)

## Getting started

You need to make sure the following are installed:

- [`Node 14.16`](https://nodejs.org/en/) or newer
- [`npm`](https://www.npmjs.com/)
- [Docker Engine CE](https://docs.docker.com/engine/install/#server) 19.03 or newer
- [Docker Compose](https://docs.docker.com/compose/install/) 1.22 or newer

> **Note**
>
> If, for whatever reason, you want to use a locally-installed database, make sure to also install Mongo DBMS!

Also, if you need to use the cloud database instances, currently it's not supported.

## Instructions to run Crisp Backend locally without external dependencies

### 1. Clean up docker

- 1.1. Kill container processes: `docker kill $(docker ps -q)`
- 1.2. Remove containers: `docker rm $(docker ps -a -q)`
- 1.3. (Optional) Remove images: `docker rmi $(docker images -q)`
- 1.4. (Optional) Purge networks and other stuff: `docker system prune -a`
- 1.5. (Optional) Purge volumes: `docker volume prune`

### 2. Make sure your `.env` file contains all configs used in `docker-compose.yaml`

Use `.env.example` as a reference.

### 3. Start app dependencies under docker project

`docker-compose --env-file .env.<env-name e.g: production> up -d`

### 4. Start app

`npm run start:dev`

## Technological stack

Crisp Core uses the following libraries and products:

- Node.js 14.15
- Mongo with Mongoose ORM
- Nest.js as our server framework of choice
- Class-validator for request validation

## Development

### Setting up your environment

After installing the above, you need to perform the following steps to set your development machine:

1. Do not forget to run `npm install` to install the required dependencies.
2. Use `.env.example` file as guidance and set up the environment variables listed there.
   Reach out to others to get the necessary configurations. _This is required to set up the app!_
3. Run `docker-compose --env-file .env.<env-name e.g: production> up` in your command shell to spin up local db instances.
4. Run

   ```shell
   npm run start (without nodemon)
   ```

   or

   ```shell
   npm run start:dev (also starts nodemon watching your files)
   ```

   Note that this doest not run migrations and synchronizes db instance on startup. If you want to run it,
   additionally:

   - `npm run build`
   - `npm run migrate up`.

### Common conventions

- Any route is followed after /api for the purpose of CloudWatch work(for metrics in future)
- Use dashes in API routes instead of camel case or underscores.
- Use kebab case for naming dirs, files, object or class fields, columns in db queries.
- Use kebab case for naming schemas, tables or columns in migrations or seeds.
- Use _only_ arrow functions except for class methods.
- Do not run any DB queries inside controllers, call the repos' methods only there.
- try..catch is required at least on controller level. Surround with try..catch any transaction operations inside repos.
- Use async-await over promises or generators
- Prefer functional style over loops (except in performance-critical code _after_ benchmarking and verifying that
  the function invocation is the bottleneck in your case).
- All entity-domain-scoped entities should be cached with the name of its domain as cache-key.
  The same pattern should be preferred whenever something that manages domain-specific data is created.
- Remember we are using CommonJS modules. This has some implications:

  - there are directory imports with `index.js` files (in other words, all dependancies are in `index.js` file);
  - you do not need to specify file extensions in imports unlike CommonJS, only its type: module, controller, service, entity, enum, constant.

- Prefer simple structure of files which aggregate their dependencies and what they provide as an export (this does apply to everything in `src/modules/` folder).
- Can use custom error instances, or handle errors with filter `HttpExceptionFilter`.

  ...to be continued.

### Code style

We use Prettier and ESLint to format and check code. It should cover 90% of cases. If in doubt, just ask others.

### Scripts

- `start` - starts the server without any external monitoring
- `start:dev` - starts the server with nodemon
- `start:exm` - starts the server with example .env process envs
- `start:prod` - starts the server from transpiles file from `dist/main` with production mode
- `start:debug` - starts the server with debug flag
- `prebuild` - removes dist folder
- `build` - builds backend
- `format` - applies prettier formater
- `doc` - generates docs for backend
- `doc:generate` - generates docs for backend, service command, use `doc`
- `lint` - checks lint rules which are set in project
- `test` - runs tests
- `test:watch` - runs tests with watch mode
- `test:cov` - runs to see test coverage
- `test:debug` - runs test with debug mode
- `test:e2e` - runs e2e test according to `jest config` `./test/jest-e2e.json`
- `migrate:build` - builds migrations and seeds into dist folder
- `migrate up` - runs all migrations that have not been run yet
- `migrate down` - rolls back the most recent migration batch
- `migrate-create [--tenant|-t] <migration_name>` - creates a new migration file from stub in `src/database/migrations`

### Git conventions

> **Note**
>
> Proper branch names and commit messages are required!

Branch names should be prefixed with `tech/`, `feat/` or `bugfix/` followed by ticket number from Jira,
dash and a few descriptive words.
Example: `feat/CRISP-999-order-creation`

Commit messages must follow the following format, we use git conventions:

```text
[Ticket number] [message]

[Optional body]
```

Example: `feat/CRISP-999-Add-order-creation`.  
Long example:

```text
feat/CRISP-999-Add-order-creation

Add order creation and finish place new order screen
This commit finishes order creation flow and gives users the ability to
place new orders and create customers and job sites.

* Fix creation of credit cards on order page
* Fix typings of order form
```

Another example:

```text
chore/CRISP-111-Support-deleting-users

* Integrate with backend user management API
* Remove user profile on deletion
```

The message should be capped at 75 characters and must be in indefinite tense. It should read as _'\[If accepted, this commit will\] add order creation'_.

If provided, the body might include a detailed header, long description and a list of changes with bullet points, all of which are optional (you can use `*` in Markdown).  
Please, DO NOT use `fixes`, `applied fixes` and other meaningless messages. If you apply fixes in a batch, use
`git commit --amend` to prevent creating meaningless commits.

PR titles should follow the same format as commit messages. Just so that you know, if you submit a PR with one commit only, GitHub assigns the title of the commit to the PR and saves you quite a bit of typing.

### Documentation

At this moment, single representation of API documentation based on `nest/swagger` decorators. That is why keeping this up to date is all developers duty so should be followed until we move to more advanced documentation tool.

Therefore in case of CRUD updates of API - decorators should be applied to fns, it is mandatory and must be delivered with correspondant PR.

## Project structure

- `src/main.ts` - main entry point
- `src/app.module.ts` - imports of all project modules
- `src/config` - service to configure future loading, all configuration variables should be specified in .env file based on mode
- `src/common` - enums, constants, dtos, filters, guards, helpers, interceptors, services, shared enitities are based here in its folder
- `src/database` - holds migrations, seeds, mongo-services, constants, utils, helpers and other DB-related configurations
- `Dockerfile` - custom non-default Docker files; for now, it only contains a Dockerfile
- `test` - tests, test utils, fixtures
