var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	photos: {
		type: String
	},
	category: {
		type: String,
		required: true,
		enum: ['Ice Cream', 'Drinks', 'Coffee']
	},
	priceRange: {
		type: String,
		required: true,
		enum: ['$', '$$', '$$$', '$$$$']
	}
});

module.exports = mongoose.model('Activity', schema);
