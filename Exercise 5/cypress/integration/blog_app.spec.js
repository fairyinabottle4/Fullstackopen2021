describe('Blog app', function() {
    beforeEach(function() {
      //the purpose here is to empty the database before each run  
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      //and then here the purpose is to add a user to the database.
      //otherwise, it is not possible to log in!!!
      const user = {
        name: 'Jurgen Klopp',
        username: 'bestManager',
        password: 'liverpoolfc'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      //and finally you visit the website before every test, so there is no need
      //to specify the URL over and over again. 
      cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('bestManager')
            cy.get('#password').type('liverpoolfc')
            cy.get('#login-button').click()
            cy.contains('Jurgen Klopp logged in')
        })
        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('bestManager')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.error').should('contain', 'wrong credentials')
            cy.get('html').should('not.contain', 'Jurgen Klopp logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({username: 'bestManager', password: 'liverpoolfc'})
        })
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#Title').type('How to comeback from failure')
            cy.get('#Author').type('Jurgen Klopp')
            cy.get('#Url').type('https://www.channelnewsasia.com/')
            cy.contains('create').click()
            cy.contains('How to comeback from failure')
        })

        describe('and one blog exists', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'How to comeback from failure',
                    author: 'Jurgen Klopp',
                    url: 'https://www.channelnewsasia.com/'
                })
            })
            it('A blog can be liked', function() {
                cy.contains('view').click()
                cy.get('.blog-details').should('contain', '0')
                cy.contains('like').click()
                cy.get('.blog-details').should('contain', '1')
            })

            it('A blog can be deleted if it is created by the same user', function() {
                cy.contains('view').click()
                cy.contains('remove').click()
                cy.should('not.contain', 'How to come back from failure')
            })
        })

        describe('and multiple blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'How to comeback from failure 3',
                    author: 'Jurgen Klopp',
                    url: 'https://www.channelnewsasia.com/'
                })
                cy.createBlog({
                    title: 'How to comeback from failure 2',
                    author: 'Jose Mourinho',
                    url: 'https://www.nytimes.com/'
                })
                cy.createBlog({
                    title: 'How to comeback from failure 1',
                    author: 'Pep Guardiola',
                    url: 'https://www.theguardian.com/international'
                })
            })

            it('the blogs are sorted by the number of likes', function() {
                cy.get('.blog>p.blog-title-author').then(blogs => {
                    expect(blogs[0].textContent).to.equal('How to come back from failure 3')
                    expect(blogs[1].textContent).to.equal('How to come back from failure 2')
                    expect(blogs[2].textContent).to.equal('How to come back from failure 1')
                })
            })
        })
    })
})
  
