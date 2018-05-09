import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { verifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeDeProblemeService } from './type-de-probleme.service';
import { ITypeDeProbleme } from './typeDeProbleme';
import { EmailValideValidator } from '../shared/Email-Validator';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typeProblemes: ITypeDeProbleme[];
  errorMessage: string;

  probleme: IProbleme;
  messageSauvegarde: string;
  constructor(private fb: FormBuilder, private TypeProblemes: TypeDeProblemeService, private problemeService : ProblemeService ) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      Prenom: ['',[verifierCaracteresValidator.longueurMinimum(3),verifierCaracteresValidator.sansEspace(), Validators.required]],
      Nom: ['',[verifierCaracteresValidator.longueurMinimum(3),verifierCaracteresValidator.sansEspace(), Validators.required]],
      noProbleme: ['',Validators.required],
      telephone: [{value: '', disabled: true}],
      notifier:['pasNotifier'],
      notificationCourrielGroupe: this.fb.group({
        Courriel: [{value: '', disabled: true}],
        CourrielValidation: [{value: '', disabled: true}]
      }),
    descriptionProbleme: ['', [Validators.required, Validators.minLength(5)]],
    noUnite:"",
    dateProbleme: {value: Date(), disabled:true}
     });
    this.TypeProblemes.obtenirProblemes()
    .subscribe(type => this.typeProblemes = type,
               error => this.errorMessage = <any>error);

    this.problemeForm.get('notifier').valueChanges
    .subscribe(value => this.gestionNotification(value));           
  }

  gestionNotification(typeNotification: string): void{
    const CourrielControl = this.problemeForm.get('notificationCourrielGroupe.Courriel');
    const telephoneControl = this.problemeForm.get('telephone');
    const CourrielValidationControl = this.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    const CourrielGroupControl = this.problemeForm.get('notificationCourrielGroupe');

    CourrielControl.clearValidators();
    CourrielValidationControl.clearValidators();
    telephoneControl.clearValidators();
    
    CourrielControl.reset();
    CourrielValidationControl.reset();
    telephoneControl.reset();

    CourrielControl.disable();
    telephoneControl.disable();
    CourrielValidationControl.disable();
    
    if(typeNotification === 'MeNotifierCourriel'){
      CourrielControl.enable();
      CourrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      CourrielValidationControl.enable();
      CourrielValidationControl.setValidators([Validators.required]);
      CourrielGroupControl.setValidators([Validators.compose([EmailValideValidator.EmailMatch()])]);
    }else if(typeNotification === 'MeNotifierMessagerie'){
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required,Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
      
    }
    CourrielControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
    CourrielValidationControl.updateValueAndValidity();
    CourrielGroupControl.updateValueAndValidity();
  }

  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
         this.probleme = this.problemeForm.value;
         // Affecter les valeurs qui proviennent du fg le plus interne.
         this.probleme.Courriel =  this.problemeForm.get('notificationCourrielGroupe.Courriel').value;
         this.probleme.CourrielValidation =  this.problemeForm.get('notificationCourrielGroupe.CourrielValidation').value;      
        this.probleme.dateProbleme = new Date();
         this.problemeService.saveProbleme(this.probleme)
            .subscribe( // on s'abonne car on a un retour du serveur à un moment donné avec la callback fonction
                () => this.onSaveComplete(),  // Fonction callback
                (error: any) => this.errorMessage = <any>error
            );
    } 
  }
  
  onSaveComplete(): void {
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.messageSauvegarde = 'Votre demande a bien été sauvegardée.  Nous vous remercions.';
  }
}
