import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientesTable1710497679655 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "clientes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "nombre",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "apellido",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                    },
                    {
                        name: "telefono",
                        type: "varchar",
                        length: "15",
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
        await queryRunner.dropTable("clientes");
    }
}
