import { CustomDependencyMessageProvider } from '#providers/CustomDependencyMessageProvider'
import vine from '@vinejs/vine'

export const dependencyValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(50),
        subcommittee_ids: vine.array(
            vine.number().min(1).exists(async (db, value) => {
                const match = await db.from('subcommittees').select('id').where('id', value).first()
                return !!match
            })
        ).minLength(1)
    })
)

export const dependencyUpdateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(50).optional(),
        subcommittee_ids: vine.array(
            vine.number().min(1).exists(async (db, value) => {
                const match = await db.from('subcommittees').select('id').where('id', value).first()
                return !!match
            })
        ).optional()
    })
)

dependencyValidator.messagesProvider = new CustomDependencyMessageProvider();
dependencyUpdateValidator.messagesProvider = new CustomDependencyMessageProvider();