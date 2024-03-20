import SubmitButton from "./SubmitButton"

describe("<SubmitButton />", () => {
  it("displays pending state", () => {
    cy.mount(<SubmitButton pending={true}>Test Submit</SubmitButton>)
    cy.contains("Test Submit")
    cy.get("button").should("be.disabled")
    cy.get("button").should("have.class", "disabled:opacity-50")
  })
})
