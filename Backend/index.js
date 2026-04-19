import UserRoutes from "./src/routes/users.routs.js";
import BanRoutes from "./src/routes/ban.routs.js";
import PostRoutes from "./src/routes/post.routs.js";
import LikeRoutes from "./src/routes/like.routs.js";
import CommentRoutes from "./src/routes/comment.routes.js";
import AudienceRoutes from "./src/routes/follow.routs.js";
import { startBanCron } from "./src/services/cron.job.js"
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//import rateLimit from "express-rate-limit";
import { UAParser } from "ua-parser-js";
import { readFileSync } from 'fs';
import swagger from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();

const server = express();
//Api Documentation using swagger..
const swaggerData = JSON.parse(
  readFileSync("./swagger_ui.json", "utf8")
);
server.use(
  "/api-doc-wisperhub",
  swaggerUi.serve,
  swaggerUi.setup(swaggerData)
);
server.use(express.json())//Postman
server.use(express.urlencoded({ extended: true }));//Data comming from HTML/React forms
server.use(cookieParser())

server.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// index.js / server.js
server.set("trust proxy", false);
// const rateLimitMiddleware = rateLimit({
//   windowMs: 1 * 60 * 60 * 1000,
//   max: 100,
//   message: "You have reached the request limit. Please try again after 1 hour."
// })
// UA Parser Middleware
server.use((req, res, next) => {
  const parser = new UAParser(req.headers["user-agent"]);
  req.useragent = parser.getResult(); 
  next();
});

try {
  startBanCron()
}
catch (error) {
  console.log(error.message);

}


// server.use("/api", rateLimitMiddleware);//apply to all routs starts with /api

server.use("/api/user", UserRoutes);
server.use("/api/ban",BanRoutes);
server.use("/api/post",PostRoutes);
server.use("/api/like",LikeRoutes);
server.use("/api/comment",CommentRoutes);
server.use("/api/audience",AudienceRoutes);

server.use("/api", (req, res) => {
  res.status(404).send(`<!DOCTYPE html>
<html>
<head>
<title>WisperHub • 404</title>
<style>
body{margin:0;background:#000;color:#fff;font-family:Inter,sans-serif;
display:flex;align-items:center;justify-content:center;height:100vh}
.container{text-align:center}
.btn{padding:12px 30px;border:1px solid #fff;color:#fff;text-decoration:none}
.btn:hover{background:#fff;color:#000}
</style>
</head>
<body>
<div class="container">
<h1>404</h1>
<p>API Endpoint Not Found</p>
<a href="/api-doc-wisperhub" class="btn">API Docs</a>
</div>
</body>
</html>`);
});

export default server;