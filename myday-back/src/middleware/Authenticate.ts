import { NextFunction, Request, Response } from "express";

const authenticated = (request: Request, response: Response, next: NextFunction) => {
    if (request.session && request.session.user) {
        return next();
    } else {
        // @ts-ignore, redirect correctly defined in the documentation, but not in types
        return response.redirect();
    }
}

export default authenticated;