import { MigrationInterface, QueryRunner, Table } from "typeorm"; 

export class CreateRolesTable1710339195163 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: "roles",
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
            length: "40",
            },
            ],
            }),
            true
            );
            
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("roles");
    }

}
