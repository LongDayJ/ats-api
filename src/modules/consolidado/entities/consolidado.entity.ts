import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    name: "consolidado",
    expression: `
        SELECT
            d.uf,
            d.rtx_van,
            d.rtx_ambulancia,
            d.rtx_microonibus,
            d.trs_van,
            d.trs_microonibus,
            COALESCE(cg.van, 0)                   AS cota_van,
            COALESCE(cg.ambulancia, 0)            AS cota_ambulancia,
            COALESCE(cg.microonibus, 0)           AS cota_microonibus,
            (
                d.rtx_van + d.rtx_ambulancia + d.rtx_microonibus +
                d.trs_van + d.trs_microonibus +
                COALESCE(cg.van, 0) + COALESCE(cg.ambulancia, 0) + COALESCE(cg.microonibus, 0)
            )                                     AS total_geral
        FROM distribuicao d
        LEFT JOIN cota_geral cg ON cg.uf = d.uf AND cg.deleted_at IS NULL
        WHERE d.deleted_at IS NULL
        ORDER BY d.uf
    `,
})
export class Consolidado {
    @ViewColumn()
    uf!: string;

    @ViewColumn({ name: "rtx_van" })
    rtxVan!: number;

    @ViewColumn({ name: "rtx_ambulancia" })
    rtxAmbulancia!: number;

    @ViewColumn({ name: "rtx_microonibus" })
    rtxMicroonibus!: number;

    @ViewColumn({ name: "trs_van" })
    trsVan!: number;

    @ViewColumn({ name: "trs_microonibus" })
    trsMicroonibus!: number;

    @ViewColumn({ name: "cota_van" })
    cotaVan!: number;

    @ViewColumn({ name: "cota_ambulancia" })
    cotaAmbulancia!: number;

    @ViewColumn({ name: "cota_microonibus" })
    cotaMicroonibus!: number;

    @ViewColumn({ name: "total_geral" })
    totalGeral!: number;
}
