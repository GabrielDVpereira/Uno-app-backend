"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  define: {
    timestamps: true,
  },
};
