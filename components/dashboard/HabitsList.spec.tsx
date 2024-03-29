import React, { useOptimistic } from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import HabitsContextProvider from "../../contexts/HabitsContext"
import HabitsList from "./HabitsList"

// eslint-disable-next-line react/display-name
jest.mock("./Habit", () => () => {
  return <li>Mock habit</li>
})

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useOptimistic: jest.fn(),
}))

describe("<HabitsList />", () => {
  it("displays a message when there are no habits", () => {
    ;(useOptimistic as jest.Mock).mockReturnValueOnce([[], jest.fn()])
    render(
      <HabitsContextProvider habits={[]} userId={"1"} date={new Date()}>
        <HabitsList />
      </HabitsContextProvider>
    )
    expect(screen.getByText("You have not added any habits yet.")).toBeVisible()
  })

  it("displays a list of habits", () => {
    const mockHabits = [
      {
        id: 1,
        title: "Drink 8 glasses of water",
      },
      {
        id: 2,
        title: "Do skincare routine",
      },
    ]
    ;(useOptimistic as jest.Mock).mockReturnValueOnce([mockHabits, jest.fn()])
    render(
      <HabitsContextProvider habits={mockHabits} userId={"1"} date={new Date()}>
        <HabitsList />
      </HabitsContextProvider>
    )
    const habitList = screen.getByRole("list")
    const listItems = habitList.querySelectorAll("li")

    expect(listItems.length).toBe(2)
  })
})
