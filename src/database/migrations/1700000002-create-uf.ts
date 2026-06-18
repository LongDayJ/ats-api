import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUf1700000002000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "uf" (
                "id"        SERIAL PRIMARY KEY,
                "uf"        VARCHAR(2) NOT NULL UNIQUE,
                "state"     VARCHAR NOT NULL,
                "agreement" VARCHAR,
                "cib"       VARCHAR
            )
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "uf"`);
    }
}
