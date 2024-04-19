import { SearchOptions } from "../type";

const swSearch = (
  str1: string,
  str2: string,
  options: SearchOptions,
): number => {
  const getPenalty = options.getPenalty;
  const getSimilarity = options.getSimilarity;

  let d = new Array(str1.length + 1)
    .fill(0)
    .map(() => new Array(str2.length + 1).fill(0));

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const matchScore =
        d[i - 1][j - 1] + getSimilarity(str1[i - 1], str2[j - 1]);
      const row_max_score = Math.max(
        ...d[i].slice(0, j).map((v, k) => v - getPenalty(j - k)),
      );
      const col_max_score = Math.max(
        ...d
          .map((v) => v[j])
          .slice(0, i)
          .map((v, k) => v - getPenalty(i - k)),
      );
      d[i][j] = Math.max(0, matchScore, row_max_score, col_max_score);
    }
  }

  // if str1 is longer than str2, then max_score is the max of the last column, otherwise it is the max of the last row
  const max_score =
    str1.length > str2.length
      ? Math.max(...d.map((v) => v[str2.length]))
      : Math.max(...d[str1.length]);

  return -max_score;
};

export default swSearch;
