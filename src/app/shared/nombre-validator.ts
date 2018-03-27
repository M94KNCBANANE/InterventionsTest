import { ValidatorFn } from "@angular/forms";

export class verifierNombresValidator {
    static plage() : ValidatorFn{
        return (): { [key: string]: boolean} | null => {
            return { 'plage':true};
        };
    }

}