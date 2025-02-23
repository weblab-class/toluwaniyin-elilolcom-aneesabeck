// schemas; structure
// models: constructors that we desfine
// to apply it to our collection

const mongoose = require("mongoose");

const TreeSchema = new mongoose.Schema({
  name: String,
  image: String,
  userid: String,
  progress: Number,
  learningTopic: String,
  gptResponseInstructions: Object,
  gptResponseQuestions: Object,
  gptResponseAnswers: Object,
  customText: String,
  gptResponseLinks: Object,
  //store tasks + questions - have to parse
});

// compile model from schema
module.exports = mongoose.model("tree", TreeSchema);
