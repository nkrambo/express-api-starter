import Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';

const SCHEMA = {
  title: Joi.string()
    .label('Title')
    .max(90)
    .required()
};

/**
 * Validate create/update todo request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function todoValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate todo existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findTodo(req, res, next) {
  return todoService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findTodo, todoValidator };
