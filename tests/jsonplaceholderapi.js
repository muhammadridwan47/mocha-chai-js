const chai = require('chai') // reference: https://www.chaijs.com/
const chaiHttp = require('chai-http') //reference: https://www.chaijs.com/plugins/chai-http/

const expect = chai.expect

chai.use(chaiHttp)

describe('GET API jsonplaceholder', () => {
	describe('GET /', () => {
        let server

        beforeEach(() => {
            server = 'https://jsonplaceholder.typicode.com'
        }) 

        it('should running Well when Get all Data', (done) => {
            chai.request(server)
                .get("/posts")
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('array')
                    expect(res.body[0]).to.have.property('title')
                    expect(res.body[0].title).to.be.string
                    done()
                })
        })
        it('should running Well when Get detail user id 1', (done) => {
            chai.request(server)
                .get("/posts/1")
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('title')
                    expect(res.body.title).to.be.string
                    expect(res.body.userId).to.be.equal(1)
                    done()
                })
        })
        it('should running Well when create a data', (done) => {
            chai.request(server)
                .post("/posts")
                .send({
                    userId : 1,
                    id: 1,
                    title : "Programming",
                    body: "Description of Programming"
                    })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('title')
                    expect(res.body.title).to.be.string
                    expect(res.body.userId).to.be.equal(1)
                    done()
                })
        })
        it('should running Well when update a data', (done) => {
            chai.request(server)
                .put("/posts/1")
                .send({
                    userId : 2,
                    id: 1,
                    title : "Programming",
                    body: "Description of Programming"
                    })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('title')
                    expect(res.body.title).to.be.string
                    expect(res.body.userId).to.be.equal(2)
                    done()
                })
        })
        it('should running Well when Delete a data', (done) => {
            chai.request(server)
                .delete("/posts/1")
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    done()
                })
        })
	})
})