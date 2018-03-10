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

  function Euler (N, i) { //Euler function
    if (i > 0) {
      var euler = N - (i - 1);
    } else {
    var euler = N;
  };
    for (let key of simple) {
      if (key > N) {
        break;
      };
      euler *= (1 - 1 / key);
    };
    return Math.floor(euler);
  };

  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= pairs[i][0] * pairs[i][1]; //calc N
    if (N > 3000000000) {
      return NaN;
    };
    Factorise(pairs[i][0]);
    Factorise(pairs[i][1]);
  };

  for (let i = 0, length = s.length; i < length; i++) {
    if (s[i] == "1") {
      ans += Euler(N, i);
    } else {
      ans += N - Euler(N, i);

    };
  };
  ans %= 1000000007;
  return Math.floor(ans);
};
