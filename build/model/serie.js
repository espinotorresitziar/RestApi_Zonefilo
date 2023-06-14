"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serie = void 0;
const mongoose_1 = require("mongoose");
const serieSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false
});
exports.Serie = (0, mongoose_1.model)('serie', serieSchema);
