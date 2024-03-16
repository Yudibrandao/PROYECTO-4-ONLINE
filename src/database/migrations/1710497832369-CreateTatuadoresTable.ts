import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTatuadoresTable1710497679654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tatuadores",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nombre_artistico",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "descripcion",
                        type: "varchar",
                        length: "255",
                    },
                    {
                        name: "usuario_id",
                        type: "int",
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ["usuario_id"],
                        referencedTableName: "usuarios",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tatuadores");
    }
}
