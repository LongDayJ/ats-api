import { MigrationInterface, QueryRunner } from "typeorm";

// Substituída por 1700000004-create-delivered.ts
export class LegacyCotaGeral1600000003000 implements MigrationInterface {
    async up(_: QueryRunner): Promise<void> {}
    async down(_: QueryRunner): Promise<void> {}
}
