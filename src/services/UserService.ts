import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import  * as yup  from "yup";
import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError"


interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async create({name, email, admin, password}: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const schema = yup.object().shape({
            name: yup.string().required("Nome Obrigatorio"),
            email: yup.string().email().required("email incorreto"),
            password: yup.string().required("Password obrigatorio"),
        })
        
        try {
            await schema.validate({name, email, password});
        } catch(err) {
            throw new AppError(err);
        }

        const userExists = await usersRepository.findOne({email});

        if(userExists) {
            throw new AppError("user already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({name,
            email,
            admin,
            password: passwordHash});

        await usersRepository.save(user);
        
        return user;
    }

}

export { CreateUserService }; 