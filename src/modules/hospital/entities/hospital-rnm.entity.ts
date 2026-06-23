import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Hospital } from "./hospital.entity";

@Entity("hospital_rnm")
export class HospitalRnm {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "hospital_id", type: "integer", unique: true })
    hospitalId!: number;

    @OneToOne(() => Hospital, (h) => h.rnm)
    @JoinColumn({ name: "hospital_id" })
    hospital!: Hospital;

    @Column({ type: "varchar", nullable: true })
    status!: string | null; // '1º Contrato' | 'Pré-selecionado' | 'Lista de espera' | 'AVALIAR'

    @Column({ type: "text", nullable: true })
    notes!: string | null;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt!: Date | null;
}
