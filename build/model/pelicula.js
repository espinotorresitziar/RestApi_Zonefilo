"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pelicula = void 0;
const mongoose_1 = require("mongoose");
const movieSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false
});
exports.Pelicula = (0, mongoose_1.model)('pelicula', movieSchema);
