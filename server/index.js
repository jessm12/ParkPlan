const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const nlp = require( 'wink-nlp-utils' );
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/tokenise', (req, res) => {
	const string = req.query.name;
	var tokens = nlp.string.tokenize( string, true );
	var tokensList = [];
	for (var i=0; i < tokens.length; i++) {
		tokensList.push(tokens[i].value);
	}
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ tokenise: `${tokensList}` }));
});

app.get('/api/read', (req, res) => {
	var fs = require('fs');
	var path = process.cwd();
	var buffer = fs.readFileSync(path + "\\reviewTitles.txt");
	console.log(buffer.toString());
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);