const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the MongoDB articles database
const trackSchema = new Schema({
  trackName: { type: String, required: true },
  artist:  { type: String, required: true },
  album: { type: String, required: false },
  trackID:  { type: String, required: false },
  trackURL:  { type: String, required: false },
  trackURI: { type: String, required: false },
  energy: { type: Number, required: false },
  valence: { type: Number, required: false }
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;