import { ValidatorFn, AbstractControl } from "@angular/forms";

export class verifierCaracteresValidator {
    static plage() : ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean} | null => {
            if(c.value.trim().length!=0){
                return { 'plage':true};    
            }
            return { 'plage':false};
        };
    }

}