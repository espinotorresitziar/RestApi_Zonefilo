import { Schema, model } from 'mongoose';

const serieSchema = new Schema ({
    titulo: {
        type: String
    },
    portada: {
        type: String
    },
    director: {
        type: String
    },
    año: {
        type: Number
    },
    temporadas: {
        type: Number
    },
    sipnosis: {
        type: String
    }
},
{
    versionKey: false
})

export type serie = {
    titulo: string | null,
    portada: string | null,
    director: string | null,
    año: number | null,
    temporadas: number | null,
    sipnosis: string | null
}

export const Serie = model('serie', serieSchema)