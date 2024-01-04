describe('Home', () => {
  it('should click on VPGO', () => {
    cy.visit('/');
    cy.contains('VPGO').click();
    cy.get('h1').should('contain', 'VPGO');
  });
});