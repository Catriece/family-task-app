import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToEntity1710277595292 implements MigrationInterface {
    name = 'AddColumnToEntity1710277595292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks_entity" ("taskId" SERIAL NOT NULL, "userId" uuid, "title" character varying, "description" character varying, "dueOn" character varying, "priority" integer, "completed" boolean DEFAULT false, CONSTRAINT "PK_fc897a313918c7a182a230ad483" PRIMARY KEY ("taskId"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profilePhoto" character varying(255), "firstName" character varying(255), "lastName" character varying(255), "preferredName" character varying, "email" character varying, "password" character varying, "birthday" character varying, "isActive" boolean NOT NULL DEFAULT false, "createdAt" bigint, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD CONSTRAINT "FK_a3687041fcd8a7a3892511dab22" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP CONSTRAINT "FK_a3687041fcd8a7a3892511dab22"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "tasks_entity"`);
    }

}
