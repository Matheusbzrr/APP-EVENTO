import express, { Application } from "express";
import Server from "./src/index";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = 8080;

app
    .listen(PORT, "0.0.0.0", function () {
        console.log(`Server ta rodando na porta ${PORT}.`);
    })
    .on("error", (err: any) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });