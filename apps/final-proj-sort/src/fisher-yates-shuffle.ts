export function random(size: number) {
  if (isNaN(size)) {
    return [];
  }
  const random = randomSeed(size);
  const array = new Array(size).fill(1).map((_, i) => i + 1);
  const result: number[] = [];
  for (let i = 0; i < size; i++) {
    const tmp = array[i];
    result[random.next()] = tmp;
  }
  return result.slice(1);
}

function randomSeed(size: number) {
  const set = new Set<number>();
  let seed = -1;
  return {
    next() {
      if (set.size === size) {
        return NaN;
      }
      do {
        seed = Math.ceil(Math.random() * size);
      } while (set.has(seed));
      set.add(seed);
      return seed;
    },
  };
}
