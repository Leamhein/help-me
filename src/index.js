module.exports = function count(s, pairs) {
  var N = 1,
  b = 1,
  counter = 0,
  ans = 0, //answer
  euler, //
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

  function Euler (N) { //Euler function
      for (let key of simple) {
        euler *= (1 - 1 / key);
        };
      return Math.round(euler);
    };

  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= pairs[i][0] * pairs[i][1]; //calc N
  };

  euler = N;

  for (let i = 0, length = pairs.length; i < length; i++) {
    Factorise(pairs[i][0]); //factorise every elements in pairs array
    Factorise(pairs[i][1]);
  };

  Euler(N);

  for (let i = 0, length = s.length; i < length; i++) {
    if (s[i] == "1") {
      ans += euler;
    } else {
      ans += N - euler;
    };
  };
  ans %= 1000000007;
  return ans;
};
