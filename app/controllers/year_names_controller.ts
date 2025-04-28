import type { HttpContext } from '@adonisjs/core/http'

import YearName from "#models/year_name";
import { yearNameUpdateValidator, yearNameValidator } from "#validators/year_name";

export default class YearNamesController {

    async store({request, response}: HttpContext){
        const data = await request.validateUsing(yearNameValidator);
        const year_name = await YearName.create(data);
        return response.created({message: "Año creado correctamente.", data: year_name});
    }

    async index({response}: HttpContext){
        const year_names = await YearName.all();
        if(year_names.length === 0) return response.notFound({message: "No se encontraron años."});
        return response.ok({message: "Información obtenida correctamente.", data: year_names});
    }

    async show({params, response}: HttpContext){
        const year_name = await YearName.find(params.id);
        if(!year_name) return response.notFound({message: "No se encontró un resultado válido."});
        return response.ok({message: "Información obtenida correctamente.", data: year_name});
    }

    async update({params, request, response}: HttpContext){
        const year_name = await YearName.find(params.id);
        if(!year_name) return response.notFound({message: "No se encontró un resultado válido."});
        const data = await request.validateUsing(yearNameUpdateValidator);
        year_name.merge(data);
        await year_name.save();
        return response.ok({message: "Año actualizado correctamente.", data: year_name});
    }

    async destroy({params, response}: HttpContext){
        const year_name = await YearName.find(params.id);
        if(!year_name) return response.notFound({message: "No se encontró un resultado válido."});
        await year_name.delete();
        return response.ok({message: "Año eliminado correctamente."});
    }

}