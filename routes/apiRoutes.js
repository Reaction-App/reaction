const axios = require("axios");
const router = require("express").Router();
const tracksController = require("../controllers/tracksController");

// authorisation key for NYT site
// const NYTKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// matches with "/api/newArticles"
// get new articles from the NYT site
// router.get("/newArticles", (req, res) => {

// 	console.log("newArticles route hit");

// 	// build the query string
// 	var NYTQuery = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYTKey;

// 	NYTQuery = NYTQuery + "&q=" + req.query.topic;

// 	// start year is optional
// 	if(req.query.startYear) {
// 		NYTQuery = NYTQuery + "&begin_date=" + req.query.startYear + "0101";		
// 	}

// 	// end year is optional
// 	if(req.query.endYear) {
// 		NYTQuery = NYTQuery + "&end_date=" + req.query.endYear + "0101";		
// 	}

// 	console.log(NYTQuery);

// 	// make a request to the NYT API and return the response as json
// 	axios
// 		.get(NYTQuery)
// 		.then(results => {
// 			res.json(results.data.response);
// 			console.log(results.data.response);
// 		})
// 		.catch(err => res.status(422).json(err));

// });

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
