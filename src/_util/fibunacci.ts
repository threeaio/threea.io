interface Memo {
  [key: string]: number;
}

const fib = (num: number, memo: Memo): number => {
  if (num < 0) {
    return 0;
  } else if (num <= 1) {
    memo[num] = num;
    return memo[num];
  }

  if (memo[num]) {
    return memo[num];
  }

  return fib(num - 1, memo) + fib(num - 2, memo);
};

export const fibMax = (max = 500): number[] => {
  const cache: Memo = {};
  let iter = -1;
  while (!cache[iter] || cache[iter] < max) {
    iter++;
    cache[iter] = fib(iter, cache);
  }
  return Object.keys(cache).map((key: string) => cache[key]);
};
