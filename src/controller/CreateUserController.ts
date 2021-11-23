import { Request, Response } from "express";
import { CreateUserService } from "../services/UserService";

class CreateUserController {

    async handle(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.create({
            name,
            email,
            admin,
            password
        });

        return response.json(user);
    }
}

export { CreateUserController };