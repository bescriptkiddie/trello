import databaseConfig from './database.json'

interface IDatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb';
    timezone: string;
}

const configs = {
    development: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.development as IDatabaseConfig,
        jwt: {
            privateKey: 'pika'
        }
    },
    test: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.test as IDatabaseConfig,
        jwt: {
            privateKey: 'pika'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database: databaseConfig.production as IDatabaseConfig,
        jwt: {
            privateKey: 'pika'
        }
    },
}
// type configKeys = 'development' | 'test' | 'production'
type configKeys = keyof typeof configs

const NODE_EVN = process.env.NODE_EVN as configKeys || 'development'

export default configs[NODE_EVN]
