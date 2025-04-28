import MeasurementUnit from '#models/measurement_unit';
import { measurementUnitUpdateValidator, measurementUnitValidator } from '#validators/measurement_unit'
import type { HttpContext } from '@adonisjs/core/http'

export default class MeasurementUnitsController {
    public async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(measurementUnitValidator);
        const measurementUnit = await MeasurementUnit.create(data);
        return response.created({ message: "Unidad de medida creada correctamente.", data: measurementUnit });
    }

    public async index({ response }: HttpContext){
        const measurementUnits = await MeasurementUnit.all();
        if(measurementUnits.length === 0) return response.notFound({ message: "No se encontraron resultados." });
        return response.ok({ message: "Información obtenida correctamente.", data: measurementUnits });
    }

    public async show({ params, response}: HttpContext){
        const measurementUnit = await MeasurementUnit.find(params.id);
        if(!measurementUnit) return response.notFound({ message: "No se encontró un resultado válido."});
        return response.ok({ message: "Información obtenida correctamente.", data: measurementUnit});
    }

    public async update ({ params, request, response}: HttpContext){
        const measurementUnit = await MeasurementUnit.find(params.id);
        if(!measurementUnit) return response.notFound({ message: "No se encontró un resultsdo válido."});
        const data = await request.validateUsing(measurementUnitUpdateValidator);
        measurementUnit.merge(data);
        await measurementUnit.save();

        return response.ok({ message: "Unidad de medida actualizada correctamente.", data: measurementUnit });
    }

    public async destroy({ params, response }: HttpContext){
        const measurementUnit = await MeasurementUnit.find(params.id);
        if(!measurementUnit) return response.notFound({ message: "No se encontró un resultado válido."});
        await measurementUnit.delete();
        return response.ok({ message: "Unidad de medida eliminada correctamente." });
    }
}