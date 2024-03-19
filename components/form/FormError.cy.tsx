import FormError from "./FormError"

describe("<FormError />", () => {
  it("displays the given message", () => {
    cy.mount(<FormError message="Error. Please try again" />)
    cy.contains("Error. Please try again")
  })

  it("returns null if message is empty string", () => {
    cy.mount(<FormError message="" />)
    cy.get('[data-cy="form-error"]').should("not.exist")
  })
})
