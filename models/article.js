const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for the MongoDB articles database
const articleSchema = new Schema({
  headline: { type: String, required: true },
  snippet:  { type: String, required: false },
  pubDate: { type: Date, required: true },
  url: { type: String, required: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;