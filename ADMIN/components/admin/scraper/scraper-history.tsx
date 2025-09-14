"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { History, Search, MoreHorizontal, Eye, Download, Trash2, CheckCircle, XCircle, Clock } from "lucide-react"

interface ScraperRun {
  id: string
  source: string
  status: "success" | "failed" | "running" | "cancelled"
  startTime: string
  endTime?: string
  duration?: number
  productsScraped: number
  productsUpdated: number
  errors: number
  isDryRun: boolean
}

export function ScraperHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sourceFilter, setSourceFilter] = useState<string>("all")

  // Mock data - replace with real API call
  const runs: ScraperRun[] = [
    {
      id: "run-001",
      source: "Amazon",
      status: "success",
      startTime: "2024-01-15T14:30:00Z",
      endTime: "2024-01-15T14:45:00Z",
      duration: 15,
      productsScraped: 150,
      productsUpdated: 142,
      errors: 0,
      isDryRun: false,
    },
    {
      id: "run-002",
      source: "Cdiscount",
      status: "failed",
      startTime: "2024-01-15T12:00:00Z",
      endTime: "2024-01-15T12:05:00Z",
      duration: 5,
      productsScraped: 23,
      productsUpdated: 0,
      errors: 5,
      isDryRun: false,
    },
    {
      id: "run-003",
      source: "Fnac",
      status: "running",
      startTime: "2024-01-15T15:00:00Z",
      productsScraped: 45,
      productsUpdated: 40,
      errors: 1,
      isDryRun: true,
    },
    {
      id: "run-004",
      source: "Amazon",
      status: "success",
      startTime: "2024-01-14T18:00:00Z",
      endTime: "2024-01-14T18:20:00Z",
      duration: 20,
      productsScraped: 200,
      productsUpdated: 195,
      errors: 0,
      isDryRun: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      success: { icon: CheckCircle, class: "bg-green-100 text-green-800 border-green-200" },
      failed: { icon: XCircle, class: "bg-red-100 text-red-800 border-red-200" },
      running: { icon: Clock, class: "bg-blue-100 text-blue-800 border-blue-200" },
      cancelled: { icon: XCircle, class: "bg-gray-100 text-gray-800 border-gray-200" },
    }

    const variant = variants[status as keyof typeof variants]
    const Icon = variant.icon

    const labels = {
      success: "Succès",
      failed: "Échec",
      running: "En cours",
      cancelled: "Annulé",
    }

    return (
      <Badge variant="outline" className={variant.class}>
        <Icon className="mr-1 h-3 w-3" />
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const handleViewDetails = (runId: string) => {
    console.log("View details for run:", runId)
  }

  const handleDownloadLogs = (runId: string) => {
    console.log("Download logs for run:", runId)
  }

  const handleDeleteRun = (runId: string) => {
    console.log("Delete run:", runId)
  }

  const filteredRuns = runs.filter((run) => {
    const matchesSearch =
      run.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      run.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || run.status === statusFilter
    const matchesSource = sourceFilter === "all" || run.source.toLowerCase() === sourceFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesSource
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <span>Historique des Runs</span>
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par ID ou source..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="success">Succès</SelectItem>
              <SelectItem value="failed">Échec</SelectItem>
              <SelectItem value="running">En cours</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="amazon">Amazon</SelectItem>
              <SelectItem value="cdiscount">Cdiscount</SelectItem>
              <SelectItem value="fnac">Fnac</SelectItem>
              <SelectItem value="darty">Darty</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID / Source</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Produits</TableHead>
              <TableHead>Erreurs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRuns.map((run) => (
              <TableRow key={run.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{run.id}</div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <span>{run.source}</span>
                      {run.isDryRun && (
                        <Badge variant="outline" className="text-xs">
                          Test
                        </Badge>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(run.status)}</TableCell>
                <TableCell>
                  <div className="text-sm">{new Date(run.startTime).toLocaleDateString("fr-FR")}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(run.startTime).toLocaleTimeString("fr-FR")}
                  </div>
                </TableCell>
                <TableCell>
                  {run.duration ? `${run.duration}min` : run.status === "running" ? "En cours" : "-"}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{run.productsScraped} scrapés</div>
                    <div className="text-muted-foreground">{run.productsUpdated} mis à jour</div>
                  </div>
                </TableCell>
                <TableCell>
                  {run.errors > 0 ? (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {run.errors}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(run.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDownloadLogs(run.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger logs
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteRun(run.id)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
