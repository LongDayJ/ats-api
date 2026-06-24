import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCibDocument1700000011000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cib_document" (
                "id"            SERIAL PRIMARY KEY,
                "uf_id"         INTEGER NOT NULL REFERENCES "uf"("id") ON DELETE CASCADE,
                "filename"      VARCHAR NOT NULL,
                "mimetype"      VARCHAR NOT NULL,
                "size"          INTEGER NOT NULL,
                "data"          BYTEA NOT NULL,
                "uploaded_by"   VARCHAR NOT NULL,
                "created_at"    TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "idx_cib_document_uf_id" ON "cib_document"("uf_id")
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "cib_document"`);
    }
}
