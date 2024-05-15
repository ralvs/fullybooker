import dayjs from 'dayjs'

describe('CRUD a booking', () => {
  it('should create/update a booking', () => {
    cy.visit('http://localhost:3000/place/1')

    cy.get('[data-cy=book-price]').contains('$350').as('Has price')

    cy.get('[data-cy=checkIn]').type(dayjs().add(2, 'month').format('MM-DD-YYYY'))
    cy.get('[data-cy=checkOut]').type(dayjs().add(2, 'month').add(2, 'day').format('MM-DD-YYYY'))
    cy.get('[data-cy=guests]').click()
    cy.get('li[data-value="2"]').click()

    cy.get('[data-cy=submit-button]').click().as('Submit booking')
    cy.get('[data-cy=submit-button]').should('be.disabled').as('Submit button loading')

    cy.wait(4000)

    cy.get('[data-cy=submit-button]')
      .should('be.enabled')
      .invoke('text')
      .then(text => {
        expect(text).to.contain('Update your booking')
      })
      .as('Becomes update button')

    cy.get('[data-cy=cancel-button]').should('be.visible').as('Has cancel button')
  })

  it('should delete a booking', () => {
    cy.visit('http://localhost:3000/place/1')

    cy.get('[data-cy=cancel-button]').should('be.visible').as('Has cancel button')
    cy.get('[data-cy=cancel-button]').click()

    cy.get('[data-cy=cancel-button]').should('be.disabled').as('Cancel button loading')

    cy.wait(3000)

    cy.get('[data-cy=cancel-button]').should('not.exist').as('No more cancel button')
  })
})
