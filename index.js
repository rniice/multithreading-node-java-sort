var Q                       = require('q');                               //load Q for promise management
//                              require('q-foreach')(Q);

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
var min               = -1000;    //minimum value for random number sequence
var max               =  1000;    //maximum value for random number sequence

//createTestArrayLengths(min_array_length, max_array_length, array_increment);
var array_lengths = createTestArrayLengths(10000, 1000000, 20000);
//console.log(array_lengths);

testJavaScriptMultipleThread(3000000);
//testJavaScriptSingleThread(600000);

//test 4x multithreaded javascript sort

/*
var i = 0;
var test_interval = setInterval(function(){
  if(!array_lengths[i]){
    clearInterval(test_interval);
  } else {
    //testJavaScriptMultipleThread(array_lengths[i]);
    testJavaScriptSingleThread(array_lengths[i]);
    i++;
  }
},60000);
*/

/*
testJavaScriptMultipleThread(array_lengths[0])  //test without fcall now
  .then(testJavaScriptMultipleThread(array_lengths[1]))
  .then(testJavaScriptMultipleThread(array_lengths[2]))
  .then(testJavaScriptMultipleThread(array_lengths[3]))
  .then(testJavaScriptMultipleThread(array_lengths[4]))
  .then(testJavaScriptMultipleThread(array_lengths[5]))
  .then(testJavaScriptMultipleThread(array_lengths[6]))
  .then(testJavaScriptMultipleThread(array_lengths[7]))
  .then(testJavaScriptMultipleThread(array_lengths[8]));
*/

function testJavaScriptSingleThread(length){
  var cwd           = process.cwd();
  var fork_instance = fork(cwd + '/src/node/ForkJavaScript.js',[],{silent: false});

  var test_array    = randomArrayGenerator(length,min,max);  //generate test array

  fork_instance.send({load: true, path: '/src/node/MergeSort.js', args: test_array});
  fork_instance.send({run: true});

  fork_instance.on('message', function(data){
    if(data.result){
        saveResult(data.result);
        console.log("javascript sort length: " + length + " 1x thread elapsed ms: " + data.elapsed_ms);
    }
  });
}

function testJavaScriptMultipleThread(length){
  //var defer         = Q.defer();
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

  for (var i=0; i<array_data.length; i++){
    fork_instance.push(fork(cwd + '/src/node/ForkJavaScript.js',[],{silent: false}));
      fork_instance[i].send({load: true, path: '/src/node/MergeSort.js', args: array_data[i]});
      fork_instance[i].send({run: true});

    fork_instance[i].on('message', function(data){
      if(data.result){
          fork_result.push(data);
          console.log("fork sort elapsed_ms: " + data.elapsed_ms);
          //if other all 4 fors are completed start the merging
          if(++forks_complete == 4){
            forks_finish_time = new Date().getTime();

            //do final sort on a single thread for now
            var time_start            = new Date().getTime();
            var sorted1               = mergeSortedArrays(fork_result[0].result, fork_result[1].result);
            var sorted2               = mergeSortedArrays(fork_result[2].result, fork_result[3].result);
            var sorted                = mergeSortedArrays(sorted1, sorted2);
            var time_finish           = new Date().getTime();
            elapsed_merge_sorted      = time_finish - time_start;
            //console.log("merged sorted arrays elapsed_ms: " + elapsed_merge_sorted);
            saveResult(sorted);
            var total_time_ms = fork_result[0].elapsed_ms + elapsed_merge_sorted;
            console.log("javascript sort length: " + length + " 4x thread elapsed ms: " + total_time_ms);
          }
      }
    });
  }
}


function testJavaSingleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}

function testJavaMultipleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}

//create the array of lengths to tests between min and max (inclusive) with specified increment
function createTestArrayLengths(min, max, increment){
  var num_steps         = (max - min)/increment;
  var array_lengths     = [min];

  for (var i=1; i<=num_steps; i++){
    array_lengths.push(array_lengths[i-1]+increment);
  }

  return array_lengths;
}

function saveResult(data){
  fs.writeFile('result.txt', data, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

}

//test single thread java for various lengths n array
//test multiple thread java for various lengths n array
