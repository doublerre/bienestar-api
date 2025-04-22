import { Exception } from "@adonisjs/core/exceptions";


export default class ForbiddenException extends Exception {
    constructor(message: string = "No tienes permiso para acceder a este recurso") {
        super(message, { status: 403 })
    }
}