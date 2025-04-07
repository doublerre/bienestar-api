import vine from '@vinejs/vine'

export const yearNameValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(50),
        year: vine.number().min(2000).max(2100),
    })
)