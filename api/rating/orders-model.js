const db = require('../../data/dbconfig');

async function create(payload) {
    const [id] = await db('rating').insert(payload);
    return id;
}

function update(payload, id) {
  return db('rating').where('id',id).update(payload);
}

function remove(id) {
    return db('rating').where('id', id).delete();
}

module.exports = {
    create,
    remove,
    update
}