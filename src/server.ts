import "reflect-metadata";
import express, {Request, Response, NextFunction} from "express";
import "express-async-errors";
import { router } from "./routes";
import "./database";
import { AppError } from "./errors/AppError";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    } else if(err instanceof Error) {
        return response.status(400).json({
            message: err.message
        });
    }
    
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error `&{err.message}`"
    })
});

app.listen(3000, () => console.log("Server running at port: 3000"));