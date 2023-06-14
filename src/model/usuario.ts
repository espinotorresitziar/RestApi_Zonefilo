import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String
    },
    nombre: {
        type: String
    },
    contraseña: {
        type: String
    }
},
{
    versionKey: false
})

export type user = {
    username: string | null,
    nombre: string | null,
    contraseña: string | null
}

export const Usuario = model('usuario', userSchema)