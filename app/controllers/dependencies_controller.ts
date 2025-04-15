import Dependency from '#models/dependency';
import { dependencyUpdateValidator, dependencyValidator } from '#validators/dependency'
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

    async show ({params, request, response}: HttpContext){
        const query_params = request.qs();
        const dependency = await this.getDependenciesWithPreloads(query_params, params.id);
        if(dependency.length === 0) return response.notFound({ message: "No se encontró un resultado válido." });
        return response.ok({ message: "Información obtenida correctamente.", data: dependency });
    }

    async update({params, request, response}: HttpContext){
        const dependency = await Dependency.find(params.id);
        if(!dependency) return response.notFound({message: "No se encontró un resultado válido."});
        const data = await request.validateUsing(dependencyUpdateValidator);
        dependency.merge(data);
        await dependency.save();
        return response.ok({ message: "Dependencia actualizada correctamente.", data: dependency });
    }

    private async getDependenciesWithPreloads(params: any, id?: number){
        const query = Dependency.query();
        if(id) query.where('id', id);
        if(params.subcommittee === "true") query.preload('subcommittee');

        return query.exec();
    }
}