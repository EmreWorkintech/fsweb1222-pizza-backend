const db = require('../../data/dbconfig');

function getAll() {
    return db('pizzas as p')
            .leftJoin('rating as r', 'p.id', 'r.pizza_id');  //collection, array
}

function getById(id) {
    return db('pizzas as p')
            .leftJoin('rating as r', 'p.id', 'r.pizza_id')
            .where('p.id', id)
            .first(); //object
}

async function create(payload) {
    const [id] = await db('pizzas').insert(payload);  //new pizza ids
    return getById(id);
}

function update(payload, id) {
    return db('pizzas').where('id', id).update(payload); //updated row count
}

function remove(id) {
    return db('pizzas').where('id', id).delete(); //deleted row count
}

module.exports = {
    getAll,
    create,
    getById,
    remove,
    update
}