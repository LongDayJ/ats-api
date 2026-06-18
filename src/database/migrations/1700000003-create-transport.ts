import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransport1700000003000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "transport_rtx" (
                "id"         SERIAL PRIMARY KEY,
                "van"        INTEGER NOT NULL DEFAULT 0,
                "ambulance"  INTEGER NOT NULL DEFAULT 0,
                "minibus"    INTEGER NOT NULL DEFAULT 0,
                "uf_id"      INTEGER NOT NULL REFERENCES "uf"("id"),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "transport_trs" (
                "id"         SERIAL PRIMARY KEY,
                "van"        INTEGER NOT NULL DEFAULT 0,
                "microbus"   INTEGER NOT NULL DEFAULT 0,
                "uf_id"      INTEGER NOT NULL REFERENCES "uf"("id"),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "general_quota" (
                "id"         SERIAL PRIMARY KEY,
                "van"        INTEGER NOT NULL DEFAULT 0,
                "ambulance"  INTEGER NOT NULL DEFAULT 0,
                "microbus"   INTEGER NOT NULL DEFAULT 0,
                "uf_id"      INTEGER NOT NULL REFERENCES "uf"("id"),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ
            )
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "general_quota"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "transport_trs"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "transport_rtx"`);
    }
}
