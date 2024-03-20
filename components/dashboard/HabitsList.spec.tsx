import React, { useContext } from "react"
import "@testing-library/jest-dom"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import HabitsList from "./HabitsList"

const useContextMock = useContext as jest.Mock

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}))

describe("<HabitsList />", () => {
  it("displays a message when there are no habits", () => {
    const mockContextData = {
      optimisticHabits: [],
    }
    useContextMock.mockReturnValue(mockContextData)
    render(<HabitsList />)
    expect(screen.getByText("You have not added any habits yet.")).toBeVisible()
  })

  it("displays a list of habits", () => {
    const mockContextData = {
      optimisticHabits: [
        {
          id: 1,
          title: "Drink 8 glasses of water",
        },
        {
          id: 2,
          title: "Do skincare routine",
        },
      ],
    }
    useContextMock.mockReturnValue(mockContextData)
    render(<HabitsList />)
    const habitList = screen.getByRole("list")
    const listItems = habitList.querySelectorAll("li")

    expect(listItems.length).toBe(2)
    expect(listItems[0]).toHaveTextContent("Drink 8 glasses of water")
    expect(listItems[1]).toHaveTextContent("Do skincare routine")
  })
})
