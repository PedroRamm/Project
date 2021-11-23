import { Router } from "express";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateProductController } from "./controller/CreateProductController";
import { CreateUserController } from "./controller/CreateUserController";
import { SalesController } from "./controller/SalesController";
import { ensureAdmin } from "./middleware/ensureAdmin";
import { ensureAuthenticate } from "./middleware/ensureAuthenticate";

const router = Router();

const createUserController = new CreateUserController();
const createProductController = new CreateProductController();
const authenticateUserController = new AuthenticateUserController();
const salesController = new SalesController();


router.post("/users", createUserController.handle);
router.post("/products", ensureAuthenticate, ensureAdmin, createProductController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/sale", ensureAuthenticate, salesController.handle);

export { router };