/* Generates Array of Length with Random Numbers Between Min and Max */
function arrayGenerator(length, min, max) {

  //var random_array = new Array(length);
  var random_array = [];

  for (var i=0; i<=length; i++){
    //random_array[i] = Math.random() * (max - min) + min;
    random_array.push(Math.random() * (max - min) + min);
  }

  return random_array;
}

module.exports = arrayGenerator;
