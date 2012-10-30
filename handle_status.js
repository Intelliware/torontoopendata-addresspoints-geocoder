/**
 * Handle status page requests
 */
 
 var db = require('./db');
 
 // Public API
 
 exports.handle = function(req, res, next) {
 	db.checkStatus(function(err, data) {
 		var body = null;
 		if (!err && data == 0) {
 			body = failBody('No registered addresses found');
 		} else if (!err) {
 			body = {
 				'status': 200,
 				'db': {
 					'state': 'ok',
 					'count': data
 				},
 				'service': {
 					'state': 'ok'
 				}
 			};
 		} else {
 			body = failBody(err);
 		}
 		res.send(body);
 		return next;
 	});
}

// Internal API

function failBody(err) {
	return {
 				'status': 200,
 				'db': {
 					'state': 'fail',
 					'message': err
 				},
 				'service': {
 					'state': 'fail'
 				}
 			};
};
 
 
