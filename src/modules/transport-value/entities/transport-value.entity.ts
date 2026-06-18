import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transport_value")
export class TransportValue {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    price!: number;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date | null;
}
