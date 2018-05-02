import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/probleme');
  }

  getParagraphText() {
    return element(by.css('Inter-root h5')).getText();
  }

  setChampsValidesScenarioNominal() : void {
    element(by.id('PrenomId')).sendKeys('Pierre-Paul');
    element(by.id('NomId')).sendKeys('Pierre-Paul');
    // Sélectionner le premier élément dans la zone de liste déroulante
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();      
    // Cliquer sur la première option du bouton radio
    element.all(by.id('notificationId')).get(0).click();      
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
  }

   setChampsValidesScenarioAlternatifParMessageTexte() : void {
    element(by.id('PrenomId')).sendKeys('tonprenom');
    element(by.id('NomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notificationId')).get(2).click();
    element(by.id('TelephoneId')).sendKeys('5141231234');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   }
   setChampsValidesScenarioAlternatifParCourriel() : void {
    element(by.id('PrenomId')).sendKeys('tonprenom');
    element(by.id('NomId')).sendKeys('tonnom');
    // Sélectionner le X élément dans la zone de liste déroulante
    element(by.id('noProblemeId')).all(by.tagName('option')).get(2).click();
    // Cliquer sur le bouton radio voulu
    element.all(by.id('notificationId')).get(1).click();
    element(by.id('EmailId')).sendKeys('aa@bbb.com');
    element(by.id('EmailValideId')).sendKeys('aa@bbb.com');
    element(by.id('descriptionProblemeId')).sendKeys('Problème entre la chaise et le clavier...');
   } 

  boutonSubmit() : ElementFinder { 
    return element(by.buttonText('Sauvegarder'));
  }   

  setZoneDescriptionProblemeCaracteresInsuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XX');
  }

  setZoneDescriptionProblemeCaracteresSuffisant() : void {
    element(by.id('descriptionProblemeId')).clear();
    element(by.id('descriptionProblemeId')).sendKeys('XXXXX');
  }


  obtenirClasseZoneNomProduit()   { 
    return element(by.id('descriptionProblemeId')).getAttribute("class");
  }   
}
