import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCitasTable1710497679656 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"citas",
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"day_date",
                        type:"datetime",
                    },
                    {
                        name:"artist_id",
                        type:"int"
                    },
                    {
                        name:"client_id",
                        type:"int"
                    },
                    {
                        name:"description",
                        type:"varchar",
                        length:"200"
                    },
                    {
                        name:"price",
                        type:"int",
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["artist_id"],
                        referencedTableName: "tatuadores",
                        referencedColumnNames:["id"]
                    },
                    {
                        columnNames:["client_id"],
                        referencedTableName: "clientes",
                        referencedColumnNames:["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("citas");
    }

}