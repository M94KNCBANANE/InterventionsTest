import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AngularFontAwesomeModule],
      declarations: [ ProblemeComponent ]
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

  it('champ prénom doit être invalide avec 2 espace et 1 caractères', () =>{
    let errors = {};
    let zone = component.problemeForm.controls['Prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    errors = zone.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

});
