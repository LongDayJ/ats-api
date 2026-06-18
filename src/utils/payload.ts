import { EmptyPayloadException } from "../modules/auth/exceptions/validation.exception";

/**
 * [EN] Validates the payload object based on the provided schema keys.
 * [PT] Valida o objeto de payload com base nas chaves do schema fornecido.
 *
 * @template P - [EN] The type of the payload object. / [PT] O tipo do objeto de payload.
 * @param {P} data - [EN] The payload object to validate. / [PT] O objeto de payload a ser validado.
 * @param {(keyof P)[]} schema - [EN] The list of keys to validate in the payload. / [PT] A lista de chaves a serem validadas no payload.
 * @param {boolean} [showFields=true] - [EN] Whether to show the empty fields in the exception message. / [PT] Se deve exibir os campos vazios na mensagem de exceção.
 * @returns {P} [EN] The validated payload object. / [PT] O objeto de payload validado.
 * @throws {EmptyPayloadException} [EN] If the payload is null/undefined or has empty fields. / [PT] Se o payload for nulo/indefinido ou tiver campos vazios.
 *
 * @example
 * // ✅ [EN] Valid payload / [PT] Payload válido
 * validatePayload({ login: "igor", password: "123" }, ["login", "password"]);
 *
 * // ❌ [EN] Empty field / [PT] Campo vazio
 * validatePayload({ login: "igor", password: "" }, ["login", "password"]);
 * // throws: "Os campos password não podem ser vazios"
 *
 * // ❌ [EN] Empty fields hidden / [PT] Campos vazios ocultos
 * validatePayload({ login: "", password: "" }, ["login", "password"], false);
 * // throws: "Campos não pode ser vazio"
 *
 * @author MrIgortbr
 */
export function validatePayload<P extends Record<string, unknown>>(
    data: P,
    schema: (keyof P)[],
    showFields: boolean = true,
): P {
    if (data == null || data == undefined) {
        throw new EmptyPayloadException();
    }

    const emptyFields = schema.filter((key) => {
        const value = data[key];
        return (
            value === null ||
            value === undefined ||
            (typeof value === "string" && value.trim() === "")
        );
    }) as string[];

    if (emptyFields.length > 0) {
        throw new EmptyPayloadException({}, showFields ? emptyFields : []);
    }

    return data;
}
