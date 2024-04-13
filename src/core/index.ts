import swSearch, { SWCustomFunc } from "./swSearch";

export default class Fzearch {
  private db: string[];
  private maxResults?: number;

  constructor(db: string[] = [], maxResults: number = 5) {
    this.db = [...db];
    this.maxResults = maxResults;
  }

  public setDB(db: string[]): void {
    this.db = [...db];
  }

  public addDB(db: string[]): void {
    this.db = [...this.db, ...db];
  }

  public setMaxResults(maxResults: number): void {
    this.maxResults = maxResults;
  }

  static search(
    query: string,
    db: string[],
    maxResults: number = 5,
    customFunc?: SWCustomFunc,
  ): string[] {
    const result = db.map((item) => {
      return {
        item,
        score: swSearch(item, query, customFunc),
      };
    });

    return result
      .sort((a, b) => a.score - b.score)
      .map((result) => result.item)
      .slice(0, maxResults);
  }

  public search(query: string, customFunc?: SWCustomFunc): string[] {
    const results = this.db.map((item) => {
      return {
        item,
        score: swSearch(item, query, customFunc),
      };
    });

    return results
      .sort((a, b) => a.score - b.score)
      .map((result) => result.item)
      .slice(0, this.maxResults);
  }
}
