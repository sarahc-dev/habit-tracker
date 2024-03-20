import { relations } from "drizzle-orm"
import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core"
import { users } from ".."

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  userId: text("user_id").notNull(),
})

export const habitsRelations = relations(habits, ({ one }) => ({
  user: one(users, { fields: [habits.userId], references: [users.id] }),
}))
