import { deepCopy, flattenInLevel } from "../src/core/helper";

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
    })
  });
});
