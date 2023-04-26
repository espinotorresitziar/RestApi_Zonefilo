import { Schema, model } from 'mongoose';

const movieSchema = new Schema ({
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
    sipnosis: {
        type: String
    }
},
{
    versionKey: false
})

export type pelicula = {
    titulo: string | null,
    portada: string | null,
    director: string | null,
    año: number | null,
    sipnosis: string | null
}

export const Pelicula = model('pelicula', movieSchema)