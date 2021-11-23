import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("products")
class Product {
    
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    price: Number;

    @Column()
    quantity: Number;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Product };