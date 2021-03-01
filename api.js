const https = require("https");
const express = require('express');

const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function (req, res) {
	const exec = require('child_process').exec;

	exec('curl ' + req.query.url + ' --insecure', function (error, stdout, stderr) {
	  console.log('stdout: ' + stdout);
	  console.log('stderr: ' + stderr);

	  res.json(stdout);

	  if (error !== null) {
		console.log('exec error: ' + error);
	  }
	});
});

app.listen(3000, function () { console.log('listening on port 3000!'); });