"use strict";

const fp = require("fastify-plugin");
const knex = require("../models/mysql");

module.exports = fp(async function (fastify, opts) {
  fastify.decorate("knex", function (opts) {
    return knex(opts);
  });
});
