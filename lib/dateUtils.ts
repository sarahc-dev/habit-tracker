export function getDateString(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getNextDate(date: string): string {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getDate() + 1)
  return currentDate.toISOString().split("T")[0]
}

export function getPreviousDate(date: string): string {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getDate() - 1)
  return currentDate.toISOString().split("T")[0]
}

export function getRelativeDate(date: Date): string {
  const dateString = date.toISOString().split("T")[0]
  const today = new Date().toISOString().split("T")[0]

  if (dateString === today) {
    return "Today"
  } else if (getPreviousDate(today) === dateString) {
    return "Yesterday"
  } else if (getNextDate(today) === dateString) {
    return "Tomorrow"
  } else {
    return getDateString(date)
  }
}
