import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransportValue1700000005000 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "transport_value" (
                "id"         SERIAL PRIMARY KEY,
                "name"       VARCHAR NOT NULL,
                "price"      DECIMAL(12,2) NOT NULL DEFAULT 0,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMPTZ
            )
        `);
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "transport_value"`);
    }
}
