export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type UserPublicInfo = {
  id: string;
  username: string;
};

export type Document = {
  id: string;
  title: string;
  content: string;
};

export type Books = {
  id: string;
  title: string;
  description: string;
  language: string;
  publicize: boolean;
  popularity: number;
};

export type BooksCreate = Omit<Books, "id" | "popularity">;

export type BooksUpdate = Partial<Omit<Books, "id">>;

export type Words = {
  id: string;
  content: string;
  meaning: string;
  // for private usage
  familiarity: number;
  star: boolean;
  // for public usage
  correctNum: number;
  testNum: number;
  accuracy: number;
};

export type WordsCreate = Omit<
  Words,
  "id" | "familiarity" | "star" | "correctNum" | "testNum" | "accuracy"
>;

export type WordsUpdate = Partial<Omit<Words, "id" | "accuracy">>;

export type TestRequest = {
  num: number;
  repetitive: boolean;
  publicize: boolean;
  // only applied on private
  // if true, we only pick words that are starred
  star: boolean;
  // if hard is true, then
  // on private books, there is higher probabibility to choose unfamiliar words
  // on public books, there is higher probability to choose words that has less accuracy
  hard: boolean;
};
