import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709072487831 implements MigrationInterface {
    name = 'AddColumnToEntity1709072487831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "profilePhoto" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "profilePhoto"`);
    }

}
