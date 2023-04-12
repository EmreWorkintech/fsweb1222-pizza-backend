const db = require('../../data/dbconfig');

function getAll() {
    return db('users as u')
            .join('roles as r', 'u.role_id', 'r.id')
            .select('u.id', 'u.name', 'u.surname', 'u.email', 'r.role_name');  //collection, array
}

function getById(id) {
    return db('users as u')
            .join('roles as r', 'u.role_id', 'r.id')
            .select('u.id', 'u.name', 'u.surname', 'u.email', 'r.role_name')
            .where('u.id', id)
            .first(); //object
}

function getByFilter(filter) {
    return db('users as u')
            .join('roles as r', 'u.role_id', 'r.id')
            .where(filter)
            .first(); //object
}

async function create(payload) {
    const [id] = await db('users').insert(payload);  //new malzeme ids
    return getById(id);
}

function update(payload, id) {
    return db('users').where('id', id).update(payload); //updated row count
}

function remove(id) {
    return db('users').where('id', id).delete(); //deleted row count
}

module.exports = {
    getAll,
    create,
    getById,
    remove,
    getByFilter,
    update
}