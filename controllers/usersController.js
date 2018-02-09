const db = require("../models");

// Methods for the users DB controller
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  upsert: function(req, res) {
    console.log("upsert");
    console.log(req.body);

    db.User
      .findOneAndUpdate(
        {userID: req.body.userID},
        {$set: { userID: req.body.userID, userName: req.body.userName, email: req.body.email }},
        {upsert: true, new: true}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // addTrack: function(req, res) {
  //   db.User
  //     .findOne({ _id: re.params.id})
  //     .then(user => )
  // }
};