import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1707090531436 implements MigrationInterface {
    name = 'AddColumnToUser1707090531436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "preferredname"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "preferredName" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "user_entity_email_key"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "isActive" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "isActive" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "user_entity_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "preferredName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "preferredname" character varying(255)`);
    }

}
