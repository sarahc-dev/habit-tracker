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
