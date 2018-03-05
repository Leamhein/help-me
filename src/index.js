module.exports = function count(s, pairs) {
  var N = 1,
  b = 1,
  counter = 0,
  ans = 0, //answer
  euler, incExc,
  simple = new Set; //set of simple multiply

  function Factorise (base) { //factorise function
    var j = 1,
    i = 2; // divider
    if (base == i) {
      simple.add(2);
    };
    do {
     if (base % i == 0) { // base
      simple.add(i);
      j++;
      base = base / i;
    } else {
      i++;
      };
    } while (i <= base);
    return simple; //return max simple multiplier
    };

  function Euler () { //Euler function
    euler = N;
      for (let key of simple) {
        euler *= (1 - 1 / key);
        };
      return Math.round(euler);
    };


  function incExc () { //inclusion–exclusion function
    var substract = [], //array of numbers to substract from N
    addition = [], //array of numbers to add to N
    multiply = [1], //multiplied simple
    simpleArr = [];

    incExc = N;

    for (let key of simple) {
      simpleArr.push(key);
    };
    console.log("simpleArr= "+simpleArr);

    function mult (pos) { //multiply elements in simple array
      for (let i = pos, length = simpleArr.length; i < length; i++) {
        multiply.push(simpleArr[pos] * simpleArr[i]);
      };
    };


    for (let key of simple) { //fill the array with values to substract
      substract.push(N/key);
      multiply[0] *= key;
    };
    substract.push(N/multiply[0]);

    for (let i = 0, length = simpleArr.length; i < length-1; i++) {
      mult(i);
    };

    for (let i = 1, length = multiply.length; i < length; i++) {
      addition.push(N/multiply[i]);
    };
    for (let i = 0, length = substract.length; i < length; i++) {
      incExc -= substract[i];
    };
    for (let i = 0, length = addition.length; i < length; i++) {
      incExc += addition[i];
    };
    console.log("multiply= "+multiply); //excess values in multiply
    console.log("substract= "+substract);
    console.log("addition= "+addition);
  };


  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= pairs[i][0] * pairs[i][1]; //calc N
  };

  for (let i = 0, length = pairs.length; i < length; i++) {
    Factorise(pairs[i][0]); //factorise every elements in pairs array
    Factorise(pairs[i][1]);
  };

  Euler();
  incExc()

  for (let i = 0, length = s.length; i < length; i++) {
    if (s[i] == "1") {
      ans += euler;
    } else {
      ans += incExc;
    };
  };
  ans %= 1000000007;
  return ans;
};
