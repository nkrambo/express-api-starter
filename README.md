
## Prerequisites

* [Node.js](https://yarnpkg.com/en/docs/install) - 6.9.0 or above
* [npm](https://docs.npmjs.com/getting-started/installing-node) - 3.10.8 or above

## Setup

Clone the repository, install the dependencies and get started right away.

    $ yarn install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ yarn migrate
    $ yarn seed

Finally, start the application.

    $ yarn start:dev (For development)
    $ yarn start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.

    $ yarn make:migration <name>
    $ yarn make:seeder <name>

Example,

    $ yarn make:migration create_tags_table
    $ yarn make:seeder 02_insert_tags

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the name of the test database and run the migrations.

    $ NODE_ENV=test yarn migrate
    $ yarn test

Run tests with coverage.

    $ yarn test:coverage
