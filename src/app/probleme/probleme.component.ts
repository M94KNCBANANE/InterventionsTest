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
      noProbleme: ['',Validators.required],
      Notification:['appliquerNotification'],
      telephone: [{value: '', disabled: true}],
      notificationCourrielGroupe: this.fb.group({
        Courriel: [{value: '', disabled: true}],
        CourrielValidation: [{value: '', disabled: true}]
      })

    });
    this.problemes.obtenirProblemes()
    .subscribe(type => this.typeProblemes = type,
               error => this.errorMessage = <any>error);

  }

  gestionNotification(typeNotification: string): void{
    const CourrielControl = this.problemeForm.get('notificationCourrielGroupe.Courriel');
    const telephoneControl = this.problemeForm.get('telephone');
    const CourrielValidationControl = this.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
   
    CourrielControl.clearValidators();
    CourrielValidationControl.clearValidators();
    telephoneControl.clearValidators();
    
    CourrielControl.reset();
    CourrielValidationControl.reset();
    telephoneControl.reset();

    CourrielControl.disable();
    telephoneControl.disable();
    CourrielValidationControl.disable();
    
    if(typeNotification === 'MeNotifier'){
      CourrielControl.enable();
      CourrielControl.setValidators([Validators.required]);
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required]);
      CourrielValidationControl.enable();
      CourrielValidationControl.setValidators([Validators.required]);
    }
    CourrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    CourrielValidationControl.updateValueAndValidity();
  }
}
