import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TypeDeProblemeService } from './type-de-probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AngularFontAwesomeModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [ TypeDeProblemeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('champ prénom invalide avec 2 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('champ prénom doit être valide a 3 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeUndefined();
  });

  it('champ prénom doit etre valide avec 200 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeUndefined();
  });

  it('champ prénom doit être invalide sans valeur', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('champ prénom doit avoir plus de 1 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('champ prénom doit être invalide avec 50 espaces', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue(' '.repeat(50));
    errors = zone.errors || {};
    expect(errors['sansEspace']).toBeFalsy();
  });

  it('champ prénom doit être invalide avec 2 espace et 1 caractère', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });
  it('Zone telephone est désactivé si non sélectionner', ()=>{
    component.gestionNotification('Non');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone telephone est vide quand ne pas me notifier', () =>{
    component.gestionNotification('Non');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  it('Zone Courriel est désactivé si non sélectionner', ()=>{
    component.gestionNotification('Non');

    let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone Courriel est vide quand ne pas me notifier', () =>{
    component.gestionNotification('Non');
    let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    expect(zone.value).toBeNull();
  });

  it('Zone courriel Validation est désactivé si non sélectionner', ()=>{
    component.gestionNotification('Non');

    let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone courriel Validation est vide quand ne pas me notifier', () =>{
    component.gestionNotification('Non');
    let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    expect(zone.value).toBeNull();
  });

  it('Zone Courriel a la même valeur que la zone CourrielValidation', () => {
    component.gestionNotification('MeNotifierCourriel');
    let errors = {};

    let courriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    let courrielValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    courriel.setValue('fred@hotmail.com');
    courrielValidation.setValue('fred@hotmail.com');

    let groupe = component.problemeForm.get('notificationCourrielGroupe');
    errors = groupe.errors || {};
    expect(errors['EmailMatch']).toBeUndefined();

  });

  it('Zone telephone est désactivé quand notifier par courriel', () => {
    component.gestionNotification('MeNotifierCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  
  it('Zone Courriel est activé quand notifier par courriel', () => {
    component.gestionNotification('MeNotifierCourriel');

    let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });


  it('Zone courriel Validation est activé quand notifier par courriel', () => {
    component.gestionNotification('MeNotifierCourriel');

    let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone courriel est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification('MeNotifierCourriel');
    let errors = {};
    
    let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });


  it('Zone courriel validation est invalide sans valeur quand notifier par courriel', () => {
    component.gestionNotification('MeNotifierCourriel');
    let errors = {};
    let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });


  it('Zone courriel est invalide avec un format non conforme', () => {
    component.gestionNotification('MeNotifierCourriel');
    let errors = {};
    let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    zone.setValue('asfsdftr342432523312fsdfsefsa');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });


  it('Zone courriel sans valeur et courriel validation avec valeur retourne null', () => {
    component.gestionNotification('MeNotifierCourriel');
    let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    zoneCourriel.setValue('');
    zoneValidation.setValue('Email@hotmail.com');
    let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeUndefined();
  });


  it('Zone courriel avec valeur et courriel validation sans valeur retourne null', () => {
    component.gestionNotification('MeNotifierCourriel');
    let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    zoneValidation.setValue('');
    zoneCourriel.setValue('Email@hotmail.com');
    let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeUndefined();
  });


  it('Zone courriel avec valeur et courriel validation avec valeur identique retourne null', () => {
    component.gestionNotification('MeNotifierCourriel');
    let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    zoneValidation.setValue('Email@hotmail.com');
    zoneCourriel.setValue('Email@hotmail.com');
    let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeUndefined();
  });


  it('Zone courriel et courriel validation sont valides si les valeurs sont différentes quand notifier courriel', () => {
    component.gestionNotification('MeNotifierCourriel');
    let zoneCourriel = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    let zoneValidation = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    zoneValidation.setValue('Email@hotmail.com');
    zoneCourriel.setValue('Emai321243l@hotmail.com');
    let zoneGroup = component.problemeForm.get('notificationCourrielGroupe');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeTruthy();
  });


  it('Zone telephone est activée quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone courriel est désactivée quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('notificationCourrielGroupe.Courriel');
    expect(zone.status).toEqual('DISABLED');
  });


  it('Zone courriel est désactivée quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('notificationCourrielGroupe.CourrielValidation');
    expect(zone.status).toEqual('DISABLED');
  });


  it('Zone telephone est invalide sans valeur quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone telephone est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('Aaaaaaa')
    let errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Zone telephone est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(9));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Zone telephone est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(11));
    let errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });

  it('Zone telephone est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.gestionNotification('MeNotifierMessagerie');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('1'.repeat(10));
    expect(zone.valid).toBeTruthy();
  });

});
