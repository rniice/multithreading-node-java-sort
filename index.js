var java                    = require("java");                            //load java bindings
var randomArrayGenerator    = require('./src/node/ArrayGenerator');       //load the random array generator
var mergeSortArray          = require('./src/node/MergeSort');            //load the javascript merge sort libraries
var mergeSortedArrays       = require('./src/node/MergeSortedArrays');    //load the javascript merge sorted array libraries

//scripts for multithreading
//var forkJavaScript          = require('./src/node/forkJavaScript');       //load method to run new forked nodeJS process
var fork                    = require('child_process').fork;              //load child process fork dependencies



java.classpath.push("bin/MergeSortBinaries.jar");                         //load the java merge sort libraries

//set parameters for random array across all tests
var min               = -1000;
var max               =  1000;

var min_array_length  = 10;
var max_array_length  = 100000;

//var elapsed_ms_single_js    = testJavaScriptSingleThread(100000);
var elapsed_ms_4x_js      = testJavaScriptMultipleThread(100000);







function testJavaScriptSingleThread(length){
  var test_array    = randomArrayGenerator(length,min,max);  //generate test array

  var time_start    = new Date().getTime();
  var result        = mergeSortArray(test_array);
  var time_finish   = new Date().getTime();

  var elapsed_ms    = time_finish - time_start;
  console.log("javascript single thread elapsed ms: " + elapsed_ms);
  return elapsed_ms;
}

function testJavaScriptMultipleThread(length){
  var cwd           = process.cwd();
  var test_array    = randomArrayGenerator(length,min,max);  //generate test array

  //using 4 threads;
  var length_ea = Math.floor(length/4);

  var array_data = [
    test_array.slice(0, length_ea)
    ,test_array.slice(length_ea, 2*length_ea)
    ,test_array.slice(2*length_ea, 3*length_ea)
    ,test_array.slice(3*length_ea)
  ];

  var fork_instance = [];
  var fork_result = [];

  for (var i=0; i<array_data.length; i++){
    fork_instance.push(fork(cwd + '/src/node/ForkJavaScript.js',[],{silent: false}));

    //load the listener for the fork
    fork_instance[i].on('message', function(data){
      if(data.result){
          fork_result.push(data);
          //console.log("fork results sorted: " + data.result);
          console.log("fork sort elapsed_ms: " + data.elapsed_ms);
      }
    });

    fork_instance[i].send({load: true, path: '/src/node/MergeSort.js', args: array_data[i]});
    fork_instance[i].send({run: true});

  }
  //fork1_result.send("testing sending data");

/*
  //combine the results
  var half1         = mergeSortedArrays(array1, array2);
  var half2         = mergeSortedArrays(array3, array4);
  var result        = mergeSortedArrays(half1, half2);

  var time_finish   = new Date().getTime();
  var elapsed_ms    = time_finish - time_start;
  console.log("javascript 4 thread elapsed ms: " + elapsed_ms);
  */

  //return elapsed_ms;
}


function testJavaSingleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}

function testJavaMultipleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}


//test single thread javascript for various lengths n array
//test multiple thread javascript for various lengths n array
//test single thread java for various lengths n array
//test multiple thread java for various lengths n array
