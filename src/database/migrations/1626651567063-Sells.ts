import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Sells1626651567063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sales",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                    },
                    {
                        name: "client_id",
                        type: "uuid",
                    },
                    {
                        name: "price_sell",
                        type: "bigint",
                    },
                    {
                        name: "sell_date",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["client_id"],
                        onDelete: "SET NULL"
                    },
                    {
                        name: "FKProductIdNotFound",
                        referencedTableName: "products",
                        referencedColumnNames: ["id"],
                        columnNames: ["product_id"],
                        onDelete: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales");
    }

}
