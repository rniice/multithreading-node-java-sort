//var java = require("java");
//java.classpath.push("commons-lang3-3.1.jar");
//java.classpath.push("commons-io.jar");

/*Include the java bin files:
  //MergeSort --package com.sortingmodules.mergesort;
  //MergeSortedArrays --package com.sortingmodules.mergesortedarrays;
  //SortingAlgorithm --package com.sortingmodules.sortingalgorithm;
*/
//java.classpath.push("bin/HelloWorld.jar");

//var array = [5, 6, 2, 1];

//var obj = java.newInstanceSync("com.sortingmodules.mergesort.MergeSort");

//var result = java.callStaticMethodSync("com.sortingmodules.mergesort.MergeSort", "sort", array);
//console.log(result);

//var result = java.newInstanceSync("com.test.helloworld.HelloWorld");
//MergeSort.sort([3,5,2,1]);
//HelloWorld();
//console.log(result.toString());

var cwd         = process.cwd();
var executable  = "HelloWorld.jar";
var path_bin    = cwd + "/bin/" + executable;
var method      = " com.test.helloworld.HelloWorld"

var exec = require('child_process').exec;
var child = exec('java -cp ' + path_bin + method,
  function (error, stdout, stderr){
    if(error){
      console.log("Error -> "+error);
    } else {
      console.log('Output -> ' + stdout);
    }
});

//module.exports = child;
