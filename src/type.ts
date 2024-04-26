export type GetPenalty = (dist: number) => number;
export type GetSimilarity = (char1: string, char2: string) => number;

export type FzearchOptions = {
  showScore?: boolean;
  maxResults?: number;
  keys?: string[];
  caseSensitive?: boolean;
  levelPenalty?: number;
  dropoutRate?: number;
} & Partial<SearchOptions>;

export type SearchOptions = {
  getPenalty: GetPenalty;
  getSimilarity: GetSimilarity;
};

export type Searchable = string | Record<string, any>;
