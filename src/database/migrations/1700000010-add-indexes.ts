import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Índices de performance nas colunas de FK e busca frequente.
 * Sem isso cada JOIN faz full table scan.
 */
export class AddIndexes1700000010000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        // transport_rtx / transport_trs / general_quota — JOIN por uf_id
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_transport_rtx_uf_id        ON transport_rtx(uf_id)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_transport_trs_uf_id        ON transport_trs(uf_id)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_general_quota_uf_id        ON general_quota(uf_id)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_delivered_rtx_trs_uf_id   ON delivered_rtx_trs(uf_id)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_delivered_gq_uf_id        ON delivered_general_quota(uf_id)`);

        // hospital — busca por CNES + FK de UF
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_hospital_uf_id            ON hospital(uf_id)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_hospital_cnes             ON hospital(cnes)`);

        // hospital_tomo / hospital_rnm — JOIN por hospital_id
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_hospital_tomo_hospital_id ON hospital_tomo(hospital_id)`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_hospital_rnm_hospital_id  ON hospital_rnm(hospital_id)`);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS idx_transport_rtx_uf_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_transport_trs_uf_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_general_quota_uf_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_delivered_rtx_trs_uf_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_delivered_gq_uf_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_hospital_uf_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_hospital_cnes`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_hospital_tomo_hospital_id`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_hospital_rnm_hospital_id`);
    }
}
