import db from "../database/connection";
import { Request, Response } from 'express';


export default class connectionsController{
    async index(request: Request, response: Response) {
        const totalConnections = await db("connections").count('* as total');

        return response.status(201).json(totalConnections[0])

    }
    async create(request: Request, response: Response) {
        const { user_id, class_id } = request.body;

        const newConnection = await db('connections').insert({
            user_id,
            class_id
        });

        return response.status(201).json({
            last_connection: newConnection[0]
        })
    }
};