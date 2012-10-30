/**
 * Toronto Address Points Open Dataset Geocoder provides a basic geocoding REST service
 * for Toronto addresses. The data is derived from the Toronto Open Data catalogue
 * and stored in a MongoDB.
 *
 * See: https://github.com/Intelliware/torontoopendata-addresspoints-geocoder
 */

var restify = require('restify');

var homePage = require('./handle_home');
var geocode = require('./handle_geocode');

var server = null;

runServer();

function runServer() {
	server = restify.createServer({
		name: 'torontoopendata-addresspoints-geocoder'
	});
	server.use(restify.queryParser());
	
	server.get('/', homePage.handleHomePage);
	server.get('/locations', geocode.handleGeocode);
	
	var listenPort = process.env.PORT || 8081;
	server.listen(listenPort);
	
	console.log('Server running on port: '+listenPort);
}