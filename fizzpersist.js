process.on('message',calcfizz);

function calcfizz(args) {
  console.log('starting with ', args);
  var res = {fizz:0,buzz:0,fizzbuzz:0};
  for (var i=args.start; i<args.end; i++) {
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
  process.send(res);
}
