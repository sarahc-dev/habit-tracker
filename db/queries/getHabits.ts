import db from ".."

export async function getHabits(id: string, date: Date) {
  const tomorrowDate = new Date(date)
  tomorrowDate.setDate(date.getDate() + 1)

  return db.query.habits.findMany({
    where: (habits, { eq }) => eq(habits.userId, id),
    with: {
      checkins: {
        where: (checkins, { and, gte, lt }: { and: any; gte: any; lt: any }) =>
          and(
            gte(checkins.timestamp, new Date(date.toISOString().split("T")[0])),
            lt(
              checkins.timestamp,
              new Date(tomorrowDate.toISOString().split("T")[0])
            )
          ),
      },
    },
  })
}
