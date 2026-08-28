"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Calendar as CalendarIcon, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Save,
  Ban,
  Check
} from "lucide-react"
import { addDays, format, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"

const atividades = [
  { id: "1", nome: "Hospedagem", cor: "bg-primary" },
  { id: "2", nome: "Trilha Ecológica", cor: "bg-accent" },
  { id: "3", nome: "Passeio a Cavalo", cor: "bg-chart-3" },
  { id: "4", nome: "Colheita de Café", cor: "bg-chart-4" },
]

const reservasExistentes = [
  { data: addDays(new Date(), 2), atividade: "Hospedagem", cliente: "Maria Santos" },
  { data: addDays(new Date(), 3), atividade: "Hospedagem", cliente: "Maria Santos" },
  { data: addDays(new Date(), 5), atividade: "Trilha Ecológica", cliente: "Pedro Oliveira" },
  { data: addDays(new Date(), 8), atividade: "Passeio a Cavalo", cliente: "Ana Costa" },
  { data: addDays(new Date(), 10), atividade: "Colheita de Café", cliente: "Carlos Lima" },
]

const diasBloqueados = [
  addDays(new Date(), 15),
  addDays(new Date(), 16),
  addDays(new Date(), 17),
]

export default function DisponibilidadePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [month, setMonth] = useState(new Date())

  const isDayBlocked = (day: Date) => {
    return diasBloqueados.some(d => isSameDay(d, day))
  }

  const getDayReservations = (day: Date) => {
    return reservasExistentes.filter(r => isSameDay(r.data, day))
  }

  const toggleDateSelection = (day: Date) => {
    if (selectedDates.some(d => isSameDay(d, day))) {
      setSelectedDates(selectedDates.filter(d => !isSameDay(d, day)))
    } else {
      setSelectedDates([...selectedDates, day])
    }
  }

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
                      <CalendarIcon className="h-4 w-4" />
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
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      <CalendarIcon className="h-4 w-4" />
                      Disponibilidade
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
                    Gerenciar Disponibilidade
                  </h1>
                  <p className="text-muted-foreground">
                    Configure os dias disponíveis para reservas
                  </p>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendário */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Calendário</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setMonth(addDays(month, -30))}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-32 text-center">
                          {format(month, "MMMM yyyy", { locale: ptBR })}
                        </span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setMonth(addDays(month, 30))}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      month={month}
                      onMonthChange={setMonth}
                      locale={ptBR}
                      className="rounded-md border w-full"
                      modifiers={{
                        booked: reservasExistentes.map(r => r.data),
                        blocked: diasBloqueados,
                        selected: selectedDates,
                      }}
                      modifiersStyles={{
                        booked: { backgroundColor: "var(--primary)", color: "var(--primary-foreground)" },
                        blocked: { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)", textDecoration: "line-through" },
                        selected: { outline: "2px solid var(--ring)", outlineOffset: "2px" },
                      }}
                    />

                    <div className="flex flex-wrap gap-4 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-primary" />
                        <span className="text-sm text-muted-foreground">Com reserva</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-destructive" />
                        <span className="text-sm text-muted-foreground">Bloqueado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded border-2 border-ring" />
                        <span className="text-sm text-muted-foreground">Selecionado</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Painel Lateral */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Ban className="h-4 w-4 mr-2" />
                        Bloquear dias selecionados
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Check className="h-4 w-4 mr-2" />
                        Desbloquear dias
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Detalhes do Dia</CardTitle>
                      <CardDescription>
                        {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione um dia"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {date && (
                        <div className="space-y-4">
                          {isDayBlocked(date) ? (
                            <div className="p-4 bg-destructive/10 rounded-lg">
                              <p className="font-medium text-destructive">Dia bloqueado</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Este dia não está disponível para reservas
                              </p>
                              <Button variant="outline" size="sm" className="mt-3">
                                Desbloquear
                              </Button>
                            </div>
                          ) : getDayReservations(date).length > 0 ? (
                            <div className="space-y-3">
                              <p className="text-sm text-muted-foreground">Reservas neste dia:</p>
                              {getDayReservations(date).map((reserva, index) => (
                                <div key={index} className="p-3 bg-muted rounded-lg">
                                  <p className="font-medium text-foreground">{reserva.atividade}</p>
                                  <p className="text-sm text-muted-foreground">{reserva.cliente}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 bg-primary/10 rounded-lg">
                              <p className="font-medium text-primary">Disponível</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Este dia está disponível para reservas
                              </p>
                              <Button variant="outline" size="sm" className="mt-3">
                                Bloquear
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Legenda de Atividades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {atividades.map((atividade) => (
                          <div key={atividade.id} className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${atividade.cor}`} />
                            <span className="text-sm text-muted-foreground">{atividade.nome}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Próximas Reservas */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximas Reservas</CardTitle>
                  <CardDescription>Reservas confirmadas para os próximos dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservasExistentes.slice(0, 6).map((reserva, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">
                            {format(reserva.data, "dd/MM/yyyy")}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{reserva.atividade}</p>
                        <p className="text-sm text-muted-foreground">{reserva.cliente}</p>
                      </div>
                    ))}
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
