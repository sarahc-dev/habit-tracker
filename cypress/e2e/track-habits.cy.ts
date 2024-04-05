describe("User tracks habits", () => {
  beforeEach(() => {
    cy.exec("npm run db:reset:test")
    cy.signup("test@test.com", "Abc123")
    cy.signin("test@test.com", "Abc123")
  })

  it("adds and tracks habits across various days", () => {
    // Initially shows empty dashboard
    cy.contains("Today")
    cy.contains("You have not added any habits yet.")

    // Add habits
    cy.get("button").contains("Add Habit").click()
    cy.get("input[name=title]").type("Go for a run")
    cy.get('[data-testid="submitAddHabit"]').click()
    cy.get("button").contains("Add Habit").click()
    cy.get("input[name=title]").type("Feed the cat")
    cy.get('[data-testid="submitAddHabit"]').click()
    cy.get("ul").children().should("have.length", 2)
    cy.get("ul").first().contains("Go for a run")
    cy.get("ul").last().contains("Feed the cat")

    // Shows error if trying to add an empty field
    cy.get("button").contains("Add Habit").click()
    cy.get('[data-testid="submitAddHabit"]').click()
    cy.contains("Enter a new habit")
    cy.get('[role="dialog"] > button:has(> svg)').click()

    // Checkin habits
    cy.get("ul").children().first().should("not.have.class", "bg-gradient-to-l")
    cy.get('[data-testid="buttonCheckin"]').first().click()
    cy.get("ul").children().first().should("have.class", "bg-gradient-to-l")
    cy.get('[data-testid="progressCompleted"]').contains("50%")
    cy.get("ul").children().last().should("not.have.class", "bg-gradient-to-l")
    cy.get('[data-testid="buttonCheckin"]').last().click()
    cy.get("ul").children().last().should("have.class", "bg-gradient-to-l")
    cy.get('[data-testid="progressCompleted"]').contains("100%")

    // Check in a habit yesterday
    cy.get('[data-testid="previousDay"]').click()
    cy.contains("Yesterday")
    cy.get('[data-testid="progressCompleted"]').contains("0%")
    cy.get('[data-testid="buttonCheckin"]').first().click()
    cy.get('[data-testid="progressCompleted"]').contains("50%")

    // Uncheck habit
    cy.get('[data-testid="nextDay"]').click()
    cy.contains("Today")
    cy.get('[data-testid="progressCompleted"]').contains("100%")
    cy.get('[data-testid="habitMenu"]').first().click()
    cy.get('[data-testid="uncheckHabit"]').click()
    cy.get('[data-testid="progressCompleted"]').contains("50%")
  })

  it("edits and permanently deletes habits", () => {
    cy.get("button").contains("Add Habit").click()
    cy.get("input[name=title]").type("Feed the cat")
    cy.get('[data-testid="submitAddHabit"]').click()
    cy.wait(1000) // wait for server response rather than optimistic response
    // Edit habit
    cy.get('[data-testid="habitMenu"]').click()
    cy.get('[data-testid="editHabit"]').click()
    cy.wait(1000) // wait for modal to open
    cy.get("input[name=title]").type("Feed the dog")
    cy.get('[data-testid="submitEditHabit"]').click()
    cy.contains("Feed the dog")

    // Confirm habit updated
    cy.get('[data-testid="nextDay"]').click()
    cy.contains("Feed the dog")
    cy.contains("Feed the cat").should("not.exist")

    // Delete habit
    cy.get('[data-testid="habitMenu"]').click()
    cy.get('[data-testid="deleteHabit"]').click()
    cy.wait(1000)
    cy.get('[data-testid="confirmDeleteHabit"]').click()
    cy.contains("Feed the dog").should("not.exist")
    cy.get('[data-testid="nextDay"]').click()
    cy.contains("Feed the dog").should("not.exist")
  })
})
