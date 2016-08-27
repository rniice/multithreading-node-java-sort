"use strict";

/* Generates Array of Length between Min and Max
  methods: generateRandom() and generateSequential()*/
class ArrayGenerator {

    constructor (length, min, max) {
        this.length   = length;
        this.min      = min;
        this.max      = max;
        this.values   = new Array(length);  //pre-allocate the memory
    }

    generateRandom () {
        let index = 0;

        while (index < this.length) {
            this.values[index++] = Math.random() * (this.max - this.min) + this.min;
        }

        return this.values;
    }

    generateSequential () {
        let index = 0;
        let increment = (this.max - this.min)/this.length;
        console.log(increment);

        while (index < this.length) {
            if(index == 0){
                this.values[index++] = this.min;
            } else if(index == this.length-1) {
                this.values[index++] = this.max;
            } else {
                let next_value = this.values[index-1] + increment;
                this.values[index++] = next_value;
            }
        }

        return this.values;
    }

    print () {
        console.log( this.values.toString());
    }
}

module.exports = ArrayGenerator;
