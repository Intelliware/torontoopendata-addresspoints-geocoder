/**
 * Handle Geocode requests
 */

 var db = require('./db');
 
 // Initialization
 
 // Public API
 
exports.handleGeocode = function(req, res, next) {
	var q = req.query.q;
	if (q) {
		var number = extractNumber(q);
		var street = extractStreet(q);
		processGeocode(req, res, next, number, street);
	} else {
		console.log('search=streetaddress match=error message="no-q-field"');
		res.send(400, 'Missing query: q');
		return next;
	}
}

// Just for tests....
exports.sanitizeWhitespace = sanitizeWhitespace;
exports.extractNumber = extractNumber;
exports.extractStreet = extractStreet;

// Internal API

function sanitizeWhitespace(s) {
	return s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,'');
}

function extractNumber(q) {
	var words = sanitizeWhitespace(q).split(" ");
	if (words.length > 0 && /^\d/.test(words[0])) {
		return words[0];
	} else {
		return '';
	}
}

function extractStreet(q) {
	var s = sanitizeWhitespace(q);
	var number = extractNumber(q);
	if (number.length > 0) {
		if (s.indexOf(" ") == -1) {
			s = '';
		} else {
			s = s.substr(s.indexOf(" ") + 1);
		}
	}
	return s.toUpperCase();
}

function processGeocode(req, res, next, number, street) {
	db.findStreetAddress(number, street, function(err, item) {
		if (!err) {
			if (item) {
				console.log('search=streetaddress match=full found="'+item.ADDRESS+' '+item.LF_NAME+'"');
				var output = generateFoundJson(item);
				res.send(output);
				return next;
			} else {
				console.log('search=streetaddress match=none searchfor="'+number+' '+street+'"');
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

function generateFoundJson(item) {
	return {
		'status': 200,
		'location': {
			'id': item.GEO_ID,
			'placeName': item.NAME,
			'address': {
				'number': item.ADDRESS,
				'street': item.LF_NAME,
				'city': 'Toronto',
				'region': 'Ontario',
				'country': 'CA'
			},
			'latLng': {
				'lat': item.lat,
				'lng': item.lng,
				'crs': 'EPSG:4326'
			},
			'feature': {
				'description': item.FCODE_DESC,
				'code': item.FCODE,
			},
			'data': {
				'class': item.CLASS,
				'arcSide': item.ARC_SIDE,
				'distance': item.DISTANCE,
				'lowNumber': item.LO_NUM,
				'lowNumberSuffix': item.LO_NUM_SUF,
				'highNumber': item.HI_NUM,
				'highNumberSuffix': item.HI_NUM_SUF,
				'primaryAdressId': item.LINK,
				'streetNameIdentity': item.LFN_ID
			}
		}
	};
}
 