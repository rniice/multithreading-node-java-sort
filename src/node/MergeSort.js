"use strict";

/* Merge Sort Algorithm for Array of Numbers */
class MergeSort {

    constructor (array) {
        this.length    = array.length;
        this.array     = array;
        this.sorted    = new Array(this.length);  //pre-allocate the memory

        //instead of returning MergeSort object, return the sorted result array
        return this.mergeSort(this.array);
    }

    mergeSort(arr) {
        if (arr.length < 2)
            return arr;

        var middle = parseInt(arr.length / 2);
        var left   = arr.slice(0, middle);
        var right  = arr.slice(middle, arr.length);

        return this.merge(this.mergeSort(left), this.mergeSort(right));
    }

    merge (left, right) {
        //pre-allocate memory for the array length for performance
        let result_length = left.length + right.length;
        let result = new Array(result_length);
        let index = 0;

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

    print () {
        console.log( this.values.toString());
    }
}

module.exports = MergeSort;
