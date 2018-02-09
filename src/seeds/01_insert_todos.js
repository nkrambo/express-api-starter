/**
 * Seed todos table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('todos')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('todos').insert([
          {
            title: 'Get milk',
            updated_at: new Date()
          },
          {
            title: 'Make milkshakes',
            updated_at: new Date()
          }
        ])
      ]);
    });
}
