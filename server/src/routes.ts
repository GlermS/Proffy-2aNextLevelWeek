import express from 'express';
import ClassesController from './controller/ClassesControler';
import connectionsController from './controller/ConnectionsController';


const Router = express.Router();

const classesController = new ClassesController();
const connectionController = new connectionsController;


Router.post("/classes", classesController.create);
Router.get("/classes", classesController.index);

Router.post("/connection", connectionController.create);
Router.get("/connection", connectionController.index);

export default Router;