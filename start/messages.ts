import vine, { SimpleMessagesProvider } from '@vinejs/vine';

const messages = {
    required: 'El campo {{ field }} es obligatorio.',
    string: 'El campo {{ field }} debe ser una cadena de texto.',
    email: 'El campo {{ field }} debe ser un correo electrónico válido.',
    number: 'El campo {{ field }} debe ser un número.',
    boolean: 'El campo {{ field }} debe ser verdadero o falso.',
    minLength: 'El campo {{ field }} debe tener al menos {{ min }} caracteres.',
    maxLength: 'El campo {{ field }} no puede tener más de {{ max }} caracteres.',
    confirmed: 'La confirmación de {{ field }} no coincide.',
    in: 'El valor de {{ field }} no es válido.',
    date: 'El campo {{ field }} debe tener el formato {{ format }}.',
    object: 'El campo {{ field }} debe ser un objeto.',
    array: 'El campo {{ field }} debe ser un arreglo.',
    alpha: 'El campo {{ field }} solo puede contener letras.',
    alphaNumeric: 'El campo {{ field }} solo puede contener letras y números.',
    regex: 'El campo {{ field }} tiene un formato inválido.',
    url: 'El campo {{ field }} debe ser una URL válida.',
}

const namesFields = {
    fullName: 'nombre completo',
    email: 'correo electrónico',
    username: 'nombre de usuario',
    password: 'contraseña',
    name: 'nombre',
    year: 'año',
    token: 'token',
    role: 'rol',
}

vine.messagesProvider = new SimpleMessagesProvider(messages, namesFields);