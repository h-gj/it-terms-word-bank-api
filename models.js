const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/it_terms_word_bank', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connection is successful.');
});


const termSchema = new mongoose.Schema({
  word: String,
  definition: String,
});

const Term = mongoose.model('Term', termSchema, 'computer_hope');

// Term.find({'word': {'$regex': 'linux', '$options': 'i'}}, function (err, terms) {
//   if (err) return console.error(err);
//   console.log('termss', terms);
// });

module.exports = Term

