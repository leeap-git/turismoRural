"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, MailOpen, Reply, Trash2, Search, Filter, MoreHorizontal, Check, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const mensagensData = [
  {
    id: "1",
    remetente: "Carlos Santos",
    email: "carlos.santos@email.com",
    assunto: "Dúvida sobre hospedagem",
    mensagem: "Olá! Gostaria de saber se vocês têm disponibilidade para o feriado de 15 de novembro. Somos um grupo de 6 pessoas e gostaríamos de fazer a trilha ecológica também. Qual seria o valor total?",
    propriedade: "Fazenda Esperança",
    data: "Hoje às 14:32",
    status: "nao_lida",
  },
  {
    id: "2",
    remetente: "Ana Paula Ferreira",
    email: "ana.ferreira@email.com",
    assunto: "Reserva para evento",
    mensagem: "Bom dia! Estou organizando um aniversário de 50 anos e gostaria de saber se é possível realizar na fazenda. Seriam aproximadamente 40 convidados.",
    propriedade: "Fazenda Esperança",
    data: "Ontem às 16:45",
    status: "nao_lida",
  },
  {
    id: "3",
    remetente: "Roberto Lima",
    email: "roberto.lima@email.com",
    assunto: "Informações sobre cavalgada",
    mensagem: "Boa tarde! Vi no site que vocês oferecem cavalgada. Minha filha de 8 anos pode participar? Qual é a duração do passeio?",
    propriedade: "Sítio Bela Vista",
    data: "23/03/2024",
    status: "lida",
  },
  {
    id: "4",
    remetente: "Fernanda Oliveira",
    email: "fernanda.oliveira@email.com",
    assunto: "Agradecimento pela estadia",
    mensagem: "Olá! Gostaria de agradecer pela maravilhosa experiência que tivemos no final de semana passado. A família toda adorou! Com certeza voltaremos!",
    propriedade: "Fazenda Esperança",
    data: "20/03/2024",
    status: "respondida",
  },
  {
    id: "5",
    remetente: "Marcos Souza",
    email: "marcos.souza@email.com",
    assunto: "Cancelamento de reserva",
    mensagem: "Infelizmente precisarei cancelar minha reserva para o dia 30/03. Houve um imprevisto familiar. Como faço para solicitar o reembolso?",
    propriedade: "Sítio Bela Vista",
    data: "18/03/2024",
    status: "respondida",
  },
]

export default function MensagensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMensagem, setSelectedMensagem] = useState<typeof mensagensData[0] | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  const naoLidas = mensagensData.filter((m) => m.status === "nao_lida")
  const lidas = mensagensData.filter((m) => m.status === "lida")
  const respondidas = mensagensData.filter((m) => m.status === "respondida")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nao_lida":
        return <Badge variant="default">Nova</Badge>
      case "lida":
        return <Badge variant="secondary">Lida</Badge>
      case "respondida":
        return <Badge variant="outline" className="text-primary border-primary">Respondida</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "nao_lida":
        return <Mail className="h-4 w-4" />
      case "lida":
        return <MailOpen className="h-4 w-4" />
      case "respondida":
        return <CheckCheck className="h-4 w-4 text-primary" />
      default:
        return null
    }
  }

  const MensagemCard = ({ mensagem }: { mensagem: typeof mensagensData[0] }) => (
    <Card 
      className={`cursor-pointer transition-colors hover:bg-muted/50 ${mensagem.status === "nao_lida" ? "border-primary/50 bg-primary/5" : ""}`}
      onClick={() => setSelectedMensagem(mensagem)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{mensagem.remetente.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className={`font-medium truncate ${mensagem.status === "nao_lida" ? "text-foreground" : "text-muted-foreground"}`}>
                {mensagem.remetente}
              </p>
              <div className="flex items-center gap-2">
                {getStatusBadge(mensagem.status)}
                <span className="text-xs text-muted-foreground whitespace-nowrap">{mensagem.data}</span>
              </div>
            </div>
            <p className={`text-sm mt-1 ${mensagem.status === "nao_lida" ? "font-medium" : ""}`}>
              {mensagem.assunto}
            </p>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {mensagem.mensagem}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Propriedade: {mensagem.propriedade}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
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
              <h1 className="text-2xl font-bold text-foreground">Caixa de Mensagens</h1>
              <p className="text-muted-foreground">
                {naoLidas.length} mensagem(ns) não lida(s)
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar mensagens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <Tabs defaultValue="todas" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="todas">Todas ({mensagensData.length})</TabsTrigger>
                  <TabsTrigger value="nao_lidas">Não lidas ({naoLidas.length})</TabsTrigger>
                  <TabsTrigger value="respondidas">Respondidas ({respondidas.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="todas" className="space-y-3">
                  {mensagensData.map((msg) => (
                    <MensagemCard key={msg.id} mensagem={msg} />
                  ))}
                </TabsContent>

                <TabsContent value="nao_lidas" className="space-y-3">
                  {naoLidas.map((msg) => (
                    <MensagemCard key={msg.id} mensagem={msg} />
                  ))}
                  {naoLidas.length === 0 && (
                    <p className="text-center py-8 text-muted-foreground">Nenhuma mensagem não lida</p>
                  )}
                </TabsContent>

                <TabsContent value="respondidas" className="space-y-3">
                  {respondidas.map((msg) => (
                    <MensagemCard key={msg.id} mensagem={msg} />
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:sticky lg:top-8">
              {selectedMensagem ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>{selectedMensagem.remetente.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{selectedMensagem.remetente}</CardTitle>
                          <CardDescription>{selectedMensagem.email}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Check className="h-4 w-4 mr-2" />
                            Marcar como lida
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{selectedMensagem.data}</span>
                      {getStatusBadge(selectedMensagem.status)}
                    </div>
                    <div>
                      <p className="font-medium text-lg">{selectedMensagem.assunto}</p>
                      <p className="text-sm text-muted-foreground">Propriedade: {selectedMensagem.propriedade}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm whitespace-pre-wrap">{selectedMensagem.mensagem}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="gap-2 flex-1" onClick={() => setReplyDialogOpen(true)}>
                        <Reply className="h-4 w-4" />
                        Responder
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-center">
                      Selecione uma mensagem para visualizar
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Responder Mensagem</DialogTitle>
            <DialogDescription>
              Respondendo para: {selectedMensagem?.email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">Mensagem original:</p>
              <p className="text-sm line-clamp-3">{selectedMensagem?.mensagem}</p>
            </div>
            <Textarea
              placeholder="Digite sua resposta..."
              rows={5}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setReplyDialogOpen(false)}>
              Enviar Resposta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
