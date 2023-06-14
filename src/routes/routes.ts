import {Request, Response, Router } from 'express'
import { db } from '../database/database'
import { pathToFileURL } from 'url'
import { Usuario } from '../model/usuario'
import { Comments } from '../model/comentarios'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
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
        const { usuario, mov, comentario } = req.body
        console.log(req.body)
        await db.conectarBD()
        const dSchema = {
            usuario: usuario,
            mov: mov,
            comentario: comentario
        }
        const oSchema = new Comments(dSchema)
        console.log(req.body)
        await oSchema.save()
            .then((doc: any) => res.send(doc))
            .catch((err: any) => res.send('Error: ' + err))
        await db.desconectarBD()
    }

    private verComentarios = async (req: Request, res: Response) => {
        const { mov } = req.params
        console.log(req.params)
        await db.conectarBD()
            .then(async () => {
                const query = await Comments.find({
                    mov: mov
                })
                res.json(query)
            })
            .catch((mensaje) => {
                res.send(mensaje)
            })
        await db.desconectarBD()
    }

    


    misRutas() {
        this._router.get('/login', this.login)
        this._router.post('/newUsuario', this.newUsuario)
        this._router.post('/comentario', this.newComment)
        this._router.get('/comentarios/:mov', this.verComentarios)
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router