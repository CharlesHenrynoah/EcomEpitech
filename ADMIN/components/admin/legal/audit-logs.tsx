"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Activity, AlertTriangle, Info, CheckCircle } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId?: string
  details: string
  ipAddress: string
  userAgent: string
  severity: "info" | "warning" | "critical"
}

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [dateRange, setDateRange] = useState<string>("7d")

  // Mock data - replace with real API call
  const auditLogs: AuditLog[] = [
    {
      id: "log-001",
      timestamp: "2024-01-15T14:30:00Z",
      userId: "admin-001",
      userName: "Marie Dubois",
      action: "product.delete",
      resource: "Product",
      resourceId: "prod-123",
      details: 'Suppression du produit "iPhone 15 Case"',
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "critical",
    },
    {
      id: "log-002",
      timestamp: "2024-01-15T14:25:00Z",
      userId: "admin-001",
      userName: "Marie Dubois",
      action: "product.price_update",
      resource: "Product",
      resourceId: "prod-456",
      details: "Modification du prix de 29.99€ à 24.99€",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "warning",
    },
    {
      id: "log-003",
      timestamp: "2024-01-15T14:20:00Z",
      userId: "mod-001",
      userName: "Pierre Martin",
      action: "user.role_change",
      resource: "User",
      resourceId: "user-789",
      details: "Changement de rôle de 'customer' à 'moderator'",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      severity: "critical",
    },
    {
      id: "log-004",
      timestamp: "2024-01-15T14:15:00Z",
      userId: "admin-001",
      userName: "Marie Dubois",
      action: "product.stock_update",
      resource: "Product",
      resourceId: "prod-789",
      details: "Mise à jour du stock: 50 → 45 unités",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "info",
    },
    {
      id: "log-005",
      timestamp: "2024-01-15T14:10:00Z",
      userId: "admin-001",
      userName: "Marie Dubois",
      action: "product.create",
      resource: "Product",
      resourceId: "prod-999",
      details: 'Création du produit "Samsung Galaxy Case"',
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      severity: "info",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    const variants = {
      info: { icon: Info, class: "bg-blue-100 text-blue-800 border-blue-200" },
      warning: { icon: AlertTriangle, class: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      critical: { icon: AlertTriangle, class: "bg-red-100 text-red-800 border-red-200" },
    }

    const variant = variants[severity as keyof typeof variants]
    const Icon = variant.icon

    const labels = {
      info: "Info",
      warning: "Attention",
      critical: "Critique",
    }

    return (
      <Badge variant="outline" className={variant.class}>
        <Icon className="mr-1 h-3 w-3" />
        {labels[severity as keyof typeof labels]}
      </Badge>
    )
  }

  const getActionBadge = (action: string) => {
    const actionType = action.split(".")[1] || action
    const variants = {
      create: "bg-green-100 text-green-800 border-green-200",
      update: "bg-blue-100 text-blue-800 border-blue-200",
      delete: "bg-red-100 text-red-800 border-red-200",
      price_update: "bg-orange-100 text-orange-800 border-orange-200",
      stock_update: "bg-purple-100 text-purple-800 border-purple-200",
      role_change: "bg-indigo-100 text-indigo-800 border-indigo-200",
    }

    const labels = {
      create: "Création",
      update: "Modification",
      delete: "Suppression",
      price_update: "Prix",
      stock_update: "Stock",
      role_change: "Rôle",
    }

    return (
      <Badge
        variant="outline"
        className={variants[actionType as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200"}
      >
        {labels[actionType as keyof typeof labels] || actionType}
      </Badge>
    )
  }

  const handleExportLogs = () => {
    // API call to export logs
    console.log("Exporting audit logs")
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || log.severity === severityFilter
    const matchesAction = actionFilter === "all" || log.action.includes(actionFilter)

    return matchesSearch && matchesSeverity && matchesAction
  })

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.length}</div>
            <p className="text-xs text-muted-foreground">Dernières 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions Critiques</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.filter((log) => log.severity === "critical").length}</div>
            <p className="text-xs text-muted-foreground">Nécessitent attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Actifs</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(auditLogs.map((log) => log.userId)).size}</div>
            <p className="text-xs text-muted-foreground">Utilisateurs uniques</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions/Heure</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground">Moyenne dernière heure</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Logs d'Audit</span>
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher dans les logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Attention</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="create">Création</SelectItem>
                <SelectItem value="update">Modification</SelectItem>
                <SelectItem value="delete">Suppression</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExportLogs}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horodatage</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Sévérité</TableHead>
                <TableHead>Détails</TableHead>
                <TableHead>IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(log.timestamp).toLocaleDateString("fr-FR")}</div>
                      <div className="text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString("fr-FR")}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.userName}</div>
                      <div className="text-sm text-muted-foreground">{log.userId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={log.details}>
                      {log.details}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono">{log.ipAddress}</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
