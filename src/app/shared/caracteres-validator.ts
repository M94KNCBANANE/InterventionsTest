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

    static longueurMinimum(min: number) : ValidatorFn{
        return(c: AbstractControl): { [key: string]: boolean} | null =>{
            if(c.value.trim().length > min){
                return { 'texte':true};    
            }
            return {'texte':false}
        }
    }

}