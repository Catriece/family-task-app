import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1711626165546 implements MigrationInterface {
    name = 'AddColumnToEntity1711626165546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD "priority" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD "priority" integer`);
    }

}
