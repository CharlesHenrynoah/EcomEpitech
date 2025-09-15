"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Cookie, Settings, X } from "lucide-react"

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false,
  })

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
    }
    setPreferences(allAccepted)
    localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleAcceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
    }
    setPreferences(onlyNecessary)
    localStorage.setItem("cookie-consent", JSON.stringify(onlyNecessary))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowSettings(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          {!showSettings ? (
            // Basic Banner
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Respect de votre Vie Privée</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site, analyser le trafic et
                    personnaliser le contenu. Vous pouvez choisir quels cookies accepter.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    En continuant à naviguer, vous acceptez notre utilisation des cookies conformément à notre{" "}
                    <a href="/privacy" className="text-primary underline">
                      politique de confidentialité
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptAll} className="flex-1">
                  Accepter Tous les Cookies
                </Button>
                <Button variant="outline" onClick={handleRejectAll} className="flex-1 bg-transparent">
                  Cookies Essentiels Uniquement
                </Button>
                <Button variant="ghost" onClick={() => setShowSettings(true)} className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Personnaliser
                </Button>
              </div>
            </div>
          ) : (
            // Detailed Settings
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Paramètres des Cookies</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Cookies Nécessaires</Label>
                      <p className="text-sm text-muted-foreground">
                        Indispensables au fonctionnement du site (panier, connexion, sécurité)
                      </p>
                    </div>
                    <Switch checked={preferences.necessary} disabled />
                  </div>
                </div>

                <Separator />

                {/* Analytics Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Cookies d'Analyse</Label>
                      <p className="text-sm text-muted-foreground">
                        Nous aident à comprendre comment vous utilisez le site pour l'améliorer
                      </p>
                    </div>
                    <Switch
                      checked={preferences.analytics}
                      onCheckedChange={(checked) => updatePreference("analytics", checked)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Marketing Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Cookies Marketing</Label>
                      <p className="text-sm text-muted-foreground">
                        Utilisés pour vous proposer des publicités pertinentes sur d'autres sites
                      </p>
                    </div>
                    <Switch
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => updatePreference("marketing", checked)}
                    />
                  </div>
                </div>

                <Separator />

                {/* Personalization Cookies */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Cookies de Personnalisation</Label>
                      <p className="text-sm text-muted-foreground">
                        Permettent de mémoriser vos préférences (langue, région, favoris)
                      </p>
                    </div>
                    <Switch
                      checked={preferences.personalization}
                      onCheckedChange={(checked) => updatePreference("personalization", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleAcceptSelected} className="flex-1">
                  Confirmer mes Choix
                </Button>
                <Button variant="outline" onClick={handleAcceptAll} className="flex-1 bg-transparent">
                  Accepter Tout
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Vous pouvez modifier ces paramètres à tout moment dans les paramètres de votre compte ou en bas de page.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
