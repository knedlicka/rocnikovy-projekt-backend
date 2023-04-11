import dotenv from 'dotenv';

dotenv.config();

interface ConfigType {
    dbPort: string;
    dbName: string;
    dbUser: string;
    dbHost: string;
    dbPassword: string;
}

export const config: ConfigType = {
    dbPort: process.env.DB_PORT as string,
    dbName: process.env.DB_NAME as string,
    dbUser: process.env.DB_USER as string,
    dbHost: process.env.DB_HOST as string,
    dbPassword: process.env.DB_PASSWORD as string,
};
