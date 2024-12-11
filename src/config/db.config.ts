import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT as string, 10),
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: parseInt(process.env.DB_POOL_MAX as string, 10),
        min: parseInt(process.env.DB_POOL_MIN as string, 10),
        acquire: parseInt(process.env.DB_POOL_ACQUIRE as string, 10),
        idle: parseInt(process.env.DB_POOL_IDLE as string, 10)
    }
};
