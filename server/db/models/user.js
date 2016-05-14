var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	firstName: {
		type: String,
		// required: true
	},
	lastName: {
		type: String,
		// required: true
	},
	photos: {
		type: [String]
	},
	age: {
		type: Number,
		// required: true
	},
	likes: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	],
	matches: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	],
	blocked: [
		{
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User'
			}
		}
	],
	facebook: {
		id: String,
	},
	email: {
		type: String
	}
});

module.exports = mongoose.model('User', schema);
