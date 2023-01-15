
/// <reference types= "cypress" />



describe('tarefas', () => {

    context('cadastro', () => {

        let testData;

        beforeEach(()=> {
            cy.fixture('task').then(t => {
                testData = t


            })

        })

        it('Deve cadastrar uma tarefa', () => {

            const taskName = 'Ler um Livro de Node JS'

            cy.log('LIMPAR BANCO PARA CONCLUSÃO DO TESTE')

            cy.removeTaskByName(taskName)

            cy.createTask(taskName)


            //cy.get('main div p')
            // .should('be.visible')
            //.should('have.text','Ler um Livo de Node JS')

            cy.contains('main div p', 'Ler um Livro de Node JS')
                .should('be.visible')





        })

        it('não deve permitir tarefa duplicada', () => {

            const task = testData.dup

            cy.removeTaskByName(task.name)

            //dado que eu já tenha uma terefa cadastrada:
            cy.postTask(task)

            //Quando

            cy.createTask(task.name)

            //Então 

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')





        })

        it('campo obrigatorio', () => {
            cy.createTask()
            cy.isRequired('This is a required field')

        })

    })

    context('atualização', () => {

        it('deve concluir uma tarefa', () => {

            cy.log('VALIDAÇÃO COM CSS STYLE')
            const task = {
                name: 'Pagar contas de consulmo',
                is_done: false

            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name) //'p' elemento com o texto 
                .parent() //parent procura o elemento pai ../
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')

        })

    })

    context('exclusão', () => {

        it('deve remover uma tarefa', () => {

            cy.log('REUSO CODIGO PARA EXCLUSÃO')
            const task = {
                name: 'Jogar lixo fora',
                is_done: false

            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name) //'p' elemento com o texto 
                .parent() //parent procura o elemento pai ../
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')

        })

    })

})