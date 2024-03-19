import Button from "./Button"

describe("Button", () => {
  it("passes", () => {
    cy.mount(<Button />)
    cy.contains("A button")
  })
})
