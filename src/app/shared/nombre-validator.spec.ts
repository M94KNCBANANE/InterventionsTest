import { verifierNombresValidator } from "./nombre-validator";

describe('Nombre Validator',() =>{
    it('plage pour la valeur valide limite 1', () =>{
        let validator = verifierNombresValidator.plage();
        let result= validator(null);
        expect(result['plage'].toBe(true));
    });
});