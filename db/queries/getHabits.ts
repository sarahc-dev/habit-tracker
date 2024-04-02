import db from ".."
import { getLocaleDateISOFormat } from "@/utils/dateUtils"

export async function getHabits(id: string, date: Date) {
  // Get habits for localised 'day'
  let timezoneOffset = date.getTimezoneOffset()

  const start = new Date(getLocaleDateISOFormat(date))
  start.setMinutes(start.getMinutes() + timezoneOffset)

  const finish = new Date(getLocaleDateISOFormat(date))
  // add 1 day - 24 * 60
  finish.setMinutes(finish.getMinutes() + 1440)

  // to fix bug on 31 March where start is GMT and finish is BST
  timezoneOffset = finish.getTimezoneOffset()
  finish.setMinutes(finish.getMinutes() + timezoneOffset)

  return db.query.habits.findMany({
    where: (habits, { eq }) => eq(habits.userId, id),
    with: {
      checkins: {
        where: (checkins, { and, gte, lt }) =>
          and(gte(checkins.timestamp, start), lt(checkins.timestamp, finish)),
      },
    },
  })
}
