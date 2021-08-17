import utilities from "@/common/utilities/utilities";

describe("Utilities.js", () => {
  describe("shuffleArray function", () => {
    it("Shuffled array should different to base array", () => {
      let array = [1, 2, 3, 4];
      let baseArray = [...array];

      utilities.shuffleArray(array);

      expect(array).not.toStrictEqual(baseArray);
    });

    it("Should throw error when parameter is a string", () => {
      let errorString = "Error Test String";

      expect(() => {
        utilities.shuffleArray(errorString);
      }).toThrowError(
        "Error : Cannot assign to read only property '16' of string 'Error Test String'"
      );
    });
  });

  describe("chunkArray function", () => {
    it("Should return arrays to arrays given chunk size", () => {
      let array = [1, 2, 3, 4];
      let chunkedArrays = utilities.chunkArray(array, 2);

      expect(chunkedArrays).toStrictEqual([
        [1, 2],
        [3, 4],
      ]);
    });

    it("Should return empty array when array chunk size is negative", () => {
      let array = [1, 2, 3, 4];
      let chunkedArrays = utilities.chunkArray(array, -5);

      expect(chunkedArrays).toStrictEqual([]);
    });

    it("Should return a one-dimensional array list when chunk size is given", () => {
      let array = [1, 2];
      let chunkedArrays = utilities.chunkArray(array);

      expect(chunkedArrays).toStrictEqual([[1], [2]]);
    });

    it("Should throw error when given array is null", () => {
      expect(() => {
        utilities.chunkArray(null, 5);
      }).toThrowError();
    });
  });
});
