import Router from "express-promise-router"
import { UserController } from "../controllers/user";




Router().route("/login").post((req, res, next) => next(), UserController.login);


export { Router }