const db = require('../../data/dbconfig');

function getAll() {
    return db('pizzas as p')
            .leftJoin('rating as r', 'p.id', 'r.pizza_id')
            .select('p.*')
            .count('r.user_id as rate_count')
            .avg('r.rate as avg_rate')
            .groupBy('p.id');  //collection, array
}

async function getById(id) {

    const pizza = await  db('pizzas as p')
            .leftJoin('rating as r', 'p.id', 'r.pizza_id')
            .select('p.*')
            .count('r.user_id as rate_count')
            .avg('r.rate as avg_rate')
            .where('p.id', id)
            .groupBy('p.id'); //object
    return pizza[0];
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