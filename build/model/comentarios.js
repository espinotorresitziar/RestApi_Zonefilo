"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = require("mongoose");
const comentSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false
});
exports.Comments = (0, mongoose_1.model)('comentarios', comentSchema);
