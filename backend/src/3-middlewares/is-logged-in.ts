import { NextFunction, Request, Response } from "express";
import { RouteNotFoundErrorModel } from "../4-models/errors-model";

function isLoggedIn(request: Request, response: Response, next: NextFunction){

    const err = new RouteNotFoundErrorModel(request.originalUrl)
    next(err)
}

export default isLoggedIn