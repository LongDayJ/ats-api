import { MigrationInterface, QueryRunner } from "typeorm";

// Substituída por 1700000003-create-transport.ts
export class LegacyEntrega1600000002000 implements MigrationInterface {
    async up(_: QueryRunner): Promise<void> {}
    async down(_: QueryRunner): Promise<void> {}
}
