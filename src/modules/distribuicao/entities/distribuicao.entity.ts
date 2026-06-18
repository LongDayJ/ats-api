import {
    Column, CreateDateColumn, DeleteDateColumn,
    Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";
import { HistoricoEntry } from "../../../common/types/historico";

@Entity("distribuicao")
export class Distribuicao {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 2, unique: true })
    uf!: string;

    // RTx
    @Column({ name: "rtx_van", type: "integer", default: 0 })
    rtxVan!: number;

    @Column({ name: "rtx_ambulancia", type: "integer", default: 0 })
    rtxAmbulancia!: number;

    @Column({ name: "rtx_microonibus", type: "integer", default: 0 })
    rtxMicroonibus!: number;

    // TRS
    @Column({ name: "trs_van", type: "integer", default: 0 })
    trsVan!: number;

    @Column({ name: "trs_microonibus", type: "integer", default: 0 })
    trsMicroonibus!: number;

    @Column({ type: "jsonb", default: [] })
    historico!: HistoricoEntry[];

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date | null;
}
