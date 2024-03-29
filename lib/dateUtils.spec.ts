import {
  getRelativeDate,
  getDateString,
  getNextDate,
  getPreviousDate,
} from "./dateUtils"

xdescribe("getRelativeDate", () => {
  it("returns 'today' if current date", () => {
    expect(true).toBe(true)
  })

  it("returns 'tomorrow' if tomorrow's date", () => {
    expect(true).toBe(true)
  })
})

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
