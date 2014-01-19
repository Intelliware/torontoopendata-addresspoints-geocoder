/* Library for extracting fields from a free form address */

exports.sanitizeWhitespace = sanitizeWhitespace;

function sanitizeWhitespace(s) {
    return s.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g,'');
}

exports.extractNumber = extractNumber;

function extractNumber(q) {
    var words = sanitizeWhitespace(q).split(" ");
    if (words.length > 0 && /^\d/.test(words[0])) {
        return words[0];
    } else {
        return '';
    }
}

exports.extractStreet = extractStreet;

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
