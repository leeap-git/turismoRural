"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  CalendarCheck,
  Eye
} from "lucide-react"

const stats = [
  { label: "Reservas este mês", value: "24", change: "+12%", icon: CalendarCheck },
  { label: "Visitantes únicos", value: "156", change: "+8%", icon: Users },
  { label: "Receita mensal", value: "R$ 12.450", change: "+15%", icon: DollarSign },
  { label: "Visualizações", value: "1.2k", change: "+23%", icon: Eye },
]

const recentReservations = [
  { id: "1", cliente: "Maria Santos", atividade: "Hospedagem", data: "15/03/2026", valor: 640, status: "confirmada" },
  { id: "2", cliente: "Pedro Oliveira", atividade: "Trilha Ecológica", data: "16/03/2026", valor: 160, status: "pendente" },
  { id: "3", cliente: "Ana Costa", atividade: "Colheita de Café", data: "20/03/2026", valor: 240, status: "confirmada" },
  { id: "4", cliente: "Carlos Lima", atividade: "Passeio a Cavalo", data: "22/03/2026", valor: 300, status: "pendente" },
]

const recentMessages = [
  { id: "1", remetente: "João Silva", assunto: "Dúvida sobre hospedagem", tempo: "2h atrás", lida: false },
  { id: "2", remetente: "Fernanda Souza", assunto: "Reserva para grupo", tempo: "5h atrás", lida: false },
  { id: "3", remetente: "Ricardo Alves", assunto: "Cancelamento", tempo: "1 dia", lida: true },
]

export default function DashboardEmpreendedorPage() {
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
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
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
                      href="/dashboard/empreendedor/disponibilidade" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Disponibilidade
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/mensagens" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagens
                      <Badge variant="destructive" className="ml-auto text-xs">2</Badge>
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/relatorios" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Painel do Empreendedor
                  </h1>
                  <p className="text-muted-foreground">
                    Bem-vindo! Aqui está um resumo da sua propriedade.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/dashboard/empreendedor/atividades/nova">
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Atividade
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <stat.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">{stat.change}</span>
                        <span className="text-muted-foreground">vs. mês anterior</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Reservations */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Reservas Recentes</CardTitle>
                      <CardDescription>Últimas reservas realizadas</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/empreendedor/reservas">Ver todas</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentReservations.map((reserva) => (
                        <div key={reserva.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div>
                            <p className="font-medium text-foreground">{reserva.cliente}</p>
                            <p className="text-sm text-muted-foreground">{reserva.atividade} • {reserva.data}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground">R$ {reserva.valor.toFixed(2)}</p>
                            <Badge variant={reserva.status === "confirmada" ? "default" : "secondary"} className="text-xs">
                              {reserva.status === "confirmada" ? "Confirmada" : "Pendente"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Messages */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle className="text-lg">Mensagens</CardTitle>
                      <CardDescription>Mensagens de visitantes</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/empreendedor/mensagens">Ver todas</Link>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentMessages.map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                          <div className={`w-2 h-2 rounded-full mt-2 ${msg.lida ? "bg-muted" : "bg-primary"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className={`font-medium ${msg.lida ? "text-muted-foreground" : "text-foreground"}`}>
                                {msg.remetente}
                              </p>
                              <span className="text-xs text-muted-foreground">{msg.tempo}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{msg.assunto}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <Link href="/dashboard/empreendedor/propriedade">
                        <Building2 className="h-5 w-5" />
                        <span className="text-sm">Editar Propriedade</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <Link href="/dashboard/empreendedor/atividades/nova">
                        <Plus className="h-5 w-5" />
                        <span className="text-sm">Nova Atividade</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <Link href="/dashboard/empreendedor/disponibilidade">
                        <Calendar className="h-5 w-5" />
                        <span className="text-sm">Disponibilidade</span>
                      </Link>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                      <Link href="/dashboard/empreendedor/relatorios">
                        <BarChart3 className="h-5 w-5" />
                        <span className="text-sm">Ver Relatórios</span>
                      </Link>
                    </Button>
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
