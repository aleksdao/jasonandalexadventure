var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    // sessions        = require('./routes/sessions'),
    passport = require('passport'),
    path = require('path'),
    app = express();


var chalk = require('chalk');
var util = require('util');

var connectDB = require('./db')
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// When we receive a cookie from the browser, we use that id to set our req.user
// to a user found in the database.
passport.deserializeUser(function (id, done) {
    User.findById(id, done);
});

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

var logMiddleware = function (req, res, next) {
    util.log(('---NEW REQUEST---'));
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    next();
};


app.use('/', logMiddleware);
app.use('/auth', require('./app/routes/authentication'));
app.set('port', process.env.PORT || 5000);



app.use(express.static(path.join(__dirname, './node_modules')));
    // app.use(express.static(path.join(__dirname, './bower_components')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/app/views/index.html'));
})

connectDB()
.then(function(){
	console.log('connect DB successfully');
	app.listen(app.get('port'), function () {
    	console.log('Express server listening on port ' + app.get('port'));
	});
})
