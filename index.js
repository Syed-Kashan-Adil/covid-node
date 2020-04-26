import 'dotenv/config';
import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "./database";
import { UserController } from "./controllers/user"
import { TempratureController } from "./controllers/temprature"
import { authenticate } from "./utils/authenticate"
const app = express();
const cors = require('cors');

mongoose.Promise = global.Promise;

app.use(cors());
app.use(bodyParser.json());

app.post("/login", UserController.login)
app.post("/verify_otp", UserController.verifyOTP)
app.post("/registration", authenticate, UserController.registration)
app.post("/covid_status", authenticate, UserController.updateCovidStatus)
app.get("/get_user", authenticate, UserController.getUser)
app.post("/add_temprature", authenticate, TempratureController.addTemprature)
app.get("/get_temprature_record", authenticate, TempratureController.getTempratureRecord)


app.listen(process.env.PORT, () => {
    console.log(`Covid Server Is Listening On ${process.env.PORT}!`);
});