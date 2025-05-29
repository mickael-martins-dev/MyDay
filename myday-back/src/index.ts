import express, { NextFunction, Request, Response } from 'express';
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from 'cors';

import path from 'path';

import registerRouter from './routes/register.routes';

// Configure server
export const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -- Cors
// Dev / Production Cors, need to update this
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3030', // frontend URL
}));


// Session Middleware, need to update this : Dev / Prodiction

const sessionMiddleware = session({
    secret: process.env.JWT_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax'
    },
});
app.use(sessionMiddleware);

//
// Routes defined here !
//
// Update this line with the production / dev vn
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/register", registerRouter);

// Error manager
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
