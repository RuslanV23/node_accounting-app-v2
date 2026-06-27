class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = (requst, response) => {
    response.send(this.service.get());
  };

  getOne = (requst, response) => {
    const { paramsId } = requst.params;

    if (Number.isNaN(+paramsId)) {
      response.sendStatus(400);

      return;
    }

    const userFound = this.service.getById(+paramsId);

    if (!userFound) {
      response.sendStatus(404);

      return;
    }

    response.send(userFound);
  };

  createOne = (requst, response) => {
    const body = requst.body;

    if (Object.keys(body).length === 0) {
      response.sendStatus(400);

      return;
    }

    const newUser = this.service.createOne(body);

    response.status(201).json(newUser);
  };

  deleteOne = (requst, response) => {
    const { paramsId } = requst.params;

    if (Number.isNaN(+paramsId)) {
      response.sendStatus(400);

      return;
    }

    const userFound = this.service.getById(+paramsId);

    if (!userFound) {
      response.sendStatus(404);

      return;
    }

    this.service.deleteOne(+paramsId);

    response.sendStatus(204);
  };

  updateOne = (requst, response) => {
    const { paramsId } = requst.params;
    const responseUser = requst.body;

    if (Number.isNaN(+paramsId)) {
      response.sendStatus(400);

      return;
    }

    const userFound = this.service.getById(+paramsId);

    if (!userFound) {
      response.sendStatus(404);

      return;
    }

    this.service.updateOne({ ...responseUser, id: paramsId });

    response.send(userFound);
  };
}

module.exports = BaseController;
