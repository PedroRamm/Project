import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { ProductsRepository } from "../repositories/ProductsRepository";

interface IProductCreate {
    name: string;
    price: Number;
    quantity: Number;
}



class CreateProductService {

    async create({name, price, quantity}: IProductCreate) {
        const productRepository = getCustomRepository(ProductsRepository);

        const productExists = await productRepository.findOne({name});

        if(productExists) {
           throw new AppError("Produto ja cadastrado"); 
        }

        if(price <= 0 || quantity < 0) {
            throw new AppError("Dados incorretos");
        }

        const product = productRepository.create({
            name, price, quantity
        });

        await productRepository.save(product);

        return product;
    }
}

export { CreateProductService };