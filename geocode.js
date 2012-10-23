/**
 * Toronto Address Points Open Dataset Geocoder provides a basic geocoding REST service
 * for Toronto addresses. The data is derived from the Toronto Open Data catalogue
 * and stored in a MongoDB.
 *
 * See: https://github.com/Intelliware/torontoopendata-addresspoints-geocoder
 */

var restify = require('restify');
var mongo = require('mongodb');

var mongoUrl = process.env.MONGO_URL || "mongodb://api:hogtown10c@alex.mongohq.com:10002/toronto-addresspoints";
var mongoCollection = process.env.MONGO_COLLECTION || 'addresses';
var mongoDb = null;
var addresses = null;

var server = null;

mongo.connect(mongoUrl, {}, function(err, db) {
	if (!err) {
		console.log('Connected to mongo db: '+mongoUrl);
		mongoDb = db;
		openAddressesCollection();		
	} else {
		console.log('failed to open mongodb: '+err);
	}
});

function openAddressesCollection() {
	mongoDb.collection(mongoCollection, {safe: true}, function(err, collection) {
		if (!err) {
			addresses = collection;
			runServer();
			validateAddressesConnection();
		} else {
			console.log('Error: failed to access collection: '+err);
		}
	});

}

function validateAddressesConnection() {
	addresses.find().count(function(err, count) {
		if (!err) {
			console.log('Database contains '+count+' addresses');
		} else {
			console.log('Failed to execute validation query against MongoDB: '+err);
		}
	});
}

function handleGeocode(req, res, next) {
	var q = req.query.q;
	if (q) {
		var number = extractNumber(q);
		var street = extractStreet(q);
		processGeocode(req, res, next, number, street);
	} else {
		res.send(400, 'Missing query: q');
		return next;
	}
}

function sanitizeWhitespace(s) {
	return s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,'');
}

function extractNumber(q) {
	var words = sanitizeWhitespace(q).split(" ");
	if (words.length > 0) {
		return words[0];
	} else {
		return '';
	}
}

function extractStreet(q) {
	var s = sanitizeWhitespace(q);
	s = s.substr(s.indexOf(" ") + 1);
	return s.toUpperCase();
}

function processGeocode(req, res, next, number, street) {
	addresses.findOne({'street':street, 'address':number}, function(err, item) {
		if (!err) {
			if (item) {
				console.log('found: '+item.address);
				var output = {
					'status': 200,
					'location': {
						'id': item.id,
						'address': {
							'number': item.address,
							'street': item.street,
						},
						'latLng': {
							'lat': item.lat,
							'lng': item.lng
						}
					}
				};
				res.send(output);
				return next;
			} else {
				console.log('not found: '+number+' '+street);
				var output = {
					'status': 404,
					'message': 'No location found for: '+number+' '+street
				};
				res.send(404, output);
				return next;
			}
		} else {
			return next(err);
		}
	});
}

function handleHomePage(req, res, next) {
	var body = 
	'<html>'+
	'<body>'+
	'	<h1>Toronto Address Points Open Dataset Geocoder</h1>'+
	'	<p>Open source REST service to provide information for any given Toronto, Canada, address.</p>'+
	'	<p><a href="https://github.com/Intelliware/torontoopendata-addresspoints-geocoder">Learn more</a> about the open-source Geocoder.</p>'+
	'	<p>Try out the service for <a href="/locations?q=200%20Adelaide%20St%20W">200 Adelaide St W, Toronto</a>.</p>'+
	'</body>'+
	'</html>';
	writeHtml(body, res);
}

function writeHtml(body, res) {
	res.writeHead(200, {
	  'Content-Length': Buffer.byteLength(body),
	  'Content-Type': 'text/html'
	});
	res.write(body);
	res.end();
}

function runServer() {
	server = restify.createServer({
		name: 'torontoopendata-addresspoints-geocoder'
	});
	server.use(restify.queryParser());
	
	server.get('/', handleHomePage);
	server.get('/locations', handleGeocode);
	
	var listenPort = process.env.PORT || 8081;
	server.listen(listenPort);
	
	console.log('Server running on port: '+listenPort);
}
