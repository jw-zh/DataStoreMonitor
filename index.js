var express = require('express');
var app = express();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client( {
  hosts: [
    'http://els_q6nj19n:xckmfuj0rff13u2y@dev005576.esri.com:9220/'
  ]
});
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//require('./app/routes')(app);

var cron = require('node-cron');

app.get('/test', function (req, res) {
  var result = "hellokitty";
  res.render('test.ejs', {
    test: result
  });
});

app.get('/', function (req, res) {
      client.cat.indices({}, function(err, resp, status) {
          var data = {};
          data = resp.split("\n").join("<br />");
          res.render('home.ejs', {
              result: data
          });
      });
  });
// cron.schedule('*/5 * * * * *', function() {
//   // client.cluster.health({}, function(err, resp, status) {
//   //   app.get('/', function(req, res) {
//   //     res.send(resp);
//   //   });
//   // });
//   client.cat.indices({}, function(err, resp, status) {
//     // console.log(typeof resp);
//     console.log(resp);
//   });
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
