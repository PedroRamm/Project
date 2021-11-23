import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    
    const { jwt } = request.cookies;

    try {
        const { sub } = verify(jwt, "ad93760cf74b5b99e52b897a561c2194") as IPayLoad;
        
        request.user_id = sub;

        next();
        
    } catch(err) {
        return response.status(401).end();
    }
    
}