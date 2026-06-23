import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Hospital } from "./entities/hospital.entity";
import { HospitalTomo } from "./entities/hospital-tomo.entity";
import { HospitalRnm } from "./entities/hospital-rnm.entity";
import { Uf } from "../uf/entities/uf.entity";
import { UpdateHospitalTomoDto, UpdateHospitalRnmDto } from "./dto/hospital.dto";

const DEMAS_BASE = "https://apidadosabertos.saude.gov.br/cnes";

interface DemasEstabelecimento {
    codigo_cnes: number;
    nome_razao_social: string;
    nome_fantasia: string | null;
    codigo_municipio: number;
    natureza_organizacional?: { descricao: string };
    tipo_gestao?: { descricao: string };
}

interface DemasMunicipio {
    codigo: number;
    nome: string;
    uf: string;
}

function toTitleCase(str: string): string {
    const SKIP = ["de", "da", "do", "das", "dos", "e", "a", "o", "em", "no", "na"];
    return str
        .toLowerCase()
        .split(" ")
        .map((w, i) => (i === 0 || !SKIP.includes(w) ? w.charAt(0).toUpperCase() + w.slice(1) : w))
        .join(" ");
}

@Injectable()
export class HospitalService {
    constructor(
        @InjectRepository(Hospital)
        private readonly hospitalRepo: Repository<Hospital>,
        @InjectRepository(HospitalTomo)
        private readonly tomoRepo: Repository<HospitalTomo>,
        @InjectRepository(HospitalRnm)
        private readonly rnmRepo: Repository<HospitalRnm>,
        @InjectRepository(Uf)
        private readonly ufRepo: Repository<Uf>,
        private readonly dataSource: DataSource,
    ) {}

    // ── DEMAS API ──────────────────────────────────────────────────────────────

    async fetchCnes(cnes: string): Promise<{ name: string; municipality: string; ufSigla: string; cnes: string }> {
        const cleanCnes = cnes.trim().replace(/\D/g, "");
        if (!cleanCnes || cleanCnes.length > 7) {
            throw new BadRequestException("CNES inválido");
        }

        // Chamada 1 — estabelecimento
        const estabRes = await fetch(`${DEMAS_BASE}/estabelecimentos/${cleanCnes}`);
        if (!estabRes.ok) {
            throw new NotFoundException(`CNES ${cleanCnes} não encontrado no DEMAS`);
        }
        const estab: DemasEstabelecimento = await estabRes.json();

        // Chamada 2 — município
        const munRes = await fetch(`${DEMAS_BASE}/municipios/${estab.codigo_municipio}`);
        if (!munRes.ok) {
            throw new NotFoundException(`Município ${estab.codigo_municipio} não encontrado no DEMAS`);
        }
        const mun: DemasMunicipio = await munRes.json();

        const rawName = estab.nome_fantasia || estab.nome_razao_social;
        return {
            cnes: cleanCnes,
            name: toTitleCase(rawName),
            municipality: toTitleCase(mun.nome),
            ufSigla: mun.uf.toUpperCase(),
        };
    }

    // ── LOOKUP (sem persistir) ─────────────────────────────────────────────────

    async lookup(cnes: string) {
        return this.fetchCnes(cnes);
    }

    // ── CREATE ─────────────────────────────────────────────────────────────────

    async create(cnes: string): Promise<Hospital> {
        const existing = await this.hospitalRepo.findOne({ where: { cnes } });
        if (existing) throw new BadRequestException(`Hospital com CNES ${cnes} já cadastrado`);

        const demas = await this.fetchCnes(cnes);

        const uf = await this.ufRepo.findOne({ where: { uf: demas.ufSigla } });
        if (!uf) throw new NotFoundException(`UF ${demas.ufSigla} não encontrada no banco`);

        return this.dataSource.transaction(async (em) => {
            const hospital = em.create(Hospital, {
                ufId: uf.id,
                name: demas.name,
                municipality: demas.municipality,
                cnes: demas.cnes,
            });
            await em.save(hospital);

            // Cria os registros tomo/rnm vazios para o hospital
            await em.save(HospitalTomo, em.create(HospitalTomo, { hospitalId: hospital.id }));
            await em.save(HospitalRnm, em.create(HospitalRnm, { hospitalId: hospital.id }));

            return hospital;
        });
    }

    // ── BULK CREATE ────────────────────────────────────────────────────────────

    async bulkCreate(cnesList: string[]): Promise<{ created: string[]; skipped: string[]; errors: string[] }> {
        const created: string[] = [];
        const skipped: string[] = [];
        const errors: string[] = [];

        for (const cnes of cnesList) {
            const existing = await this.hospitalRepo.findOne({ where: { cnes } });
            if (existing) { skipped.push(cnes); continue; }

            try {
                await this.create(cnes);
                created.push(cnes);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : String(err);
                errors.push(`${cnes}: ${message}`);
            }
        }

        return { created, skipped, errors };
    }

    // ── LIST TOMO ─────────────────────────────────────────────────────────────

    async findAllTomo() {
        return this.tomoRepo.find({
            relations: { hospital: { uf: true } },
            order: { hospital: { uf: { uf: "ASC" }, name: "ASC" } },
        });
    }

    // ── LIST RNM ──────────────────────────────────────────────────────────────

    async findAllRnm() {
        return this.rnmRepo.find({
            relations: { hospital: { uf: true } },
            order: { hospital: { uf: { uf: "ASC" }, name: "ASC" } },
        });
    }

    // ── UPDATE TOMO ───────────────────────────────────────────────────────────

    async updateTomo(hospitalId: number, data: UpdateHospitalTomoDto): Promise<HospitalTomo> {
        const record = await this.tomoRepo.findOne({ where: { hospitalId }, relations: { hospital: { uf: true } } });
        if (!record) throw new NotFoundException(`Registro TOMO para hospital ${hospitalId} não encontrado`);

        Object.assign(record, data);
        return this.tomoRepo.save(record);
    }

    // ── UPDATE RNM ────────────────────────────────────────────────────────────

    async updateRnm(hospitalId: number, data: UpdateHospitalRnmDto): Promise<HospitalRnm> {
        const record = await this.rnmRepo.findOne({ where: { hospitalId }, relations: { hospital: { uf: true } } });
        if (!record) throw new NotFoundException(`Registro RNM para hospital ${hospitalId} não encontrado`);

        Object.assign(record, data);
        return this.rnmRepo.save(record);
    }
}
