import { Schema, model } from 'mongoose';
import { type } from 'os';

const comentSchema = new Schema ({
    usuario: {
        type: String
    },
    id: {
        type: String
    },
    comentario: {
        type: String
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