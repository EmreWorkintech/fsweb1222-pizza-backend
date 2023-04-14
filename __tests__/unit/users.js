const User = require('../../api/users/users-model');
const db = require('../../data/dbconfig');

beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})


describe('UNIT TEST', ()=> {
    describe('USERS', ()=> {
        test.skip('ilk testi yaz', ()=> {

        })
        test.todo('ilk testi yaz')
        test('[0] get all users doğru sayıda kullanıcı dönüyor', async ()=> {
            const users = await User.getAll();
            expect(users).toHaveLength(2);
        })
    })
})



