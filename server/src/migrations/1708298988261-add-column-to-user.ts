import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1708298988261 implements MigrationInterface {
    name = 'AddColumnToUser1708298988261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(255), "lastName" character varying(255), "email" character varying, "password" character varying, "isActive" boolean NOT NULL DEFAULT true, "createdAt" bigint, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
