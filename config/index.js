const env = process.env.NODE_ENV || "dev";

const appSecert = "jbhjgvr6t7y8uoijhuytf67yuih";

const DEV_MYSQL = {
  HOST: "127.0.0.1",
  PORT: 33066,
  USER: "root",
  PASSWORD: "123456",
  DATABASE: "pushApp",
};

const PROD_MYSQL = {
  HOST: "",
  PORT: 3306,
  USER: "",
  PASSWORD: "",
  DATABASE: "",
};

const dev = {
  IS_DEV: true,
  REQUEST_TIME_OUT: 10 * 60000,
  VALIDATION_URL: "",
  APP_PORT: 3000,
  DB_POOL_SIZE: 1,
  MYSQL: DEV_MYSQL,
};

const production = {
  IS_DEV: false,
  REQUEST_TIME_OUT: 10 * 60000,
  VALIDATION_URL: "",
  APP_PORT: 3000,
  DB_POOL_SIZE: 3,
  MYSQL: PROD_MYSQL,
};

const config = { dev, production };
module.exports = { ...config[env], appSecert };
