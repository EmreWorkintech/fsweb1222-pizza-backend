/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  
  
  await knex('malzemeler').truncate();
  await knex('orders').truncate();
  await knex('pizzas').truncate();
  await knex('users').truncate();
  await knex('roles').truncate();

  await knex('roles').insert([
    {id: 1, role_name: 'admin'},
    {id: 2, role_name: 'user'}
  ]);
  await knex('malzemeler').insert([
    {id: 1, malzeme_name: 'Pepperoni'},
    {id: 2, malzeme_name: 'Sosis'},
    {id: 3, malzeme_name: 'Kanada Jambonu'},
    {id: 4, malzeme_name: 'Tavuk Izgara'},
    {id: 5, malzeme_name: 'Soğan'},
    {id: 6, malzeme_name: 'Domates'},
    {id: 7, malzeme_name: 'Mısır'},
    {id: 8, malzeme_name: 'Sucuk'},
    {id: 9, malzeme_name: 'Jalepeno'},
    {id: 10, malzeme_name: 'Sarımsak'},
    {id: 11, malzeme_name: 'Biber'},
    {id: 12, malzeme_name: 'Ananas'},
    {id: 13, malzeme_name: 'Kabak'}
  ]);
  await knex('users').insert([
    {id: 1, name: 'Timur', surname: 'Egemen', email: 'timur@pizza.com', password: '123456', role_id: 1},
    {id: 2, name: 'Emre', surname: 'Şahiner', email: 'emre@pizza.com', password: '123456', role_id: 2}
  ]);
  await knex('pizzas').insert([
    {id: 1, 
      name: 'Position Absolute Acı Pizza', 
      desc: 'Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.', 
      price: 85.50},
    {id: 2, 
      name: 'Fixed Pizza', 
      desc: 'Lorem ipsum hop', 
      price: 15.50}
  ]);
  await knex('orders').insert([
    {
      pizza_id: 1, 
      hamur: 'Kalın',
      price: 85.50,
      adet: 1,
      status:'Hazırlanıyor',
      boyut: 'Büyük',
      created_at:'2023-04-12 10:15:00',
      updated_at:'2023-04-12 10:15:00',
      }
  ]);
};
