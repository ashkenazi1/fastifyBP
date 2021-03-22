"use strict";
const { registrationSchema, loginSchema } = require("../../validationSchemas");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../db/mysql/auth");
const { jwtMiddleware } = require("../../middlewares/auth");

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (req, reply) {
    return fastify.httpErrors.notAcceptable();
  });

  fastify.get("/test", { preHandler: [jwtMiddleware] }, async function (req, reply) {
    return "ok";
  });

  fastify.post("/register", async (req, reply) => {
    try {
      const body = await registrationSchema.validateAsync(req.body);
      if (body) {
        body.password = bcrypt.hashSync(body.password, 8);
        const reg = await fastify.knex("users").insert(body);
        if (reg && reg.length) {
          const token = jwt.sign({ id: reg[0] }, fastify.config.appSecert, {
            expiresIn: 86400,
          });
          reply.status(200).send({ success: true, token });
        } else {
          reply.status(403).send({ success: false });
        }
      }
    } catch (err) {
      reply.send("regiseration failed.");
      // reply.send(err.message);
    }
  });

  fastify.post("/login", async (req, res) => {
    try {
      const body = await loginSchema.validateAsync(req.body);
      if (body) {
        const login = await auth.login(body);
        if (login.loginSuccess) {
          const token = jwt.sign({ id: login.result }, fastify.config.appSecert, {
            expiresIn: 86400,
          });
          res.status(200).send({ success: true, token });
        } else {
          res.status(403).send({ success: false });
        }
      }
    } catch (err) {
      res.status(500).send("login failed.");
      // res.status(500).send(err.message);
    }
  });
};
