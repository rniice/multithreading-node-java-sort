var java = require("java");
java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");

/*Include the java bin files:
  //MergeSort --package com.sortingmodules.mergesort;
  //MergeSortedArrays --package com.sortingmodules.mergesortedarrays;
  //SortingAlgorithm --package com.sortingmodules.sortingalgorithm;
*/
java.classpath.push("bin/MergeSortBinaries.jar");

var array = [5, 6, 2, 1];

//var obj = java.newInstanceSync("com.sortingmodules.mergesort.MergeSort");

//var result = java.callStaticMethodSync("com.sortingmodules.mergesort.MergeSort", "sort", array);
//console.log(result);

var MergeSort = java.newInstanceSync("com.sortingmodules.mergesort.MergeSort");
MergeSort.sort([3,5,2,1]);

//console.log(MergeSort.sort.toString());
//console.log(MergeSort.dog);

//var MergeSort           = java.import('com.sortingmodules.mergesort.MergeSort');
//var MergeSortedArrays   = java.import('com.sortingmodules.mergesortedarrays.MergeSortedArrays');
//var SortingAlgorithm    = java.import('com.sortingmodules.sortingalgorithm.SortingAlgorithm');

//var mergeSortInstance = new MergeSort();
//var results = mergeSortInstance.sort(array);
//sortInstance.name = 'woof';

//var mergeSortInstance = new MergeSort;
//var results = new MergeSort.sort(array);
//console.log(results);

//console.log(java.util.ArrayList);
//var MergeSort = java.import('com.sortingmodules.mergesort');


//var MergeSort = java.import("com.sortingmodules.mergesort");

//var result = MyClass.addNumbersSync(1, 2);
//console.log(result);
