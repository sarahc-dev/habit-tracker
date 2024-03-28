import db from ".."

export async function getHabits(id: string) {
  return db.query.habits.findMany({
    where: (habits, { eq }) => eq(habits.userId, id),
  })
}
