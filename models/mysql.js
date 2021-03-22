const config = require("../config");
const knex = require("knex");

const con = knex({
  client: "mysql",
  connection: {
    host: config.MYSQL.HOST,
    port: config.MYSQL.PORT,
    user: config.MYSQL.USER,
    password: config.MYSQL.PASSWORD,
    database: config.MYSQL.DATABASE,
  },
  pool: { min: 0, max: 3 },
});

module.exports = con;
