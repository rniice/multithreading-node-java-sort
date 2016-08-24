var java                    = require("java");                            //load java bindings
var randomArrayGenerator    = require('./src/node/ArrayGenerator');       //load the random array generator
var mergeSortArray          = require('./src/node/MergeSort');            //load the javascript merge sort libraries
var mergeSortedArrays       = require('./src/node/MergeSortedArrays');    //load the javascript merge sorted array libraries

//scripts for multithreading
//var forkJavaScript          = require('./src/node/forkJavaScript');     //load method to run new forked nodeJS process
var fork                    = require('child_process').fork;              //load child process fork dependencies
var fs                      = require('fs');                              //load filesystem to save results

java.classpath.push("bin/MergeSortBinaries.jar");                         //load the java merge sort libraries

//set parameters for random array across all tests
var min               = -1000;
var max               =  1000;

var min_array_length  = 10;
var max_array_length  = 100000;

//var elapsed_ms_single_js    = testJavaScriptSingleThread(100000);
var elapsed_ms_4x_js          = testJavaScriptMultipleThread(1000000);



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

  var fork_instance         = [];
  var fork_result           = [];
  var forks_complete        = 0;
  var elapsed_merge_sorted  = null;
  //var forks_start_time = new Date().getTime();
  for (var i=0; i<array_data.length; i++){
    fork_instance.push(fork(cwd + '/src/node/ForkJavaScript.js',[],{silent: false}));

    //load the listener for the fork
    fork_instance[i].on('message', function(data){
      if(data.result){
          fork_result.push(data);
          //console.log("fork results sorted: " + data.result);
          console.log("fork sort elapsed_ms: " + data.elapsed_ms);
          //if other all 4 fors are completed start the merging
          if(++forks_complete == 4){
            forks_finish_time = new Date().getTime();
            //var forks_complete_time = forks_finish_time - forks_start_time;
            //console.log("forks_complete_time_ms: " + forks_complete_time);
            console.log("beginning merge");

            //do final sort on a single thread for now
            var time_start            = new Date().getTime();
            var sorted1               = mergeSortedArrays(fork_result[0].result, fork_result[1].result);
            var sorted2               = mergeSortedArrays(fork_result[2].result, fork_result[3].result);
            var sorted                = mergeSortedArrays(sorted1, sorted2);
            var time_finish           = new Date().getTime();
            elapsed_merge_sorted      = time_finish - time_start;
            console.log("merged sorted arrays elapsed_ms: " + elapsed_merge_sorted);
            saveResult(sorted);

            var total_time_ms = fork_result[0].elapsed_ms + elapsed_merge_sorted;
            console.log("javascript 4x thread elapsed ms: " + total_time_ms);
            return total_time_ms;

          }
      }
    });

    fork_instance[i].send({load: true, path: '/src/node/MergeSort.js', args: array_data[i]});
    fork_instance[i].send({run: true});

  }

}


function testJavaSingleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}

function testJavaMultipleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}


function saveResult(data){
  fs.writeFile('result.txt', data, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

}

//test single thread javascript for various lengths n array
//test multiple thread javascript for various lengths n array
//test single thread java for various lengths n array
//test multiple thread java for various lengths n array
