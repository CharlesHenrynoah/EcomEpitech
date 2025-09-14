import { Suspense } from "react"
import { LegalDocuments } from "@/components/admin/legal/legal-documents"
import { GdprSettings } from "@/components/admin/legal/gdpr-settings"
import { AuditLogs } from "@/components/admin/legal/audit-logs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LegalPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres Légaux & RGPD</h1>
          <p className="text-muted-foreground">Gérez les documents légaux et la conformité RGPD</p>
        </div>
      </div>

      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documents Légaux</TabsTrigger>
          <TabsTrigger value="gdpr">RGPD & Cookies</TabsTrigger>
          <TabsTrigger value="audit">Logs & Audit</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          <Suspense fallback={<div>Chargement des documents...</div>}>
            <LegalDocuments />
          </Suspense>
        </TabsContent>

        <TabsContent value="gdpr" className="space-y-4">
          <Suspense fallback={<div>Chargement des paramètres RGPD...</div>}>
            <GdprSettings />
          </Suspense>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Suspense fallback={<div>Chargement des logs...</div>}>
            <AuditLogs />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
