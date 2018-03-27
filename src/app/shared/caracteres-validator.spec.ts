import { verifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator',() =>{
    it('une chaine vide est invalide', () =>{
        let control = {value : ''};
        let validator = verifierCaracteresValidator.plage();
        let result= validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () =>{
        let control = {value : '          '};
        let validator = verifierCaracteresValidator.plage();
        let result= validator(control as AbstractControl);
        expect(result['plage']).toBe(false);
    });

    it('une phrase avec des mots est valide', () =>{
        let control = {value : 'Je ne suis pas sur de ce que je fait'};
        let validator = verifierCaracteresValidator.plage();
        let result= validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () =>{
        let control = {value : '   banane   '};
        let validator = verifierCaracteresValidator.plage();
        let result= validator(control as AbstractControl);
        expect(result['plage']).toBe(true);
    });
});