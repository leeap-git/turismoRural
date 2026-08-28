"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  CalendarCheck,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  PieChart,
  Activity
} from "lucide-react"

const reservasPorStatus = [
  { status: "Confirmadas", quantidade: 45, porcentagem: 64, cor: "bg-primary" },
  { status: "Pendentes", quantidade: 12, porcentagem: 17, cor: "bg-accent" },
  { status: "Canceladas", quantidade: 13, porcentagem: 19, cor: "bg-destructive" },
]

const atividadesMaisProcuradas = [
  { nome: "Trilha Ecológica", reservas: 89, ocupacao: 78 },
  { nome: "Colheita de Café", reservas: 67, ocupacao: 92 },
  { nome: "Passeio a Cavalo", reservas: 54, ocupacao: 65 },
  { nome: "Hospedagem", reservas: 45, ocupacao: 58 },
  { nome: "Aula de Culinária", reservas: 32, ocupacao: 45 },
]

const clientesRecentes = [
  { nome: "Maria Santos", email: "maria@email.com", telefone: "(14) 99999-1111", reservas: 3 },
  { nome: "Pedro Oliveira", email: "pedro@email.com", telefone: "(14) 99999-2222", reservas: 2 },
  { nome: "Ana Costa", email: "ana@email.com", telefone: "(14) 99999-3333", reservas: 2 },
  { nome: "Carlos Lima", email: "carlos@email.com", telefone: "(14) 99999-4444", reservas: 1 },
  { nome: "Fernanda Souza", email: "fernanda@email.com", telefone: "(14) 99999-5555", reservas: 1 },
]

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("mes")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">Fazenda Bela Vista</h2>
                    <p className="text-sm text-muted-foreground">Ourinhos, SP</p>
                    <Badge className="mt-2">Empreendedor</Badge>
                  </div>

                  <nav className="space-y-1">
                    <Link 
                      href="/dashboard/empreendedor" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Painel Geral
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/propriedade" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Building2 className="h-4 w-4" />
                      Minha Propriedade
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/atividades" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Atividades/Eventos
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/reservas" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Reservas
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/mensagens" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagens
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/relatorios" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Relatórios
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/configuracoes" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors w-full">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Relatórios Gerenciais
                  </h1>
                  <p className="text-muted-foreground">
                    Acompanhe o desempenho da sua propriedade
                  </p>
                </div>
                <div className="flex gap-2">
                  <Select value={periodo} onValueChange={setPeriodo}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semana">Esta semana</SelectItem>
                      <SelectItem value="mes">Este mês</SelectItem>
                      <SelectItem value="trimestre">Trimestre</SelectItem>
                      <SelectItem value="ano">Este ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Reservas</p>
                        <p className="text-2xl font-bold text-foreground">70</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CalendarCheck className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">+15%</span>
                      <span className="text-muted-foreground">vs. período anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Receita Total</p>
                        <p className="text-2xl font-bold text-foreground">R$ 18.750</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">+22%</span>
                      <span className="text-muted-foreground">vs. período anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Clientes Únicos</p>
                        <p className="text-2xl font-bold text-foreground">48</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">+8%</span>
                      <span className="text-muted-foreground">vs. período anterior</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Taxa Cancelamento</p>
                        <p className="text-2xl font-bold text-foreground">19%</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-destructive" />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">-3%</span>
                      <span className="text-muted-foreground">vs. período anterior</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Reservas por Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Reservas por Status
                    </CardTitle>
                    <CardDescription>
                      Distribuição das reservas no período
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {reservasPorStatus.map((item) => (
                        <div key={item.status} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{item.status}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.quantidade} ({item.porcentagem}%)
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${item.cor} rounded-full`}
                              style={{ width: `${item.porcentagem}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Atividades Mais Procuradas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Atividades Mais Procuradas
                    </CardTitle>
                    <CardDescription>
                      Ranking de reservas por atividade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {atividadesMaisProcuradas.map((item, index) => (
                        <div key={item.nome} className="flex items-center gap-4">
                          <span className="text-lg font-bold text-muted-foreground w-6">
                            {index + 1}º
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{item.nome}</span>
                              <span className="text-sm text-muted-foreground">{item.reservas} reservas</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${item.ocupacao}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground w-10">{item.ocupacao}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Clientes */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Clientes com Reservas</CardTitle>
                    <CardDescription>
                      Lista de visitantes que realizaram reservas
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Nome</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">E-mail</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Telefone</th>
                          <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Reservas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientesRecentes.map((cliente, index) => (
                          <tr key={index} className="border-b border-border last:border-0">
                            <td className="py-3 px-4 text-sm font-medium text-foreground">{cliente.nome}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{cliente.email}</td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{cliente.telefone}</td>
                            <td className="py-3 px-4 text-sm text-right">
                              <Badge variant="secondary">{cliente.reservas}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
