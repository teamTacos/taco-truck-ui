var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/angular-route', express.static(__dirname + '/node_modules/angular-route'));
app.use('/cloudinary-core', express.static(__dirname + '/bower_components/cloudinary-core'));
app.use('/cloudinary-jquery-file-upload', express.static(__dirname + '/node_modules/cloudinary-jquery-file-upload'));
app.use('/cloudinary-ng', express.static(__dirname + '/bower_components/cloudinary_ng/js'));
app.use('/lodash', express.static(__dirname + '/bower_components/lodash'));
app.use('/ng-file-upload', express.static(__dirname + '/bower_components/ng-file-upload'));
app.use('/swiper', express.static(__dirname + '/node_modules/swiper/dist'));

app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

//app.get('/*', function(request, response) {
//  response.render('pages/index');
//});
//
//app.get('/location/:id');

//app.get('/location/:id', function(request, response){
//  var location_id = request.params.id;
//  response.render('pages/location', {location_id: location_id});
//});
//
//app.get('/location/:location_id/item/:item_id', function(request, response){
//  var item_id = request.params.id;
//  response.render('pages/item', {item_id: item_id});
//});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


