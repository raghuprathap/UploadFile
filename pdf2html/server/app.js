var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var index = require('./routes/index');
var users = require('./routes/users');
var { spawn } = require('child_process');
var dockerCLI = require('docker-cli-js');
var DockerOptions = dockerCLI.Options;
var Docker = dockerCLI.Docker;

var app = express();
var storage = multer.diskStorage({
  /* destination: function (req, file, cb) {
    cb(null, '../Resume_Parser/public')
  }, */
  destination: __dirname + "/uploads",
  //destination: "/pdf",
  filename: function (req, file, cb) {
    console.log("File@@@", file)
    cb(null, file.fieldname)
  }
})

var multerupload = multer({ storage: storage })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', index);
app.use('/users', users);

app.post('/upload', multerupload.any(), function(req, res) {
 /*  console.log("req.Files", req.files);
  docker.command('run --name nginxcont -d -p 80:80 nginximg').then(function (data) {
    console.log('data = ', data);
  });
  docker.command(`run -ti --rm -v ${__dirname} + '/uploads':/pdf bwits/pdf2htmlex pdf2htmlEX --zoom 1.3 ${req.files[0].filename}`).then(function (data) {
    console.log('data = ', data);
  }); */
  /* var dockerRun = spawn('docker', ['run', '-ti', '--rm', '-v', __dirname+'/uploads:/pdf',
  'bwits/pdf2htmlex', 'pdf2htmlEX', '--zoom', '1.3', req.files[0].filename ]);
  dockerRun.stdout.on('data', (data) => {
    console.log('data', data);
  });
  dockerRun.on('error', (err) => {
    console.log('Failed to start subprocess.', err);
  });
  dockerRun.on('close', function(code) {
    console.log("child process exited", code);
  }) */
  console.log("req.files[0].name", req.files[0].originalname);
  //var noderun = spawn('node', [__dirname + `/uploads/${req.files[0].originalname}`]);
  /* var noderun = spawn('docker', ['run', '-it', '--rm', '-v', __dirname + '/uploads:/pdf',
  'bwits/pdf2htmlex', 'pdf2htmlEX', '--zoom', '1.3', req.files[0].filename]); */
  var noderun = spawn('docker', ['run', '--name', 'ngnixcont', '-d', '-p', '80:80', 'ngniximg']);
  noderun.stdout.on('data', (data) => {
    console.log("Data", data);
    res.send(data);
  });
  noderun.stderr.on("data", function(data) {
    console.log("Error", data);
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
