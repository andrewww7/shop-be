import { Client } from 'pg';
import { databaseConfig } from '../config/database.config';

const { pg_username, pg_password, pg_database, pg_host, pg_port } = databaseConfig;

export const client = new Client({
  user: pg_username,
  password: pg_password,
  database: pg_database,
  host: pg_host,
  port: pg_port,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
});

