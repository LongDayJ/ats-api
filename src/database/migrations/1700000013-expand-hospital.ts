import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpandHospital1700000013000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        // ── hospital_tomo: add delivery_date ─────────────────────────────────
        await queryRunner.query(`
            ALTER TABLE "hospital_tomo"
            ADD COLUMN IF NOT EXISTS "delivery_date" VARCHAR
        `);

        // ── hospital_rnm: add all TOMO-equivalent fields + delivery_date ──────
        await queryRunner.query(`
            ALTER TABLE "hospital_rnm"
            ADD COLUMN IF NOT EXISTS "contract"              VARCHAR,
            ADD COLUMN IF NOT EXISTS "structure_90_days"    VARCHAR,
            ADD COLUMN IF NOT EXISTS "form_sent"            VARCHAR,
            ADD COLUMN IF NOT EXISTS "form_received"        VARCHAR,
            ADD COLUMN IF NOT EXISTS "contact_notes"        TEXT,
            ADD COLUMN IF NOT EXISTS "contact_responsible"  VARCHAR,
            ADD COLUMN IF NOT EXISTS "priority_group"       VARCHAR,
            ADD COLUMN IF NOT EXISTS "delivery_order"       INTEGER,
            ADD COLUMN IF NOT EXISTS "construction"         VARCHAR,
            ADD COLUMN IF NOT EXISTS "installed"            VARCHAR,
            ADD COLUMN IF NOT EXISTS "ebserh_priority"      BOOLEAN,
            ADD COLUMN IF NOT EXISTS "delivery_date"        VARCHAR
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "hospital_tomo"
            DROP COLUMN IF EXISTS "delivery_date"
        `);

        await queryRunner.query(`
            ALTER TABLE "hospital_rnm"
            DROP COLUMN IF EXISTS "delivery_date",
            DROP COLUMN IF EXISTS "ebserh_priority",
            DROP COLUMN IF EXISTS "installed",
            DROP COLUMN IF EXISTS "construction",
            DROP COLUMN IF EXISTS "delivery_order",
            DROP COLUMN IF EXISTS "priority_group",
            DROP COLUMN IF EXISTS "contact_responsible",
            DROP COLUMN IF EXISTS "contact_notes",
            DROP COLUMN IF EXISTS "form_received",
            DROP COLUMN IF EXISTS "form_sent",
            DROP COLUMN IF EXISTS "structure_90_days",
            DROP COLUMN IF EXISTS "contract"
        `);
    }
}
