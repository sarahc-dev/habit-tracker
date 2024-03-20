describe("User tracks habits", () => {
  before(() => {
    cy.exec("npm run db:reset:test")
    cy.signup("test@test.com", "Abc123")
  })

  beforeEach(() => {
    cy.signin("test@test.com", "Abc123")
  })

  it("initially shows empty dashboard and user can add a new habit", () => {
    cy.contains("You have not added any habits yet.")
    cy.get("button").contains("Add Habit").click()
    cy.get("input[name=title]").type("Go for a run")
    cy.get('[data-testid="submitAddHabit"]').click()

    cy.get("ul").children().should("have.length", 1)
    cy.get("ul").first().contains("Go for a run")
  })
})
