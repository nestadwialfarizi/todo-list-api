import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const users = t.pgTable("users", {
  id: t.uuid().primaryKey().defaultRandom(),
  name: t.text().notNull(),
  email: t.text().notNull().unique(),
  password: t.text().notNull(),
  // prettier-ignore
  createdAt: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  // prettier-ignore
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => sql`now()`),
});

export const todos = t.pgTable("todos", {
  id: t.uuid().primaryKey().defaultRandom(),
  // prettier-ignore
  userId: t.uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: t.text().notNull(),
  description: t.text().notNull(),
  // prettier-ignore
  createdAt: t.timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  // prettier-ignore
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => sql`now()`),
});
