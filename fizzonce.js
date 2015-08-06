var res = {fizz:0,buzz:0,fizzbuzz:0};
for (var i=0; i<1000000000; i++) {
  if (i%3 == 0) {
    if (i%5 == 0) {
      res['fizzbuzz']++;
    } else {
      res['fizz']++;
    }
  } else if (i%5 == 0) {
    res['buzz']++;
  }
}
console.log(res);
