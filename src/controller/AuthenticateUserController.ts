import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {

    async handle(request: Request, response: Response) {
        const {email, password} = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.authenticate(email, password);


        response.cookie("jwt", token, {
            expires: new Date(Date.now() + 50000),
            httpOnly:true
        });

        return response.json(token);
    }
}

export { AuthenticateUserController };