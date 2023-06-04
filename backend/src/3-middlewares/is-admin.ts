import { NextFunction, Request, Response } from "express";
import { UnauthorizedErrorModel } from "../4-models/errors-model";
import cyber from "../2-utils/cyber";

 async function isAdmin(request: Request, response: Response, next: NextFunction){

    try {
        const isAdmin = await cyber.verifyAdmin(request)
        if(!isAdmin) throw new UnauthorizedErrorModel("You do not have administrator permission!")        
        next()
    }
    catch (err: any) {
        next(err)        
    }

}

export default isAdmin