const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const natural = require('natural');
const fs = require('fs');
const csv = require('csv-parser');
const limdu = require('limdu');
const mysql = require('mysql');

const app = express();
app.use(express.static('assets/bundle'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/tokenise', (req, res) => {
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

app.get('/api/DBConnect', (req, res) => {
	const date = req.query.date;
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "Swirl457-"
	});

	dateArray = date.split("-");

	const toAdd = "2019 08:00"
	var dateQuery = dateArray.reverse()
	dateQuery.splice(2,1)
  dateQuery.push(toAdd);
	dateQueryString = dateQuery.join("/");
	
	con.connect(function(err) {
		if (err) {
			console.log("whoops")
		}
		console.log("Connected!");
		var sql = "SELECT * FROM crowddb.crowd_calendar WHERE park_id=4 AND open_date_time = ?";
		var query = con.query(sql, dateQueryString, function (err, result) {
			if (err) {
				console.log("whoops")
			}
			console.log(query.sql);
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ output: `${result[0].actual_crowd_level}` }));
		});
	});
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

app.get('/api/multi', (req, res) => {
	var MyWinnow = limdu.classifiers.Winnow.bind(0, {retrain_count: 10});
	var intentClassifier = new limdu.classifiers.multilabel.BinaryRelevance({
		binaryClassifierType: MyWinnow,
	});
	const review = {
		content: '',
		classifier: ''
	};
	trainingData = [];
	var path = process.cwd();
	fs.createReadStream(path + "\\First30.csv")
  .pipe(csv())
  .on('data', (row) => {
		var newReview = Object.create(review);
		newReview.content = row.Review_Content;
		newReview.classifier = row.Classifier;
		trainingData.push(newReview);
  })
  .on('end', () => {
		console.log(trainingData);
	});
});

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};
app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));