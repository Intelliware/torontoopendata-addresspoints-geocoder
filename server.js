/**
 * Toronto Address Points Open Dataset Geocoder provides a basic geocoding REST service
 * for Toronto addresses. The data is derived from the Toronto Open Data catalogue
 * and stored in a MongoDB.
 *
 * See: https://github.com/Intelliware/torontoopendata-addresspoints-geocoder
 */

var restify = require('restify');

var db = require('./db');

var homePage = require('./handle_home');
var geocode = require('./handle_geocode');
var status = require('./handle_status');

var server = null;

db.start();
runServer();

function runServer() {
	server = restify.createServer({
		name: 'torontoopendata-addresspoints-geocoder'
	});
	server.use(restify.queryParser());
	
	server.get('/', homePage.handleHomePage);
	server.get('/stats.json', require('./handle_stats').handle);
	server.get('/locations', geocode.handleGeocode);
	server.get('/status', status.handle);
	
	var listenPort = process.env.PORT || 8081;
	server.listen(listenPort);
	
	console.log('Server running on port: '+listenPort);
}
