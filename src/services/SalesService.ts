import { getCustomRepository } from "typeorm";
import { addEmitHelper } from "typescript";
import { AppError } from "../errors/AppError";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { SalesRepository } from "../repositories/SalesRepository";
import { UsersRepository } from "../repositories/UsersRepository";



class SalesService {

    async Create(product_id: string, client_id: string, price_sell?: number) {
        const userRepository = getCustomRepository(UsersRepository);
        const productRepository = getCustomRepository(ProductsRepository);
        const saleRepository = getCustomRepository(SalesRepository);

        const productExists = await productRepository.findOne(product_id);

        if(!productExists) {
            throw new AppError("product id does not exists");
        }

        if(!price_sell) {
            price_sell = productExists.price as number;
        }

        const value = productExists.price as number;
        const minPriceAllowed = value - (value * 0.2);

        console.log(minPriceAllowed);

        if(price_sell < minPriceAllowed) {
            throw new Error("The price is too low")
        }   

        const userExists = await userRepository.findOne(client_id);

        if(!userExists) {
            throw new AppError("Cliente id does not exists");
        }

        const sale = saleRepository.create({
            product_id,
            client_id,
            price_sell,
        })

        await saleRepository.save(sale);

        return sale;
    }
}

export { SalesService };