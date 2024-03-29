import {
  getRelativeDate,
  getDateString,
  getNextDate,
  getPreviousDate,
} from "./dateUtils"

describe("getDateString", () => {
  it("returns the date as a string in the format '1 January 2024'", () => {
    const date = new Date("2024-01-01")
    const result = getDateString(date)
    expect(result).toBe("1 January 2024")
  })

  it("returns the date as a string in the format '10 November 2024'", () => {
    const date = new Date("2024-11-10")
    const result = getDateString(date)
    expect(result).toBe("10 November 2024")
  })
})

describe("returns tomorrows date", () => {
  const result = getNextDate("2024-11-10")
  expect(result).toBe("2024-11-11")
})

describe("returns yesterdays date", () => {
  const result = getPreviousDate("2024-11-10")
  expect(result).toBe("2024-11-09")
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
