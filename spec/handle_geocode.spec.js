var HandleGeocode = require('../handle_geocode');

describe("Parsing input", function() {
	it("sanitize whitespace and result in regular single space output for later output", function() {
		expect(HandleGeocode.sanitizeWhitespace('')).toBe('');
		expect(HandleGeocode.sanitizeWhitespace('first')).toBe('first');
		expect(HandleGeocode.sanitizeWhitespace('   first    ')).toBe('first');
		expect(HandleGeocode.sanitizeWhitespace('   1    ')).toBe('1');
		expect(HandleGeocode.sanitizeWhitespace('1-2')).toBe('1-2');
		expect(HandleGeocode.sanitizeWhitespace('first second')).toBe('first second');
		expect(HandleGeocode.sanitizeWhitespace('  first    second ')).toBe('first second');
	});
	
	it("extracts out first number of full address as the street number", function() {
		expect(HandleGeocode.extractNumber('')).toBe('');
		expect(HandleGeocode.extractNumber('   ')).toBe('');
		expect(HandleGeocode.extractNumber('123 street')).toBe('123');
		expect(HandleGeocode.extractNumber('123')).toBe('123');
		expect(HandleGeocode.extractNumber('123A')).toBe('123A');
		expect(HandleGeocode.extractNumber('123-143')).toBe('123-143');
		expect(HandleGeocode.extractNumber('  123   street   ')).toBe('123');
		expect(HandleGeocode.extractNumber('street')).toBe('');
	});

	it("extracts out street as anything post number", function() {
		expect(HandleGeocode.extractStreet('')).toBe('');
		expect(HandleGeocode.extractStreet('   ')).toBe('');
		expect(HandleGeocode.extractStreet('123 street')).toBe('STREET');
		expect(HandleGeocode.extractStreet('123 some street')).toBe('SOME STREET');
		expect(HandleGeocode.extractStreet(' 123  some  street ')).toBe('SOME STREET');
		expect(HandleGeocode.extractStreet('123')).toBe('');
		expect(HandleGeocode.extractStreet('123A')).toBe('');
		expect(HandleGeocode.extractStreet('street')).toBe('STREET');
	});
});