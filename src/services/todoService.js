import Boom from 'boom';
import Todo from '../models/todo';

/**
 * Get all todos.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}

/**
 * Get a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({ id }).fetch().then(todo => {
    if (!todo) {
      throw Boom.notFound('To do not found');
    }

    return todo;
  });
}

/**
 * Create new todo.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todo) {
  return new Todo({ title: todo.title }).save().then(todo => todo.refresh());
}

/**
 * Update a todo.
 *
 * @param  {Number|String}  id
 * @param  {Object}         todo
 * @return {Promise}
 */
export function updateTodo(id, todo) {
  return new Todo({ id }).save({ title: todo.title }).then(todo => todo.refresh());
}

/**
 * Delete a todo.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id }).fetch().then(todo => todo.destroy());
}
