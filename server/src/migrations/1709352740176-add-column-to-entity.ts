import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709352740176 implements MigrationInterface {
    name = 'AddColumnToEntity1709352740176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD CONSTRAINT "FK_d2b77c51d7b59bb613ac17167f7" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP CONSTRAINT "FK_d2b77c51d7b59bb613ac17167f7"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" ADD "userId" character varying`);
    }

}
