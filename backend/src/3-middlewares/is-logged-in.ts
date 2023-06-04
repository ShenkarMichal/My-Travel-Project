import { NextFunction, Request, Response } from "express";
import { UnauthorizedErrorModel } from "../4-models/errors-model";
import cyber from "../2-utils/cyber";

 async function isLoggedIn(request: Request, response: Response, next: NextFunction){

    try {
        const isLogged = await cyber.verifyToken(request)
        if(!isLogged) throw new UnauthorizedErrorModel("You are not logged-in!")        
        next()
    }
    catch (err: any) {
        next(err)        
    }

}

export default isLoggedIn