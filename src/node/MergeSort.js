/* Merge Sort Algorithm for Array of Numbers */

function mergeSort(arr) {
    if (arr.length < 2)
        return arr;

    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {

    //pre-allocate memory for the array length for performance
    var result_length = left.length + right.length;
    var result = new Array(result_length);
    var index = 0;

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result[index++] = left.shift();
        } else {
            result[index++] = right.shift();
        }
    }

    while (left.length){
      result[index++] = left.shift();
    }

    while (right.length){
      result[index++] = right.shift();
    }

    return result;
}

module.exports = mergeSort;
