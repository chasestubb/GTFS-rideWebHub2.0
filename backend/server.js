var express = require('express');
var multer = require('multer')
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require("body-parser");
var pg = require('pg');
const {Client } = require('pg')
var copyFrom = require('pg-copy-streams').from;
var first = require('firstline');
var unzip = require('unzip');
var rimraf = require('rimraf');

var fileNames = ["agency.txt","stops.txt","routes.txt","trips.txt","stop_times.txt","calendar.txt","calendar_dates.txt",
"fare_attributes.txt","shapes.txt","fare_rules.txt","transfers.txt","frequencies.txt","feed_info.txt","board_alight.txt",
"trip_capacity.txt","ride_feed_info.txt","ridertrip.txt","ridership.txt"];


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getFile/:user/:file',function(req,res){
  var user = req.params.user;
  var file = req.params.file;
  const fileP = './public/usrs/'+user+'/feed/'+file;
    if (fs.existsSync(fileP)) {
      fs.readFile(fileP, 'utf8', function (err,data) {
        if (err) {
          res.send(err);
        }
        res.send(data);
      });
    }
    else{
      res.send("no content has been loaded for user "+user+" and file "+file);
    }
  
});

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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.json(package);
  });
  
});

app.post('/saveFile/:user/:file/',function(req,res){
  var file = req.params.file;
  var user = req.params.user;
  var contents =req.body.mytext;
  console.log("Saving file "+file+" for user "+user);
  //console.log(contents);
  const fileP = './public/usrs/'+user+'/feed/'+file;
    if (fs.existsSync(fileP)) {
      //write new contents;
      fs.unlinkSync(fileP);
      fs.writeFile(fileP, contents, (err) => {
        res.send("The file was succesfully saved!");
    }); 
    }
    else{
      res.send("no file loaded");
    }
});

app.post('/loadFeed/:user', function(req, res) {
  var id = req.params.user;
  console.log("user: ",id);
  console.log("loadingFile");
  var upload = multer({
		storage: multer.diskStorage({
      destination: function(req, file, callback) {
        console.log("destination: ./public/usrs/"+id+"/")
        callback(null, './public/usrs/'+id+'/')
      },
      filename: function(req, file, callback) {
        callback(null, "feed.zip")
      }
    }),
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.zip') {
				return callback(res.end('Only .zip are allowed'), null)
			}
			callback(null, true)
		}
	}).single('sampleFile');
	upload(req, res, function(err) {
    var stream = fs.createReadStream('./public/usrs/'+id+'/feed.zip').pipe(unzip.Extract({ path: './public/usrs/'+id+'/feed/' }));
    stream.on('close', function(err){
      const Folder = './public/usrs/'+id+'/feed/';
      console.log("loaded files: ");
      fs.readdirSync(Folder).forEach(file => {
        if (fileNames.indexOf(file) > -1) {
          console.log(file);
      } else {
          console.log("deleting " +file);
          fs.unlinkSync('./public/usrs/'+id+'/feed/'+file)
      }
      });
      res.end('File is loaded');
    });
  });
});

app.post('/loadRideFile/:user/:file', function(req, res) {
  var id = req.params.user;
  var myfile = req.params.file;
  var dir = './public/usrs/'+id+'/feed/';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  console.log("user: ",id);
  console.log("File ",myfile);
  var upload = multer({
		storage: multer.diskStorage({
      destination: function(req, file, callback) {
        console.log("destination: ./public/usrs/"+id+"/feed/")
        callback(null, './public/usrs/'+id+'/feed/')
      },
      filename: function(req, file, callback) {
        callback(null, myfile);
      }
    }),
		fileFilter: function(req, file, callback) {
			var ext = path.extname(file.originalname)
			if (ext !== '.txt') {
				return callback(res.end('Only .txt are allowed'), null)
			}
			callback(null, true)
		}
  }).single('sampleFile2');
  upload(req, res, function(err) {
      if(err){
        res.end(err);
      }
      else{
        res.end('File is loaded');
      }
      
    });
});


app.get('/getLoadedFiles/:user', function(req, res) {
  var id = req.params.user;
  console.log("user: ",id);
  console.log("gettingUploadedfiles");
  const Folder = './public/usrs/'+id+'/feed/';
  var files = fs.readdirSync(Folder);
  console.log(files);
  var data = {fileNames : files};
  res.json(data);
});

app.post('/getHistoryTableData',function(req,res){
  console.log("getting data from server");
  //need to query db for feed info
  var info = 
  {
    "draw": 1,
    "recordsTotal": 0,
    "recordsFiltered": 0,
    "data": []
  }
  const client = new Client({
    user: 'rideadmindb',
    host: 'ridedb.cr8hn6m3gchm.us-west-2.rds.amazonaws.com',
    database: 'nodeTest',
    password: 'alltheridestuff',
    port: 5432,
  });
  client.connect();
  var count = 0;
  console.log("about to query");
  client.query("select * from feeds;",(err, resp) => {
    resp.rows.forEach(row =>{
      var arr = [];
      arr.push(row.feed_id);
      arr.push(row.feed_num);
      arr.push(row.name);
      arr.push(row.user_id);
      arr.push(row.date);
      arr.push(row.time);
      info.data.push(arr);
      count = count +1;
    });
    info.recordsTotal = count;
    res.json(info);
  });
});

app.post('/deleteFiles/:user',function(req,res){
  console.log("deleting files");
  var id = req.params.user;
  const Folder = './public/usrs/'+id+'/feed';
  rimraf(Folder, function () { 
    console.log('done'); 
    const fileP = './public/usrs/'+id+'/feed.zip';
    if (fs.existsSync(fileP)) {
      fs.unlinkSync(fileP);
    }
    res.status(200).json("done");
  });
});

app.post('/upload/:user/:feedID/:feedName/:feedPopulation', function(req, res) {
  var id = req.params.user;
  var feedid = req.params.feedID;
  var feedName = req.params.feedName;
  var feedPopulation = req.params.feedPopulation;
  var feedNum;
  const client = new Client({
    user: 'rideadmindb',
    host: 'ridedb.cr8hn6m3gchm.us-west-2.rds.amazonaws.com',
    database: 'nodeTest',
    password: 'alltheridestuff',
    port: 5432,
  });
  client.connect();

  client.query("select count(*)::Integer as val from feeds where feed_id="+feedid+";",(err, resp1) => {
    if (err) {
      console.log(err.stack)
    } else {
      
      var today = new Date();
      var date = today.toLocaleDateString();
      var time = today.toLocaleTimeString();
      feedNum = resp1.rows[0]["val"];
      feedNum = feedNum+1;
      console.log(feedNum);
      //need to insert feed into feed table
      client.query("INSERT INTO feeds(feed_id,feed_num,user_id,name,date,time,Population)\
      VALUES \
      ("+feedid+","+feedNum+",'"+id+"','"+feedName+"','"+date+"','"+time+"',"+feedPopulation+");",(err, resp2) => {
              console.log(err, resp2);
              //after insert of feed 
              var status = loadFiles(feedNum,feedid,id);
              res.status(200).json("done");
            });
    }
  });
});

function getTable(file){
  if(file == "agency.txt"){
    return "agency";
  }
  else if(file == "stops.txt"){
    return "stops";
  }
  else if(file == "routes.txt"){
    return "routes";
  }
  else if(file == "trips.txt"){
    return "trips";
  }
  else if(file == "stop_times.txt"){
    return "stop_times";
  }
  else if(file == "calendar.txt"){
    return "calendar";
  }
  else if(file == "calendar_dates.txt"){
    return "calendar_dates";
  }
  else if(file == "fare_attributes.txt"){
    return "fare_attributes";
  }
  else if(file == "shapes.txt"){
    return "shapes";
  }
  else if(file == "fare_rules.txt"){
    return "fare_rules";
  }
  else if(file == "transfers.txt"){
    return "transfers";
  }
  else if(file == "frequencies.txt"){
    return "frequencies";
  }
  else if(file == "feed_info.txt"){
    return "feed_info";
  }
  else if(file == "board_alight.txt"){
      return "board_alight";
  }
  else if(file == "trip_capacity.txt"){
    return "trip_capacity";
  }
  else if(file == "ride_feed_info.txt"){
    return "ride_feed_info";
  }
  else if(file == "ridertrip.txt"){
    return "ridertrip";
  }
  else if(file == "ridership.txt"){
    return "ridership";
  }
}

function loadFiles(feedNum,feedid,id){
  const client = new Client({
    user: 'rideadmindb',
    host: 'ridedb.cr8hn6m3gchm.us-west-2.rds.amazonaws.com',
    database: 'nodeTest',
    password: 'alltheridestuff',
    port: 5432,
  });
  client.connect();
  const Folder = './public/usrs/'+id+'/feed/';
  var itemsProcessed = 0;
  fs.readdirSync(Folder).forEach((file, index, array) => {
    var table = getTable(file);
    //process each file and load into DB
    var done = function(){console.log("done")};
    var err1 = function(err,res){console.log(err,res)};
    var err2 = function(err,res){console.log(err,res)};
    first('./public/usrs/'+id+'/feed/'+file)
      .then(val => {
        console.log("Headers ",val);
        console.log('COPY ' +table+'('+val+') FROM STDIN WITH CSV HEADER')
        var stream = client.query(copyFrom('COPY ' +table+'('+val+') FROM STDIN WITH CSV HEADER' ));
        var fileStream = fs.createReadStream('./public/usrs/'+id+'/feed/'+file);
        fileStream.on('error', err1);
        stream.on('error', err2);
        stream.on('end', function(){
          client.query('UPDATE '+table+'\
          SET feed_id = '+feedid+'\
          WHERE feed_id IS NULL;\
          UPDATE '+table+'\
          SET feed_num = '+feedNum+'\
          WHERE feed_num IS NULL;',(err, res) => {
            console.log(err, res);
            itemsProcessed++;
            if(itemsProcessed === array.length) {
              return 1;
            }
          });
        });
        fileStream.pipe(stream);
      });
  });
}

app.listen(8080,function(){console.log("Listening on port 8080")});