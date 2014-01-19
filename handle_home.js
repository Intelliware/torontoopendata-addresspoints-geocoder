/**
 * Handle request for the home page
 */

var fs = require('fs');

var content = null;

fs.readFile('static/index.html', 'utf8', function (err,data) {
	if (err) {
		console.log('Failed to read in home content...'+err);
	} else {
		content = data;
	}
});
exports.handleHomePage = function(req, res, next) {
	writeHtml(content, res);
};

function writeHtml(body, res) {
	res.writeHead(200, {
	  'Content-Length': Buffer.byteLength(body),
	  'Content-Type': 'text/html'
	});
	res.write(body);
	res.end();
}
 