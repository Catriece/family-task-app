import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1707623156933 implements MigrationInterface {
    name = 'AddColumnToUser1707623156933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "createdAt" bigint`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "createdAt" integer`);
    }

}
