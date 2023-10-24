

describe('Spartan API Tests', {baseURL: 'http://54.226.221.37:8000/'}, ()=>{

    it('Get a single Spartan', ()=>{

        cy.request('GET', 'api/spartans/100').then((response)=>{
            
            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal('Terence')

        })
    })


    it('Post a single spartan test',()=>{

        cy.request({

            method: 'POST',
            url: '/api/spartans',
            body: {
                "gender": 'Male',
                "name":'Sahsa',
                "phone":1234123422
            }
        }).then((response)=>{
            expect(response.status).to.equal(201);
            expect(response.body.success).to.equal('A Spartan is born!');
            expect(response.body.data.name).to.equal('Sahha');

        })

    })
    })
