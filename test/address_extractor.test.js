var should = require('chai').should();

var HandleGeocode = require('../address_extractor');

describe("Parsing input", function() {
	it("sanitize whitespace and result in regular single space output for later output", function() {
		HandleGeocode.sanitizeWhitespace('').should.equal('');
		HandleGeocode.sanitizeWhitespace('first').should.equal('first');
		HandleGeocode.sanitizeWhitespace('   first    ').should.equal('first');
		HandleGeocode.sanitizeWhitespace('   1    ').should.equal('1');
		HandleGeocode.sanitizeWhitespace('1-2').should.equal('1-2');
		HandleGeocode.sanitizeWhitespace('first second').should.equal('first second');
		HandleGeocode.sanitizeWhitespace('  first    second ').should.equal('first second');
	});
	
	it("extracts out first number of full address as the street number", function() {
		HandleGeocode.extractNumber('').should.equal('');
		HandleGeocode.extractNumber('   ').should.equal('');
		HandleGeocode.extractNumber('123 street').should.equal('123');
		HandleGeocode.extractNumber('123').should.equal('123');
		HandleGeocode.extractNumber('123A').should.equal('123A');
		HandleGeocode.extractNumber('123-143').should.equal('123-143');
		HandleGeocode.extractNumber('  123   street   ').should.equal('123');
		HandleGeocode.extractNumber('street').should.equal('');
	});

	it("extracts out street as anything post number", function() {
		HandleGeocode.extractStreet('').should.equal('');
		HandleGeocode.extractStreet('   ').should.equal('');
		HandleGeocode.extractStreet('123 street').should.equal('STREET');
		HandleGeocode.extractStreet('123 some street').should.equal('SOME STREET');
		HandleGeocode.extractStreet(' 123  some  street ').should.equal('SOME STREET');
		HandleGeocode.extractStreet('123').should.equal('');
		HandleGeocode.extractStreet('123A').should.equal('');
		HandleGeocode.extractStreet('street').should.equal('STREET');
	});
});