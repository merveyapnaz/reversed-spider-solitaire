const utilities = {
  shuffleArray(a) {
    var j, x, i;

    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  },
  chunkArray(arr, chunkSize = 1, cache = []) {
    const tmp = [...arr];

    if (chunkSize <= 0) return cache;

    while (tmp.length) cache.push(tmp.splice(0, chunkSize));

    return cache;
  },
};

export default utilities;
