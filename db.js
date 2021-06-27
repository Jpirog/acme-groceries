const Sequelize = require('sequelize');
const { STRING, BOOLEAN } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:FSA123@localhost/acme_grocery_db');
const faker = require('faker');

const Grocery = conn.define('grocery', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  purchased: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

Grocery.createRandom = function(){
  return Grocery.create({ name: faker.commerce.productName()});
}

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  await Promise.all([
    Grocery.create({ name: 'milk' }),
    Grocery.create({ name: 'eggs' }),
    Grocery.create({ name: 'cheeze', purchased: true })
  ]);
};

module.exports =  { syncAndSeed, Grocery };