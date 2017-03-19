const nextFibo = target => {
  let next = 1;
  let old = 0;
  let temp = 0;

  while (temp <= target) {
    temp = next;
    next = next + old;
    old = temp;
  }

  return old;
};

/*
temp: 1,1,2,3,5,8
next: 1,2,3,5,8,13
old: 1,1,2,3,5,8
*/

// 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
let test = 5;
// output should be 8
console.log(`Next fibo number after ${test} is:`, nextFibo(test));