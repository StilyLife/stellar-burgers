describe('Constructor', () => {
  const MODAL_SELECTOR = '[id=modals]';
  const BUN_INGREDIENTS_SELECTOR = '[data-cy=bun-ingredients]';
  const ORDER_BTN_SELECTOR = '[data-cy=order-btn]';
  const ORDER_NUMBER_SELECTOR = '[data-cy=orderNumber]';
  const SAUCES_INGREDIENTS_SELECTOR = '[data-cy=sauces-ingredients]';
  const MAINS_INGREDIENTS_SELECTOR = '[data-cy=mains-ingredients]';
  const CONSTRUCTOR_ELEMENT_SELECTOR = '.constructor-element';
  const CONSTRUCTOR_ELEMENT_TOP_SELECTOR = '.constructor-element_pos_top';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'newOrder'
    );
    cy.intercept('GET', '/api/orders', { fixture: 'order.json' }).as(
      'getOrder'
    );
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.setCookie('accessToken', 'mockAccessToken');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken');
    });
    cy.visit('/');
    cy.viewport(1920, 1080);
  });

  describe('Modal', () => {
    it('open and close', () => {
      cy.get(`${BUN_INGREDIENTS_SELECTOR} li`).first().click();
      cy.get(MODAL_SELECTOR)
        .contains('Краторная булка N-200i')
        .should('be.visible');
      cy.get(MODAL_SELECTOR).find('button').click().should('not.exist');
    });

    it('Close on click outside', () => {
      cy.get(`${BUN_INGREDIENTS_SELECTOR} li`).first().click();
      cy.wait(3000);
      cy.get(MODAL_SELECTOR)
        .find('div')
        .click({ multiple: true, force: true })
        .should('not.exist');
    });
  });

  it('Order', () => {
    cy.wait('@getUser');
    cy.wait('@getUser');
    cy.wait('@getIngredients');
    cy.visit('/');
    cy.get(BUN_INGREDIENTS_SELECTOR).contains('Добавить').click();
    cy.get(ORDER_BTN_SELECTOR)
      .contains('Оформить заказ')
      .click({ force: true });
    cy.wait(3000);
    cy.get(ORDER_BTN_SELECTOR)
      .contains('Оформить заказ')
      .click({ force: true });
    cy.get(ORDER_NUMBER_SELECTOR).should('contain', '12345');
    cy.get(MODAL_SELECTOR)
      .find('div')
      .click({ multiple: true, force: true })
      .should('not.exist');
    cy.contains('Выберите начинку').should('exist');
    cy.contains('Выберите булки').should('exist');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe('Igredients', () => {
    it('Buns', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get(BUN_INGREDIENTS_SELECTOR).contains('Добавить').click();
      cy.get(CONSTRUCTOR_ELEMENT_TOP_SELECTOR)
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('Sauces', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(SAUCES_INGREDIENTS_SELECTOR).contains('Добавить').click();
      cy.get(CONSTRUCTOR_ELEMENT_SELECTOR)
        .contains('Соус Spicy-X')
        .should('exist');
    });

    it('Fillings', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(MAINS_INGREDIENTS_SELECTOR).contains('Добавить').click();
      cy.get(CONSTRUCTOR_ELEMENT_SELECTOR)
        .contains('Биокотлета из марсианской Магнолии')
        .should('exist');
    });
  });
});
