var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var pg = require('pg');
const {Client } = require('pg')
var copyFrom = require('pg-copy-streams').from;
var first = require('firstline');

app.use(express.static('public'));

app.get('/checkUser/:user/Password/:password',function(req,res){
  const client = new Client({
    user: 'rideadmindb',
    host: 'ridedb.cr8hn6m3gchm.us-west-2.rds.amazonaws.com',
    database: 'nodeTest',
    password: 'alltheridestuff',
    port: 5432,
  });
  client.connect();
  console.log(req.params);
  var username = req.params.user;
  console.log(JSON.stringify(username));
  var password = req.params.password;
  console.log(JSON.stringify(password));
  client.query("select exists(select 1 from users where user_id='"+req.params.user+ "' and user_password='"+req.params.password+"' );",(err,resp) =>{
    console.log(err,resp.rows[0].exists);
    var ans = resp.rows[0]['exists'];
    console.log(ans);
    var package = {
      valid: ans
    }
    res.json(package);
  });
  
});

app.post('/getHistoryTableData',function(req,res){
  console.log("getting data from server");
  //need to query db for feed info
  var data = 
  {
    "draw": 1,
    "recordsTotal": 12,
    "recordsFiltered": 12,
    "data": [
      [
        "Airi",
        "Satou",
        "Accountant",
        "Tokyo",
        "28th Nov 08",
        "$162,700"
      ],
      [
        "Angelica",
        "Ramos",
        "Chief Executive Officer (CEO)",
        "London",
        "9th Oct 09",
        "$1,200,000"
      ]
    ]
  }
  res.json(data);
});

app.post('/upload', function(req, res) {
  const client = new Client({
    user: 'rideadmindb',
    host: 'ridedb.cr8hn6m3gchm.us-west-2.rds.amazonaws.com',
    database: 'nodeTest',
    password: 'alltheridestuff',
    port: 5432,
  });
  client.connect();

  var done = function(){console.log("done")};
  var err1 = function(err,res){console.log(err,res)};
  var err2 = function(err,res){console.log(err,res)};
  first('./testFeeds/GTFS-ride_JCT_17-18/agency.txt')
    .then(val => {
      console.log("Headers ",val);
      var stream = client.query(copyFrom('COPY agency('+val+') FROM STDIN WITH CSV HEADER' ));
      var fileStream = fs.createReadStream('./testFeeds/GTFS-ride_JCT_17-18/agency.txt');
      fileStream.on('error', err1);
      stream.on('error', err2);
      stream.on('end', done);
      fileStream.pipe(stream);
      client.query('UPDATE agency\
        SET feed_id = 0\
        WHERE feed_id IS NULL;\
        UPDATE agency\
        SET feed_num = 0\
        WHERE feed_num IS NULL;',(err, res) => {
          console.log(err, res);
        });
        res.status(200).json("done");
    });
});

app.listen(8080,function(){console.log("Listening on port 8080")});