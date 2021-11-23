import { Request, Response } from "express";
import { CreateProductService } from "../services/ProductService";

class CreateProductController {

    async handle(request: Request, response: Response) {
        const { name, price, quantity } = request.body;

        const createProductService = new CreateProductService();

        const product = await createProductService.create({name, price, quantity});
        
        return response.json(product);
    }
}

export { CreateProductController };