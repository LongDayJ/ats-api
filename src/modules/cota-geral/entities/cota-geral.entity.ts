import {
    Column, CreateDateColumn, DeleteDateColumn,
    Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { HistoricoEntry } from "../../../common/types/historico";

@Entity("cota_geral")
export class CotaGeral {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 2, unique: true })
    uf!: string;

    @Column({ type: "integer", default: 0 })
    ambulancia!: number;

    @Column({ type: "integer", default: 0 })
    van!: number;

    @Column({ type: "integer", default: 0 })
    microonibus!: number;

    @Column({ name: "entregues_van", type: "integer", default: 0 })
    entreguesVan!: number;

    @Column({ name: "entregues_ambulancia", type: "integer", default: 0 })
    entreguesAmbulancia!: number;

    @Column({ name: "entregues_microonibus", type: "integer", default: 0 })
    entreguesMicroonibus!: number;

    @Column({ type: "jsonb", default: [] })
    historico!: HistoricoEntry[];

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date | null;
}
