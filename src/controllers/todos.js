import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoService';
import { findTodo, todoValidator } from '../validators/todoValidator';

const router = Router();

/**
 * GET /api/todos
 */
router.get('/', (req, res, next) => {
  todoService
    .getAllTodos()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/todos/:id
 */
router.get('/:id', (req, res, next) => {
  todoService
    .getTodo(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/todos
 */
router.post('/', todoValidator, (req, res, next) => {
  todoService
    .createTodo(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/todos/:id
 */
router.put('/:id', findTodo, todoValidator, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/todos/:id
 */
router.delete('/:id', findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
