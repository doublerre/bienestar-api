import vine from '@vinejs/vine'

export const measurementUnitValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(100),
    })
)

export const measurementUnitUpdateValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).maxLength(100).optional(),
    })
)