module.exports = function count(s, pairs) {
  let N = 1,
  simple,
  iSimple,
  ans = 0;

  function Factorise (base) { //factorise function
    let simple = new Set,
    j = 1,
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

  function Euler (N, simple) { //Euler function
    var euler = N;
    for (let key of simple) {
      if (key > N) {
        break;
      };
      euler *= (1 - 1 / key);
    };
    return Math.floor(euler);
  };

  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= Math.pow(pairs[i][0], pairs[i][1]); //calc N
    if (N > 3000000000000) {
      return NaN;
    };
  };

  simple = Factorise(N);

  for (let i = 0, length = pairs.length; i < length; i++) {
    if (s[i] == "1") {
      switch (i) {
        case 0: ans += Euler(N, simple);
          break;
        case i > 0: iSimple = Factorise(i);
          ans += Euler(N, simple) - Euler(i, iSimple);
          break;
      }
    } else {
      switch (i) {
        case 0: ans += N - Euler(N, simple);
          break;
        case i > 0: iSimple = Factorise(i);
          ans += N - Euler(N, simple) - (i - Euler(i, iSimple));
          break;
      }
    }
  }
ans %= 1000000007;
return ans;
};
