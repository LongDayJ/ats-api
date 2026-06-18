import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1700000001000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "users" (
                "id"         SERIAL PRIMARY KEY,
                "name"       VARCHAR NOT NULL,
                "surname"    VARCHAR NOT NULL,
                "email"      VARCHAR NOT NULL UNIQUE,
                "password"   VARCHAR NOT NULL,
                "role"       VARCHAR NOT NULL DEFAULT 'visualizador',
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ,
                "deleted_at" TIMESTAMPTZ
            )
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "users"`);
    }
}
