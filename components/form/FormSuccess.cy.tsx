import FormSuccess from "./FormSuccess"

describe("<FormSuccess />", () => {
  it("displays the given message", () => {
    cy.mount(<FormSuccess message="Success." />)
    cy.contains("Success. Go to login page")
  })

  it("returns null if message is empty string", () => {
    cy.mount(<FormSuccess message="" />)
    cy.get('[data-testid="form-success"]').should("not.exist")
  })
})
