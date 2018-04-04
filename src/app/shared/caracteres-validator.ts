import { ValidatorFn, AbstractControl } from "@angular/forms";

export class verifierCaracteresValidator {
    static sansEspace() : ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean} | null => {
            if(c.value.trim().length!=0){
                return { 'sansEspace':true};    
            }
            return { 'sansEspace':false};
        };
    }

    static longueurMinimum(min: number) : ValidatorFn{
        return(c: AbstractControl): { [key: string]: boolean} | null =>{
            if(c.value.trim().length >=  min){
                return { 'longueurMinimum':true};    
            }
            return {'longueurMinimum':false}
        }
    }

}