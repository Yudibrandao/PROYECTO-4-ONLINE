// import { MigrationInterface, QueryRunner, Table } from "typeorm";

// export class CreateUsuariosTable1710497679653 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(
//             new Table({
//                name: "users",
//                columns: [
//                   {
//                      name: "id",
//                      type: "int",
//                      isPrimary: true,
//                      isGenerated: true,
//                      generationStrategy: "increment",
//                   },
//                   {
//                      name: "firstName",
//                      type: "varchar",
//                      length: "50",
//                   },
//                   {
//                      name: "last_name",
//                      type: "varchar",
//                      length: "50",
//                      isNullable: true
//                   },
//                   {
//                      name: "email",
//                      type: "varchar",
//                      length: "100",
//                      isUnique: true,
//                   },

//                   {
//                      name: "password",
//                      type: "varchar",
//                      length: "255",
//                   },
//                   {
//                      name: "is_active",
//                      type: "boolean",
//                      default: true,
//                      isNullable: true
//                   },
//                   {
//                      name: "role_id",
//                      type: "int",
//                   },
//                ],
//                foreignKeys: [
//                   {
//                      columnNames: ["role_id"],
//                      referencedTableName: "roles",
//                      referencedColumnNames: ["id"],
//                   },
//                ],
//             }),
//             true
//          );
//       }

//     public async down(queryRunner: QueryRunner): Promise<void> {

//       await queryRunner.dropTable("users");
//     }

// }
