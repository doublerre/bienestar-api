import Dependency from '#models/dependency';
import { dependencyValidator } from '#validators/dependency'
import type { HttpContext } from '@adonisjs/core/http'

export default class DependenciesController {
    async store ({request, response}: HttpContext){
        const data = await request.validateUsing(dependencyValidator);
        const dependency = await Dependency.create(data);
        return response.created({ message: "Dependencia creada correctamente.", data: dependency });
    }

    async index ({request, response}: HttpContext){
        const query_params = request.qs();
        const dependencies = await this.getDependenciesWithPreloads(query_params);
        if(dependencies.length === 0) return response.notFound({ message: "No se encontraron resultados." });
        return response.ok({ message: "Información obtenida correctamente.", data: dependencies });
    }

    private async getDependenciesWithPreloads(params: any, id?: number){
        const query = Dependency.query();
        if(id) query.where('id', id);
        if(params.subcommittee === "true") query.preload('subcommittee');

        return query.exec();
    }
}