var express = require("express");
var moment = require("moment");
var app = express();

app.set('env', 'production');
app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/:date', function (req, res) {
  //.send(req.params.date);
  var myDate;
  
  if(!isNaN(req.params.date)) {
    myDate = moment(req.params.date, "X");
  } else {
    myDate = moment(req.params.date, "MMMM D, YYYY");
  }
  
  var toSend = {unix : null, natural : null};
  
  if(myDate.isValid()) {
    toSend.unix = myDate.format('X');
    toSend.natural = myDate.format('MMMM, D YYYY')
  }
  res.json(toSend);
});

app.listen(process.env.PORT || 800, function () {
  console.log('App is listening');
});