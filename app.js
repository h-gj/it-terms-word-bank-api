const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000
const Term = require('./models')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});


app.get('/', (req, res) => {
  const search = req.query.search;
  const startsWith = req.query.startsWith;
  const startsWithRegExp = new RegExp('^' + startsWith, 'i')
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')
  const startsWithAndSearchRegExp = new RegExp("(?=.*" + search + ")^" + startsWith, 'i')
  console.log('startsWith', startsWith);
  console.log('startsWith', startsWith);

  if (search && startsWith) {
    Term.find({'word': startsWithAndSearchRegExp}, function (err, terms) {
      if (err) return console.error(err);
      return res.send(terms)
    });
  }
  else if (search) {
    Term.find({'word': searchRegExp}, function (err, terms) {
      if (err) return console.error(err);
      return res.send(terms)
    });
  }
  else if (startsWith) {
    Term.find({'word': startsWithRegExp}, function (err, terms) {
      if (err) return console.error(err);
      return res.send(terms)
    });
  }
  else {
    Term.find({}, function (err, terms) {
      if (err) return console.error(err);
      return res.send(terms)
    });
  }
})

app.get('/detail/:termId', (req, res) => {
  termId = req.params.termId;

  const search = req.query.search;
  Term.findById(termId, function (err, term) {
    if (err) return console.error(err);
    // console.log('termss', terms);
    return res.send(term)
  });
  // res.send('No query.')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
