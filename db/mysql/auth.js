const bcrypt = require("bcrypt");
const knex = require("../../models/mysql");

module.exports = {
  login: async (login) => {
    try {
      const user = await knex.select().from("users").where("email", login.email);

      if (user && user.length) {
        return {
          loginSuccess: bcrypt.compareSync(login.password, user[0].password),
          result: user[0].id,
        };
      }
      return {
        loginSuccess: false,
        result: "invalid login",
      };
    } catch (err) {
      return {
        error: err,
        loginSuccess: false,
        result: err.message,
      };
    }
  },

  getByUserID: async (id) => {
    try {
      const q = squel.select().from("users").where("id = ?", id).toString();
      return await DBQuery(q);
    } catch (err) {
      return err;
    }
  },
};
