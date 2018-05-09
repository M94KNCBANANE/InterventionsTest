import { ValidatorFn, AbstractControl } from "@angular/forms";

export class verifierCaracteresValidator {
    static sansEspace() : ValidatorFn{
        return (c: AbstractControl): { [key: string]: boolean} | null => {
            if(!c.value){
                return {'sansEspace':false};
                }
            if(c.value.trim().length!=0){
                return null;    
            }
        };
    }

    static longueurMinimum(min: number) : ValidatorFn{
        return(c: AbstractControl): { [key: string]: boolean} | null =>{
            if(!c.value){
                return {'longueurMinimum':false}
                }
            if(c.value.trim().length >=  min){
                return null; 
            }
            
        }
    }

}