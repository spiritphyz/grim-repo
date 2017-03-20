// const input = window.prompt('Type in a phrase with the number of inputs followed by numbers that need the next fibonacci', '3 6 15 30');
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
const input = '3\n6\n15\n1';
const nums = input.split('\n').map(item => +item); 
const max = nums.splice(0, 1);

for (let i = 0; i < max; i += 1) {
  let curr = nextFibo(nums[i]);
  let ele = document.createElement('div');
  ele.innerHTML = '' + curr;
  document.body.appendChild(ele);
}