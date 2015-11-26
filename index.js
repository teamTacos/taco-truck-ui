var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/location/:id', function(request, response){
  var location_id = request.params.id;
  response.render('pages/location', {location_id: location_id});
});

app.get('/location/:location_id/item/:item_id', function(request, response){
  var item_id = request.params.id;
  response.render('pages/item', {item_id: item_id});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


