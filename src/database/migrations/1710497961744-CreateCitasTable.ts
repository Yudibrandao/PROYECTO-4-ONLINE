import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCitasTable1710497679656 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "citas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "fecha",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "estado",
                        type: "varchar",
                        length: "50",
                    },
                    {
                        name: "cliente_id",
                        type: "int",
                    },
                    {
                        name: "tatuador_id",
                        type: "int",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["cliente_id"],
                        referencedTableName: "clientes",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["tatuador_id"],
                        referencedTableName: "tatuadores",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("citas");
    }
}
