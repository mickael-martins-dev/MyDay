declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: number;
        MONGODB_HOST: string,
        MONGODB_PORT: number,
        MONGODB_DBNAME: string,
        MONGODB_COLLECTION: string
        MONGODB_URI: string,
        JWT_SECRET: string,
        SECRET_KEY: string
    }
}