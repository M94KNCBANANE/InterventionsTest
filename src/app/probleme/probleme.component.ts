import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { verifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeDeProblemeService } from './type-de-probleme.service';
import { ITypeDeProbleme } from './typeDeProbleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: any;
  produitForm: FormGroup;
  typeProblemes: ITypeDeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private problemes: TypeDeProblemeService ) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      Prenom: ['',[verifierCaracteresValidator.longueurMinimum(3),verifierCaracteresValidator.sansEspace(), Validators.required]],
      Nom: ['',[verifierCaracteresValidator.longueurMinimum(3),verifierCaracteresValidator.sansEspace(), Validators.required]],
      noProbleme: ['',Validators.required]
    });
    this.problemes.obtenirProblemes()
    .subscribe(type => this.typeProblemes = type,
               error => this.errorMessage = <any>error);

  }

}
