const { Router } = require('express');

const ExpenseService = require('../utils/expenseService');
const ExpenseController = require('../utils/expenseController');

const expenceController = new ExpenseController(new ExpenseService());

const expenseRouter = Router();

expenseRouter.get('/', expenceController.getByQuery);
expenseRouter.post('/', expenceController.createOne);
expenseRouter.get('/:paramsId', expenceController.getOne);
expenseRouter.delete('/:paramsId', expenceController.deleteOne);
expenseRouter.patch('/:paramsId', expenceController.updateOne);

module.exports = { expenseRouter };
