import express, { NextFunction, Request, Response } from 'express';
import session from "express-session";
import cookieParser from "cookie-parser";
import { connectToMongo } from './model/Database';
import cors from 'cors';

import path from 'path';

// Router
import registerRouter from './routes/register.routes';
import usersRouter from './routes/users.routes';
import loginRouter from './routes/login.routes';
import logoutRouter from './routes/logout.routes';
import authRouter from './routes/authentification.route';
import authenticated from './middleware/Authenticate';

// Configure server
export const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// -- Cors
// Dev / Production Cors, need to update this

// -- Don't use in developpement
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3030', // frontend URL
}));


// Session Middleware, need to update this : Dev / Prodiction

// Use this configuration in development
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

app.use("/api/login", loginRouter);
app.use("/api/logout", authenticated, logoutRouter);
app.use("/api/register", registerRouter);
app.use("/api/check-auth", authRouter);
app.use("/api/user", authenticated, usersRouter);

// Error manager
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
});


const port = process.env.PORT || 4000;
connectToMongo().then(() => app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}));
