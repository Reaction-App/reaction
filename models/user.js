const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the MongoDB users database
const userSchema = new Schema({
    userID: { type: String, required: true },
	userName: { type: String, required: false },
    email: { type: String, required: false },
    tracks: [{
		trackName: { type: String, required: true },
		artist:  { type: String, required: true },
		album: { type: String, required: false },
		trackID:  { type: String, required: false },
		trackURL:  { type: String, required: false },
		trackURI: { type: String, required: false },
		energy: { type: Number, required: false },
		valence: { type: Number, required: false }
	}]	
});

const User = mongoose.model("User", userSchema);

module.exports = User;