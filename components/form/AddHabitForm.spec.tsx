import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import AddHabitForm from "./AddHabitForm"
import HabitsContextProvider from "@/contexts/HabitsContext"
import { HabitType } from "@/lib/types"

const mockHabits: HabitType[] = []

jest.mock("../../actions/add-habit", () => ({
  __esModule: true,
  addHabit: jest.fn(),
}))

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useOptimistic: jest.fn(() => [[], jest.fn()]),
}))

describe("<AddHabitForm />", () => {
  it("displays correct error messages if nothing submitted", async () => {
    render(
      <HabitsContextProvider habits={mockHabits} userId={"1"}>
        <AddHabitForm setOpen={jest.fn()} />
      </HabitsContextProvider>
    )

    fireEvent.click(screen.getByText("Add Habit"))

    await waitFor(() => {
      const newHabit = screen.getByLabelText("Habit")
      const habitError = screen.getByText("Enter a new habit")
      expect(newHabit.nextSibling).toBe(habitError)
    })
  })

  it("closes the modal", async () => {
    const mockSetOpen = jest.fn()
    render(
      <HabitsContextProvider habits={mockHabits} userId={"1"}>
        <AddHabitForm setOpen={mockSetOpen} />
      </HabitsContextProvider>
    )

    fireEvent.change(screen.getByLabelText("Habit"), {
      target: { value: "Test habit" },
    })

    fireEvent.click(screen.getByText("Add Habit"))

    await waitFor(() => {
      expect(mockSetOpen).toHaveBeenCalled()
    })
  })
})
