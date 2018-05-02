import { AppPage } from './app.po';

describe('stocks App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('doit afficher le titre du formulaire Déclarer un problème', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Déclarer un problème');
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario nominal', () => {
    page.setChampsValidesScenarioNominal();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });   

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif Par message TEXTE', () => {
    page.setChampsValidesScenarioAlternatifParMessageTexte();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('doit activer le bouton Sauvegarder avec champs valides scénario alternatif par courriel', () => {
    page.setChampsValidesScenarioAlternatifParCourriel();                    
    expect(page.boutonSubmit().isEnabled()).toBe(true);
  });

  it('zone Description du probleme a une bordure ROUGE si nombre de caractères insuffisant', () => {
    page.setZoneDescriptionProblemeCaracteresInsuffisant();  
    expect(page.obtenirClasseZoneNomProduit()).toContain('is-invalid');
  });  

  it('zone Description du probleme a une bordure VERTE si nombre de caractères Suffisant', () => {
    page.setZoneDescriptionProblemeCaracteresSuffisant();  
    expect(page.obtenirClasseZoneNomProduit()).toContain('is-valid');
  });  
});
