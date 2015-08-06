var child_process = require('child_process');

// child_process.exec("ps aux | grep ' node'", function (error, stdout, stderr) {
//   if (error) console.log(error);
//   if (stdout) console.log(stdout);
//   if (stderr) console.log(stderr);
// });
//
// var ls = child_process.spawn('ls',['-al']);
//
// ls.stdout.on('data', function (data) {
//   console.log('stdout: ' + data);
// });
// ls.stderr.on('data', function (data) {
//   console.log('stderr: ' + data);
// });
// ls.on('close', function (code) {
//   console.log('child process exited with code ' + code);
// });

var prettyhr = require('pretty-hrtime');
var cpuCount = require('os').cpus().length;

var timer = process.hrtime();

var problemSize = 1000000000; //1 billion
var problemsPerChild = Math.floor(problemSize / cpuCount);

for (i=0; i<cpuCount; i++) {
  var child = child_process.fork('./fizzpersist.js');
  child.on('message', receiveResults);
  child.send({
    start: i*problemsPerChild,
    end: i<cpuCount-1 ? (i+1)*problemsPerChild : problemSize
  });
}

var answers = [];
var totals = {fizz:0,buzz:0,fizzbuzz:0};
function receiveResults(result) {
  answers.push(result);
  if (answers.length == cpuCount) {
    console.log(prettyhr(process.hrtime(timer)));
    console.log(answers);
    answers.forEach(function(a){
      totals.fizz += a.fizz;
      totals.buzz += a.buzz;
      totals.fizzbuzz += a.fizzbuzz;
    });
    console.log(totals);
    process.exit();
  }
};
