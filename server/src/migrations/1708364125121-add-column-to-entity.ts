import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1708364125121 implements MigrationInterface {
    name = 'AddColumnToEntity1708364125121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos_entity" ("id" SERIAL NOT NULL, CONSTRAINT "PK_22eaaae895974778a5889730a14" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos_entity"`);
    }

}
