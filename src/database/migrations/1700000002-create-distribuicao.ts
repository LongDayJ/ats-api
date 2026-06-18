import { MigrationInterface, QueryRunner } from "typeorm";

// Substituída por 1700000002-create-uf.ts
export class LegacyDistribuicao1600000001000 implements MigrationInterface {
    async up(_: QueryRunner): Promise<void> {}
    async down(_: QueryRunner): Promise<void> {}
}
