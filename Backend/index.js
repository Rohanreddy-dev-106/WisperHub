import UserRoutes from "./src/routes/users.routs.js";
import BanRoutes from "./src/routes/ban.routs.js";
import PostRoutes from "./src/routes/post.routs.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { UAParser } from "ua-parser-js";
import { startBanCron } from "./src/services/cron.job.js"
import dotenv from "dotenv";
dotenv.config();

const server = express();
server.use(express.json())//Postman
server.use(express.urlencoded({ extended: true }));//Data comming from HTML forms
server.use(cookieParser())
server.use(cors({
  origin: "*" // allow all origins
}));
// index.js / server.js
server.set("trust proxy", false);
const rateLimitMiddleware = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  max: 100,
  message: "You have reached the request limit. Please try again after 1 hour."
})
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


//server.use("/api", rateLimitMiddleware);//apply to all routs starts with /api


server.use("/api/user", UserRoutes);
server.use("/api/ban",BanRoutes);
server.use("/api/post",PostRoutes);


server.use((req, res, next) => {
  res.status(404).send(` <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>WisperHub • 404</title>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Inter", system-ui, sans-serif;
  }

  body {
    background: #000;
    color: #fff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container {
    text-align: center;
    max-width: 420px;
    padding: 40px;
  }

  h1 {
    font-size: 2.4rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .tagline {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 6px;
  }

  .divider {
    width: 70px;
    height: 1px;
    background: #fff;
    opacity: 0.25;
    margin: 30px auto;
  }

  .error-code {
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: 6px;
    margin-bottom: 10px;
  }

  .error-title {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .error-message {
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.6;
    margin-bottom: 30px;
  }

  .btn {
    display: inline-block;
    padding: 12px 30px;
    border: 1px solid #fff;
    color: #fff;
    text-decoration: none;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    transition: 0.3s ease;
  }

  .btn:hover {
    background: #fff;
    color: #000;
  }

  footer {
    margin-top: 40px;
    font-size: 0.7rem;
    opacity: 0.4;
  }
</style>
</head>

<body>

<div class="container">
  <h1>WisperHub</h1>
  <p class="tagline">Anonymous Social Network</p>

  <div class="divider"></div>

  <div class="error-code">404</div>
  <div class="error-title">Endpoint Not Found</div>
  <div class="error-message">
    The requested API route does not exist or has been removed.
    Please refer to the official documentation.
  </div>

  <a href="/docs" class="btn">Go to API Docs</a>

  <footer>
    © 2026 WisperHub • Privacy First
  </footer>
</div>

</body>
</html>
 `)
})

export default server;