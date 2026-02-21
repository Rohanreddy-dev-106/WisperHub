import express from "express";
import BanController from "../controllers/ban.user.controller.js"
import jwtAuth from "../middlewares/jwtAuth.js";

const BanRoutes = express.Router();

const Ban = new BanController();
console.log(jwtAuth);

BanRoutes.post("/", jwtAuth, (req, res, next) => {
    Ban.banuser(req, res, next);
});

export default BanRoutes;