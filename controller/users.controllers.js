const selectAllUsers = require("../model/users.models");

function getUsers(request, response, next) {
  selectAllUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getUsers;
