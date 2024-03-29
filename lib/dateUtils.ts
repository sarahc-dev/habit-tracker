export function getRelativeDate(date: string): string {
  return ""
}

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
