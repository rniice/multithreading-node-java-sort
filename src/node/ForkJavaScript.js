/* Run New nodeJS v8 Instance on separate CPU Core with specified method and args */
var _function   = null;
var _args       = null;

process.send("new fork started");

//receive data through message api for child process fork
process.on('message', function(data){
  if(data.load){
    loadData(data);
  } else if (data.run) {
    forkJavaScript();
  }
});

//load the _args and load the _function from library path
function loadData(data){
  process.send("loading function and args");
  _function = require(process.cwd() + data.path);
  _args = data.args;
}

//call the loaded _function with loaded _args
function forkJavaScript() {
  process.send("running function and args");
  var time_start    = new Date().getTime();
  var result        = _function(_args);
  var time_finish   = new Date().getTime();
  var elapsed_ms    = time_finish - time_start;
  sendResult(result, elapsed_ms);
  //process.exit();
}

//respond to the parent with the reults
function sendResult(result, elapsed_ms){
  //send the result over through the fork process message api.
  process.send(
    {
      result      : result,
      elapsed_ms  : elapsed_ms
    }
  );
}
