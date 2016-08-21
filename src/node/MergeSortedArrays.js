/* Combines Two Sorted Arrays of Numbers into Single Sorted Array */

function mergeSortedArrays(array1, array2) {

  var i = 0;    //array1 current index
  var j = 0;    //array2 current index
  var k = 0;    //result array index

  var i_length = array1.length;
  var j_length = array2.length;
  var result_length = i_length + j_length;

  var result = new Array(result_length)

  while (k < result_length) {
    if(i===i_length && j!==j_length){  //reached end of array1
      result[k++] = array2[j++];
    } else if(j===j_length && i!==i_length) { //reached end of array2
      result[k++] = array1[i++];
    } else {
      if(array1[i] < array2[j]){
        result[k++] = array1[i++];
      } else {
        result[k++] = array2[j++];
      }
    }
  }
  return result;
}

module.exports = mergeSortedArrays;
