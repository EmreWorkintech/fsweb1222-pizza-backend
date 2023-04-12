const db = require('../../data/dbconfig');

function getAll() {
    return db('malzemeler');  //collection, array
}

function getById(id) {
    return db('malzemeler').where('id', id).first(); //object
}

async function create(payload) {
    const [id] = await db('malzemeler').insert(payload);  //new malzeme ids
    return getById(id);
}

function update(payload, id) {
    return db('malzemeler').where('id', id).update(payload); //updated row count
}

function remove(id) {
    return db('malzemeler').where('id', id).delete(); //deleted row count
}

module.exports = {
    getAll,
    create,
    getById,
    remove,
    update
}