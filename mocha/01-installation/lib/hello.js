module.exports.hello = function(name) {
	return 'Hello, ' + name + '.';
};

module.exports.getArray = function(number) {
	var array = [];
	for (var i=0; i<number; i++) {
		array.push(i);
	}
	return array;
};
