/**
 * Handle request for the home page
 */

exports.handleHomePage = function(req, res, next) {
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
 