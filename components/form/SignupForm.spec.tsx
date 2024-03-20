import React from "react"
import "@testing-library/jest-dom"
import { render, fireEvent, screen, waitFor } from "@testing-library/react"
import SignupForm from "./SignupForm"

// eslint-disable-next-line react/display-name
jest.mock("./SubmitButton", () => () => {
  return (
    <button type="submit" data-testid="mock">
      Mock Submit
    </button>
  )
})

jest.mock("../../actions/signup", () => ({
  __esModule: true,
  signupUser: jest.fn(),
}))

describe("<SignupForm />", () => {
  it("displays correct error messages if nothing submitted", async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />)

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      const emailInput = getByPlaceholderText("Email")
      const emailError = getByText("Invalid email address")
      expect(emailInput.nextSibling).toBe(emailError)

      const passwordInput = getByPlaceholderText("Password")
      const noPasswordError = getByText("Must be 6 or more characters long")
      expect(passwordInput.nextSibling).toBe(noPasswordError)
    })
  })

  it("displays error if invalid email entered", async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />)

    fireEvent.change(getByPlaceholderText("Email"), {
      target: { value: "example" },
    })

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument()
    })
  })

  it("displays error if password less than 6 characters", async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />)

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Abc" },
    })

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      expect(
        screen.getByText("Must be 6 or more characters long")
      ).toBeInTheDocument()
    })
  })

  it("displays error if password doesn't include uppercase letter", async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />)

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "abc123" },
    })

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      expect(
        screen.getByText(
          "Must include at least one uppercase letter and one number"
        )
      ).toBeInTheDocument()
    })
  })

  it("displays error if password doesn't include a number", async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />)

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "AbcdeF" },
    })

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      expect(
        screen.getByText(
          "Must include at least one uppercase letter and one number"
        )
      ).toBeInTheDocument()
    })
  })

  it("displays error if passwords don't match", async () => {
    const { getByPlaceholderText, getByText } = render(<SignupForm />)

    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "Abc123" },
    })

    fireEvent.change(getByPlaceholderText("Confirm Password"), {
      target: { value: "Abc1234" },
    })

    fireEvent.click(getByText("Mock Submit"))

    await waitFor(() => {
      const confirmPasswordInput = getByPlaceholderText("Confirm Password")
      const confirmPasswordError = getByText("Passwords don't match")
      expect(confirmPasswordInput.nextSibling).toBe(confirmPasswordError)
    })
  })
})
