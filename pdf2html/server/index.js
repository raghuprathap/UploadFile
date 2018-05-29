var { spawn } = require('child_process');
var dockerpull = spawn('docker', ['pull', 'ngnix']);
var noderun = spawn('docker', ['run', '--name', 'ngnixcont', '-d', '-p', '80:80', 'ngnix']);

noderun.stdout.on('data', (data) => {
    console.log("Data", data);
    res.send(data);
  });
  noderun.stderr.on("data", function(data) {
    console.log("Error", data.toString());
  })