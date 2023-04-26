import {Request, Response, Router } from 'express'
import { db } from '../database/database'
import { pathToFileURL } from 'url'
import { Usuario } from '../model/usuario'
import { Comments } from '../model/comentarios'
import { Pelicula } from '../model/pelicula'
import { Serie } from '../model/serie'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    //Usuarios para login
    private getUsers = async (req: Request, res: Response) => {
        await db.conectarBD()
            .then(async () => {
                const query = await Usuario.find({ })
                res.json(query)
                console.log(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    //Validación login
    private login = async ( req: Request, res: Response) => {
        await db.conectarBD()
        console.log(req.body.username)
            let data = await Usuario.findOne({
                username: req.body.username,
                contraseña: req.body.contraseña
            })
            res.send(data)
        await db.desconectarBD()
    }

    //Información de usuario para registro
    private newUsuario = async (req: Request, res: Response) => {
        const { username, nombre, contraseña} = req.body
        await db.conectarBD()
        const dSchema = {
            idUser: 10,
            username: username,
            nombre: nombre,
            contraseña: contraseña
        }
        const oSchema = new Usuario(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private newComment = async (req: Request, res: Response) => {
        const { usuario, nombrePS, comentario, value} = req.body
        console.log(req.body)
        await db.conectarBD()
        const dSchema = {
            usuario: usuario,
            nombrePS: nombrePS,
            comentario: comentario,
            value: value
        }
        const oSchema = new Comments(dSchema)
        console.log(req.body)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private verComentarios = async (req: Request, res: Response) => {
        const { nombrePS } = req.params
        console.log(req.params)
        await db.conectarBD()
            .then(async () => {
                const query = await Comments.find({
                    nombrePS: nombrePS
                })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private newPelicula = async (req: Request, res: Response) => {
        const { titulo, portada, director, año, sipnosis} = req.body
        await db.conectarBD()
        const dSchema = {
            titulo: titulo,
            portada: portada,
            director: director,
            año: año,
            sipnosis: sipnosis
        }
        const oSchema = new Pelicula(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private newSerie = async (req: Request, res: Response) => {
        const { titulo, portada, director, año, temporadas, sipnosis} = req.body
        await db.conectarBD()
        const dSchema = {
            titulo: titulo,
            portada: portada,
            director: director,
            año: año,
            temporadas: temporadas,
            sipnosis: sipnosis
        }
        const oSchema = new Serie(dSchema)
        console.log(oSchema)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private buscarPeliculas = async (req: Request, res: Response) => {
        const { titulo } = req.params
        console.log(req.params)
        await db.conectarBD()
            .then(async () => {
                const query = await Pelicula.find({
                    titulo: titulo
                })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    private buscarSeries = async (req: Request, res: Response) => {
        const { titulo } = req.params
        console.log(req.params)
        await db.conectarBD()
            .then(async () => {
                const query = await Serie.find({
                    titulo: titulo
                })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }


    misRutas() {
        this._router.get('/usuarios', this.getUsers)
        this._router.post('login', this.login)
        this._router.post('/newUsuario', this.newUsuario)
        this._router.post('/comentario', this.newComment)
        this._router.get('/comentarios/:nombrePS', this.verComentarios)
        this._router.post('/newPelicula', this.newPelicula)
        this._router.post('/newSerie', this.newSerie)
        this._router.get('/peliculas/:titulo', this.buscarPeliculas)
        this._router.get('/series/:titulo', this.buscarSeries)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router