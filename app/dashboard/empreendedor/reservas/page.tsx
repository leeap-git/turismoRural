"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Calendar, User, Check, X, Clock, Eye, MoreHorizontal, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const reservasData = [
  {
    id: "RES001",
    cliente: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(14) 99999-8888",
    atividade: "Trilha Ecológica",
    propriedade: "Fazenda Esperança",
    data: "15/04/2024",
    horario: "08:00",
    pessoas: 4,
    valor: 280.00,
    status: "pendente",
    dataCriacao: "10/04/2024",
  },
  {
    id: "RES002",
    cliente: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    telefone: "(14) 98888-7777",
    atividade: "Hospedagem - Chalé",
    propriedade: "Fazenda Esperança",
    data: "20/04/2024 - 22/04/2024",
    horario: "14:00",
    pessoas: 2,
    valor: 650.00,
    status: "confirmada",
    dataCriacao: "08/04/2024",
  },
  {
    id: "RES003",
    cliente: "Carlos Santos",
    email: "carlos.santos@email.com",
    telefone: "(14) 97777-6666",
    atividade: "Cavalgada",
    propriedade: "Sítio Bela Vista",
    data: "18/04/2024",
    horario: "09:00",
    pessoas: 3,
    valor: 450.00,
    status: "confirmada",
    dataCriacao: "05/04/2024",
  },
  {
    id: "RES004",
    cliente: "Ana Paula Ferreira",
    email: "ana.ferreira@email.com",
    telefone: "(14) 96666-5555",
    atividade: "Pesca Esportiva",
    propriedade: "Rancho do Sol",
    data: "12/04/2024",
    horario: "06:00",
    pessoas: 2,
    valor: 200.00,
    status: "concluida",
    dataCriacao: "01/04/2024",
  },
  {
    id: "RES005",
    cliente: "Roberto Lima",
    email: "roberto.lima@email.com",
    telefone: "(14) 95555-4444",
    atividade: "Tour pela Fazenda",
    propriedade: "Fazenda Esperança",
    data: "10/04/2024",
    horario: "10:00",
    pessoas: 5,
    valor: 250.00,
    status: "cancelada",
    dataCriacao: "28/03/2024",
  },
]

export default function ReservasEmpreendedorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPropriedade, setFilterPropriedade] = useState("todas")
  const [selectedReserva, setSelectedReserva] = useState<typeof reservasData[0] | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pendente</Badge>
      case "confirmada":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmada</Badge>
      case "concluida":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Concluída</Badge>
      case "cancelada":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelada</Badge>
      default:
        return null
    }
  }

  const pendentes = reservasData.filter((r) => r.status === "pendente")
  const confirmadas = reservasData.filter((r) => r.status === "confirmada")
  const concluidas = reservasData.filter((r) => r.status === "concluida")
  const canceladas = reservasData.filter((r) => r.status === "cancelada")

  const filteredReservas = reservasData.filter((r) => {
    const matchesSearch = 
      r.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.atividade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPropriedade = filterPropriedade === "todas" || r.propriedade === filterPropriedade
    return matchesSearch && matchesPropriedade
  })

  const openDetails = (reserva: typeof reservasData[0]) => {
    setSelectedReserva(reserva)
    setDetailsDialogOpen(true)
  }

  const ReservasTable = ({ reservas }: { reservas: typeof reservasData }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Atividade</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Pessoas</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservas.map((reserva) => (
          <TableRow key={reserva.id}>
            <TableCell className="font-mono text-sm">{reserva.id}</TableCell>
            <TableCell>{reserva.cliente}</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{reserva.atividade}</p>
                <p className="text-xs text-muted-foreground">{reserva.propriedade}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                {reserva.data}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3 text-muted-foreground" />
                {reserva.pessoas}
              </div>
            </TableCell>
            <TableCell className="font-medium">
              R$ {reserva.valor.toFixed(2)}
            </TableCell>
            <TableCell>{getStatusBadge(reserva.status)}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openDetails(reserva)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Ver detalhes
                  </DropdownMenuItem>
                  {reserva.status === "pendente" && (
                    <>
                      <DropdownMenuItem className="text-green-600">
                        <Check className="h-4 w-4 mr-2" />
                        Confirmar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <X className="h-4 w-4 mr-2" />
                        Recusar
                      </DropdownMenuItem>
                    </>
                  )}
                  {reserva.status === "confirmada" && (
                    <DropdownMenuItem className="text-destructive">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/dashboard/empreendedor" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Painel
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gerenciar Reservas</h1>
              <p className="text-muted-foreground">Visualize e gerencie todas as reservas</p>
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendentes.length}</p>
                    <p className="text-sm text-muted-foreground">Pendentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{confirmadas.length}</p>
                    <p className="text-sm text-muted-foreground">Confirmadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{concluidas.length}</p>
                    <p className="text-sm text-muted-foreground">Concluídas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-red-100">
                    <X className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{canceladas.length}</p>
                    <p className="text-sm text-muted-foreground">Canceladas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, atividade ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterPropriedade} onValueChange={setFilterPropriedade}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Propriedade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas as propriedades</SelectItem>
                <SelectItem value="Fazenda Esperança">Fazenda Esperança</SelectItem>
                <SelectItem value="Sítio Bela Vista">Sítio Bela Vista</SelectItem>
                <SelectItem value="Rancho do Sol">Rancho do Sol</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabela de Reservas */}
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="todas">
                <TabsList className="mb-4">
                  <TabsTrigger value="todas">Todas ({filteredReservas.length})</TabsTrigger>
                  <TabsTrigger value="pendentes">Pendentes ({pendentes.length})</TabsTrigger>
                  <TabsTrigger value="confirmadas">Confirmadas ({confirmadas.length})</TabsTrigger>
                  <TabsTrigger value="concluidas">Concluídas ({concluidas.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="todas">
                  <ReservasTable reservas={filteredReservas} />
                </TabsContent>
                <TabsContent value="pendentes">
                  <ReservasTable reservas={pendentes} />
                </TabsContent>
                <TabsContent value="confirmadas">
                  <ReservasTable reservas={confirmadas} />
                </TabsContent>
                <TabsContent value="concluidas">
                  <ReservasTable reservas={concluidas} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Dialog de Detalhes */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Reserva</DialogTitle>
            <DialogDescription>
              Código: {selectedReserva?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedReserva && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{selectedReserva.cliente}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  {getStatusBadge(selectedReserva.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">{selectedReserva.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{selectedReserva.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Atividade</p>
                  <p className="font-medium">{selectedReserva.atividade}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Propriedade</p>
                  <p className="font-medium">{selectedReserva.propriedade}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{selectedReserva.data}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horário</p>
                  <p className="font-medium">{selectedReserva.horario}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pessoas</p>
                  <p className="font-medium">{selectedReserva.pessoas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="font-bold text-lg">R$ {selectedReserva.valor.toFixed(2)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reserva criada em</p>
                <p className="font-medium">{selectedReserva.dataCriacao}</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {selectedReserva?.status === "pendente" && (
              <>
                <Button variant="outline" className="text-destructive border-destructive">
                  <X className="h-4 w-4 mr-2" />
                  Recusar
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-2" />
                  Confirmar Reserva
                </Button>
              </>
            )}
            {selectedReserva?.status === "confirmada" && (
              <Button variant="destructive">
                <X className="h-4 w-4 mr-2" />
                Cancelar Reserva
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
