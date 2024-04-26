import { deepCopy, flattenInLevel, mergeFlattenArray } from "../src/core/helper";

describe("Helper", () => {
  describe("This test if deepCopy function works with cloning options in Fzearch", () => {
    it("should return a deep cloned object", () => {
      const options = {
        caseSensitive: false,
        getPenalty: () => 0,
        getSimilarity: () => 0,
      };
      const clonedOptions = deepCopy(options);
      expect(clonedOptions).toEqual(options);
      expect(clonedOptions).not.toBe(options);
    });
  });

  describe("This test if flattenInLevel function works", () => {
    it("should return a flatten array of strings", () => {
      const obj = {
        a: "a",
        b: {
          c: "c",
          d: {
            e: "e",
            f: {
              g: "g",
            },
          },
          h: "h",
        },
      };
      const result = [["a"], ["c", "h"], ["e"], ["g"]];
      expect(flattenInLevel(obj)).toEqual(result);
    });

    it("should ignore non-string values", () => {
      const obj = {
        a: "a",
        b: {
          c: "c",
          d: {
            e: "e",
            f: {
              g: "g",
              i: 1,
              function: () => {},
            },
          },
          h: "h",
        },
      };
      const result = [["a"], ["c", "h"], ["e"], ["g"]];
      expect(flattenInLevel(obj)).toEqual(result);
    });
  });

  describe("This test if mergeNestedArray function works", () => {
    it("should merge two nested array", () => {
      const arr1 = [["a"], ["c", "h"], ["e"], ["g"]];
      const arr2 = [["b"], ["d", "i"], ["f"], ["j"]];
      const result = [["a", "b"], ["c", "h", "d", "i"], ["e", "f"], ["g", "j"]];
      expect(mergeFlattenArray(arr1, arr2)).toEqual(result);
    });
  });
});
