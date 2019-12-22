const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const natural = require('natural');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/tokenise', (req, res) => {
	const string = req.query.name;
	natural.PorterStemmer.attach();
	var tokens = string.tokenizeAndStem();
	var stemmer = natural.PorterStemmer;
	var Analyzer = natural.SentimentAnalyzer;
	var analyzer = new Analyzer("English", stemmer, "afinn");
	console.log(analyzer.getSentiment(tokens));
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ tokenise: `${tokens}` }));
});

app.get('/api/read', (req, res) => {
	var classifier = new natural.BayesClassifier();
	var path = process.cwd();
	fs.createReadStream(path + "\\First30.csv")
  .pipe(csv())
  .on('data', (row) => {
		classifier.addDocument(row.Review_Content, row.Classifier);
  })
  .on('end', () => {
		classifier.train();
		console.log('CSV file successfully processed');
		console.log(classifier.classify('We loved the Christmas decorations, great for the kids and we enjoyed all the rides, truly the happiest place on earth.'));
	});
});


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);