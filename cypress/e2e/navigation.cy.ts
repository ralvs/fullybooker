describe('Navigation', () => {
  it('should navigate to the place page', () => {
    cy.visit('http://localhost:3000/')

    cy.get('nav img').should('be.visible').should('have.length', 1).as('Has avatar image')
    cy.get('a[href*="place/3"]').click()

    cy.url().should('include', '/place/3')
    cy.get('main img').should('be.visible').should('have.length', 5).as('Has place images')
    cy.get('h4').contains('A Retreat @ Hudson Woods').as('Has tittle')

    cy.get('[data-cy=back-button]').click()
    cy.get('a').should('be.visible').should('have.length', 3).as('Navigate back to home')
  })
})
