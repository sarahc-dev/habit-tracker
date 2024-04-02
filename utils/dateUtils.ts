export function getDateString(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getLocaleDateISOFormat(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function getNextDate(date: Date): string {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getUTCDate() + 1) // UTC
  return getLocaleDateISOFormat(currentDate)
}

export function getPreviousDate(date: Date): string {
  const currentDate = new Date(date)
  currentDate.setDate(currentDate.getUTCDate() - 1)
  return getLocaleDateISOFormat(currentDate)
}

export function getRelativeDate(date: Date): string {
  const dateString = getLocaleDateISOFormat(date)
  const today = new Date()

  if (dateString === getLocaleDateISOFormat(today)) {
    return "Today"
  } else if (getPreviousDate(today) === dateString) {
    return "Yesterday"
  } else if (getNextDate(today) === dateString) {
    return "Tomorrow"
  } else {
    return getDateString(date)
  }
}

export function calculateMillisecondsToMidnight(date: Date): number {
  const midnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
    0,
    0,
    0
  )
  return midnight.getTime() - date.getTime()
}

export function getGreeting(date: Date): string {
  const hours = date.getHours()
  if (hours < 12) {
    return "Good morning"
  } else if (hours >= 17) {
    return "Good evening"
  } else {
    return "Good afternoon"
  }
}
