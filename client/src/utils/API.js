import axios from "axios";

export default {

  // Gets user info, including tracks
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  // Checks if a user exists in the DB, if not creates a new one
  upsertUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  // Saves a track to the database
  saveTrack: function(trackData) {
    return axios.post("/api/users/tracks", trackData);
  },

  // Deletes the track with the given id
  deleteTrack: function(id) {
    return axios.delete("/api/users/tracks/" + id);
  }
};