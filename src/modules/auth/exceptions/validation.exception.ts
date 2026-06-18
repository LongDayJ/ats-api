import { BadRequestException } from "@nestjs/common";

interface ExceptionText {
    text?: string;
    textMulti?: string;
}

export class EmptyPayloadException extends BadRequestException {
    constructor(
        {
            text = "Os campos nao pode ser vazio",
            textMulti = "Os campos $FIELDS$ nao podem ser vazios",
        }: ExceptionText = {},
        fields: string[] = [],
    ) {
        const message =
            fields.length > 0
                ? textMulti.replace("$FIELDS$", fields.join(", "))
                : text;

        super(message);
    }
}
