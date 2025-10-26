import sql from 'mssql';
import { config } from '../../../config/config.env.js';

let pool;

const sqlConfig = {
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    server: config.db.host,
    port: config.db.port,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
}

export async function getPool() {
    try {
        if(pool){
            return pool
        }
        console.log('Conectec to SQL Server');
        pool = await sql.connect(sqlConfig)
        return pool
        
    } catch (err) {
        console.error(`Error connecting to SQL Server: ${err}`)
        throw err;
    }
}