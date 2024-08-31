describe("Cadastro", () => {

  it('TC01 - Cadastro Positivo', () => {
    cy.visit('https://www.lacoste.com/pt/authentication?lc=n%2F6sAId9PdazYKgp3wl6gNGqsCW23rgkJ5G3IdCm29U%3D&context=login&step=signup')

    // Preencher os campos de cadastro corretamente
    cy.get('input#signin_signup-email').type('podmixcortes@gmail.com') // Campo Email
    cy.get('input#signin_signup-password').type('09870877986') // Campo Senha
    cy.get('input#signin_signup-passwordConfirmation').type('09870877986') // Confirmação de Senha
    cy.get('input#signin_signup-civility-SR').click() // Gênero
    cy.get('input#signin_signup-firstName').type('Adriel Lucas') // Nome
    cy.get('input#signin_signup-lastName').type('Nogueira da Silva') // Sobrenome
    cy.get('input#signin_signup-optinTermsAndConditions-true').click() // Aceitar Termos e Condições

    // Submeter o formulário
    cy.get('#signin_signup-register').click()

    // Verificar se o cadastro foi bem-sucedido
    cy.url().should('include', '/account') // Verifica se foi redirecionado para a página de conta
    cy.contains('Bem-vindo, Adriel').should('be.visible') // Verifica a mensagem de boas-vindas
  })

  it('TC02 - Verificar o título da página - negativo', () => {
    cy.visit('https://www.lacoste.com/pt/authentication?lc=n%2F6sAId9PdazYKgp3wl6gNGqsCW23rgkJ5G3IdCm29U%3D&context=login&step=signup')

    // Verificar o título da página
    cy.title().should('not.eq', 'Página Inexistente') // Título não deve ser "Página Inexistente"
  })

  it('TC03 - Cadastro com e-mail inválido', () => {
    cy.visit('https://www.lacoste.com/pt/authentication?lc=n%2F6sAId9PdazYKgp3wl6gNGqsCW23rgkJ5G3IdCm29U%3D&context=login&step=signup')

    // Preencher os campos com e-mail inválido
    cy.get('input#signin_signup-email').type('email_invalido') // Campo Email inválido
    cy.get('input#signin_signup-password').type('09870877986') // Campo Senha
    cy.get('input#signin_signup-passwordConfirmation').type('09870877986') // Confirmação de Senha
    cy.get('input#signin_signup-civility-SR').click() // Gênero
    cy.get('input#signin_signup-firstName').type('Adriel Lucas') // Nome
    cy.get('input#signin_signup-lastName').type('Nogueira da Silva') // Sobrenome
    cy.get('input#signin_signup-optinTermsAndConditions-true').click() // Aceitar Termos e Condições

    // Submeter o formulário
    cy.get('#signin_signup-register').click()

    // Verificar a mensagem de erro de e-mail inválido
    cy.contains('Por favor, insira um e-mail válido').should('be.visible') // Verifica a mensagem de erro de e-mail inválido
  })

  it('TC04 - Cadastro com senhas não correspondentes', () => {
    cy.visit('https://www.lacoste.com/pt/authentication?lc=n%2F6sAId9PdazYKgp3wl6gNGqsCW23rgkJ5G3IdCm29U%3D&context=login&step=signup')

    // Preencher os campos de cadastro com senhas diferentes
    cy.get('input#signin_signup-email').type('podmixcortes@gmail.com') // Campo Email
    cy.get('input#signin_signup-password').type('Senha123!') // Campo Senha
    cy.get('input#signin_signup-passwordConfirmation').type('SenhaDiferente456!') // Confirmação de Senha diferente
    cy.get('input#signin_signup-civility-SR').click() // Gênero
    cy.get('input#signin_signup-firstName').type('Adriel Lucas') // Nome
    cy.get('input#signin_signup-lastName').type('Nogueira da Silva') // Sobrenome
    cy.get('input#signin_signup-optinTermsAndConditions-true').click() // Aceitar Termos e Condições

    // Submeter o formulário
    cy.get('#signin_signup-register').click()

    // Verificar a mensagem de erro de senhas não correspondentes
    cy.contains('As senhas não correspondem').should('be.visible') // Verifica a mensagem de erro
  })

  it('TC05 - Cadastro com campo obrigatório ausente', () => {
    cy.visit('https://www.lacoste.com/pt/authentication?lc=n%2F6sAId9PdazYKgp3wl6gNGqsCW23rgkJ5G3IdCm29U%3D&context=login&step=signup')

    // Preencher os campos, mas sem o nome
    cy.get('input#signin_signup-email').type('podmixcortes@gmail.com') // Campo Email
    cy.get('input#signin_signup-password').type('09870877986') // Campo Senha
    cy.get('input#signin_signup-passwordConfirmation').type('09870877986') // Confirmação de Senha
    cy.get('input#signin_signup-civility-SR').click() // Gênero
    cy.get('input#signin_signup-lastName').type('Nogueira da Silva') // Sobrenome
    cy.get('input#signin_signup-optinTermsAndConditions-true').click() // Aceitar Termos e Condições

    // Submeter o formulário
    cy.get('#signin_signup-register').click()

    // Verificar a mensagem de erro devido ao campo obrigatório ausente
    cy.contains('Este campo é obrigatório').should('be.visible') // Verifica a mensagem de erro de campo ausente
  })

  it('TC06 - Cadastro com senha fraca', () => {
    cy.visit('https://www.lacoste.com/pt/authentication?lc=n%2F6sAId9PdazYKgp3wl6gNGqsCW23rgkJ5G3IdCm29U%3D&context=login&step=signup')

    // Preencher os campos com senha fraca
    cy.get('input#signin_signup-email').type('podmixcortes@gmail.com') // Campo Email
    cy.get('input#signin_signup-password').type('1234') // Campo Senha fraca
    cy.get('input#signin_signup-passwordConfirmation').type('1234') // Confirmação de Senha fraca
    cy.get('input#signin_signup-civility-SR').click() // Gênero
    cy.get('input#signin_signup-firstName').type('Adriel Lucas') // Nome
    cy.get('input#signin_signup-lastName').type('Nogueira da Silva') // Sobrenome
    cy.get('input#signin_signup-optinTermsAndConditions-true').click() // Aceitar Termos e Condições

    // Submeter o formulário
    cy.get('#signin_signup-register').click()

    // Verificar a mensagem de erro de senha fraca
    cy.contains('Sua senha é muito fraca').should('be.visible') // Verifica a mensagem de erro de senha fraca
  })

})
