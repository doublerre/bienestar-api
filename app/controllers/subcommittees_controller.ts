import type { HttpContext } from '@adonisjs/core/http'

import Subcommittee from "#models/subcommittee";
import { subcommitteeUpdateValidator, subcommitteeValidator } from "#validators/subbcommitte";

export default class SubcommitteesController {
    async store ({ request, response }: HttpContext) {
        const data = await request.validateUsing(subcommitteeValidator);
        const subcommittee = await Subcommittee.create(data);
        return response.created({ message: "Subcomité creado correctamente.", data: subcommittee });
    }

    async index ({ request, response }: HttpContext) {
        const query_params = request.qs();
        const subcommittees = await this.getSubcommitteesWithPreloads(query_params);
        if (subcommittees.length === 0) return response.notFound({ message: "No se encontraron resultados." });
        return response.ok({ message: "Información obtenida correctamente.", data: subcommittees });
    }

    async show ({ params, request, response} : HttpContext){
        const query_params = request.qs();
        const subcommittee = await this.getSubcommitteesWithPreloads(query_params, params.id);
        if (subcommittee.length === 0) return response.notFound({ message: "No se encontró un resultado válido." });
        return response.ok({ message: "Información obtenida correctamente.", data: subcommittee });
    }

    async update ({ params, request, response }: HttpContext) {
        const subcommitte = await Subcommittee.find(params.id);
        if (!subcommitte) return response.notFound({ message: "No se encontró un resultado válido." });
        const data = await request.validateUsing(subcommitteeUpdateValidator);
        subcommitte.merge(data);
        await subcommitte.save();
        return response.ok({ message: "Subcomité actualizado correctamente.", data: subcommitte });
    }

    async destroy ({ params, response }: HttpContext) {
        const subcommittee = await Subcommittee.find(params.id);
        if (!subcommittee) return response.notFound({ message: "No se encontró un resultado válido." });
        await subcommittee.delete();
        return response.ok({ message: "Subcomité eliminado correctamente." });
    }

    private async getSubcommitteesWithPreloads(params: any, id?: number) {
        const query = Subcommittee.query();
        if(id) query.where('id', id);
        if(params.year_name === "true") query.preload('yearName');
        if(params.dependency === "true") query.preload('dependency');

        return query.exec();
    }
}

