module.exports = function count(s, pairs) {
  let N = 1,
  simple = new Set,
  ans = 0;

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
    return simple;
  };

  function Euler (N) { //Euler function
    var euler = N;
    for (let key of simple) {
      euler *= (1 - 1 / key);
    };
    return Math.floor(euler);
  };


  function incExc (N) { //inclusion–exclusion function
    var addition = [], //array of numbers to add to N
    multiply = [1], //multiplied simple
    simpleArr = [];

    incExc = N;

    for (let key of simple) {
      simpleArr.push(key);
    };

    function mult (pos) { //multiply elements in simple array
      for (let i = pos+1, length = simpleArr.length; i < length; i++) {
        multiply.push(simpleArr[pos] * simpleArr[i]);
      };
    };


    for (let key of simple) {
      incExc -= (N/key);
      multiply[0] *= key;
    };
    incExc -= (N/multiply[0]);

    for (let i = 0, length = simpleArr.length; i < length-1; i++) {
      mult(i);
    };

    for (let i = 1, length = multiply.length; i < length; i++) {
      incExc += (N/multiply[i]);
    };
    return incExc;
  };

  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= pairs[i][0] * pairs[i][1]; //calc N
    if (N > 3000000000) {
      return NaN;
    }
    Factorise(pairs[i][0]);
    Factorise(pairs[i][1])
  };

  for (let i = 0, length = s.length; i < length; i++) {
    if (s[i] == "1") {
      ans += Euler(N-i);
    } else {
      ans += incExc(N-i);

    };
  };
  ans %= 1000000007;
  return Math.floor(ans);
};
