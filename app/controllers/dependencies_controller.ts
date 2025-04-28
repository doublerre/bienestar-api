import ForbiddenException from '#exceptions/ForbiddenException';
import Dependency from '#models/dependency';
import { dependencyUpdateValidator, dependencyValidator } from '#validators/dependency'
import type { HttpContext } from '@adonisjs/core/http'

export default class DependenciesController {
    async store ({request, response}: HttpContext){
        const data = await request.validateUsing(dependencyValidator);
        const dependency = await Dependency.create(data);
        return response.created({ message: "Dependencia creada correctamente.", data: dependency });
    }

    async index ({auth, request, response}: HttpContext){
        const query_params = request.qs();
        const user = auth.user;

        const dependencies = await this.getDependenciesWithPreloads(query_params, undefined, user);

        if(dependencies.length === 0) return response.notFound({ message: "No se encontraron resultados." });
        return response.ok({ message: "Información obtenida correctamente.", data: dependencies });
    }

    async show ({auth, params, request, response}: HttpContext){
        const query_params = request.qs();
        const dependency = await this.getDependenciesWithPreloads(query_params, params.id);
        const user = auth.user;

        this.authorizeDependencyAccess(user, dependency[0]);

        if(dependency.length === 0) return response.notFound({ message: "No se encontró un resultado válido." });
        return response.ok({ message: "Información obtenida correctamente.", data: dependency });
    }

    async update({auth, params, request, response}: HttpContext){
        const dependency = await Dependency.find(params.id);
        if(!dependency) return response.notFound({message: "No se encontró un resultado válido."});

        const user = auth.user;

        this.authorizeDependencyAccess(user, dependency);

        const data = await request.validateUsing(dependencyUpdateValidator);
        dependency.merge(data);
        await dependency.save();
        
        return response.ok({ message: "Dependencia actualizada correctamente.", data: dependency });
    }

    async destroy({auth, params, response}: HttpContext) {
        const dependency = await Dependency.find(params.id);
        if(!dependency) return response.notFound({message: "No se encontró un resultado válido."});

        const user = auth.user;

        this.authorizeDependencyAccess(user, dependency)

        await dependency.delete();
        return response.ok({ message: "Dependencia eliminada correctamente." });
    }

    private async getDependenciesWithPreloads(params: any, id?: number, user?: any){
        const query = Dependency.query();
        if(id) query.where('id', id);
        if(user?.role === "ROLE_SUBCOMITE" && user.subcommitteeId !== undefined) query.where('subcommittee_id', user.subcommitteeId); 
        if(params.subcommittee === "true") query.preload('subcommittee');
        if(params.users === "true") query.preload('users');

        return query.exec();
    }

    private authorizeDependencyAccess(user: any, dependency: Dependency){
        if(user.role === "ROLE_ADMIN") return;
        if(user.role === "ROLE_SUBCOMITE" && user.subcommitteeId !== undefined && user.subcommitteeId === dependency.subcommitteeId) return;
        
        throw new ForbiddenException();
    }
}

