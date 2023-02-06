import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            //Acessando a informação
            const q = req.query.q as string | undefined

            const userBusiness = new UserBusiness()
            const output = await userBusiness.getUsers(q)
                
            //resposta da requisição
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email, password } = req.body

            const input ={
                id,
                name,
                email,
                password,
            }
            
            const userBusiness = new UserBusiness()
            const output = await userBusiness.createUser(input)

    
            res.status(201).send(output)
        } catch (error) {
            console.log(error)
    
            if (req.statusCode === 200) {
                res.status(500)
            }
    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}