import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Uf } from "../../uf/entities/uf.entity";

@Entity("transport_rtx")
export class TransportRtx {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "integer", default: 0 })
    van!: number;

    @Column({ type: "integer", default: 0 })
    ambulance!: number;

    @Column({ type: "integer", default: 0 })
    minibus!: number;

    @Column({ type: "varchar", nullable: true })
    observation!: string | null;

    @Column({ name: "uf_id" })
    ufId!: number;

    @ManyToOne(() => Uf)
    @JoinColumn({ name: "uf_id" })
    uf!: Uf;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date | null;
}
