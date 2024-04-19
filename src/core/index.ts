import {
  FzearchOptions,
  GetPenalty,
  GetSimilarity,
  SearchOptions,
} from "../type";
import { deepCopy } from "./helper";
import swSearch from "./swSearch";

export default class Fzearch {
  private db: string[];
  private options: FzearchOptions;

  constructor(db: string[] = [], options?: FzearchOptions) {
    this.db = [...db];
    this.options = deepCopy(options || {});
  }

  public setDB(db: string[]): void {
    this.db = [...db];
  }

  public addDB(db: string[]): void {
    this.db = [...this.db, ...db];
  }

  public setMaxResults(maxResults: number): void {
    this.options.maxResults = maxResults;
  }

  static search(
    query: string,
    db: string[],
    options: FzearchOptions = {},
  ): any[] {
    const _options = this.getSearchOptions(options);
    const result = db.map((item) => {
      return {
        item,
        score: swSearch(item, query, _options),
      };
    });

    if (options.showScore) {
      return result
        .sort((a, b) => a.score - b.score)
        .slice(0, options.maxResults);
    }

    return result
      .sort((a, b) => a.score - b.score)
      .map((result) => result.item)
      .slice(0, options.maxResults);
  }

  static getSearchOptions(options: FzearchOptions): SearchOptions {
    const _getPenalty: GetPenalty = (dist: number) => {
      return dist * 2;
    };

    const caseSensitiveGetSimilarity: GetSimilarity = (
      char1: string,
      char2: string,
    ) => {
      if (char1[0] === char2[0]) {
        return 10;
      }

      if (char1[0].toLowerCase() === char2[0].toLowerCase()) {
        return 5;
      }
      return -10;
    };

    const nonCaseSensitiveGetSimilarity: GetSimilarity = (
      char1: string,
      char2: string,
    ) => {
      return char1[0].toLowerCase() === char2[0].toLowerCase() ? 10 : -10;
    };

    const _getSimilarity = (caseSensitive: boolean) => {
      return caseSensitive
        ? caseSensitiveGetSimilarity
        : nonCaseSensitiveGetSimilarity;
    };

    const caseSensitive =
      typeof options.caseSensitive === "boolean" ? options.caseSensitive : true;
    const getPenalty = options.getPenalty || _getPenalty;
    const getSimilarity =
      options.getSimilarity || _getSimilarity(caseSensitive);

    return {
      getPenalty,
      getSimilarity,
    };
  }

  public search(query: string): any[] {
    const options = Fzearch.getSearchOptions(this.options);
    const results = this.db.map((item) => {
      return {
        item,
        score: swSearch(item, query, options),
      };
    });

    if (this.options.showScore) {
      return results
        .sort((a, b) => a.score - b.score)
        .slice(0, this.options.maxResults);
    }

    return results
      .sort((a, b) => a.score - b.score)
      .map((result) => result.item)
      .slice(0, this.options.maxResults);
  }
}
