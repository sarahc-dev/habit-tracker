/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    signup(email: string, password: string): Chainable<void>
    signin(email: string, password: string): Chainable<void>
  }
}

Cypress.Commands.add("signup", (email, password) => {
  cy.visit("/signup")
  cy.get("input[name=email]").type(email)
  cy.get("input[name=password]").type(password)
  cy.get("input[name=confirmPassword]").type(`${password}{enter}`)
  cy.contains("Successfully signed up")
})

Cypress.Commands.add("signin", (email, password) => {
  cy.visit("/login")
  cy.get("input[name=email]").type(email)
  cy.get("input[name=password]").type(`${password}{enter}`)
  cy.url().should("include", "/dashboard")
  cy.getCookie("authjs.session-token").should("exist")
})
