
## Prerequisites

* [Node.js](https://yarnpkg.com/en/docs/install) - 6.9.0 or above
* [NPM](https://docs.npmjs.com/getting-started/installing-node) - 3.10.8 or above

## Setup

Clone the repository, install the dependencies and get started right away.

    $ npm i

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ npm run migrate
    $ npm run seed

Finally, start the application.

    $ npm run start:dev (For development)
    $ npm run start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.

    $ npm run make:migration <name>
    $ npm run make:seeder <name>

Example,

    $ npm run make:migration create_tags_table
    $ npm run make:seeder 02_insert_tags

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the name of the test database and run the migrations.

    $ NODE_ENV=test npm run migrate
    $ npm run test

Run tests with coverage.

    $ num run test:coverage
