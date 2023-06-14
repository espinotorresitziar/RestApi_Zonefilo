import { Schema, model } from 'mongoose';
import { type } from 'os';

const comentSchema = new Schema ({
    usuario: {
        type: String
    },
    mov: {
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
    mov: string | null,
    comentario: string | null
}

export const Comments = model('comentarios', comentSchema)