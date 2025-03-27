import vine from '@vinejs/vine'

const password = vine.string().minLength(8);

export const registerValidator = vine.compile(
    vine.object({
        fullName: vine.string(),
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('email', value).first()
            console.log(match);
            return !match;
        }),
        username: vine.string().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('username', value).first()
            return !match
        }),
        role: vine.string(),
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