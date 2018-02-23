const axios = require("axios");
const router = require("express").Router();
const tracksController = require("../controllers/tracksController");
const usersController = require("../controllers/usersController");

// Matches with "/api/users"
// upsert checks if a user exists, if not creates a new one
router.route("/users")
  .post(usersController.upsert);

// Matches with "/api/users/:id"
router
  .route("/users/:id")
  .get(usersController.findById);

// Matches with "/api/users/tracks"
// adds a new track to the current user
router.route("/users/tracks")
  .post(usersController.addTrack);

// Matches with "/api/users/tracks/:id"
router.route("/users/tracks/:id")
  .delete(usersController.removeTrack);

// Matches with "/api/users/tracks/"
router.route("/users/tracks/")
  .delete(usersController.removeAllTracks);


// Matches with "/api/tracks"
router.route("/tracks")
  .get(tracksController.findAll)
  .post(tracksController.create);

// Matches with "/api/tracks/:id"
router
  .route("/tracks/:id")
  .get(tracksController.findById)
  .put(tracksController.update)

module.exports = router;
