var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectDB = require('./server/db');
var User = mongoose.model('User');
var Hangout = mongoose.model('Hangout');
var Activity = mongoose.model('Activity');

var faker = require('faker');

var randomizerIdx = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeHangouts = Hangout.remove({});
    var removeActivities = Activity.remove({});


    return Promise.all([
        removeUsers,
        removeHangouts,
        removeActivities
    ]);
};

var seedUsers = function () {
  var users = [];
  for (var i = 0; i < 30; i++) {
    var user = {};
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = faker.internet.email();
    user.age = faker.random.number();
    users.push(user);
  }

    return User.create(users);
}

function makePhotoUrls () {

   experiencePairs = [
    {name:'Solo Rock Climbing', photoUrl:'1.png'},
    {name:'Rome Segway Tour', photoUrl:'rome-segway.jpg'},
    {name:'Brooklyn Camel Sojurn', photoUrl:'enyoing-a-camel-ride.jpg'},
    {name:'Snowmobiling in Yellowstone', photoUrl:'snowmobiles_2.jpg'},
    {name:'Remote Heliskiing', photoUrl:'Heliskiing.JPG'},
    {name:'Hands-On Pottery', photoUrl:'Pottery-Mug.jpg'},
    {name:'Advanced Oil Painting', photoUrl:'wet-brushes.jpg'},
    {name:'Fullslack Experience', photoUrl:'fullstack.jpg'},
    {name:'Team Paintball', photoUrl:'SupAir_Player.jpg'},
    {name:'Figure Drawing', photoUrl:'7-22-13.jpg'},
    {name:'Cabinet Making', photoUrl:'MASW_AnC_Class.jpg'},
    {name:'Oil Painting & Wine', photoUrl:'PaintNite21.jpeg'},
    {name:'Chair Woodworking', photoUrl:'PortTownsendClass1.jpg'},
    {name:'Ireland Sailing', photoUrl:'Sailing-Courses.jpg'},
    {name:'Sipping & Painting', photoUrl:'Sippin-and-Paintin.jpg'},
    {name:'Archery Camp', photoUrl:'archery-camp.jpg'},
    {name:'Archery Lessons', photoUrl:'archery-lessons.jpg'},
    {name:'Ballooning at Dawn', photoUrl:'balloons.jpg'},
    {name:'Dodgers Fantasy Camp', photoUrl:'baseball-camp.jpg'},
    {name:'Colombia Camel Trip', photoUrl:'camels.jpg'},
    {name:'Woodworking Inlays', photoUrl:'5311511_orig.jpg'},
    {name:'Ocean Cliff Climbing', photoUrl:'climbing.jpg'},
    {name:'Advanced Clay Spinning', photoUrl:'hands-on-clay.jpg'},
    {name:'Helmet Diving', photoUrl:'helmet-dive.jpg'},
    {name:'NYC Segway Tour', photoUrl:'large.jpg'},
    {name:'Extreme Heliskiing in Alberta', photoUrl:'mike-wiegele-Deluxe-212.jpg'},
    {name:'Napoli Coast Solo Sail', photoUrl:'napali_coast17.JPG'},
    {name:'Oil Painting', photoUrl:'paint_brush_palette_colors.jpg'},
    {name:'Barcelona Painting Class', photoUrl:'painting-class.jpg'},
    {name:'Impressionist Painting', photoUrl:'painting_class_closeup02.jpg'},
    {name:'Traditional Pottery', photoUrl:'pot.jpg'},
    {name:'Expert Pottery Class', photoUrl:'pottery-class.jpg'},
    {name:'Solo Painting Lesson', photoUrl:'reaching-for-brushes.jpg'},
    {name:'Acapulco Sailing', photoUrl:'sailing-class.jpg'},
    {name:'Cornwall Coast Sailing', photoUrl:'sailing.jpg'},
    {name:'Quebec Snowmobiling', photoUrl:'snowmobiles_wit.jpg'},
    {name:'Star Wars Paintball', photoUrl:'storm-trooper-paintball.jpg'},
    {name:'Extreme Boot Camp', photoUrl:'web10.jpg'},
    {name:'Advanced Oil Painting', photoUrl:'wet-brushes.jpg'}
  ];

  var photoUrls = experiencePairs.map(function(pair){
    pair.photoUrl = 'https://www.hillphoto.com/experience_fpo/' + pair.photoUrl;
    return pair;
  });//end map
  return photoUrls;
}

var seedActivities = function () {

    var activities = makePhotoUrls();
    var categories = []

    var activities = activities.map(function(experience){
      // experience.shortDescription = faker.lorem.sentences();
      // experience.description = faker.lorem.paragraphs();
      // experience.quantity = randomizerIdx(1, 10);
      // experience.tempQuantity = experience.quantity;
      experience.priceRange = ['$', '$$', '$$$', '$$$$'][randomizerIdx(0, 3)];
      experience.category = ['Ice Cream', 'Drinks', 'Coffee'][randomizerIdx(0,2)];
      experience.location = faker.address.city();
      // experience.averageRating = 0;
      return experience;

    });//end .map

    return Activity.create(activities);

};

var seedHangouts = function (activities, users) {
  var hangout = {};
  var hangouts = [];
  for (var i = 0; i < 20; i++) {
    hangout.firstUser = users[randomizerIdx(0, users.length - 1)]._id;
    hangout.secondUser = users[randomizerIdx(0, users.length - 1)]._id;
    hangout.activity = activities[randomizerIdx(0, activities.length - 1)]._id;
    hangouts.push(hangout);
  }

  return Hangout.create(hangouts);

}

var users;
var activities;

connectDB()
    .then(function () {
      return wipeCollections();
    })
    .then(function () {
      return seedUsers();
    })
    .then(function (_users) {
      users = _users;
      return seedActivities();
    })
    .then(function (_activities) {
      return seedHangouts(_activities, users);
    })
    .then(function () {
      console.log(chalk.green('Seed successful!'));
      process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
