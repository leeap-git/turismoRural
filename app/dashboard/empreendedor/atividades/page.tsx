"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  MapPin,
  Clock,
  Filter
} from "lucide-react"

const atividades = [
  {
    id: 1,
    nome: "Trilha Ecológica na Mata",
    propriedade: "Fazenda Boa Vista",
    tipo: "trilha",
    preco: 45,
    vagas: 20,
    vagasOcupadas: 12,
    data: "2025-12-15",
    horario: "08:00",
    status: "ativa",
    descricao: "Trilha de 3km pela mata nativa com guia especializado.",
  },
  {
    id: 2,
    nome: "Colheita de Frutas Orgânicas",
    propriedade: "Sítio das Flores",
    tipo: "colheita",
    preco: 35,
    vagas: 15,
    vagasOcupadas: 15,
    data: "2025-12-18",
    horario: "09:00",
    status: "esgotada",
    descricao: "Colha frutas direto do pomar e leve para casa.",
  },
  {
    id: 3,
    nome: "Passeio a Cavalo",
    propriedade: "Fazenda Boa Vista",
    tipo: "passeio",
    preco: 80,
    vagas: 8,
    vagasOcupadas: 5,
    data: "2025-12-20",
    horario: "07:00",
    status: "ativa",
    descricao: "Passeio de 2 horas pelas trilhas da fazenda.",
  },
  {
    id: 4,
    nome: "Pesca Esportiva",
    propriedade: "Recanto Verde",
    tipo: "pesca",
    preco: 60,
    vagas: 10,
    vagasOcupadas: 3,
    data: "2025-12-22",
    horario: "06:00",
    status: "ativa",
    descricao: "Pesca no lago com equipamentos inclusos.",
  },
  {
    id: 5,
    nome: "Workshop de Queijos Artesanais",
    propriedade: "Sítio das Flores",
    tipo: "workshop",
    preco: 120,
    vagas: 12,
    vagasOcupadas: 0,
    data: "2025-12-25",
    horario: "14:00",
    status: "pausada",
    descricao: "Aprenda a fazer queijos artesanais com nossos mestres queijeiros.",
  },
]

const tiposAtividade = [
  { value: "todos", label: "Todos os tipos" },
  { value: "trilha", label: "Trilha" },
  { value: "colheita", label: "Colheita" },
  { value: "passeio", label: "Passeio" },
  { value: "pesca", label: "Pesca" },
  { value: "workshop", label: "Workshop" },
]

export default function GerenciarAtividadesPage() {
  const [busca, setBusca] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState("todos")
  const [statusFiltro, setStatusFiltro] = useState("todas")

  const atividadesFiltradas = atividades.filter((atividade) => {
    const matchBusca = atividade.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       atividade.propriedade.toLowerCase().includes(busca.toLowerCase())
    const matchTipo = tipoFiltro === "todos" || atividade.tipo === tipoFiltro
    const matchStatus = statusFiltro === "todas" || atividade.status === statusFiltro
    return matchBusca && matchTipo && matchStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativa":
        return <Badge className="bg-primary text-primary-foreground">Ativa</Badge>
      case "esgotada":
        return <Badge className="bg-accent text-accent-foreground">Esgotada</Badge>
      case "pausada":
        return <Badge variant="secondary">Pausada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    const cores: Record<string, string> = {
      trilha: "bg-green-100 text-green-800",
      colheita: "bg-yellow-100 text-yellow-800",
      passeio: "bg-blue-100 text-blue-800",
      pesca: "bg-cyan-100 text-cyan-800",
      workshop: "bg-purple-100 text-purple-800",
    }
    return (
      <Badge variant="outline" className={cores[tipo] || ""}>
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/dashboard/empreendedor" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao painel
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">Minhas Atividades</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie as atividades e eventos das suas propriedades
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/empreendedor/atividades/nova">
                <Plus className="h-4 w-4 mr-2" />
                Nova Atividade
              </Link>
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar atividade ou propriedade..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
                  <SelectTrigger className="w-full md:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposAtividade.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                  <SelectTrigger className="w-full md:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    <SelectItem value="ativa">Ativas</SelectItem>
                    <SelectItem value="esgotada">Esgotadas</SelectItem>
                    <SelectItem value="pausada">Pausadas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="lista" className="space-y-6">
            <TabsList>
              <TabsTrigger value="lista">Lista</TabsTrigger>
              <TabsTrigger value="calendario">Calendário</TabsTrigger>
            </TabsList>

            <TabsContent value="lista">
              {atividadesFiltradas.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma atividade encontrada</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      {busca || tipoFiltro !== "todos" || statusFiltro !== "todas"
                        ? "Tente ajustar os filtros de busca"
                        : "Comece cadastrando sua primeira atividade"}
                    </p>
                    <Button asChild>
                      <Link href="/dashboard/empreendedor/atividades/nova">
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Atividade
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {atividadesFiltradas.map((atividade) => (
                    <Card key={atividade.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold">{atividade.nome}</h3>
                                  {getTipoBadge(atividade.tipo)}
                                  {getStatusBadge(atividade.status)}
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {atividade.propriedade}
                                </p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Visualizar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Editar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Excluir
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {atividade.descricao}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {new Date(atividade.data).toLocaleDateString("pt-BR")}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {atividade.horario}
                              </span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Users className="h-4 w-4" />
                                {atividade.vagasOcupadas}/{atividade.vagas} vagas
                              </span>
                              <span className="font-semibold text-primary">
                                R$ {atividade.preco.toFixed(2)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                            <div className="w-full lg:w-32 bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{
                                  width: `${(atividade.vagasOcupadas / atividade.vagas) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {Math.round((atividade.vagasOcupadas / atividade.vagas) * 100)}% ocupado
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="calendario">
              <Card>
                <CardHeader>
                  <CardTitle>Calendário de Atividades</CardTitle>
                  <CardDescription>
                    Visualize suas atividades organizadas por data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((dia) => (
                      <div key={dia} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {dia}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const dia = i - 5 + 1
                      const temAtividade = atividades.some(
                        (a) => new Date(a.data).getDate() === dia && dia > 0 && dia <= 31
                      )
                      return (
                        <div
                          key={i}
                          className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                            dia > 0 && dia <= 31
                              ? temAtividade
                                ? "bg-primary text-primary-foreground font-semibold cursor-pointer hover:bg-primary/90"
                                : "hover:bg-muted cursor-pointer"
                              : "text-muted-foreground/30"
                          }`}
                        >
                          {dia > 0 && dia <= 31 ? dia : ""}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{atividades.length}</p>
                  <p className="text-sm text-muted-foreground">Total de Atividades</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {atividades.filter((a) => a.status === "ativa").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ativas</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-accent">
                    {atividades.reduce((acc, a) => acc + a.vagasOcupadas, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Reservas</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    R$ {atividades.reduce((acc, a) => acc + a.preco * a.vagasOcupadas, 0).toFixed(0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Receita Esperada</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
