"use strict";

const fp = require("fastify-plugin");
const config = require("../config");

module.exports = fp(async function (fastify, opts) {
  fastify.decorate("config", config);
});
