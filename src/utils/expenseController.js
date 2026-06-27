const { userService } = require('../users/users.router');
const BaseController = require('./baseController');

class ExpenseController extends BaseController {
  createOne = (requst, response) => {
    const body = requst.body;

    if (Object.keys(body).length === 0) {
      response.sendStatus(400);

      return;
    }

    if (!Object.hasOwn(body, 'userId')) {
      response.sendStatus(400);

      return;
    }

    if (!userService.getById(body.userId)) {
      response.sendStatus(400);

      return;
    }

    const newUser = this.service.createOne(body);

    response.status(201).json(newUser);
  };

  getByQuery = (request, response) => {
    const { userId, categories, from, to } = request.query;

    let items = this.service.get();

    if (userId) {
      items = items.filter(item => String(item.userId) === String(userId));
    }

    if (categories) {
      const categoriesList = Array.isArray(categories)
        ? categories.map(String)
        : [String(categories)];

      items = items.filter(
        item => categoriesList.includes(String(item.category)),
        // eslint-disable-next-line function-paren-newline
      );
    }

    if (from && to) {
      const dateFrom = new Date(from);
      const dateTo = new Date(to);

      items = items.filter(item => {
        const spentAt = new Date(item.spentAt);

        return spentAt > dateFrom && spentAt < dateTo;
      });
    }

    response.send(items);
  };
}

module.exports = ExpenseController;
