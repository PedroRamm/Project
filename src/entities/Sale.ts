import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("sales")
class Sale {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    product_id: string;

    @Column()
    client_id: string;

    @Column()
    price_sell: Number;

    @CreateDateColumn()
    sell_date: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Sale };