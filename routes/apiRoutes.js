const axios = require("axios");
const router = require("express").Router();
const tracksController = require("../controllers/tracksController");
const usersController = require("../controllers/usersController");

// Matches with "/api/users"
router.route("/users")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/users/:id"
router
  .route("/users/:id")
  .get(usersController.findById)
//   .put(usersController.update)
//   .delete(usersController.remove);

// Matches with "/api/users/upsert"
router
  .route("/users/upsert")
  .post(usersController.upsert);

// Matches with "/api/users/tracks"
router.route("/users/tracks")
  .post(usersController.addTrack);

// Matches with "/api/tracks"
router.route("/tracks")
  .get(tracksController.findAll)
  .post(tracksController.create);

// Matches with "/api/tracks/:id"
router
  .route("/tracks/:id")
  .get(tracksController.findById)
  .put(tracksController.update)
  .delete(tracksController.remove);

module.exports = router;
