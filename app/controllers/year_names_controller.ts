import type { HttpContext } from '@adonisjs/core/http'

import YearName from "#models/year_name";
import { yearNameValidator } from "#validators/year_name";

export default class YearNamesController {

    async create({request, response}: HttpContext){
        const data = await request.validateUsing(yearNameValidator);
        const year_name = await YearName.create(data);
        return response.created({message: "Año creado correctamente.", data: year_name});
    }

    async index({response}: HttpContext){
        const year_names = await YearName.all();
        if(year_names.length === 0) return response.notFound({message: "No se encontraron años."});
        return response.ok({message: "Información obtenida correctamente.", data: year_names});
    }

}