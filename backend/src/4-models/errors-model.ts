import { publicDecrypt } from "crypto";

class ErrorsModel {
    public constructor(public status: number, public message: string) {}
}

export class RouteNotFoundErrorModel extends ErrorsModel {
    public constructor(route: string){
        super(404, `The route: ${route}, is not exists`)
    }
}

export class UnauthorizedErrorModel extends ErrorsModel {
    public constructor(msg: string){
        super(400, msg)
    }
}

export class ValidationErrorModel extends ErrorsModel {
    public constructor(msg: string){
        super(400, msg)
    }
}

export class ResourceNotFoundErrorModel extends ErrorsModel {
    public constructor(id: number){
        super(404, `The id: ${id} is not exists`)
    }
}