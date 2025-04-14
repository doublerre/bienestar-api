import vine from '@vinejs/vine'

export const subcommitteeValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(50),
        year_name_id: vine.number().min(1).exists(async (db, value) => {
            const match = await db.from('year_names').select('id').where('id', value).first()
            return !!match
        })
    })
)