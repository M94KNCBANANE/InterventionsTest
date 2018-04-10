import { ITypeDeProbleme } from "./typeDeProbleme";
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class problemeData implements InMemoryDbService{
    createDb(){
        let typeProbleme: ITypeDeProbleme[] = [
            {
                'id': 1,
                'descriptionProbleme': 'Problème avec la souris'
            },
            {
                'id': 2,
                'descriptionProbleme': 'Problème de clavier'
            },
            {
                'id': 3,
                'descriptionProbleme': 'Problème d\'accès Internet'
            },
            {
                'id': 4,
                'descriptionProbleme': 'Problème avec un logiciel'
            },
            {
                'id': 5,
                'descriptionProbleme': 'Problème d\'imprimante'
            },
            {
                'id': 6,
                'descriptionProbleme': 'Carte graphique'
            },
            {
                'id': 7,
                'descriptionProbleme': 'Carte mère'
            },
            {
                'id': 8,
                'descriptionProbleme': 'Autre'
            }
        ];
        return{typeProbleme};
    }
}