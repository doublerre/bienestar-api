import {FieldContext, MessagesProviderContact} from '@vinejs/vine/types';

export class CustomDependencyMessageProvider implements MessagesProviderContact {
    getMessage(defaultMessage: string, rule: string, field: FieldContext): string {
        if(rule === 'required') return `El campo nombre es obligatorio.`;
        if(field.wildCardPath === 'subcommittee_ids.*' && rule === 'database.exists') return `El subcomité con el id ${field.value} no existe en la base de datos.`;
        return defaultMessage;
    }
}