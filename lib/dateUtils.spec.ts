import {
  getDateString,
  getLocaleDateISOFormat,
  getNextDate,
  getPreviousDate,
  getRelativeDate,
  calculateMillisecondsToMidnight,
  getGreeting,
} from "./dateUtils"

describe("getDateString", () => {
  it("returns the date as a string in the format '1 January 2024'", () => {
    const date = new Date("2024-01-01T00:00:00.000Z")
    const result = getDateString(date)
    expect(result).toBe("1 January 2024")
  })
})

describe("getLocaleDateISOFormat", () => {
  it("returns date in YYYY-MM-DD format when no time", () => {
    const date = new Date("2024-01-01T00:00:00.000Z")
    const result = getLocaleDateISOFormat(date)
    expect(result).toBe("2024-01-01")
  })

  it("returns date in YYYY-MM-DD format", () => {
    const date = new Date("2024-06-29T10:44:47.438Z")
    const result = getLocaleDateISOFormat(date)
    expect(result).toBe("2024-06-29")
  })
})

describe("getNextDate", () => {
  it("returns tomorrows date", () => {
    const result = getNextDate(new Date("2024-01-01T00:00:00.000Z"))
    expect(result).toBe("2024-01-02")
  })

  it("returns tomorrows date if end of month", () => {
    const result = getNextDate(new Date("2024-11-30T00:00:00.000Z"))
    expect(result).toBe("2024-12-01")
  })
})

describe("getPreviousDate", () => {
  it("returns yesterdays date", () => {
    const result = getPreviousDate(new Date("2024-11-30T00:00:00.000Z"))
    expect(result).toBe("2024-11-29")
  })

  it("returns yesterdays date if beginning of month", () => {
    const result = getPreviousDate(new Date("2024-01-01T00:00:00.000Z"))
    expect(result).toBe("2023-12-31")
  })
})

describe("getRelativeDate", () => {
  it("returns 'today' if current date", () => {
    const testDate = new Date()
    const result = getRelativeDate(testDate)
    expect(result).toBe("Today")
  })

  it("returns 'tomorrow' if tomorrow's date", () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() + 1)
    const result = getRelativeDate(testDate)
    expect(result).toBe("Tomorrow")
  })

  it("returns 'yesterday' if yesterday's date", () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 1)
    const result = getRelativeDate(testDate)
    expect(result).toBe("Yesterday")
  })

  it("returns the date if before yesterday", () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 5)
    const testString = testDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    const result = getRelativeDate(testDate)
    expect(result).toBe(testString)
  })

  it("returns the date if after tomorrow", () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() + 2)
    const testString = testDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    const result = getRelativeDate(testDate)
    expect(result).toBe(testString)
  })
})

describe("calculateMillisecondsToMidnight", () => {
  it("returns the number of milliseconds to midnight", () => {
    const testDate = new Date("2024-03-01T22:00:00.000Z")
    const result = calculateMillisecondsToMidnight(testDate)
    expect(result).toBe(7200000)
  })

  it("returns the number of milliseconds to midnight", () => {
    const testDate = new Date("2024-03-01T17:12:33.000Z")
    const result = calculateMillisecondsToMidnight(testDate)
    expect(result).toBe(24447000)
  })
})

describe("getGreeting", () => {
  it("returns greeting when morning", () => {
    const testDate = new Date("2024-03-01T10:12:33.000Z")
    const result = getGreeting(testDate)
    expect(result).toBe("Good morning")
  })

  it("returns greeting when afternoon", () => {
    const testDate = new Date("2024-03-01T15:12:33.000Z")
    const result = getGreeting(testDate)
    expect(result).toBe("Good afternoon")
  })

  it("returns greeting when evening", () => {
    const testDate = new Date("2024-03-01T19:12:33.000Z")
    const result = getGreeting(testDate)
    expect(result).toBe("Good evening")
  })
})
