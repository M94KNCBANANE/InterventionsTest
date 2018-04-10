import { ValidatorFn, AbstractControl } from "@angular/forms";

export class EmailValideValidator {
    static EmailMatch() : ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean} | null => {
        let email = c.get('Courriel');
        let emailValidation = c.get('CourrielValidation');

        if(!email.value || !emailValidation.value){
            return null;
        }

        if(email.value === emailValidation.value){
            return null;
        }
        return {'Match': true};
        };
    }

}