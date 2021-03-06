/**
 * Access to the underlying database of address points.
 * Currently this is implemented as a MongoDB.
 */

var mongo = require('mongodb');

var mongoUrl = process.env.MONGO_URL || "mongodb://api:hogtown10c@alex.mongohq.com:10002/toronto-addresspoints";
var mongoCollection = process.env.MONGO_COLLECTION || 'addresses';
var mongoDb = null;
var addresses = null;

var startupError = null;
// Startup


// Public API

exports.start = function() {
	mongo.connect(mongoUrl, {}, function(err, db) {
		if (!err) {
			console.log('Connected to mongo db: '+mongoUrl);
			mongoDb = db;
			openAddressesCollection();		
		} else {
			startupError = 'failed to open mongodb: '+err;
			console.log(startupError);
		}
	});
};

// Lookup up the item associated with "number street"
exports.findStreetAddress = function(number, street, handler) {
	addresses.findOne({'LF_NAME':street, 'ADDRESS':number}, handler);
};

exports.checkStatus = function(callback) {
	if (addresses) {
		addresses.find().count(callback);
	} else {
		callback(startupError ? startupError : 'Mongo collection not found', null);
	}
};

// Internal API

function openAddressesCollection() {
	mongoDb.collection(mongoCollection, {safe: true}, function(err, collection) {
		if (!err) {
			addresses = collection;
			validateAddressesConnection();
		} else {
			startupError = 'Error: failed to access collection: '+err; 
			console.log(startupError);
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
