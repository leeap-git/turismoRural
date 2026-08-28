"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  CalendarCheck,
  Bell,
  Mail,
  Smartphone,
  Shield,
  CreditCard,
  Globe,
  Save
} from "lucide-react"

export default function ConfiguracoesEmpreendedorPage() {
  const [notificacoes, setNotificacoes] = useState({
    emailReservas: true,
    emailMensagens: true,
    emailMarketing: false,
    pushReservas: true,
    pushMensagens: true,
  })

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
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Relatórios
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/configuracoes" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
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
                    Configurações
                  </h1>
                  <p className="text-muted-foreground">
                    Gerencie suas preferências e configurações da conta
                  </p>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>

              <Tabs defaultValue="notificacoes" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                  <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
                  <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                  <TabsTrigger value="preferencias">Preferências</TabsTrigger>
                </TabsList>

                <TabsContent value="notificacoes">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-5 w-5" />
                          Notificações por E-mail
                        </CardTitle>
                        <CardDescription>Configure quais e-mails você deseja receber</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Novas reservas</Label>
                            <p className="text-sm text-muted-foreground">Receber e-mail quando houver uma nova reserva</p>
                          </div>
                          <Switch 
                            checked={notificacoes.emailReservas}
                            onCheckedChange={(checked) => setNotificacoes({...notificacoes, emailReservas: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Novas mensagens</Label>
                            <p className="text-sm text-muted-foreground">Receber e-mail quando houver uma nova mensagem</p>
                          </div>
                          <Switch 
                            checked={notificacoes.emailMensagens}
                            onCheckedChange={(checked) => setNotificacoes({...notificacoes, emailMensagens: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Novidades e promoções</Label>
                            <p className="text-sm text-muted-foreground">Receber e-mails sobre novidades da plataforma</p>
                          </div>
                          <Switch 
                            checked={notificacoes.emailMarketing}
                            onCheckedChange={(checked) => setNotificacoes({...notificacoes, emailMarketing: checked})}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5" />
                          Notificações Push
                        </CardTitle>
                        <CardDescription>Configure as notificações no navegador</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Reservas</Label>
                            <p className="text-sm text-muted-foreground">Notificações sobre reservas</p>
                          </div>
                          <Switch 
                            checked={notificacoes.pushReservas}
                            onCheckedChange={(checked) => setNotificacoes({...notificacoes, pushReservas: checked})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Mensagens</Label>
                            <p className="text-sm text-muted-foreground">Notificações sobre mensagens</p>
                          </div>
                          <Switch 
                            checked={notificacoes.pushMensagens}
                            onCheckedChange={(checked) => setNotificacoes({...notificacoes, pushMensagens: checked})}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="pagamentos">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Dados Bancários
                        </CardTitle>
                        <CardDescription>Configure onde receberá os pagamentos das reservas</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="banco">Banco</Label>
                            <Input id="banco" defaultValue="Banco do Brasil" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="agencia">Agência</Label>
                            <Input id="agencia" defaultValue="1234-5" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="conta">Conta</Label>
                            <Input id="conta" defaultValue="12345-6" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tipo">Tipo de conta</Label>
                            <Input id="tipo" defaultValue="Corrente" />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="titular">Nome do titular</Label>
                            <Input id="titular" defaultValue="Fazenda Bela Vista LTDA" />
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="cpfcnpj">CPF/CNPJ</Label>
                            <Input id="cpfcnpj" defaultValue="12.345.678/0001-90" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Histórico de Pagamentos</CardTitle>
                        <CardDescription>Últimos pagamentos recebidos</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { data: "01/03/2026", valor: "R$ 2.450,00", status: "Pago" },
                            { data: "01/02/2026", valor: "R$ 3.120,00", status: "Pago" },
                            { data: "01/01/2026", valor: "R$ 1.890,00", status: "Pago" },
                          ].map((pagamento, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                              <div>
                                <p className="font-medium text-foreground">{pagamento.data}</p>
                                <p className="text-sm text-muted-foreground">Transferência bancária</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-foreground">{pagamento.valor}</p>
                                <Badge variant="outline">{pagamento.status}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="seguranca">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Alterar Senha
                        </CardTitle>
                        <CardDescription>Mantenha sua conta segura</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="senhaAtual">Senha atual</Label>
                          <Input id="senhaAtual" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="novaSenha">Nova senha</Label>
                          <Input id="novaSenha" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmarSenha">Confirmar nova senha</Label>
                          <Input id="confirmarSenha" type="password" />
                        </div>
                        <Button>Alterar Senha</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sessões Ativas</CardTitle>
                        <CardDescription>Dispositivos conectados à sua conta</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { dispositivo: "Chrome no Windows", local: "Ourinhos, SP", atual: true },
                            { dispositivo: "Safari no iPhone", local: "Ourinhos, SP", atual: false },
                          ].map((sessao, index) => (
                            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                              <div>
                                <p className="font-medium text-foreground">{sessao.dispositivo}</p>
                                <p className="text-sm text-muted-foreground">{sessao.local}</p>
                              </div>
                              {sessao.atual ? (
                                <Badge>Sessão atual</Badge>
                              ) : (
                                <Button variant="outline" size="sm">Encerrar</Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="preferencias">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Preferências Gerais
                      </CardTitle>
                      <CardDescription>Configure suas preferências de uso</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="idioma">Idioma</Label>
                        <Input id="idioma" defaultValue="Português (Brasil)" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="moeda">Moeda</Label>
                        <Input id="moeda" defaultValue="Real (BRL)" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fuso">Fuso horário</Label>
                        <Input id="fuso" defaultValue="America/Sao_Paulo (GMT-3)" disabled />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
