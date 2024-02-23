import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1708365684723 implements MigrationInterface {
    name = 'AddColumnToEntity1708365684723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "userId" character varying`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "title" character varying`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "dueOn" character varying`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "priority" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "dueOn"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "userId"`);
    }

}
