/* Generates Array of Length with Random Numbers Between Min and Max */
function arrayGenerator(length, min, max) {

  var random_array = new Array(length);
  var index = 0;

  while (index < length) {
    random_array[index++] = Math.random() * (max - min) + min;
  }

  return random_array;
}


module.exports = arrayGenerator;
