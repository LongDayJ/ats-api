import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHospital1700000009000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "hospital" (
                "id"           SERIAL PRIMARY KEY,
                "uf_id"        INTEGER NOT NULL REFERENCES "uf"("id"),
                "name"         VARCHAR NOT NULL,
                "municipality" VARCHAR NOT NULL,
                "cnes"         VARCHAR(7),
                "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "hospital_tomo" (
                "id"                   SERIAL PRIMARY KEY,
                "hospital_id"          INTEGER NOT NULL UNIQUE REFERENCES "hospital"("id") ON DELETE CASCADE,
                "status"               VARCHAR,
                "contract"             VARCHAR,
                "structure_90_days"    VARCHAR,
                "form_sent"            VARCHAR,
                "form_received"        VARCHAR,
                "contact_notes"        TEXT,
                "contact_responsible"  VARCHAR,
                "priority_group"       VARCHAR,
                "delivery_order"       INTEGER,
                "construction"         VARCHAR,
                "installed"            VARCHAR,
                "created_at"           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                "updated_at"           TIMESTAMPTZ
            )
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "hospital_rnm" (
                "id"           SERIAL PRIMARY KEY,
                "hospital_id"  INTEGER NOT NULL UNIQUE REFERENCES "hospital"("id") ON DELETE CASCADE,
                "status"       VARCHAR,
                "notes"        TEXT,
                "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                "updated_at"   TIMESTAMPTZ
            )
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "hospital_rnm"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "hospital_tomo"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "hospital"`);
    }
}
