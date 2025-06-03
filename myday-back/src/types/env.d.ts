declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PORT: number;
        MONGODB_URI: string,
        JWT_SECRET: string,
        SECRET_KEY: string
    }
}