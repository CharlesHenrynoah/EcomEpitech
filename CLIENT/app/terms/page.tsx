export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
          <p className="text-muted-foreground mb-8">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Informations Légales</h2>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <p>
                <strong>SneakerHub</strong>
              </p>
              <p>SARL au capital de 50 000€</p>
              <p>RCS Paris : 123 456 789</p>
              <p>SIRET : 123 456 789 00012</p>
              <p>TVA : FR12 123456789</p>
              <p>Adresse : 123 Rue de la Mode, 75001 Paris, France</p>
              <p>Email : contact@sneakerhub.fr</p>
              <p>Téléphone : 01 23 45 67 89</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Objet</h2>
            <p className="mb-4">
              Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre SneakerHub
              et ses clients dans le cadre de la vente en ligne de sneakers et accessoires.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Produits</h2>
            <p className="mb-4">
              SneakerHub propose à la vente des sneakers neuves et authentiques des plus grandes marques. Tous nos
              produits sont garantis 100% authentiques.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Photos non contractuelles</li>
              <li>Descriptions détaillées disponibles sur chaque fiche produit</li>
              <li>Stock limité, vente dans la limite des stocks disponibles</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Commandes</h2>
            <p className="mb-4">La commande est validée après :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Acceptation des présentes CGV</li>
              <li>Validation du paiement</li>
              <li>Confirmation par email</li>
            </ul>
            <p className="mb-4">
              SneakerHub se réserve le droit d'annuler toute commande en cas de rupture de stock ou de problème de
              paiement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Prix</h2>
            <p className="mb-4">
              Les prix sont indiqués en euros, toutes taxes comprises (TTC). Ils incluent la TVA applicable au jour de
              la commande.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Prix susceptibles de modification sans préavis</li>
              <li>Prix applicable : celui en vigueur au moment de la commande</li>
              <li>Frais de livraison en sus, calculés avant validation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Paiement</h2>
            <p className="mb-4">Moyens de paiement acceptés :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Carte bancaire (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Paiement en 3 fois sans frais (à partir de 100€)</li>
            </ul>
            <p className="mb-4">
              Le paiement est sécurisé par cryptage SSL. Aucune donnée bancaire n'est stockée sur nos serveurs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Livraison</h2>
            <p className="mb-4">Modes de livraison disponibles :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Standard (gratuite dès 75€) :</strong> 3-5 jours ouvrés
              </li>
              <li>
                <strong>Express (9,99€) :</strong> 24-48h
              </li>
              <li>
                <strong>Premium (19,99€) :</strong> Livraison le jour même (Paris uniquement)
              </li>
            </ul>
            <p className="mb-4">
              Livraison en France métropolitaine uniquement. Un numéro de suivi vous sera communiqué par email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Droit de Rétractation</h2>
            <p className="mb-4">
              Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un délai de 14 jours pour
              exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
            </p>
            <p className="mb-4">Conditions de retour :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Produits dans leur état d'origine</li>
              <li>Emballage d'origine conservé</li>
              <li>Étiquettes non retirées</li>
              <li>Aucun signe d'usure</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Garanties</h2>
            <p className="mb-4">Tous nos produits bénéficient :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>De la garantie légale de conformité (2 ans)</li>
              <li>De la garantie contre les vices cachés</li>
              <li>De notre garantie d'authenticité à vie</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Responsabilité</h2>
            <p className="mb-4">SneakerHub ne saurait être tenue responsable :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Des dommages résultant d'une utilisation anormale</li>
              <li>Des retards de livraison dus au transporteur</li>
              <li>De l'indisponibilité temporaire du site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Données Personnelles</h2>
            <p className="mb-4">
              Le traitement de vos données personnelles est régi par notre{" "}
              <a href="/privacy" className="text-primary underline">
                politique de confidentialité
              </a>
              , conforme au RGPD.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Litiges</h2>
            <p className="mb-4">
              En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les
              tribunaux de Paris seront seuls compétents.
            </p>
            <p className="mb-4">
              Médiation de la consommation :{" "}
              <a
                href="https://www.economie.gouv.fr/mediation-conso"
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.economie.gouv.fr/mediation-conso
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>Service Client</strong>
              </p>
              <p>
                Email :{" "}
                <a href="mailto:contact@sneakerhub.fr" className="text-primary underline">
                  contact@sneakerhub.fr
                </a>
              </p>
              <p>Téléphone : 01 23 45 67 89</p>
              <p>Horaires : Lundi-Vendredi 9h-18h</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
