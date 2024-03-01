import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709061822558 implements MigrationInterface {
    name = 'AddColumnToEntity1709061822558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "preferredName" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "birthday" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "preferredName"`);
    }

}
