"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ArrowLeft, 
  Send, 
  Search,
  MessageSquare,
  Clock,
  Check,
  CheckCheck
} from "lucide-react"

const conversas = [
  {
    id: 1,
    propriedade: "Fazenda Boa Vista",
    avatar: "/images/fazenda1.jpg",
    ultimaMensagem: "Olá! Sua reserva foi confirmada para o dia 15/12.",
    data: "2025-12-10T14:30:00",
    naoLida: true,
    mensagens: [
      {
        id: 1,
        remetente: "visitante",
        texto: "Olá! Gostaria de saber se vocês têm disponibilidade para o dia 15/12.",
        data: "2025-12-09T10:00:00",
        lida: true,
      },
      {
        id: 2,
        remetente: "propriedade",
        texto: "Bom dia! Sim, temos disponibilidade. Quantas pessoas seriam?",
        data: "2025-12-09T11:30:00",
        lida: true,
      },
      {
        id: 3,
        remetente: "visitante",
        texto: "Seriam 4 adultos e 2 crianças. Vocês têm atividades para crianças?",
        data: "2025-12-09T14:00:00",
        lida: true,
      },
      {
        id: 4,
        remetente: "propriedade",
        texto: "Temos sim! Temos trilha leve, alimentação dos animais e oficina de brinquedos de madeira.",
        data: "2025-12-09T15:20:00",
        lida: true,
      },
      {
        id: 5,
        remetente: "visitante",
        texto: "Perfeito! Vou fazer a reserva então.",
        data: "2025-12-10T09:00:00",
        lida: true,
      },
      {
        id: 6,
        remetente: "propriedade",
        texto: "Olá! Sua reserva foi confirmada para o dia 15/12.",
        data: "2025-12-10T14:30:00",
        lida: false,
      },
    ],
  },
  {
    id: 2,
    propriedade: "Sítio das Flores",
    avatar: "/images/sitio1.jpg",
    ultimaMensagem: "Agradecemos seu interesse! Qualquer dúvida, estamos à disposição.",
    data: "2025-12-08T16:45:00",
    naoLida: false,
    mensagens: [
      {
        id: 1,
        remetente: "visitante",
        texto: "Boa tarde! Vi que vocês têm colheita de frutas. Como funciona?",
        data: "2025-12-08T14:00:00",
        lida: true,
      },
      {
        id: 2,
        remetente: "propriedade",
        texto: "Boa tarde! A colheita acontece pela manhã, das 9h às 12h. Você pode colher e levar até 2kg de frutas por pessoa.",
        data: "2025-12-08T15:30:00",
        lida: true,
      },
      {
        id: 3,
        remetente: "visitante",
        texto: "Que legal! Obrigado pela informação.",
        data: "2025-12-08T16:00:00",
        lida: true,
      },
      {
        id: 4,
        remetente: "propriedade",
        texto: "Agradecemos seu interesse! Qualquer dúvida, estamos à disposição.",
        data: "2025-12-08T16:45:00",
        lida: true,
      },
    ],
  },
  {
    id: 3,
    propriedade: "Recanto Verde",
    avatar: "/images/recanto1.jpg",
    ultimaMensagem: "Você enviou: Vocês aceitam animais de estimação?",
    data: "2025-12-05T10:20:00",
    naoLida: false,
    mensagens: [
      {
        id: 1,
        remetente: "visitante",
        texto: "Vocês aceitam animais de estimação?",
        data: "2025-12-05T10:20:00",
        lida: true,
      },
    ],
  },
]

export default function MensagensVisitantePage() {
  const [busca, setBusca] = useState("")
  const [conversaSelecionada, setConversaSelecionada] = useState<typeof conversas[0] | null>(null)
  const [novaMensagem, setNovaMensagem] = useState("")

  const conversasFiltradas = conversas.filter((conversa) =>
    conversa.propriedade.toLowerCase().includes(busca.toLowerCase())
  )

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    const hoje = new Date()
    const ontem = new Date(hoje)
    ontem.setDate(ontem.getDate() - 1)

    if (data.toDateString() === hoje.toDateString()) {
      return data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    } else if (data.toDateString() === ontem.toDateString()) {
      return "Ontem"
    } else {
      return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
    }
  }

  const enviarMensagem = () => {
    if (novaMensagem.trim() && conversaSelecionada) {
      // Aqui seria feita a chamada para a API
      console.log("Enviando mensagem:", novaMensagem)
      setNovaMensagem("")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/dashboard/visitante" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao painel
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground">Minhas Mensagens</h1>
            <p className="text-muted-foreground mt-1">
              Converse com as propriedades rurais
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Lista de conversas */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversa..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  {conversasFiltradas.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">
                        Nenhuma conversa encontrada
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {conversasFiltradas.map((conversa) => (
                        <button
                          key={conversa.id}
                          onClick={() => setConversaSelecionada(conversa)}
                          className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                            conversaSelecionada?.id === conversa.id ? "bg-muted" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={conversa.avatar} alt={conversa.propriedade} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {conversa.propriedade.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`font-medium truncate ${conversa.naoLida ? "text-foreground" : "text-muted-foreground"}`}>
                                  {conversa.propriedade}
                                </span>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {formatarData(conversa.data)}
                                </span>
                              </div>
                              <p className={`text-sm truncate ${conversa.naoLida ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                                {conversa.ultimaMensagem}
                              </p>
                            </div>
                            {conversa.naoLida && (
                              <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center rounded-full">
                                1
                              </Badge>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Área de conversa */}
            <Card className="lg:col-span-2 flex flex-col">
              {conversaSelecionada ? (
                <>
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={conversaSelecionada.avatar} alt={conversaSelecionada.propriedade} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {conversaSelecionada.propriedade.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{conversaSelecionada.propriedade}</CardTitle>
                        <CardDescription>Propriedade Rural</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0 flex flex-col">
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {conversaSelecionada.mensagens.map((mensagem) => (
                          <div
                            key={mensagem.id}
                            className={`flex ${mensagem.remetente === "visitante" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                mensagem.remetente === "visitante"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{mensagem.texto}</p>
                              <div className={`flex items-center justify-end gap-1 mt-1 ${
                                mensagem.remetente === "visitante" ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}>
                                <span className="text-xs">
                                  {new Date(mensagem.data).toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                                {mensagem.remetente === "visitante" && (
                                  mensagem.lida ? (
                                    <CheckCheck className="h-3 w-3" />
                                  ) : (
                                    <Check className="h-3 w-3" />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Digite sua mensagem..."
                          value={novaMensagem}
                          onChange={(e) => setNovaMensagem(e.target.value)}
                          className="min-h-[44px] max-h-32 resize-none"
                          rows={1}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              enviarMensagem()
                            }
                          }}
                        />
                        <Button onClick={enviarMensagem} disabled={!novaMensagem.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex-1 flex flex-col items-center justify-center">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Selecione uma conversa</h3>
                  <p className="text-muted-foreground text-center">
                    Escolha uma conversa na lista ao lado para visualizar as mensagens
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
