import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1711711763980 implements MigrationInterface {
    name = 'AddColumnToEntity1711711763980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP COLUMN "dueOn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD "dueOn" character varying`);
    }

}
