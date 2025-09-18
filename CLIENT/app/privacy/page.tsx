export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          <p className="text-muted-foreground mb-8">Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Collecte des Données</h2>
            <p className="mb-4">
              SneakerHub collecte les données personnelles suivantes dans le cadre de ses activités :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Données d'identification : nom, prénom, adresse email</li>
              <li>Données de contact : adresse postale, numéro de téléphone</li>
              <li>Données de commande : historique d'achats, préférences</li>
              <li>Données techniques : adresse IP, cookies, données de navigation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Finalités du Traitement</h2>
            <p className="mb-4">Vos données personnelles sont traitées pour :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Traiter et livrer vos commandes</li>
              <li>Gérer votre compte client</li>
              <li>Vous contacter concernant vos commandes</li>
              <li>Améliorer nos services et votre expérience</li>
              <li>Vous envoyer des offres commerciales (avec votre consentement)</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Base Légale</h2>
            <p className="mb-4">Le traitement de vos données repose sur :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>L'exécution du contrat de vente</li>
              <li>Votre consentement pour les communications marketing</li>
              <li>Notre intérêt légitime pour l'amélioration de nos services</li>
              <li>Le respect d'obligations légales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Partage des Données</h2>
            <p className="mb-4">Vos données peuvent être partagées avec nos partenaires de confiance :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Transporteurs pour la livraison de vos commandes</li>
              <li>Prestataires de paiement pour le traitement des transactions</li>
              <li>Prestataires techniques pour l'hébergement et la maintenance</li>
              <li>Autorités compétentes si requis par la loi</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Vos Droits</h2>
            <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Droit d'accès à vos données personnelles</li>
              <li>Droit de rectification des données inexactes</li>
              <li>Droit à l'effacement ("droit à l'oubli")</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition au traitement</li>
              <li>Droit de retirer votre consentement</li>
            </ul>
            <p className="mb-4">
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href="mailto:privacy@sneakerhub.fr" className="text-primary underline">
                privacy@sneakerhub.fr
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="mb-4">Notre site utilise différents types de cookies :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>Cookies nécessaires :</strong> Indispensables au fonctionnement du site
              </li>
              <li>
                <strong>Cookies d'analyse :</strong> Pour comprendre l'utilisation du site
              </li>
              <li>
                <strong>Cookies marketing :</strong> Pour personnaliser les publicités
              </li>
              <li>
                <strong>Cookies de personnalisation :</strong> Pour mémoriser vos préférences
              </li>
            </ul>
            <p className="mb-4">
              Vous pouvez gérer vos préférences de cookies via la bannière de consentement ou dans les paramètres de
              votre navigateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Sécurité</h2>
            <p className="mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
              contre :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>L'accès non autorisé</li>
              <li>La modification, divulgation ou destruction</li>
              <li>La perte accidentelle</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Conservation</h2>
            <p className="mb-4">Vos données sont conservées pendant les durées suivantes :</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Données de commande : 10 ans (obligations comptables)</li>
              <li>Données de prospection : 3 ans après le dernier contact</li>
              <li>Données de navigation : 13 mois maximum</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
            <p className="mb-4">Pour toute question concernant cette politique de confidentialité :</p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>SneakerHub</strong>
              </p>
              <p>
                Email :{" "}
                <a href="mailto:privacy@sneakerhub.fr" className="text-primary underline">
                  privacy@sneakerhub.fr
                </a>
              </p>
              <p>Adresse : 123 Rue de la Mode, 75001 Paris, France</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Réclamations</h2>
            <p className="mb-4">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la
              CNIL :
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p>
                <strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong>
              </p>
              <p>3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07</p>
              <p>Téléphone : 01 53 73 22 22</p>
              <p>
                Site web :{" "}
                <a
                  href="https://www.cnil.fr"
                  className="text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.cnil.fr
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
