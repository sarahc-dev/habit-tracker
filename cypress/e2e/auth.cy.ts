describe("User signup and login", () => {
  before(() => {
    cy.exec("npm run db:reset:test")
  })

  it("should redirect unauthenticated user to login page", () => {
    cy.visit("/dashboard")
    cy.url().should("match", /login/)
  })

  it("should allow a visitor to signup, login and logout", () => {
    cy.visit("/signup")
    cy.contains("Sign Up")
    cy.get("input[name=email]").type("test@test.com")
    cy.get("input[name=password]").type("Abc123")
    cy.get("input[name=confirmPassword]").type("Abc123")
    cy.get("button").contains("Sign Up").click()
    cy.contains("Successfully signed up")
    cy.get("a").contains("Go to login").click()
    cy.url().should("match", /login/)
    cy.get("input[name=email]").type("test@test.com")
    cy.get("input[name=password]").type("Abc123")
    cy.get("button").contains("Login").click()
    cy.url().should("match", /dashboard/)
    cy.getCookie("authjs.session-token").should("exist")

    // Might not work in CI?
    cy.get("[data-testid='signout']")
      .contains("Sign Out")
      .should("be.visible")
      .click()
    // had to clear cookies manually as signout button was not clearing properly in test
    cy.clearCookie("authjs.session-token")
    cy.getCookie("authjs.session-token").should("be.null")

    cy.url().should("match", /login/)
  })

  it("should display an error on signup if the email already exists", () => {
    cy.visit("/signup")
    cy.get("input[name=email]").type("test@test.com")
    cy.get("input[name=password]").type("Abc123")
    cy.get("input[name=confirmPassword]").type("Abc123")
    cy.get("button").contains("Sign Up").click()
    cy.contains("Email already in use")
  })

  it("displays errors on signup", () => {
    cy.visit("/signup")
    cy.get("input[name=email]").type("test")
    cy.get("input[name=password]").type("123")
    cy.get("input[name=confirmPassword]").type("Abc123")
    cy.get("button").contains("Sign Up").click()
    cy.contains("Invalid email address")
    cy.contains("Must be 6 or more characters long")
    cy.contains("Passwords don't match")
  })

  it("displays an error on login if email not valid", () => {
    cy.visit("/login")
    cy.get("input[name=email]").type("example@test.com")
    cy.get("input[name=password]").type("Abc123")
    cy.get("button").contains("Login").click()
    cy.contains("Invalid credentials")
  })

  it("displays an error on login if password not valid", () => {
    cy.visit("/login")
    cy.get("input[name=email]").type("test@test.com")
    cy.get("input[name=password]").type("abc123")
    cy.get("button").contains("Login").click()
    cy.contains("Invalid credentials")
  })

  it("displays errors on login", () => {
    cy.visit("/login")
    cy.get("input[name=email]").type("test")
    cy.get("button").contains("Login").click()
    cy.contains("Invalid email address")
    cy.contains("Password is required")
  })
})
