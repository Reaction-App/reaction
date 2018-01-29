const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the MongoDB articles database
const trackSchema = new Schema({
  name: { type: String, required: true },
  artists:  { type: String, required: true },
  album: { type: String, required: false },
  spotifyID:  { type: String, required: false },
  spotifyURL:  { type: String, required: false },
  spotifyURI: { type: String, required: false },
  energy: { type: Number, required: false },
  valence: { type: Number, required: false }
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;