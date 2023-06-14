"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const database_1 = require("../database/database");
const usuario_1 = require("../model/usuario");
const comentarios_1 = require("../model/comentarios");
const pelicula_1 = require("../model/pelicula");
const serie_1 = require("../model/serie");
class DatoRoutes {
    constructor() {
        //Usuarios para login
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield usuario_1.Usuario.find({});
                res.json(query);
                console.log(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        //Validación login
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD();
            console.log(req.body.username);
            let data = yield usuario_1.Usuario.findOne({
                username: req.body.username,
                contraseña: req.body.contraseña
            });
            res.send(data);
            yield database_1.db.desconectarBD();
        });
        //Información de usuario para registro
        this.newUsuario = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, nombre, contraseña } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                idUser: 10,
                username: username,
                nombre: nombre,
                contraseña: contraseña
            };
            const oSchema = new usuario_1.Usuario(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.newComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { usuario, nombrePS, comentario, value } = req.body;
            console.log(req.body);
            yield database_1.db.conectarBD();
            const dSchema = {
                usuario: usuario,
                nombrePS: nombrePS,
                comentario: comentario,
                value: value
            };
            const oSchema = new comentarios_1.Comments(dSchema);
            console.log(req.body);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.verComentarios = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombrePS } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield comentarios_1.Comments.find({
                    nombrePS: nombrePS
                });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.newPelicula = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { titulo, portada, director, año, sipnosis } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                titulo: titulo,
                portada: portada,
                director: director,
                año: año,
                sipnosis: sipnosis
            };
            const oSchema = new pelicula_1.Pelicula(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.newSerie = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { titulo, portada, director, año, temporadas, sipnosis } = req.body;
            yield database_1.db.conectarBD();
            const dSchema = {
                titulo: titulo,
                portada: portada,
                director: director,
                año: año,
                temporadas: temporadas,
                sipnosis: sipnosis
            };
            const oSchema = new serie_1.Serie(dSchema);
            console.log(oSchema);
            yield oSchema.save()
                .then((doc) => res.send(doc))
                .catch((err) => res.send('Error: ' + err));
            yield database_1.db.desconectarBD();
        });
        this.buscarPeliculas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { titulo } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield pelicula_1.Pelicula.find({
                    titulo: titulo
                });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.buscarSeries = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { titulo } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield serie_1.Serie.find({
                    titulo: titulo
                });
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/usuarios', this.getUsers);
        this._router.post('login', this.login);
        this._router.post('/newUsuario', this.newUsuario);
        this._router.post('/comentario', this.newComment);
        this._router.get('/comentarios/:nombrePS', this.verComentarios);
        this._router.post('/newPelicula', this.newPelicula);
        this._router.post('/newSerie', this.newSerie);
        this._router.get('/peliculas/:titulo', this.buscarPeliculas);
        this._router.get('/series/:titulo', this.buscarSeries);
    }
}
const obj = new DatoRoutes();
obj.misRutas();
exports.routes = obj.router;
