import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorDelivered1700000006000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        // Adiciona observation na tabela uf
        await queryRunner.query(`
            ALTER TABLE "uf" ADD COLUMN IF NOT EXISTS "observation" VARCHAR
        `);

        // Remove tabelas delivered separadas
        await queryRunner.query(`DROP TABLE IF EXISTS "delivered_trs" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "delivered_rtx" CASCADE`);
        await queryRunner.query(`DROP TABLE IF EXISTS "entrega" CASCADE`);

        // Cria tabela unificada delivered_rtx_trs
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "delivered_rtx_trs" (
                "id"         SERIAL PRIMARY KEY,
                "van"        INTEGER NOT NULL DEFAULT 0,
                "ambulance"  INTEGER NOT NULL DEFAULT 0,
                "minibus"    INTEGER NOT NULL DEFAULT 0,
                "uf_id"      INTEGER NOT NULL REFERENCES "uf"("id"),
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ
            )
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "delivered_rtx_trs"`);
        await queryRunner.query(`ALTER TABLE "uf" DROP COLUMN IF EXISTS "observation"`);
    }
}
