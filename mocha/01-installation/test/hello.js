var expect    = require('chai').expect;
var assert = require('chai').assert;
var myFunction = require('../lib/hello');

describe('Example of some test driven development (tdd).', function() {

	beforeEach(function(){

	});

	it('Compare strings.', function() {
		var result = myFunction.hello('Daniel');
		expect(result).to.equal('Hello, Daniel.');
	});

	it('Compare arrays.', function() {
		var expected = [0, 1, 2, 3, 4];
		var number = 5;
		var actual = myFunction.getArray(number);
		expect(actual).to.deep.equal(expected);
	});

});