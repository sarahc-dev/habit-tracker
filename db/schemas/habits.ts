import { relations } from "drizzle-orm"
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core"
import { users } from "./users"

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  userId: text("user_id").notNull(),
})

export const habitsRelations = relations(habits, ({ one, many }) => ({
  checkins: many(checkins),
  user: one(users, { fields: [habits.userId], references: [users.id] }),
}))

export const checkins = pgTable("checkins", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow(),
  habitId: integer("habitId")
    .notNull()
    .references(() => habits.id, { onDelete: "cascade" }),
})

export const checkinsRelations = relations(checkins, ({ one }) => ({
  habit: one(habits, {
    fields: [checkins.habitId],
    references: [habits.id],
  }),
}))
