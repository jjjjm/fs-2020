describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'User Name',
            username: 'username',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('Blog app')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('username')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
            cy.contains('blogs')
            cy.contains('logged in as ')
        })
        it('fails with wrong credentials', function () {
            cy.get('#username').type('wrong')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.error').contains('Wrong credentials')
        })
    })

    describe.only('When logged in', function () {
        beforeEach(function () {
            cy.login({username: 'username', password: 'password'})
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('nimi')
            cy.get('#author').type('kirjoittaja')
            cy.get('#url').type('osoite')
            cy.contains('create new blog').click()
            cy.contains('nimi')
            cy.contains('kirjoittaja')
        })
        describe.only(' and a blog is created' , function() {
            beforeEach(function () {
                cy.contains('new blog').click()
                cy.get('#title').type('nimi')
                cy.get('#author').type('kirjoittaja')
                cy.get('#url').type('osoite')
                cy.contains('create new blog').click()
                cy.contains('show').click()
            })
            it('A blog can be liked', function () {
                cy.contains('likes: 0')
                cy.contains('like').click()
                cy.contains('likes: 1')
            })
            it('A blog can be deleted', function () {
                cy.contains('delete').click()
                cy.get('.success').contains('deleted nimi')
            })
        })
    })
})