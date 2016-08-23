var java                    = require("java");                            //load java bindings
var randomArrayGenerator    = require('./src/node/ArrayGenerator');       //load the random array generator
var mergeSortArray          = require('./src/node/MergeSort');            //load the javascript merge sort libraries
var mergeSortedArrays       = require('./src/node/MergeSortedArrays');    //load the javascript merge sorted array libraries

java.classpath.push("bin/MergeSortBinaries.jar");                         //load the java merge sort libraries

//set parameters for random array across all tests
var min               = -1000;
var max               =  1000;

var min_array_length  = 10;
var max_array_length  = 100000;

var elapsed_ms_single_js  = testJavaScriptSingleThread(100000);
//var elapsed_ms_4x_js      = testJavaScriptMultipleThread(100000);




/*
var testOne = new Promise(function(fulfill, reject){
  var elapsed_ms = testJavaScriptSingleThread(100000);
  if (!elapsed_ms) {
    throw new Error('no return result')
  } else {
    return elapsed_ms
  }
});

testOne.then(function(){
    console.log("success");
  },  function(){
    console.log("error")
  });
*/

//testJavaScriptSingleThread(100000);         //call this 10x then take the average

//loop through and test single thread javascript


//loop through and test multiple thread javascript


//loop through and test single thread java


//loop through and test multiple thread java




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
  var test_array    = randomArrayGenerator(length,min,max);  //generate test array

  //using 4 threads;
  var length_ea = Math.floor(test_array/4);

  var array1 = test_array.slice(0, length_ea);
  var array2 = test_array.slice(length_ea, 2*length_ea);
  var array3 = test_array.slice(2*length_ea, 3*length_ea);
  var array4 = test_array.slice(3*length_ea);

  var time_start    = new Date().getTime();
  var result1       = mergeSortArray(array1);
  var result2       = mergeSortArray(array2);
  var result3       = mergeSortArray(array3);
  var result4       = mergeSortArray(array4);

  //combine the results
  var half1         = mergeSortedArrays(array1, array2);
  var half2         = mergeSortedArrays(array3, array4);
  var result        = mergeSortedArrays(half1, half2);

  var time_finish   = new Date().getTime();
  var elapsed_ms    = time_finish - time_start;
  console.log("javascript 4 thread elapsed ms: " + elapsed_ms);

  return elapsed_ms;
}


function testJavaSingleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}

function testJavaMultipleThread(length){
  var test_array = randomArrayGenerator(length,min,max);  //generate test array


}


/*
var random_array = randomArrayGenerator(1000, -100, 100);
console.log(random_array);

console.log(mergeSortArray(random_array));
*/

/*
var test_array  = [1,4,2,6,3,7,9.2,1];
var array1      = [1,2,6,102,103,108];
var array2      = [2,5,101];

var result1 = mergeSortArray(test_array);
var result2 = MergeSortedArrays(array2, array1);
console.log(result1);
console.log(result2);
*/
