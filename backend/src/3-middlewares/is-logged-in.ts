import { NextFunction, Request, Response } from "express";
import { UnauthorizedErrorModel } from "../4-models/errors-model";
import cyber from "../2-utils/cyber";

 async function isLoggedIn(request: Request, response: Response, next: NextFunction){

    const isLogged = await cyber.verifyToken(request)
    if(!isLogged) {
        const err = new UnauthorizedErrorModel(`Invalid token!`)
        next(err)
    }
    next()
}

export default isLoggedIn