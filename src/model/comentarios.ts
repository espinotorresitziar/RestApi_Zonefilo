import { Schema, model } from 'mongoose';
import { type } from 'os';

const comentSchema = new Schema ({
    usuario: {
        type: String
    },
    nombrePS: {
        type: String
    },
    comentario: {
        type: String
    },
    value: {
        type: Number
    }
},
{
    versionKey: false
})

export type comment = {
    usuario: string | null,
    nombrePS: string | null,
    comentario: string | null,
    value: number | null
}

export const Comments = model('comentarios', comentSchema)