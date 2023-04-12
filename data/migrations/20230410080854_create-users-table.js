/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('roles', tbl=>{
                        tbl.increments();
                        tbl.string('role_name', 32)
                            .notNullable();
                    })
                    .createTable('users', tbl=>{
                        tbl.increments();
                        tbl.string('name', 64)
                            .notNullable();
                        tbl.string('surname', 64)
                            .notNullable();  
                        tbl.string('email', 128)
                            .notNullable();
                        tbl.string('password', 128)
                            .notNullable();
                        tbl.integer('role_id')
                            .defaultTo(2)
                            .notNullable()
                            .unsigned()
                            .references('id')
                            .inTable('roles');
                    })
                    .createTable('pizzas', tbl=> {
                        tbl.increments();
                        tbl.string('name', 128)
                            .notNullable();
                        tbl.text('desc')
                            .notNullable();
                        tbl.decimal('price')
                            .notNullable()
                            .unsigned();
                    })
                    .createTable('rating', tbl=> {
                        tbl.integer('rate')
                            .notNullable()
                            .unsigned();
                        tbl.integer('user_id')
                            .notNullable()
                            .unsigned()
                            .references('id')
                            .inTable('users')
                            .onDelete('NO ACTION')
                            .onUpdate('NO ACTION')
                        tbl.integer('pizza_id')
                            .notNullable()
                            .unsigned()
                            .references('id')
                            .inTable('users')
                            .onDelete('CASCADE')
                            .onUpdate('CASCADE')
                        tbl.primary(['user_id','pizza_id'])
                    })
                    .createTable('malzemeler', tbl=>{
                        tbl.increments();
                        tbl.string('malzeme_name', 64)
                            .notNullable();
                    })
                    .createTable('orders', tbl=> {
                        tbl.increments();
                        tbl.string('hamur', 32)
                            .notNullable();
                        tbl.string('boyut', 32)
                            .notNullable(); 
                        tbl.integer('adet')
                            .notNullable()
                            .unsigned();
                        tbl.text('not');
                        tbl.string('status',32)
                            .defaultTo('Sıraya alındı')
                            .notNullable();
                        tbl.decimal('price')
                            .notNullable()  
                            .unsigned()
                        tbl.integer('pizza_id')
                            .unsigned()
                            .notNullable()
                            .references('id')
                            .inTable('pizzas')
                            .onDelete('NO ACTION')
                            .onUpdate('NO ACTION')
                        tbl.timestamps();
                    })
                    .createTable('orders_malzemeler', tbl=>{
                        tbl.integer('order_id')
                            .notNullable()
                            .references('id')
                            .inTable('orders')
                            .onDelete('CASCADE')
                            .onUpdate('CASCADE');
                        tbl.integer('malzeme_id')
                            .notNullable()
                            .unsigned()
                            .references('id')
                            .inTable('malzemeler')
                        tbl.primary(['order_id', 'malzeme_id'])
                    })                
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('orders_malzemeler')
                    .dropTableIfExists('orders')
                    .dropTableIfExists('malzemeler')
                    .dropTableIfExists('rating')
                    .dropTableIfExists('pizzas')
                    .dropTableIfExists('users')
                    .dropTableIfExists('roles')
};
