import Dependency from '#models/dependency';
import { dependencyValidator } from '#validators/dependency'
import type { HttpContext } from '@adonisjs/core/http'

export default class DependenciesController {
    async store ({request, response}: HttpContext){
        const data = await request.validateUsing(dependencyValidator);
        const dependency = await Dependency.create(data);
        return response.created({ message: "Dependencia creada correctamente.", data: dependency });
    }
}