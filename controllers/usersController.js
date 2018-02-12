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
    console.log("upsert user");
    console.log(req.body);

    db.User
      .findOneAndUpdate(
        {userID: req.body.userID},
        {$set: { userID: req.body.userID, userName: req.body.userName}},
        {upsert: true, new: true}
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  addTrack: function(req, res) {
    console.log("addTrack")
    console.log(req.body);
    db.User
      .findByIdAndUpdate(
        req.body._id,
        {$push: {"tracks": req.body.newTrack}},
        {safe: true, upsert:true, new:true}
      )
      .catch(err => res.status(422).json(err));

  },
};