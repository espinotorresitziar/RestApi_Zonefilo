"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    idUser: {
        type: Number
    },
    username: {
        type: String
    },
    nombre: {
        type: String
    },
    contraseña: {
        type: String
    }
}, {
    versionKey: false
});
exports.Usuario = (0, mongoose_1.model)('usuario', userSchema);
