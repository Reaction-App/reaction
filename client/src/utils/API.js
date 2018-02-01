import axios from "axios";

export default {

  // Gets tracks
  getTracks: function() {
    return axios.get("/api/tracks");
  },

  // Deletes the track with the given id
  deleteTrack: function(id) {
    return axios.delete("/api/tracks/" + id);
  },

  // Saves a track to the database
  saveTrack: function(trackData) {
    return axios.post("/api/tracks", trackData);
  }
};