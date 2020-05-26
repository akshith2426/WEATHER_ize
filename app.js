var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
app.set('view engine', 'ejs');
app.get('/', function(req, resp) {
	resp.render('search');
});

app.get('/results', function(req, resp) {
	var url_city = req.query.city;
	var url = 'http://api.weatherapi.com/v1/forecast.json?key=24815f8bfa994ffc9f524148202605&q=' + url_city + '&days=3';
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var parsedData = JSON.parse(body);
			resp.render('first', { parsedData: parsedData });
		}
	});
});
//

app.listen(process.env.PORT || 3000, function() {
	console.log('Weather Api Request Has Been Started');
});
