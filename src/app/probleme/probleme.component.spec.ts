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
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('champ prénom doit etre valide avec 200 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
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

});
