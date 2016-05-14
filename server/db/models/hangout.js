var mongoose = require('mongoose');

var schema = mongoose.Schema({
	firstUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	secondUser: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	time: {
		type: Date,
		default: Date.now,
		required: true
	},
	activity: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Activity',
		required: true
	}
});

module.exports = mongoose.model('Hangout', schema);
