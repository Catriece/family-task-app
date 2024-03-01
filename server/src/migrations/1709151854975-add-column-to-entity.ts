import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1709151854975 implements MigrationInterface {
    name = 'AddColumnToEntity1709151854975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos_entity" RENAME COLUMN "id" TO "notesId"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" RENAME CONSTRAINT "PK_22eaaae895974778a5889730a14" TO "PK_4b78e3ea9214542f4ead90ff0ce"`);
        await queryRunner.query(`ALTER SEQUENCE "todos_entity_id_seq" RENAME TO "todos_entity_notesId_seq"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "preferredName"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "profilePhoto"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "profilePhoto" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "birthday" character varying`);
        await queryRunner.query(`ALTER TABLE "user_entity" ADD "preferredName" character varying`);
        await queryRunner.query(`ALTER SEQUENCE "todos_entity_notesId_seq" RENAME TO "todos_entity_id_seq"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" RENAME CONSTRAINT "PK_4b78e3ea9214542f4ead90ff0ce" TO "PK_22eaaae895974778a5889730a14"`);
        await queryRunner.query(`ALTER TABLE "todos_entity" RENAME COLUMN "notesId" TO "id"`);
    }

}
