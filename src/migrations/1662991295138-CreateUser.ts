import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1662991295138 implements MigrationInterface {
    name = 'CreateUser1662991295138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

}
