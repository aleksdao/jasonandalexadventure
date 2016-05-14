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
	likes:[
    {
      experienceId: {type: Schema.Types.ObjectId, ref: 'Experience'},
      quantity: Number,
      dateAdded: Date,
      expired: {
        type: Boolean,
        default: false
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
