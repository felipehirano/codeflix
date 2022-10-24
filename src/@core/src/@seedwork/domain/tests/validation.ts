// This file must be set in setupFilesAfterEnv props that are in jest.config.ts for jest recognize this match.
import { FieldErrors } from "../../validators/validator-fields-interface";
import ClassValidatorFields from "../../validators/class-validator-fields";
import { EntityValidationError } from "../errors/validation-error";

// A idéia do segundo parâmetro é utilizar o expect(() => {}).toThrow(New Message());
type Expected = {validator: ClassValidatorFields<any>, data: any} | (() => any);

expect.extend({
    containsErrorMessages(expected:Expected, received: FieldErrors){
        if(typeof expected === "function") {
            try{
                expected();
                return isValid();
            }catch(e) {
                const error = e as EntityValidationError
                return assertContainsErrors(error.error, received);
            }
        }else {
            const {validator, data} = expected;
            const validated = validator.validate(data);
    
            if(validated){
                return isValid();
            }

            return assertContainsErrors(validator.errors, received);
        }
    }
});

function isValid() {
    return { pass: true, message: () => ""}
}

function assertContainsErrors(expected:FieldErrors, received:FieldErrors) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected);
    
    return isMatch 
        ? { pass: true, message: () => ""} 
        : {
            pass: false, 
            message: () => `The validation errors not contains ${JSON.stringify(
                received
            )}.Current: ${JSON.stringify(expected)}`,
        }
}