import { pgTable, uuid, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const findingTypeEnum = pgEnum("finding_type", ["critical", "warning", "good", "neutral"]);

export const roasts = pgTable("roasts", {
  id: uuid().primaryKey().defaultRandom(),
  code: text().notNull(),
  language: text().notNull(),
  score: integer().notNull(),
  summary: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const roastFindings = pgTable("roast_findings", {
  id: uuid().primaryKey().defaultRandom(),
  roastId: uuid().references(() => roasts.id, { onDelete: "cascade" }).notNull(),
  type: findingTypeEnum().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const suggestedImprovements = pgTable("suggested_improvements", {
  id: uuid().primaryKey().defaultRandom(),
  roastId: uuid().references(() => roasts.id, { onDelete: "cascade" }).notNull(),
  originalCode: text().notNull(),
  improvedCode: text().notNull(),
  explanation: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
