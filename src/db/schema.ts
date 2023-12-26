import { relations } from "drizzle-orm";
import {
  index,
  text,
  pgTable,
  serial,
  integer,
  uuid,
  varchar,
  boolean,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

// users information
export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
    provider: varchar("provider", {
      length: 100,
      enum: ["github", "credentials"],
    })
      .notNull()
      .default("credentials"),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
    emailIndex: index("email_index").on(table.email),
  }),
);

// user to books relation (one to many)
export const usersRelations = relations(usersTable, ({ many }) => ({
  books: many(booksTable),
}));

// books
export const booksTable = pgTable(
  "books",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description").notNull(),
    language: varchar("language", { length: 100 }).notNull(),
    publicize: boolean("publicize").default(false).notNull(),
    popularity: integer("popularity").default(0).notNull(),
    createAt: timestamp("create_at").defaultNow().notNull(),
    authorId: uuid("author_id")
      .notNull()
      .references(() => usersTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const booksRelations = relations(booksTable, ({ one, many }) => ({
  // books to users relation (one to one)
  author: one(usersTable, {
    fields: [booksTable.authorId],
    references: [usersTable.displayId],
  }),

  // books to words relation (one to many)
  words: many(wordsTable),
}));

// vocabulary table
export const wordsTable = pgTable(
  "words",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    content: text("content").notNull(),
    meaning: text("meaning").notNull(),
    // for private usage
    familiarity: integer("familiarity").notNull().default(0),
    star: boolean("star").notNull().default(false),
    // for public usage
    testNum: integer("test_num").notNull().default(0),
    correctNum: integer("correct_num").notNull().default(0),
    accuracy: real("accuracy").notNull().default(0),
    createAt: timestamp("create_at").notNull().defaultNow(),
    // which book it belongs to
    bookId: uuid("book_id")
      .notNull()
      .references(() => booksTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    displayIdIndex: index("display_id_index").on(table.displayId),
  }),
);

export const wordsRelations = relations(wordsTable, ({ one }) => ({
  // words to books relation (one to one)
  book: one(booksTable, {
    fields: [wordsTable.bookId],
    references: [booksTable.displayId],
  }),
}));
