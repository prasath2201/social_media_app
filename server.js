import OS from "os";
import express from "express";
import routers from "./src/routers";
import { Sequelize } from "sequelize";
import socket from "socket.io";
import morgan from "morgan";

const env = process.env.NODE_ENV || "production";
const PORT = process.env.PORT_LISTEN || 8080;
const socketport = process.env.SOCKET || 5000;

const config = require("./db/config")[env];

// import config from "./db/config";
var fileupload = require("express-fileupload");
/**
 * Express Instance
 */
const app = express();
/**
 *  PORT ESTABLISHMENT AND BODY PARSING
 */
app.set("port", PORT);
app.use(express.json());
app.use(fileupload());
app.get(morgan("dev"));

/**
 *  Thread pool configuration settings for  the application server.
 *
 */
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

/**
 *  HeartBeat and Process Information
 */

app.get("/", async (req, res) => {
  const status = {
    uptime: process.uptime(),
    message: "Server is running...",
    process_id: process.pid,
    dateTime: new Date(),
    platform: OS.platform(),
    processor: OS.cpus()[0].model,
    architecture: OS.arch(),
    thread_count: OS.cpus().length,
    total_memory: `${(OS.totalmem() / 1e9).toFixed(2)} GB`,
    free_memory: `${(OS.freemem() / 1e9).toFixed(2)} GB`,
  };

  res.status(200).send(status);
});

app.use("/api/v1", routers);

// socket server
const server = app.listen(PORT, () => console.log(`Server started on ${PORT}`));

// socket implementation
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("send-msg", (data) => {
    console.log(data);
    io.emit("msg-recieve", data);
  });
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
});

/**
 *  DATABASE CONNECTION CONFIGURATION
 */

app.listen(PORT, async () => {
  try {
    console.log("Server is running at port : " + PORT);
    // const sequelize = new Sequelize(config[process.env.NODE_ENV]);
    const sequelize = await new Sequelize(
      config?.database,
      config?.username,
      config?.password,
      {
        host: config?.host,
        port: config?.port,
        dialect: config?.dialect,
        logging: false,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        query: { raw: true },
      }
    );
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
