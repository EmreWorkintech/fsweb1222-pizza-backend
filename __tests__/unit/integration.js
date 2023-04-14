const db = require('../../data/dbconfig');
const server = require('../../api/server');
const request = require('supertest');

beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})


describe('INTEGRATION TEST', ()=> {
    let token;
        beforeEach(async ()=> {
            const res = await request(server).post('/api/auth/login').send({email:"timur@pizza.com", password: "1234"});
            token = res.body.token;
        })
    describe('LOGIN', ()=> {
        test('[0] login token dönüyor', async ()=> {
            const res = await request(server).get('/api/order').set({Authorization: token});
            expect(res.body).toHaveLength(1);
        })
        test('[0] login token dönüyor', async ()=> {
            const res = await request(server).get('/api/order').set({Authorization: token});
            expect(res.body).toHaveLength(1);
        })
        test('[0] login token dönüyor', async ()=> {
            const res = await request(server).get('/api/order').set({Authorization: token});
            expect(res.body).toHaveLength(3);
        })
        test('[0] login token dönüyor', async ()=> {
            const res = await request(server).get('/api/order').set({Authorization: token});
            expect(res.body).toHaveLength(3);
        })
        test('[0] login token dönüyor', async ()=> {
            const res = await request(server).get('/api/order').set({Authorization: token});
            expect(res.body).toHaveLength(3);
        })
    })
})



