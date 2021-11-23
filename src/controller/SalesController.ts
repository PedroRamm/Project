import { Request, Response } from "express";
import { SalesService } from "../services/SalesService";


class SalesController {

    async handle(request: Request, response: Response) {
        const { product_id, client_id, price_sell} = request.body;

        const salesService = new SalesService();

        const sale = salesService.Create(product_id, client_id, price_sell);

        return response.json(sale);
    }
}

export { SalesController };