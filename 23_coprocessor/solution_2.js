let b = 84 * 100 + 100000;
let c = b + 17000;
let f = false;
let g = 0;
let h = 0;

do {
  f = true;

  for(let d = 2; d * d < b; d++) {
    if(b % d === 0) {
      f = false;
      break;
    }
  }

  if(!f) {
    h++;
  }

  g = b - c;
  b += 17;
} while (g !== 0)

console.log(h);
