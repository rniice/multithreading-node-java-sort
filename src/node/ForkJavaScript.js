/* Run New nodeJS v8 Instance on separate CPU Core with specified method and args */
var _class      = null;
var _args       = null;
var _method     = null;

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
  _class  = require(process.cwd() + data.path);
  _method = data.method;
  _args   = data.args;
}

//call the loaded _function with loaded _args
function forkJavaScript() {
  process.send("running function and args");
  var time_start      = new Date().getTime();
  var result          = new _class(_args);            //create the new class
  //var result          = class_instance[_method]();  //call the specified method
  var time_finish     = new Date().getTime();
  var elapsed_ms      = time_finish - time_start;
  sendResult(result, elapsed_ms);
  requestKillProcess();
}

//respond to the parent with the results
function sendResult(result, elapsed_ms){
  //send the result over through the fork process message api.
  process.send(
    {
      result      : result,
      elapsed_ms  : elapsed_ms
    }
  );
}

//respond to the parent with the results
function requestKillProcess(){
  process.send({end : true});
}
