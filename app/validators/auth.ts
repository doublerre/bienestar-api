import vine from '@vinejs/vine'

const password = vine.string().minLength(8);

export const registerValidator = vine.compile(
    vine.object({
        username: vine.string().unique(async (db, value) => {
            const match = await db.from('usuarios_user').select('id').where('username', value).first()
            return !match
        }),
        password
    })
);

export const loginValidator = vine.compile(
    vine.object({
        username: vine.string(),
        password
    })
);

export const emailValidator = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(),
    })
);

export const resetPasswordValidator = vine.compile(
    vine.object({
        token: vine.string(),
        password: vine.string().confirmed().minLength(8),
    })
);