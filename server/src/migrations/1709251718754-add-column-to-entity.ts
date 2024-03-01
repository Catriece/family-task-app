import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709251718754 implements MigrationInterface {
    name = 'AddColumnToEntity1709251718754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "completed" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "completed"`);
    }

}
