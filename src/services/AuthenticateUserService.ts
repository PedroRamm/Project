import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/UsersRepository";



class AuthenticateUserService {

    async authenticate(email: string, password: string) {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findOne({email});

        if(!user) {
            throw new AppError("Email/Password incorreto!");
        }

        const passwordHash = compare(password, user.password);

        if(!passwordHash) {
            throw new AppError("Email/Password incorreto!");
        }

        const token = sign({
            email: user.email
        }, "ad93760cf74b5b99e52b897a561c2194", {
            subject: user.id,
            expiresIn: "1d"
        });


        return token;
    }
}

export { AuthenticateUserService };