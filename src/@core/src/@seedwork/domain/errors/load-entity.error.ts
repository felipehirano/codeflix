import { FieldErrors } from "#seedwork/validators/validator-fields-interface";

export class LoadEntityError extends Error {
    constructor(public error: FieldErrors, message?: string) {
        super(message ?? "Entity Validation Error");
        this.name = "LoadEntityError"
    };
}