import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1707090814841 implements MigrationInterface {
    name = 'AddColumnToUser1707090814841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "preferredName" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "firstName" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "lastName" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "firstName" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "preferredName"`);
    }

}
