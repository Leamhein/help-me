module.exports = function count(s, pairs) {
  let ans = 0,
  N = 1,
  simple = new Set, // set of simple multipliers
  corConditional = [], //array of multipliers that satisfy the condition s[0]
  repeating = []; //array of repeating multipliers

  function Factorise (base) { //factorise function
    let j = 1,
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
      if (key > N) {
        break;
      };
      euler *= (1 - 1 / key);
    };
    return Math.floor(euler);
  };

  function Euclid (a, b) { //Euclid algorithm
    while (a != 0 && b != 0) {
      if (a > b) {
        a %= b;
      } else {
        b %= a;
      };
    };
    return a + b;
  };

  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= Math.pow(pairs[i][0], pairs[i][1]); //calc N
    Factorise(pairs[i][0]); //factorise N
  };
  if (N > 100000000) {
    return NaN;
  };

  if (s.length == 1) {
    if (s[0] == "1") {
      ans += Euler(N);
    } else {
      ans += N - Euler(N);
    };
    return ans %= 1000000007;
  };

for (let i = 0, length = s.length; i < length; i++) {
  if (s[i] == "1" && i == 0) {
    for (let j = i; j < N + i; j++) {
      if (Euclid(N, j) == 1) {
        corConditional.push(j-i); // if this is the first condition => push all satisfied multipliers
      };
    };
  };

  if (s[i] == "0" && i == 0) {
    for (let j = i; j < N + i; j++) {
      if (Euclid(N, j) != 1) {
        corConditional.push(j-i); // if this is the first condition => push all satisfied multipliers
      };
    };
  };

  if (s[i] == "1" && i != 0) {
    for (let j = i; j < N + i; j++) {
      if (Euclid(N, j) == 1 && corConditional.includes(j-i)) {
        repeating.push(j-i); //push only repeating multipliers
      };
    };
  };

  if (s[i] == "0" && i != 0) {
    for (let j = i; j < N + i; j++) {
      if (Euclid(N, j) != 1 && corConditional.includes(j-i)) {
        repeating.push(j-i); //push only repeating multipliers
      };
    };
  };

};

return repeating.length % 1000000007;
};
