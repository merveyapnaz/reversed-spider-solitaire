const utilities = {
  shuffleArray(a) {
    try {
      var j, x, i;

      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }

      return a;
    } catch (error) {
      let err = `Error : ${error.message}`;
      console.log(err);

      throw err;
    }
  },
  chunkArray(arr, chunkSize = 1) {
    try {
      const tmp = [...arr];
      let cache = [];

      if (chunkSize <= 0) return cache;

      while (tmp.length) cache.push(tmp.splice(0, chunkSize));

      return cache;
    } catch (error) {
      let err = `Error : ${error.message}`;
      console.log(err);

      throw err;
    }
  },
};

export default utilities;
