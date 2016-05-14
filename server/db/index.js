var mongoose = require('mongoose');
var Promise = require('bluebird');

require('./models/user');
require('./models/uber');
require('./models/review');
require('./models/hangout');
require('./models/activity');

var conn_;
function connectDB(){
	if(conn_)
		return conn_
	conn_ = new Promise(function(resolve, reject){
		mongoose.connect('mongodb://localhost/jason-alex-adventure', function(err){
			if(err)
				reject(err);
			resolve(mongoose.connection);
		});
	});
	return conn_;
}

module.exports = connectDB;