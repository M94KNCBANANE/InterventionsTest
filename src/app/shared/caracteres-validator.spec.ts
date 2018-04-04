import { verifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator',() =>{
    it('une chaine vide est invalide', () =>{
        let control = {value : ''};
        let validator = verifierCaracteresValidator.sansEspace();
        let result= validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(false);
    });

    it('une chaîne avec 10 espaces est invalide', () =>{
        let control = {value : '          '};
        let validator = verifierCaracteresValidator.sansEspace();
        let result= validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(false);
    });

    it('une phrase avec des mots est valide', () =>{
        let control = {value : 'Je ne suis pas sur de ce que je fait'};
        let validator = verifierCaracteresValidator.sansEspace();
        let result= validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(true);
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () =>{
        let control = {value : '   banane   '};
        let validator = verifierCaracteresValidator.sansEspace();
        let result= validator(control as AbstractControl);
        expect(result['sansEspace']).toBe(true);
    });
});

describe('longueurMinimum Validator', () => {
    it('une expression avec 1 espace et 2 caractère est invalide', () =>{
        let control = {value : ' xx'};
        let validator = verifierCaracteresValidator.longueurMinimum(3);
        let result= validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une expression avec 2 espaces et 1 caractère est invalide', () =>{
        let control = {value : '  x'};
        let validator = verifierCaracteresValidator.longueurMinimum(3);
        let result= validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () =>{
        let control = {value : '   J\'aime Angular'};
        let validator = verifierCaracteresValidator.longueurMinimum(3);
        let result= validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });

    it('une phrase avec 5 espaces, 5 caractères et ensuite 5 espaces est valide', () =>{
        let control = {value : '     J\'aime Angular     '};
        let validator = verifierCaracteresValidator.longueurMinimum(3);
        let result= validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });
});