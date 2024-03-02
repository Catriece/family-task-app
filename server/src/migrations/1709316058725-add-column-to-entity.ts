import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709316058725 implements MigrationInterface {
    name = 'AddColumnToEntity1709316058725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "profilePhoto" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "preferredName" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "birthday" character varying`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "dueOn"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "dueOn" date`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ALTER COLUMN "completed" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" ALTER COLUMN "completed" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "dueOn"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "dueOn" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "preferredName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "profilePhoto"`);
    }

}
