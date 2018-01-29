import axios from "axios";

export default {
  // The getNewArticles method retrieves new articles from the server
  // It accepts search terms
  // getNewArticles: function(searchTerms) {
  //   console.log("getNewArticles method hit");
  //   console.log(searchTerms);

  //   return axios.get("/api/newArticles", { params: searchTerms});
  // },

  // Gets tracks
  getTracks: function() {
    return axios.get("/api/tracks");
  },

  // Deletes the track with the given id
  deleteTrack: function(id) {
    return axios.delete("/api/tracks/" + id);
  },

  // Saves a track to the database
  saveTrack: function(articleData) {
    return axios.post("/api/tracks", articleData);
  }
};