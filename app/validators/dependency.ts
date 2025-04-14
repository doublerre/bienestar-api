import vine from '@vinejs/vine'

export const dependencyValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(50),
        subcommittee_id: vine.number().min(1).exists(async (db, value) => {
            const match = await db.from('subcommittees').select('id').where('id', value).first()
            return !!match
        })
    })
)