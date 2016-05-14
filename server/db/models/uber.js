var mongoose = require('mongoose');

var schema = mongoose.Schema({
	hangout: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hangout',
		required: true
	},
	user: {
		typeL mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});	

module.exports = mongoose.model('Uber', schema);