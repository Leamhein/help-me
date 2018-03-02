module.exports = function count(s, pairs) {
  var N = 1,
  b = 1,
  counter = 0,
  ans = 0;

  function Euler (N) {
      var ans = N,
      simple = [],
      j = 1,
      i = 2; // divider
      if (N == i) {
        simple[0] = 2;
        return simple[0];
      };
      do {
       if (N % i == 0) { // base
        simple[j-1] = i;
        j++;
        N = N / i;
       } else {
        i++;
        };
      } while (i <= N);
    //  return simple; //return max simple multiplier
      for (let i = 0, length = simple.length; i < length; i++) {
        if (simple[i+1] != simple[i]) {
          ans *= 1 - 1/simple[i];
        };
      };
      return Math.round(ans);
    };

    for (let i = 0, length = pairs.length; i < length; i++) {
    N *= pairs[i][0] * pairs[i][1];
  };

  for (let i = 0, length = s.length; i < length; i++) {
    if (s[i] == "1") {
      ans += Euler(N);
    } else {
      ans += (N - Euler(N));
    }
  }
  ans %= 1000000007;
  return ans;
};
