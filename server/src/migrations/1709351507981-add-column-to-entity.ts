import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709351507981 implements MigrationInterface {
    name = 'AddColumnToEntity1709351507981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

}
