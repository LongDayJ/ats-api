import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export type UserRole =
    | "admin"
    | "gestor_transporte"
    | "gestor_tomo"
    | "gestor_all"
    | "gestor_all_combo"
    | "visualizador_transporte"
    | "visualizador_tomo"
    | "visualizador_all";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar" })
    surname!: string;

    @Column({ type: "varchar", unique: true })
    email!: string;

    @Column({ name: "password", type: "varchar" })
    password!: string;

    @Column({ type: "varchar", default: "visualizador_transporte" })
    role!: UserRole;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", nullable: true })
    updatedAt!: Date | null;

    @DeleteDateColumn({ name: "deleted_at", nullable: true })
    deletedAt!: Date | null;
}
