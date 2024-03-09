import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709934672262 implements MigrationInterface {
    name = 'AddColumnToEntity1709934672262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "dueOn"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "dueOn" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "dueOn"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "dueOn" date`);
    }

}
