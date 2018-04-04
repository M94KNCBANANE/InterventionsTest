import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { verifierCaracteresValidator } from '../shared/caracteres-validator';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: any;
  produitForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      Prenom: ['',[verifierCaracteresValidator.longueurMinimum(3),verifierCaracteresValidator.sansEspace(), Validators.required]]
      //caracteres : ['',[Validators.range(1,3)]]

    });
  }

}
