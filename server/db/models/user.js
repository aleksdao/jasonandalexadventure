var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	photos: {
		type: [String]
	},
	age: {
		type: Number,
		required: true
	},
	//how to create FB profile?
	matches: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	blocked: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

module.exports = mongoose.model('User', schema);