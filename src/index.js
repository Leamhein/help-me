module.exports = function count(s, pairs) {
  var N = 1,
  b = 1,
  counter = 0,
  ans = 0;
  function evclid (b) {
    var a = N;
    while (a && b) {
      if (a >= b) {
        a %= b;
      } else {
        b %= a;
      }
    };
    if (a | b == 1) {
      return true;
    };
    return false;
  };
  for (let i = 0, length = pairs.length; i < length; i++) {
    N *= pairs[i][0] * pairs[i][1];
    console.log("N= "+ N);
  };
  for (let i = 1; i < N; i++) {
    counter += evclid (b + i);
  };
  console.log("counter= "+ counter);
  for (let i = 0, length = s.length; i < length; i++) {
    if (s[i] == "1") {
      ans += counter;
    } else {
      ans += (N - counter);
    }
  }
  ans %= 1000000007;
  return ans;
};
