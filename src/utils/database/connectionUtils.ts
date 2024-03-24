import { Pool } from "pg"

import dotenv from "dotenv"
dotenv.config()

export default new Pool({
    user: String(process.env.PG_USER),
    password: String(process.env.PG_PASSWORD),
    database: String(process.env.PG_DATABASE),
    host: String(process.env.PG_HOST),
    port: Number(process.env.PG_PORT),
    max: 10,
    idleTimeoutMillis: 30000
});
