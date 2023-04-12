const db = require('../../data/dbconfig');

function getAll() {
    return db('orders as o')
            .leftJoin('order_malzemeler as om', 'o.id', 'om.order_id')
            .leftJoin('malzemeler as m', 'om.malzeme_id', 'm.id' )
            .where('o.id', id); //object//collection, array
}

function getById(id) {
    return db('orders as o')
            .leftJoin('order_malzemeler as om', 'o.id', 'om.order_id')
            .leftJoin('malzemeler as m', 'om.malzeme_id', 'm.id' )
            .where('o.id', id)
            .first(); //object
}

async function create(payload) {
    let id;
    await db.transaction(async trx => {

        //order ekle ve id'sini al.
        [id] = await trx('orders').insert(payload); //updated row count

        //order. malzemelerini ekle
        if(payload.malzemeler && payload.malzemeler.length > 0 ) {  //malzemeler= [1,3,4]
            const orderMalzemeleri = payload.malzemeler.map(malzemeId=> {
                const yeniMalzeme = {
                    order_id: id,
                    malzeme_id: malzemeId
                }
                return yeniMalzeme;
            })
            await trx('orders_malzemeler').insert(orderMalzemeleri);
        }
        
    })

    return getById(id);
}

async function update(payload, id) {
    let count;

    await db.transaction(async trx => {
        //order_malzemelerini sil
        await trx('orders_malzemeler').where('order_id', id).delete();

        //order. malzemelerini ekle
        if(payload.malzemeler && payload.malzemeler.length > 0 ) {  //malzemeler= [1,3,4]
            const orderMalzemeleri = payload.malzemeler.map(malzemeId=> {
                const yeniMalzeme = {
                    order_id: id,
                    malzeme_id: malzemeId
                }
                return yeniMalzeme;
            })
            await trx('orders_malzemeler').insert(orderMalzemeleri);
        }

        //order'ı update et.
        count = await trx('orders').where('id', id).update(payload); //updated row count
    })

    return count;

}
function remove(id) {
    return db('orders').where('id', id).delete(); //deleted row count  //DB cascade ederek orders_malzemeler tablosundan da silecek
}

module.exports = {
    getAll,
    create,
    getById,
    remove,
    update
}