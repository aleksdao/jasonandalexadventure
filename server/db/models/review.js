var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title: {
		type: String,
		required: true
	}
	content: {
		type: String,
		required: true,
		minlength: 5
	}
	hangout: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hangout',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Review', schema);