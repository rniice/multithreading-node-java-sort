//const Q                     = require('q');                               //load Q for promise management
const java                  = require("java");                            //load java bindings
const ArrayGenerator        = require('./src/node/ArrayGenerator');       //load the random array generator
const mergeSortedArrays     = require('./src/node/MergeSortedArrays');    //load the javascript merge sorted array libraries
const fork                  = require('child_process').fork;              //load child process fork dependencies
const fs                    = require('fs');                              //load filesystem to save results

java.classpath.push("bin/MergeSortBinaries.jar");                         //load the java merge sort libraries

//const array_lengths_gen   = new ArrayGenerator(100, 10000, 1000000);
const array_lengths_gen   = new ArrayGenerator(3, 1000000, 10000000);
const array_lengths       = array_lengths_gen.generateSequential();

let iteration       = 0;
const min           = -1000;
const max           = 1000;

//kick off testing by starting multiple threads sorting
iterateNextTestMultipleThread();


function testJavaScriptSingleThread(length, min, max){
  const cwd             = process.cwd();
  const fork_instance   = fork(cwd + '/src/node/ForkJavaScript.js',[],{silent: true});
  const array_gen       = new ArrayGenerator(length, min, max);
  const test_array      = array_gen.generateRandom();

  fork_instance.send({load: true, path: '/src/node/MergeSort.js', args: test_array, method: 'sort'});
  fork_instance.send({run: true});

  fork_instance.on('message', function(data){
    if(data.result){
        //saveResult(data.result);
        console.log("javascript sort length: " + length + " 1x thread elapsed ms: " + data.elapsed_ms);
        killForkProcesses([fork_instance]);   //expects an array of fork instances to kill
        iterateNextTestSingleThread();
    }
  });
}

function testJavaScriptMultipleThread(length, min, max){
  const cwd             = process.cwd();
  const array_gen       = new ArrayGenerator(length, min, max);
  const test_array      = array_gen.generateRandom();
  const length_ea       = Math.floor(length/4);   //using 4 threads

  const array_data = [
    test_array.slice(0, length_ea),
    test_array.slice(length_ea, 2*length_ea),
    test_array.slice(2*length_ea, 3*length_ea),
    test_array.slice(3*length_ea)
  ];

  const fork_instance         = [];
  const fork_result           = [];
  let forks_complete          = 0;
  let elapsed_merge_sorted    = 0;

  for (var i=0; i<array_data.length; i++){
    fork_instance.push(fork(cwd + '/src/node/ForkJavaScript.js',[],{silent: true}));
      fork_instance[i].send({load: true, path: '/src/node/MergeSort.js', args: array_data[i], method: 'sort'});
      fork_instance[i].send({run: true});

    fork_instance[i].on('message', function(data){
      if(data.result){
          fork_result.push(data);
          //console.log("fork sort elapsed_ms: " + data.elapsed_ms);
          //if other all 4 forks are completed start the merging
          if(++forks_complete == 4){
            forks_finish_time = new Date().getTime();

            //do final sort on a single thread for now
            let time_start            = new Date().getTime();
            let sorted1               = mergeSortedArrays(fork_result[0].result, fork_result[1].result);
            let sorted2               = mergeSortedArrays(fork_result[2].result, fork_result[3].result);
            let sorted                = mergeSortedArrays(sorted1, sorted2);
            let time_finish           = new Date().getTime();
            elapsed_merge_sorted      = time_finish - time_start;
            //saveResult(sorted);
            let total_time_ms = fork_result[0].elapsed_ms + elapsed_merge_sorted;
            console.log("javascript sort length: " + length + " 4x thread elapsed ms: " + total_time_ms);
            killForkProcesses(fork_instance);
            iterateNextTestMultipleThread();
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

function killForkProcesses(instances){
  instances.map(function(item){
      return item.kill();
  });
}

function iterateNextTestMultipleThread(){
  if(iteration < array_lengths.length){
    let current_length = array_lengths[iteration];

    testJavaScriptMultipleThread(current_length, min, max);  //array length, min val, max val
    iteration++;
  } else {
    console.log("multiple thread testing has completed");
    //start off testing single thread iteration
    iteration = 0;
    iterateNextTestSingleThread();
  }
}

function iterateNextTestSingleThread(){
  if(iteration < array_lengths.length){
    let current_length = array_lengths[iteration];

    testJavaScriptSingleThread(current_length, min, max);  //array length, min val, max val
    iteration++;
  } else {
    console.log("single thread testing has completed");
  }
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
  fs.writeFile('result.csv', data, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  });

}

//test single thread java for various lengths n array
//test multiple thread java for various lengths n array
