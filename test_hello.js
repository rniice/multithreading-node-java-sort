var cwd         = process.cwd();
var executable  = "HelloWorld.jar";
var path_bin    = cwd + "/bin/" + executable;
var method      = " com.test.helloworld.HelloWorld"

var test_array  = [1,4,2,6,3,7,9,1];

var exec = require('child_process').exec;
var child = exec('java -cp ' + path_bin + method,
  function (error, stdout, stderr){
    if(error){
      console.log("Error -> "+error);
    } else {gi
      console.log('Output -> ' + stdout);
    }
});
