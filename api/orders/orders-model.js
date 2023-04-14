const db = require('../../data/dbconfig');

function formatOrder (orders) {
    let malzeme
    const final = orders.reduce((ecc, order)=> {
       //malzeme doğru formatta lazım
       if(order.malzeme_id) {
            malzeme = {id: order.malzeme_id, malzeme_name: order.malzeme_name}
       }
       preOrder = ecc.find(item=>item.id==order.id)
       if(preOrder) {//case 1 eski order ise malzemeyi  malzemeler içine ekleyeceğim.
            preOrder.malzemeler.push(malzeme)
       } else {//case 2 yeni order ise malzemeyi  malzemeler içine ekleyeceğim + yeni order ekleyeceğim.
            delete order.malzeme_id;
            delete order.malzeme_name;
            order.malzemeler = malzeme ? [malzeme] : [];
            ecc.push(order);
       }
        return ecc;
    },[])
    return final;
}

async function getAll() {
    const orders =  await db('orders as o')
            .leftJoin('orders_malzemeler as om', 'o.id', 'om.order_id')
            .leftJoin('malzemeler as m', 'om.malzeme_id', 'm.id' )
            .select('o.*', 'm.id as malzeme_id', 'm.malzeme_name'); 
    return formatOrder(orders);
}

async function getById(id) {
    const orders =  await db('orders as o')
            .leftJoin('orders_malzemeler as om', 'o.id', 'om.order_id')
            .leftJoin('malzemeler as m', 'om.malzeme_id', 'm.id' )
            .select('o.*', 'm.id as malzeme_id', 'm.malzeme_name')
            .where('o.id', id)
    return formatOrder(orders)[0];
}

async function create(payload) {
    let id;
    await db.transaction(async trx => {

        //order ekle ve id'sini al.
        const orderPayload = {...payload};
        delete orderPayload.malzemeler;
        [id] = await trx('orders').insert(orderPayload); //updated row count

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
        const orderPayload = {...payload};
        delete orderPayload.malzemeler;
        count = await trx('orders').where('id', id).update(orderPayload); //updated row count
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