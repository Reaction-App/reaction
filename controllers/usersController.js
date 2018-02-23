const db = require("../models");

// Methods for the users DB controller
module.exports = {

  // find a user by id and return the user object
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // return user object based on Spotify userID, create a user if one doesn't exist
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
  // add a track to the tracks array of a user
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
  // delete a track from the tracks array of a user
  removeTrack: function(req, res) {
    console.log("removeTrack");
    console.log(req.params.id);
    let trackId = req.params.id;
    db.User.findOneAndUpdate(
      {'tracks._id':req.params.id}, 
      {$pull: { tracks: {_id:req.params.id }}},
      {new:true}
    )
    .catch(err => res.status(422).json(err));
  },

  // delete all tracks in the tracks array of a user
  removeAllTracks: function(req, res) {
    console.log("removeAllTracks");
    db.User.update({tracks: { } } )
    .catch(err => res.status(422).json(err));
  }
};